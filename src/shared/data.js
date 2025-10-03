export const data=[
    {
      name: "Aspirin",
      medicineImage: "/aspirin.jpg",
      price: 100,
      status: "Available",
      distance: "2.5km",
      category: "teblets",
      pharmacy: "Pharmacy A",
      description:"this is aspirin"
    },
    {
      name: "Paracetamol",
      medicineImage: "/paracetamol.jpg",
      price: 100,
      status: "lowStock",
      distance: "2.5km",
      category: "capsules",
    pharmacy: "Pharmacy A",
      description:"this is aspirin"
      
    },
    {
      name: "Vitamin C",
      medicineImage: "/vitaminc.jpg",
      price: 100,
      status: "outOfStock",
      distance: "3km",
      category: "drink",
       pharmacy: "Pharmacy A",
         description:"this is aspirin"
    },
    {
      name: "Vitamin C",
      medicineImage: "/vitaminc.jpg",
      price: 100,
      status: "outOfStock",
      distance: "3km",
      category: "drink",
       pharmacy: "Pharmacy A",
         description:"this is aspirin"
    }
  ]; // Will be populated from API

// Cart data for shopping cart page
export const cartData = [
  {
    id: 1,
    name: "N20 Gas",
    size: "Small",
    color: "White",
    price: 145,
    quantity: 2,
    image: "/n20-gas.jpg",
    selected: true
  },
  {
    id: 2,
    name: "Laughing Gas",
    size: "Medium", 
    color: "Red",
    price: 180,
    quantity: 4,
    image: "/laughing-gas.jpg",
    selected: true
  },
  {
    id: 3,
    name: "Ammonium Gas",
    size: "Large",
    color: "Blue", 
    price: 240,
    quantity: 8,
    image: "/ammonium-gas.jpg",
    selected: true
  }
];