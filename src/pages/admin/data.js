import { desc } from "framer-motion/client";

export const pharmacy ={
    total_sales: '$125,430',
    total_orders: 5421,
    position: [30.0444, 31.2357],
    products_in_stock: 3421,
    no_of_customers: 8765,
    orders : [
        {
            id: 'ORD-001',
            customer: 'Omar K',
            total: 45.5,
            status: 'Delivered',
            date: '2025-11-07',
        },
        {
            id: 'ORD-002',
            customer: 'Lina M',
            total: 12.99,
            status: 'Processing',
            date: '2025-11-08',
        },
        {
            id: 'ORD-003',
            customer: 'Hassan R',
            total: 89.2,
            status: 'Cancelled',
            date: '2025-11-09',
        }
    ],
    stock_alerts : [
        {
            id: 'alert-201',
            medicineId: 201,
            name: 'Cetirizine 10mg',
            stock: 20,
            threshold : 25,
        },
        {
            id: 'alert-202',
            medicineId: 202,
            name: 'Metformin 500mg',
            stock: 5,
            threshold : 10
        }
    ],
    medicines : [
        { id: 201, name: 'Cetirizine 10mg', medicineImage: '/meds/cetirizine.jpg', category: 'Allergy', stock: 200, threshold: 25, price: 6.5, status: 'Available',description: 'Used for allergy relief.' },
        { id: 202, name: 'Metformin 500mg', medicineImage: '/meds/metformin.jpg', category: 'Diabetes', stock: 20, threshold: 10, price: 11.0, status: 'lowStock',description: 'Helps control blood sugar levels.' },
        { id: 203, name: 'Atorvastatin 20mg', medicineImage: '/meds/atorvastatin.jpg', category: 'Cardio', stock: 0, threshold: 0, price: 18.0, status: 'outOfStock',description: 'Lowers cholesterol levels.' },
        { id: 204, name: 'Omeprazole 20mg', medicineImage: '/meds/omeprazole.jpg', category: 'Gastro', stock: 75, threshold: 25, price: 7.25, status: 'Available',description: 'Treats acid reflux and ulcers.' },
    ],
    lowStockAlerts : medicines.filter(m => m.stock <= m.threshold).map(m => ({
        id: `alert-${m.id}`,
        medicineId: m.id,
        name: m.name,
        stock: m.stock,
        threshold: m.threshold
    }))
};

export default { pharmacy };
