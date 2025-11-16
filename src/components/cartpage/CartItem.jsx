import { HiMinus, HiPlus } from 'react-icons/hi2';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import { FaStore } from 'react-icons/fa';
import styles from './CartItem.module.css';

export default function CartItem({ item, onQuantityChange, onRemove, onSelect }) {
  const itemId = item._id || item.id;
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onQuantityChange(itemId, newQuantity);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'available';
      case 'lowStock': return 'lowStock';
      case 'outOfStock': return 'outOfStock';
      default: return 'available';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Available': return 'Available';
      case 'lowStock': return 'Low Stock';
      case 'outOfStock': return 'Out of Stock';
      default: return status;
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemContent}>
        <input
          type="checkbox"
          checked={item.selected}
          onChange={() => onSelect(itemId)}
          className={styles.checkbox}
        />
        
        <div className={styles.productImageContainer}>
          <img 
            src={`http://localhost:3000/${item.medicineImage}`}
            alt={item.name}
            className={styles.productImage}
          />
        </div>
        
        <div className={styles.productInfo}>
          <div className={styles.productHeader}>
            <h3 className={styles.productName}>{item.name}</h3>
            <span className={`${styles.statusBadge} ${styles[getStatusColor(item.status)]}`}>
              {getStatusText(item.status)}
            </span>
          </div>
          
          <div className={styles.productDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Category:</span>
              <span className={styles.detailValue}>{item.category}</span>
            </div>
            
            <div className={styles.pharmacyInfo}>
              <div className={styles.pharmacyDetail}>
                <FaStore className={styles.detailIcon} />
                <span>{item.pharmacy?.name || 'N/A'}</span>
              </div>
              <div className={styles.distanceDetail}>
                <MdLocationOn className={styles.detailIcon} />
                <span>{typeof item.distance === 'number' ? `${item.distance.toFixed(2)} m` : 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.priceSection}>
          <div className={styles.price}>${item.price}</div>
          <div className={styles.pricePerUnit}>per unit</div>
        </div>
        
        <div className={styles.quantityControls}>
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className={styles.quantityBtn}
            disabled={item.quantity <= 1}
          >
            <HiMinus />
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className={styles.quantityBtn}
          >
            <HiPlus />
          </button>
        </div>
        
        <button 
          onClick={() => onRemove(itemId)}
          className={styles.removeBtn}
          title="Remove from cart"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
}
