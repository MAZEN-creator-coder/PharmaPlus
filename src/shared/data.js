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

// Admin page medicine data
export const medicines = [
  { id: 101, name: "Paracetamol 500mg", image: "https://placehold.co/400x400/8b5cf6/ffffff?text=P", category: "Pain Relief", stock: 120, price: 5.99, description: "Effective fever reducer.", status: "Available" },
  { id: 102, name: "Ibuprofen 200mg", image: "https://placehold.co/400x400/f97316/ffffff?text=I", category: "Anti-inflammatory", stock: 8, price: 7.49, description: "For pain and inflammation.", status: "lowStock" },
  { id: 103, name: "Amoxicillin 250mg", image: "https://placehold.co/400x400/ef4444/ffffff?text=A", category: "Antibiotics", stock: 0, price: 12.0, description: "Broad spectrum antibiotic.", status: "outOfStock" },
  { id: 104, name: "Multivitamin Complex", image: "https://placehold.co/400x400/10b981/ffffff?text=M", category: "Supplements", stock: 45, price: 9.99, description: "Complete daily vitamin and mineral supplement.", status: "Available" },
  { id: 105, name: "Night-time Cough Syrup", image: "https://placehold.co/400x400/06b6d4/ffffff?text=C", category: "Cold & Flu", stock: 15, price: 6.25, description: "Non-drowsy formula for persistent coughs.", status: "Available" },
  { id: 106, name: "Allergy Relief 10mg", image: "https://placehold.co/400x400/f59e0b/ffffff?text=AL", category: "Allergy", stock: 3, price: 10.5, description: "24-hour allergy symptom relief.", status: "lowStock" }
];

// Backwards compatibility for all importers
export default { medicines, data };

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
