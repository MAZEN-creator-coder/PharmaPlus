import { useEffect, useMemo, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getOrderById } from '../../shared/api/orderApi';
import { getMedicineById } from '../../shared/api/medicineApi';
import styles from './OrderDetailsModal.module.css';

const formatCurrency = (n) => {
  try {
    return `$${Number(n).toFixed(2)}`;
  } catch (e) {
    return `$${n}`;
  }
};

const StatusPill = ({ status }) => {
  const s = (status || '').toString().toLowerCase();
  let cls = styles.statusDefault;
  if (s === 'delivered') cls = styles.statusDelivered;
  else if (s === 'pending') cls = styles.statusPending;
  else if (s === 'processing') cls = styles.statusProcessing;
  else if (s === 'cancelled' || s === 'canceled') cls = styles.statusCancelled;
  return <div className={`${styles.statusPill} ${cls}`}>{status}</div>;
};

export default function OrderDetailsModal({ isOpen, onClose, orderData, orderId }) {
  // Read auth context directly without using `useAuth` which throws
  // when used outside an AuthProvider. This keeps the modal safe
  // when rendered in isolation during tests or pages not wrapped
  // by the provider.
  const auth = useContext(AuthContext) || {};
  const { token } = auth || {};

  const [data, setData] = useState(orderData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // When orderData prop changes, use it
  useEffect(() => {
    setData(orderData || null);
  }, [orderData]);

  // If parent passed `orderData`, fetch medicines for its items as well
  useEffect(() => {
    let mounted = true;
    const fetchMedicinesForOrder = async (order) => {
      if (!order || !Array.isArray(order.items) || order.items.length === 0) {
        setItemsWithPrice([]);
        return;
      }
      setLoading(true);
      try {
        const promises = order.items.map(async (it) => {
            try {
              let med = null;
              if (it.medicine && typeof it.medicine === 'object') med = it.medicine;
              else med = await getMedicineById(it.medicine, token);
              const info = extractMedInfo(med, it);
              const unit = Number(info.price || 0);
              const qty = Number(it.quantity ?? 1) || 1;
              return {
                id: it._id,
                medicineId: typeof it.medicine === 'object' ? (it.medicine._id || null) : it.medicine,
                name: info.name || String(it.medicine),
                unitPrice: unit,
                quantity: qty,
                lineTotal: unit * qty,
              };
          } catch (err) {
            return {
              id: it._id,
              medicineId: typeof it.medicine === 'object' ? (it.medicine._id || null) : it.medicine,
              name: (it.medicine && typeof it.medicine === 'object') ? (it.medicine.name || it.medicine._id) : String(it.medicine),
              unitPrice: 0,
              quantity: Number(it.quantity ?? 1),
              lineTotal: 0,
            };
          }
        });
        const results = await Promise.all(promises);
        if (!mounted) return;
        setItemsWithPrice(results);
      } catch (err) {
        if (!mounted) return;
        setItemsWithPrice([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    if (isOpen && orderData) fetchMedicinesForOrder(orderData);
    return () => { mounted = false; };
  }, [orderData, token, isOpen]);

  useEffect(() => {
    let mounted = true;
    const fetchOrder = async () => {
      if (!isOpen) return;
      if (orderData) return; // already have it
      if (!orderId) return;
      setLoading(true);
      setError(null);
      try {
        const payload = await getOrderById(orderId, token);
        if (!mounted) return;
        const order = payload?.order ?? payload ?? null;
        setData(order || null);
        // fetch medicine details for all items
        if (order?.items && Array.isArray(order.items) && order.items.length > 0) {
          const promises = order.items.map(async (it) => {
            try {
              let med = null;
              if (it.medicine && typeof it.medicine === 'object') {
                med = it.medicine;
              } else {
                med = await getMedicineById(it.medicine, token);
              }
              let medName = '';
              if (med) {
                if (typeof med.name === 'string') medName = med.name;
                else if (typeof med.name === 'object') medName = med.name.name || med.name.en || med.name.ar || JSON.stringify(med.name);
                else medName = String(med.name ?? med._id ?? it.medicine);
              }
              const unit = Number(med?.price ?? med?.cost ?? 0);
              const qty = Number(it.quantity ?? 1);
              return {
                id: it._id,
                medicineId: typeof it.medicine === 'object' ? (it.medicine._id || null) : it.medicine,
                name: medName || String(it.medicine),
                unitPrice: unit,
                quantity: qty,
                lineTotal: unit * qty,
              };
            } catch (err) {
              return {
                id: it._id,
                medicineId: typeof it.medicine === 'object' ? (it.medicine._id || null) : it.medicine,
                name: (it.medicine && typeof it.medicine === 'object') ? (it.medicine.name || it.medicine._id) : String(it.medicine),
                unitPrice: 0,
                quantity: Number(it.quantity ?? 1),
                lineTotal: 0,
              };
            }
          });
          const results = await Promise.all(promises);
          if (!mounted) return;
          setItemsWithPrice(results);
        } else {
          setItemsWithPrice([]);
        }
      } catch (err) {
        if (!mounted) return;
        setError(err.message || String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    fetchOrder();
    return () => {
      mounted = false;
    };
  }, [isOpen, orderId, orderData, token]);

  // Reset expanded when modal closes/opens
  useEffect(() => {
    if (!isOpen) setExpanded(false);
  }, [isOpen]);

  // Reset transient modal state each time the modal is opened so we
  // always re-run the fetch/fallback logic. This prevents stale or
  // adjusted values from persisting across open/close cycles which
  // could lead to item prices becoming zero on subsequent opens.
  useEffect(() => {
    if (isOpen) {
      setAdjustedFromServer(false);
      setItemsWithPrice([]);
      setError(null);
    }
  }, [isOpen, orderId]);

  // Close on Escape key while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        try { onClose(); } catch (err) { /* ignore */ }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const [itemsWithPrice, setItemsWithPrice] = useState([]);

  // Helper to extract medicine name and price from various backend shapes
  const extractMedInfo = (med, item) => {
    // med may be: { name, price }, or nested under data.medicine, or be null
    let name = '';
    let price = null;
    try {
      if (med) {
        // many APIs put the object directly
        if (typeof med === 'object') {
          // name candidates
          name = med.name ?? med.title ?? med.medName ?? med.productName ?? '';
          if (!name && med.data && med.data.medicine) name = med.data.medicine.name;
          if (!name && med.medicine && med.medicine.name) name = med.medicine.name;
          // price candidates
          price = med.price ?? med.amount ?? med.cost ?? med.unitPrice ?? med.data?.medicine?.price ?? med.medicine?.price ?? null;
        } else {
          // med is primitive id
          name = '';
        }
      }
    } catch (e) { /* ignore */ }
    // fallback to item-level fields
    if ((!price || !Number.isFinite(Number(price))) && item) {
      price = item.price ?? item.unitPrice ?? item.totalPrice ?? item.medicinePrice ?? null;
    }
    // final coercion
    price = Number(price ?? 0);
    if (!name) {
      if (item && item.medicine && typeof item.medicine === 'object') name = item.medicine.name || item.medicine.title || String(item.medicine._id || 'Item');
      else name = String(item?.medicine ?? 'Item');
    }
    return { name, price };
  };

  // server total is available on `data.total`; we display `totalComputed` below

  // compute subtotal from fetched medicine prices
  const subtotal = useMemo(() => {
    return itemsWithPrice.reduce((s, it) => s + (Number(it.lineTotal) || 0), 0);
  }, [itemsWithPrice]);

  // If the fetched item prices produced a subtotal of 0 but the server
  // reports a positive total, distribute the server total across items
  // so the UI shows reasonable per-item prices. This runs once per
  // modal open to avoid oscillation.
  const [adjustedFromServer, setAdjustedFromServer] = useState(false);
  useEffect(() => {
    if (adjustedFromServer) return;
    const serverTotal = Number(data?.total ?? data?.amount ?? 0) || 0;
    if (serverTotal <= 0) return;
    if (!itemsWithPrice || itemsWithPrice.length === 0) return;
    if (subtotal > 0) return; // we already have prices

    // prefer explicit delivery value from server if present
    const deliveryUsed = Number(data?.delivery ?? data?.deliveryFee ?? data?.shippingAmount ?? DELIVERY_FEE) || DELIVERY_FEE;

    // compute target total to distribute among items
    const itemsTargetTotal = Math.max(0, serverTotal - deliveryUsed);

    const totalQty = itemsWithPrice.reduce((s, it) => s + (Number(it.quantity) || 0), 0) || itemsWithPrice.length;
    const unitFallback = totalQty > 0 ? Number((itemsTargetTotal / totalQty).toFixed(2)) : 0;

    const adjusted = itemsWithPrice.map((it) => {
      const qty = Number(it.quantity) || 1;
      const unit = unitFallback;
      return {
        ...it,
        unitPrice: unit,
        lineTotal: Number((unit * qty).toFixed(2)),
      };
    });

    setItemsWithPrice(adjusted);
    setAdjustedFromServer(true);
  }, [adjustedFromServer, data, itemsWithPrice, subtotal]);

  const DELIVERY_FEE = 15;

  const discountPercent = Number(data?.discountPercent ?? data?.discount ?? 0) || 0;
  const discountExplicit = Number(data?.discountAmount ?? data?.discountAmount ?? 0) || 0;
  const discountAmount = discountExplicit > 0 ? discountExplicit : (discountPercent > 0 && discountPercent <= 100 ? subtotal * (discountPercent / 100) : 0);

  const totalComputed = subtotal - discountAmount + DELIVERY_FEE;

  if (!isOpen) return null;

  const visibleCount = expanded ? itemsWithPrice.length : Math.min(5, itemsWithPrice.length);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.title}>Order Details</h2>
            <div className={styles.sub}>Order #{data?.orderNumber ?? orderId ?? '—'}</div>
          </div>
          <div className={styles.headerRight}>
            <StatusPill status={data?.status ?? 'Unknown'} />
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
          </div>
        </header>

        <div className={styles.body}>
          {loading && <div className={styles.loading}>Loading order…</div>}
          {error && <div className={styles.error}>Error: {error}</div>}

          {!loading && !error && data && (
            <>
              <div className={styles.summaryRow}>
                <div className={styles.card}>
                  <div className={styles.cardLabel}>Date</div>
                  <div className={styles.cardValue}>{data?.date ?? '—'}</div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardLabel}>Total Amount</div>
                  <div className={styles.cardValue}>{formatCurrency(Number(data?.total ?? data?.amount ?? totalComputed) || totalComputed)}</div>
                </div>
              </div>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Delivery Address</h3>
                <div className={styles.sectionBody}>{(function(){
                  const a = data?.deliveryAddress ?? data?.shippingAddress ?? data?.address ?? data?.delivery ?? data?.shipping;
                  if (!a) return '—';
                  if (typeof a === 'string') return a;
                  // object address
                  const parts = [a.addressLine || a.street || a.line1 || a.line || a.addr, a.city, a.state, a.zip, a.postalCode].filter(Boolean);
                  return parts.join(', ') || '—';
                })()}</div>
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Payment Method</h3>
                <div className={styles.sectionBody}>{data?.paymentMethod ?? '—'}</div>
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Order Summary</h3>
                <div style={{ display: 'grid', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
                    <div>Subtotal</div>
                    <div>{formatCurrency(subtotal)}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b91c1c' }}>
                    <div>Discount</div>
                    <div>-{formatCurrency(discountAmount)}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
                    <div>Delivery Fee</div>
                    <div>{formatCurrency(DELIVERY_FEE)}</div>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Order Items ({itemsWithPrice.length})</h3>
                <div className={styles.itemsWrap}>
                  {itemsWithPrice.length === 0 && <div className={styles.empty}>No items</div>}
                  {itemsWithPrice.slice(0, visibleCount).map((it, idx) => (
                    <div key={idx} className={styles.itemRow}>
                      <div className={styles.itemLeft}>
                        <div className={styles.itemName}>{it.name}</div>
                        <div className={styles.itemQty}>x{it.quantity}</div>
                        <div style={{ fontSize: 13, color: '#374151', marginTop: 6 }}>{formatCurrency(it.unitPrice)} per unit</div>
                      </div>
                      <div className={styles.itemPrice}>{formatCurrency(it.lineTotal)}</div>
                    </div>
                  ))}
                </div>

                {itemsWithPrice.length > visibleCount && (
                  <div className={styles.moreRow}>
                    <button className={styles.moreBtn} onClick={() => setExpanded((s) => !s)}>
                      {expanded ? 'Show less' : `Show ${itemsWithPrice.length - visibleCount} more items`}
                    </button>
                  </div>
                )}
              </section>

              <div className={styles.totalBar}>
                <div className={styles.totalLabel}>TOTAL</div>
                <div className={styles.totalValue}>{formatCurrency(totalComputed)}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Note: prop-types removed to avoid a hard dependency; validate props via TypeScript or runtime checks if needed.
