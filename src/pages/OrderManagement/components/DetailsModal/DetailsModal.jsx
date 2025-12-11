import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import styles from "./DetailsModal.module.css";
import { getMedicineById } from "../../../../shared/api/medicineApi";
import { AuthContext } from "../../../../context/AuthContext";

export default function DetailsModal({ order, onClose, isLoading }) {
  const [itemsWithMed, setItemsWithMed] = useState([]);
  const [loadingMeds, setLoadingMeds] = useState(false);
  const auth = useContext(AuthContext) || {};
  const { token } = auth;
  const items = useMemo(() => order?.items || [], [order?.items]);
  const medCache = useRef(new Map());

  useEffect(() => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      setItemsWithMed([]);
      return;
    }
    let mounted = true;
    const fetchMeds = async () => {
      setLoadingMeds(true);
      try {
        const results = await Promise.all(
          items.map(async (it) => {
            try {
              let med = null;
              if (it.medicine && typeof it.medicine === "object") med = it.medicine;
              else {
                const cached = medCache.current.get(it.medicine);
                if (cached) med = cached;
                else {
                  med = await getMedicineById(it.medicine, token);
                  medCache.current.set(it.medicine, med);
                }
              }
              if (!mounted) return null;
              return {
                id: it._id || null,
                medicineId: (med && med._id) || (typeof it.medicine === "string" ? it.medicine : null),
                name: med?.name || String(it.medicine),
                price: Number(med?.price ?? med?.cost ?? med?.unitPrice ?? 0),
                quantity: Number(it.quantity ?? 1),
              };
            } catch (err) {
              console.error("Error while fetching med:", err);
              return {
                id: it._id || null,
                medicineId: typeof it.medicine === "string" ? it.medicine : (it.medicine && it.medicine._id) || null,
                name: (it.medicine && typeof it.medicine === "object") ? it.medicine.name || it.medicine._id : String(it.medicine),
                price: Number(it.price ?? 0),
                quantity: Number(it.quantity ?? 1),
              };
            }
          })
        );
        if (!mounted) {
          // component unmounted; ignore
        } else {
          setItemsWithMed(results.filter(Boolean));
        }
      } catch (err) {
        console.error("DetailsModal fetchMeds error:", err);
        if (mounted) setItemsWithMed([]);
      } finally {
        if (mounted) setLoadingMeds(false);
      }
    };
    fetchMeds();
    return () => {
      mounted = false;
    };
  }, [items, token]);

  if (isLoading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div>Loading order details…</div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const { date, status, paymentMethod, address } = order;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Order Details</h3>

        <div className={styles.row}>
          <strong>Date:</strong>
          <span>{date ? new Date(date).toLocaleString() : "N/A"}</span>
        </div>

        <div className={styles.row}>
          <strong>Status:</strong>
          <span>{status || "N/A"}</span>
        </div>

        <div className={styles.row}>
          <strong>Payment Method:</strong>
          <span>{paymentMethod || "N/A"}</span>
        </div>

        <div className={styles.sectionTitle}>Address</div>
        <div className={styles.addressBlock}>
          <div>
            <strong>Street:</strong>
            <div>{address?.street || "N/A"}</div>
          </div>
          <div>
            <strong>City:</strong>
            <div>{address?.city || "N/A"}</div>
          </div>
          <div>
            <strong>Additional Directions:</strong>
            <div>{address?.additionalDirections || "N/A"}</div>
          </div>
          <div>
            <strong>Phone:</strong>
            <div>{address?.phone || "N/A"}</div>
          </div>
        </div>

        <div className={styles.sectionTitle}>Items</div>
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Line total</th>
            </tr>
          </thead>
          <tbody>
            {loadingMeds ? (
              <tr>
                <td colSpan={4}>Loading items…</td>
              </tr>
            ) : itemsWithMed?.length > 0 ? (
              itemsWithMed.map((it) => (
                <tr key={it.id || it.medicineId}>
                  <td>{it.name}</td>
                  <td>{(Number(it.price) || 0).toFixed(2)} EGP</td>
                  <td>{it.quantity}</td>
                  <td>{((Number(it.price) || 0) * Number(it.quantity || 1)).toFixed(2)} EGP</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No items</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.buttons}>
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
