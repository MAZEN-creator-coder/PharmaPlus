import { RiDeleteBin6Line } from 'react-icons/ri';
import CartItem from './CartItem';
import styles from './CartItems.module.css';

export default function CartItems({ 
  items, 
  onQuantityChange, 
  onRemove, 
  onSelectItem, 
  onSelectAll, 
  onDeleteSelected,
  allSelected 
}) {
  const selectedItems = items.filter(item => item.selected);
  const hasSelectedItems = selectedItems.length > 0;

  return (
    <div className={styles.cartItems}>
      {/* Select All Bar */}
      <div className={styles.selectAllBar}>
        <div className={styles.selectAllSection}>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className={styles.selectAllCheckbox}
          />
          <span className={styles.selectAllText}>Select All</span>
        </div>
        
        {hasSelectedItems && (
          <button 
            onClick={onDeleteSelected}
            className={styles.deleteBtn}
          >
            <RiDeleteBin6Line />
            <span>Delete</span>
          </button>
        )}
      </div>

      {/* Items List */}
      <div className={styles.itemsList}>
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
            onSelect={onSelectItem}
          />
        ))}
      </div>
    </div>
  );
}
