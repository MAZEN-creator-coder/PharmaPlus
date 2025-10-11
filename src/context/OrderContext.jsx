import { createContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  // Start with empty orders array - no hardcoded data
  const [orders, setOrders] = useState([]);

  // Function to add a new order
  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  // Function to update order status (for future use)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };


  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      updateOrderStatus
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext };
