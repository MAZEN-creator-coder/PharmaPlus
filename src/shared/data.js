// Original data used by search and other pages
export const data = [
  {
    id: 1,
    name: "Aspirin",
    medicineImage: "/aspirin.jpg",
    price: 100,
    status: "Available",
    distance: "2.5km",
    category: "teblets",
    pharmacy: "Pharmacy A",
    description: "this is aspirin",
  },
  {
    id: 2,
    name: "Paracetamol",
    medicineImage: "/paracetamol.jpg",
    price: 100,
    status: "lowStock",
    distance: "2.5km",
    category: "capsules",
    pharmacy: "Pharmacy A",
    description: "this is aspirin",
  },
  {
    id: 3,
    name: "Vitamin C",
    medicineImage: "/vitaminc.jpg",
    price: 100,
    status: "outOfStock",
    distance: "3km",
    category: "drink",
    pharmacy: "Pharmacy A",
    description: "this is aspirin",
  },
  {
    id: 4,
    name: "Vitamin A",
    medicineImage: "/vitaminc.jpg",
    price: 100,
    status: "outOfStock",
    distance: "3km",
    category: "drink",
    pharmacy: "Pharmacy A",
    description: "this is aspirin",
  },
]; // Will be populated from API


//NOHA 
// Admin page medicine data
export const medicines = [
  { id: 101, name: "Paracetamol 500mg", image: "https://placehold.co/400x400/8b5cf6/ffffff?text=P", category: "Pain Relief", stock: 120, price: 5.99, description: "Effective fever reducer.", status: "Available" },
  { id: 102, name: "Ibuprofen 200mg", image: "https://placehold.co/400x400/f97316/ffffff?text=I", category: "Anti-inflammatory", stock: 8, price: 7.49, description: "For pain and inflammation.", status: "lowStock" },
  { id: 103, name: "Amoxicillin 250mg", image: "https://placehold.co/400x400/ef4444/ffffff?text=A", category: "Antibiotics", stock: 0, price: 12.0, description: "Broad spectrum antibiotic.", status: "outOfStock" },
  { id: 104, name: "Multivitamin Complex", image: "https://placehold.co/400x400/10b981/ffffff?text=M", category: "Supplements", stock: 45, price: 9.99, description: "Complete daily vitamin and mineral supplement.", status: "Available" },
  { id: 105, name: "Night-time Cough Syrup", image: "https://placehold.co/400x400/06b6d4/ffffff?text=C", category: "Cold & Flu", stock: 15, price: 6.25, description: "Non-drowsy formula for persistent coughs.", status: "Available" },
  { id: 106, name: "Allergy Relief 10mg", image: "https://placehold.co/400x400/f59e0b/ffffff?text=AL", category: "Allergy", stock: 3, price: 10.5, description: "24-hour allergy symptom relief.", status: "lowStock" }
];

// super admin page pharmacy data
export const pharmaciesData = [
  {
    id: 1,
    img: "/pharmacy-a.jpg",
    name: "Pharmacy A",
    license: "License A",
    contact: "555-1234",
    address: "123 Main St, Cityville",
    status: "Active",
    rating: 4.5,
    price: "$4.99",
    medicines: ["Medicine A", "Medicine B"],
    categorys: ["Category A", "Category B"],
    description: "Description for Pharmacy A",
    email: "pharmacy-a@example.com",
  },
  {
    id: 2,
    img: "/pharmacy-b.jpg",
    name: "Pharmacy B",
    license: "License B",
    contact: "555-5678",
    address: "456 Elm St, Townsville",
    status: "Inactive",
    rating: 4.0,
    price: "$5.19",
    medicines: ["Medicine C", "Medicine D"],
    categorys: ["Category C", "Category D"],
    description: "Description for Pharmacy B",
    email: "pharmacy-b@example.com",
  },
  {
    id: 3,
    img: "/pharmacy-c.jpg",
    name: "Pharmacy C",
    license: "License C",
    contact: "555-8765",
    address: "789 Oak St, Villageville",
    status: "Active",
    rating: 4.8,
    price: "$5.29",
    medicines: ["Medicine E", "Medicine F"],
    categorys: ["Category E", "Category F"],
    description: "Description for Pharmacy C",
    email: "pharmacy-c@example.com",
  },
  {
    id: 4,
    img: "/pharmacy-d.jpg",
    name: "Pharmacy D",
    license: "License D",
    contact: "555-2345",
    address: "321 Pine St, Countryside",
    status: "Active",
    rating: 4.2,
    price: "$4.79",
    medicines: ["Medicine G", "Medicine H"],
    categorys: ["Category G", "Category H"],
    description: "Description for Pharmacy D",
    email: "pharmacy-d@example.com",
  },
  {
    id: 5,
    img: "/pharmacy-e.jpg",
    name: "Pharmacy E",
    license: "License E",
    contact: "555-6789",
    address: "654 Maple St, Citytown",
    status: "Inactive",
    rating: 4.6,
    price: "$4.89",
    medicines: ["Medicine I", "Medicine J"],
    categorys: ["Category I", "Category J"],
    description: "Description for Pharmacy E",
    email: "pharmacy-e@example.com",
},
];


// Backwards compatibility for all importers
export default { medicines, data, pharmaciesData };

// // Cart data for shopping cart page
// export const cartData = [
//   {
//     id: 1,
//     name: "N20 Gas",
//     size: "Small",
//     color: "White",
//     price: 145,
//     quantity: 2,
//     image: "/n20-gas.jpg",
//     selected: true,
//   },
//   {
//     id: 2,
//     name: "Laughing Gas",
//     size: "Medium",
//     color: "Red",
//     price: 180,
//     quantity: 4,
//     image: "/laughing-gas.jpg",
//     selected: true,
//   },
//   {
//     id: 3,
//     name: "Ammonium Gas",
//     size: "Large",
//     color: "Blue",
//     price: 240,
//     quantity: 8,
//     image: "/ammonium-gas.jpg",
//     selected: true,
//   },
// ];
export const mapData = [
  { id: 1, name: "Drugstore.io", price: "$4.99", position: [30.0444, 31.2357] },
  { id: 2, name: "KeyPharmacy", price: "$5.19", position: [29.9773, 31.1325] },
  { id: 3, name: "Nutraxx", price: "$5.29", position: [31.2001, 29.9187] },
];

//data used for ordersmanagement 
export const ordersData = [
      { id: "ORD-001", name: "Aisha Sharma", email: "aisha@example.com", date: "2024-07-28", status: "Delivered", total: "₹1,250.00" },
      { id: "ORD-002", name: "Rajesh Kumar", email: "rajesh@example.com", date: "2024-07-27", status: "Shipped", total: "₹899.50" },
      { id: "ORD-003", name: "Mazen Ahmed", email: "mazen@example.com", date: "2024-07-26", status: "Pending", total: "₹2,100.00" },
      { id: "ORD-004", name: "Lina Ali", email: "lina@example.com", date: "2024-07-25", status: "Processing", total: "₹700.00" },
      { id: "ORD-005", name: "Omar Khaled", email: "omar@example.com", date: "2024-07-24", status: "Delivered", total: "₹1,050.00" },
      { id: "ORD-006", name: "Sarah Mohamed", email: "sarah@example.com", date: "2024-07-23", status: "Cancelled", total: "₹1,200.00" },
      { id: "ORD-007", name: "Kareem Nabil", email: "kareem@example.com", date: "2024-07-22", status: "Processing", total: "₹880.00" },
      { id: "ORD-008", name: "Hana Youssef", email: "hana@example.com", date: "2024-07-21", status: "Pending", total: "₹960.00" },
      { id: "ORD-009", name: "Tarek Hassan", email: "tarek@example.com", date: "2024-07-20", status: "Delivered", total: "₹1,400.00" },
      { id: "ORD-010", name: "Layla Ibrahim", email: "layla@example.com", date: "2024-07-19", status: "Shipped", total: "₹1,300.00" },
      { id: "ORD-011", name: "Noor Samir", email: "noor@example.com", date: "2024-07-18", status: "Delivered", total: "₹1,700.00" },
      { id: "ORD-012", name: "Ahmed Saleh", email: "ahmed@example.com", date: "2024-07-17", status: "Processing", total: "₹1,050.00" },
      { id: "ORD-013", name: "Reem Adel", email: "reem@example.com", date: "2024-07-16", status: "Pending", total: "₹1,180.00" },
      { id: "ORD-014", name: "Nourhan Ali", email: "nourhan@example.com", date: "2024-07-15", status: "Cancelled", total: "₹900.00" },
      { id: "ORD-015", name: "Mina Fady", email: "mina@example.com", date: "2024-07-14", status: "Shipped", total: "₹1,250.00" },
    ];