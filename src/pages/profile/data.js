// Mock backend data for Profile pages
// Designed similarly to `src/shared/data.js` so components can import realistic sample data.

export const currentUser = {
  id: 9001,
  firstName: 'Mazen',
  lastName: 'Ahmed',
  fullName: 'Mazen Ahmed',
  email: 'mazen.ahmed@example.com',
  avatar: '/avatars/user-9001.jpg',
  phone: '+20 100 000 0000',
  dob: '1990-05-12',
  joined: '2023-03-18',
  role: 'customer',
  preferences: {
    newsletter: true,
    smsAlerts: false,
  },
};

export const addresses = [
  {
    id: 'addr-1',
    label: 'Home',
    street: '12 Nile St',
    city: 'Cairo',
    region: 'Cairo Governorate',
    postalCode: '11511',
    country: 'Egypt',
    phone: '+20 100 000 0000',
    default: true,
  }
];

export const paymentMethods = [
  { id: 'pm-1', type: 'card', brand: 'Visa', last4: '4242', expiry: '12/26', primary: true },
  { id: 'pm-2', type: 'cash', label: 'Cash on Delivery', primary: false },
];

export const orders = [
  {
    id: 'ORD-9001',
    date: '2025-09-10',
    items: [
      { sku: 101, name: 'Paracetamol 500mg', qty: 2, price: 5.99 },
      { sku: 106, name: 'Allergy Relief 10mg', qty: 1, price: 10.5 },
    ],
    subtotal: 22.48,
    shipping: 2.5,
    total: 24.98,
    status: 'Delivered',
    deliveredAt: '2025-09-13',
    pharmacy: 'Pharmacy A',
  }
];

export const notifications = [
  { id: 'n-1', type: 'order', text: 'Your order ORD-9001 has been delivered.', read: true, date: '2025-09-13' },
  { id: 'n-2', type: 'promo', text: 'Get 10% off vitamins this week!', read: false, date: '2025-11-01' },
];
export const medicines = [
  { id: 101, name: 'Paracetamol 500mg', image: '/paracetamol.jpg', category: 'Pain Relief', stock: 120, price: 5.99, status: 'Available' },
  { id: 106, name: 'Allergy Relief 10mg', image: '/allergy.jpg', category: 'Allergy', stock: 3, price: 10.5, status: 'lowStock' },
  { id: 104, name: 'Multivitamin Complex', image: '/multivitamin.jpg', category: 'Supplements', stock: 45, price: 9.99, status: 'Available' },
];

export default { currentUser, addresses, paymentMethods, prescriptions, orders, notifications, medicines };
