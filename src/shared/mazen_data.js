// Original data used by search 
//اربط الادوية الصيدليات 
export const data = [
  {
    id: 1,
    //done
    name: "Aspirin",
    //done
    medicineImage: "/aspirin.jpg",
    //done
    price: 100,
    //done
    status: "Available",
    //done
    distance: "2.5km",
    //calculated in front by pharmacy location
    category: "teblets",
    //done
    pharmacy: "Pharmacy A",
    description: "this is aspirin",
    //done

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
];

// PharmacyMap data 
export const mapData = [
  { id: 1, name: "Drugstore.io", price: "$4.99", position: [30.0444, 31.2357] },
  { id: 2, name: "KeyPharmacy", price: "$5.19", position: [29.9773, 31.1325] },
  { id: 3, name: "Nutraxx", price: "$5.29", position: [31.2001, 29.9187] },
];
//================================

//chat data 
//number of unread messages per chat
unreadCounts={
  alice: 3,
    bob: 2,
    charlie: 0,
    diana: 0,
    eve: 0,
};
//all messages per chat
allMessages={
    alice: [
      {
        id: 1,
        text: 'Hi, I have a question about my recent order #12345.',
        time: '10:00 AM',
        sender: 'other',
      },
      
      {
        id: 2,
        text: 'Hello Alice! How can I help you?',
        time: '10:05 AM',
        sender: 'me',
      },
      {
        id: 3,
        text: 'Is it possible to change the delivery address?',
        time: '10:10 AM',
        sender: 'other',
      },
      {
        id: 4,
        text: 'Let me check for you. Please provide the new address.',
        time: '10:15 AM',
        sender: 'me',
      },
      {
        id: 5,
        text: "It's 123 Main St, Anytown. Thank you for the update!",
        time: '10:30 AM',
        sender: 'other',
      }, 
    ],
    bob: [
      {
        id: 1,
        text: 'Can you send me the invoice for order #67890?',
        time: 'Yesterday',
        sender: 'other',
      },
      {
        id: 2,
        text: 'Sure, I\'ll send it over.',
        time: 'Yesterday',
        sender: 'me',
      }
    ],
  charlie: [
      {
        id: 1,
        text: 'Can you send me the invoice for order #67890?',
        time: 'Yesterday',
        sender: 'other',
      },
      {
        id: 2,
        text: 'Sure, I\'ll send it over.',
        time: 'Yesterday',
        sender: 'me',
      }
    ]
  };
 //all conversation 
  conversations = [
    {
      id: 'alice',
      name: 'Alice Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Thank you for the update!',
      time: '10:30 AM',
    },
    {
      id: 'bob',
      name: 'Bob Smith',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'Sure, I\'ll send it over.',
      time: 'Yesterday',
    },
    {
      id: 'charlie',
      name: 'Charlie Brown',
      avatar: 'https://i.pravatar.cc/150?img=13',
      lastMessage: 'Okay, I understand.',
      time: 'Mon',
    },
    {
      id: 'diana',
      name: 'Diana Prince',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Thanks for the quick response!',
      time: 'Last Week',
    },
    {
      id: 'eve',
      name: 'Eve Adams',
      avatar: 'https://i.pravatar.cc/150?img=9',
      lastMessage: 'Yes, that works for me.',
      time: 'Last Month',
    },
  ]; 
//============================

// Prescription upload data
const mockFiles = [
  {
    id: "1",
    name: "Prescription_20240726.pdf",
    status: "reviewed",
    date: "Jul 26, 2024 10:30 AM",
  },
  {
    id: "2",
    name: "RX_Antibiotics_Dr_Smith.jpg",
    status: "processing",
    date: "Jul 25, 2024 03:15 PM",
  },
  {
    id: "3",
    name: "Eye_Drops_Refill.png",
    status: "pending",
    date: "Jul 25, 2024 08:00 AM",
  },
];
//============================
//SUPER ADMIN GLOBAL ANALYTICS DATA
const dashboardData = {
  meta: {
    generatedAt: "2025-11-10T14:30:00Z", // وقت توليد التقرير من السيرفر
    reportTitle: "Global Analytics Overview",
  },

  platformSummary: {
    totalUsers: 9500,
    userGrowthPercentage: 9,       // نسبة النمو الشهرية %
    totalRevenue: 392000,          // مجموع الإيرادات بالدولار
    revenueGrowthPercentage: 30,   // نسبة النمو الشهرية %
    activePharmacies: 2,
    pharmacyGrowthPercentage: 8,   // نمو عدد الصيدليات النشطة %
    avgOrderValue: 78,
    avgOrderChangePercentage: -5,  // نسبة الانخفاض الشهري
    totalServed: 21255,
  },

  userGrowth: [
    { month: "Feb", users: 3000 },
    { month: "Mar", users: 3500 },
    { month: "Apr", users: 4200 },
    { month: "May", users: 4800 },
    { month: "Jun", users: 5200 },
    { month: "Jul", users: 5800 },
    { month: "Aug", users: 6500 },
    { month: "Sep", users: 7200 },
    { month: "Oct", users: 8000 },
    { month: "Nov", users: 8800 },
    { month: "Dec", users: 9500 },
  ],

  revenueDistribution: [
    { name: "Prescription", value: 45 },
    { name: "OTC Products", value: 25 },
    { name: "Wellness & Supplements", value: 20 },
    { name: "Devices", value: 10 },
  ],

  topPharmacies: [
    { name: "Pharmacy A", sales: 95000 },
    { name: "Pharmacy B", sales: 88000 },
    { name: "Pharmacy C", sales: 82000 },
    { name: "Pharmacy D", sales: 75000 },
    { name: "Main St", sales: 68000 },
  ],

  pharmacies: [
    {
      id: 1,
      name: "Medicare Pharmacy",
      location: "New York, USA",
      status: "Active",
      sales: 92000,
      served: 5005,
      avgPerUser: 18,
    },
    {
      id: 2,
      name: "City Center Drugs",
      location: "Los Angeles, USA",
      status: "Pending",
      sales: 85000,
      served: 4800,
      avgPerUser: 17,
    },
    {
      id: 3,
      name: "Pharmacare Supplies",
      location: "London, UK",
      status: "Active",
      sales: 78000,
      served: 4200,
      avgPerUser: 18,
    },
    {
      id: 4,
      name: "Green Rx Solutions",
      location: "Berlin, DE",
      status: "Pending",
      sales: 70000,
      served: 3850,
      avgPerUser: 18,
    },
    {
      id: 5,
      name: "Sunset Health",
      location: "Sydney, AUS",
      status: "Suspended",
      sales: 65000,
      served: 3400,
      avgPerUser: 19,
    },
  ],

  pharmacyStatusSummary: {
    active: 2,
    pending: 2,
    suspended: 1,
  },
};
// اللي ناقص فيه ال orders
//قول لعمرو يغير اسم  customer  -> name
//لازم اضيف الايميل  عشان الادمن
//اربط كل order بالصيدلية بتاعتها 
//اربط كل order باليوزر بتاعتها
//  orders= [
//     {
//       id: "ORD-001",
//       //done
//       name: "Aisha Sharma",
//       //done
//       date: "2024-07-28",
//       //done
//       status: "Delivered",
//       //done
//       total: "₹1,250.00",
//       //done
//       paymentMethod: "Card",
//         addresses: 
//     {
//       street: "12 Nile St",
//       city: "Cairo",
//       additionalDirections: "Near the central park",
//       postalCode: "11511",
//       phone: "+20 100 000 0000",
//     },
//       items: [
//         {
//           id: 1,
//           name: "Aspirin",
//           medicineImage: "/aspirin.jpg",
//           price: 100,
//           status: "Available",
//           distance: "2.5km",
//           category: "teblets",
//           pharmacy: "Pharmacy A",
//           description: "this is aspirin",
//           quantity: 2,
//         },
//       ]
//     },



