import { useState, useMemo } from 'react';
import { data } from '../../shared/data';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import styles from './ShoppingCart.module.css';

export default function ShoppingCart({ onGoToCheckout }) {
  // إنشاء بيانات سلة التسوق من البيانات الموجودة مع إضافة خصائص الكمية والتحديد
  const [cartItems, setCartItems] = useState(() => 
    data.map((item, index) => ({
      ...item,
      id: index + 1,
      quantity: index === 0 ? 2 : index === 1 ? 4 : 8, // كميات مختلفة للعرض
      selected: true
    }))
  );

  // التحكم في تحديد جميع العناصر
  const allSelected = useMemo(() => 
    cartItems.length > 0 && cartItems.every(item => item.selected),
    [cartItems]
  );

  // حساب الإجمالي
  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = Math.round(subtotal * 0.2); // خصم 20%
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  // دوال التحكم
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleSelectItem = (id) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = () => {
    const newSelectedState = !allSelected;
    setCartItems(items => 
      items.map(item => ({ ...item, selected: newSelectedState }))
    );
  };

  const handleDeleteSelected = () => {
    setCartItems(items => items.filter(item => !item.selected));
  };

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.container}>
        <h1 className={styles.title}>Your cart</h1>
        
        <div className={styles.content}>
          <CartItems
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onDeleteSelected={handleDeleteSelected}
            allSelected={allSelected}
          />
          
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
            onCheckout={() => onGoToCheckout && onGoToCheckout()}
          />
        </div>
      </div>
    </div>
  );
}
