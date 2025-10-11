import { useMemo, useState, useContext } from 'react';
import { RiBankCard2Line, RiMoneyDollarCircleLine, RiUser3Line, RiPhoneLine, RiMapPin2Line, RiBuilding2Line, RiNumber1, RiCalendar2Line, RiLock2Line } from 'react-icons/ri';
import { OrderContext } from '../../context/OrderContext.jsx';
import { ProductContext } from '../../context/productContext.js';
import styles from './CheckoutDetails.module.css';

export default function CheckoutDetails({ onPlaceOrder, onBack }) {
  const { addOrder } = useContext(OrderContext);
  const { selectedItems, total, clearCart } = useContext(ProductContext);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState({
    name: '', phone: '', street: '', city: '', state: '', postal: ''
  });
  const [card, setCard] = useState({ holder: '', number: '', exp: '', cvc: '' });
  const [note, setNote] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState({});

  const trimmed = useMemo(() => ({
    address: {
      name: address.name.trim(),
      phone: address.phone.trim(),
      street: address.street.trim(),
      city: address.city.trim(),
      state: address.state.trim(),
      postal: address.postal.trim(),
    },
    card: {
      holder: card.holder.trim(),
      number: card.number.replace(/\s+/g,'').trim(),
      exp: card.exp.trim(),
      cvc: card.cvc.trim(),
    }
  }), [address, card]);

  const errors = useMemo(() => {
    const e = {};
    if (!trimmed.address.name) e.name = 'Required';
    if (!trimmed.address.phone || trimmed.address.phone.length < 7) e.phone = 'Invalid phone';
    if (!trimmed.address.street) e.street = 'Required';
    if (!trimmed.address.city) e.city = 'Required';
    if (!trimmed.address.state) e.state = 'Required';
    if (!trimmed.address.postal) e.postal = 'Required';
    if (paymentMethod === 'card') {
      if (!trimmed.card.holder) e.holder = 'Required';
      if (!/^\d{12,19}$/.test(trimmed.card.number)) e.number = 'Invalid card';
      if (!/^\d{2}\/\d{2}$/.test(trimmed.card.exp)) e.exp = 'MM/YY';
      if (!/^\d{3,4}$/.test(trimmed.card.cvc)) e.cvc = '3-4 digits';
    }
    return e;
  }, [trimmed, paymentMethod]);

  const canPlace = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handlePlaceOrder = () => {
    if (!canPlace) {
      setShowErrors(true);
      return;
    }

    // Create new order with exact same structure as hardcoded data
    const newOrder = {
      id: `MC${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      total: `$${total.toFixed(2)}`,
      status: 'Processing',
      items: selectedItems.map(item => `${item.name} (x${item.quantity})`)
    };

    // Add order to context
    addOrder(newOrder);
    
    // Clear cart after successful order
    clearCart();
    
    // Continue to success page
    onPlaceOrder && onPlaceOrder();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Checkout Details</h2>
      <div className={styles.grid}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Shipping Address</h3>
          <div className={styles.formGrid}>
            <div className={`${styles.inputWrap} ${styles.col6}`}>
              <RiUser3Line className={styles.inputIcon} />
              <input className={styles.input} placeholder="Full Name" value={address.name} onChange={e=>setAddress(a=>({...a,name:e.target.value}))} onBlur={()=>setTouched(t=>({...t,name:true}))} required />
              {(showErrors || touched.name) && errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>
            <div className={`${styles.inputWrap} ${styles.col6}`}>
              <RiPhoneLine className={styles.inputIcon} />
              <input className={styles.input} placeholder="Phone Number" value={address.phone} onChange={e=>setAddress(a=>({...a,phone:e.target.value}))} onBlur={()=>setTouched(t=>({...t,phone:true}))} required />
              {(showErrors || touched.phone) && errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>
            <div className={`${styles.inputWrap} ${styles.col12}`}>
              <RiMapPin2Line className={styles.inputIcon} />
              <input className={styles.input} placeholder="Street Address" value={address.street} onChange={e=>setAddress(a=>({...a,street:e.target.value}))} onBlur={()=>setTouched(t=>({...t,street:true}))} required />
              {(showErrors || touched.street) && errors.street && <span className={styles.error}>{errors.street}</span>}
            </div>
            <div className={`${styles.inputWrap} ${styles.col4}`}>
              <RiBuilding2Line className={styles.inputIcon} />
              <input className={styles.input} placeholder="City" value={address.city} onChange={e=>setAddress(a=>({...a,city:e.target.value}))} onBlur={()=>setTouched(t=>({...t,city:true}))} required />
              {(showErrors || touched.city) && errors.city && <span className={styles.error}>{errors.city}</span>}
            </div>
            <div className={`${styles.inputWrap} ${styles.col4}`}>
              <RiBuilding2Line className={styles.inputIcon} />
              <input className={styles.input} placeholder="State" value={address.state} onChange={e=>setAddress(a=>({...a,state:e.target.value}))} onBlur={()=>setTouched(t=>({...t,state:true}))} required />
              {(showErrors || touched.state) && errors.state && <span className={styles.error}>{errors.state}</span>}
            </div>
            <div className={`${styles.inputWrap} ${styles.col4}`}>
              <RiNumber1 className={styles.inputIcon} />
              <input className={styles.input} placeholder="Postal Code" value={address.postal} onChange={e=>setAddress(a=>({...a,postal:e.target.value}))} onBlur={()=>setTouched(t=>({...t,postal:true}))} required />
              {(showErrors || touched.postal) && errors.postal && <span className={styles.error}>{errors.postal}</span>}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Payment Method</h3>
          <div className={styles.paymentOptions}>
            <button type="button" className={`${styles.option} ${paymentMethod==='card'?styles.optionSelected:''}`} onClick={()=>setPaymentMethod('card')}>
              <RiBankCard2Line />
              <span>Credit / Debit Card</span>
            </button>
            <button type="button" className={`${styles.option} ${paymentMethod==='cash'?styles.optionSelected:''}`} onClick={()=>setPaymentMethod('cash')}>
              <RiMoneyDollarCircleLine />
              <span>Cash on Delivery</span>
            </button>
          </div>

          {paymentMethod==='card' && (
            <div className={styles.formGrid}>
              <div className={`${styles.inputWrap} ${styles.col6}`}>
                <RiUser3Line className={styles.inputIcon} />
                <input className={styles.input} placeholder="Cardholder Name" value={card.holder} onChange={e=>setCard(c=>({...c,holder:e.target.value}))} onBlur={()=>setTouched(t=>({...t,holder:true}))} />
                {(showErrors || touched.holder) && errors.holder && <span className={styles.error}>{errors.holder}</span>}
              </div>
              <div className={`${styles.inputWrap} ${styles.col6}`}>
                <RiBankCard2Line className={styles.inputIcon} />
                <input className={styles.input} placeholder="Card Number" value={card.number} onChange={e=>setCard(c=>({...c,number:e.target.value}))} onBlur={()=>setTouched(t=>({...t,number:true}))} />
                {(showErrors || touched.number) && errors.number && <span className={styles.error}>{errors.number}</span>}
              </div>
              <div className={`${styles.inputWrap} ${styles.col6}`}>
                <RiCalendar2Line className={styles.inputIcon} />
                <input className={styles.input} placeholder="MM/YY" value={card.exp} onChange={e=>setCard(c=>({...c,exp:e.target.value}))} onBlur={()=>setTouched(t=>({...t,exp:true}))} />
                {(showErrors || touched.exp) && errors.exp && <span className={styles.error}>{errors.exp}</span>}
              </div>
              <div className={`${styles.inputWrap} ${styles.col6}`}>
                <RiLock2Line className={styles.inputIcon} />
                <input className={styles.input} placeholder="CVC" value={card.cvc} onChange={e=>setCard(c=>({...c,cvc:e.target.value}))} onBlur={()=>setTouched(t=>({...t,cvc:true}))} />
                {(showErrors || touched.cvc) && errors.cvc && <span className={styles.error}>{errors.cvc}</span>}
              </div>
            </div>
          )}

          {paymentMethod==='cash' && (
            <div className={styles.cashBox}>
              <p className={styles.cashNote}>Please prepare cash amount. Our rider will collect payment upon delivery.</p>
              <textarea className={styles.textarea} placeholder="Notes for the rider (optional)" value={note} onChange={e=>setNote(e.target.value)} />
            </div>
          )}
        </section>
      </div>

      <div className={styles.actions}> 
        <button className={styles.backBtn} onClick={onBack}>Back to Cart</button>
        <button className={`${styles.placeOrderBtn} ${!canPlace ? styles.btnDisabled : ''}`} onClick={handlePlaceOrder} disabled={!canPlace} title={!canPlace? 'Complete required fields':''}>Place Order</button>
      </div>
    </div>
  );
}
