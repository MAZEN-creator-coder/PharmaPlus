import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const PharmacyMap = () => {
  // بيانات الصيدليات: كل واحدة فيها إحداثيات (lat, lng) واسم وسعر
  const pharmacies = [
    { id: 1, name: "Drugstore.io", price: "$4.99", position: [30.0444, 31.2357] }, // القاهرة
    { id: 2, name: "KeyPharmacy", price: "$5.19", position: [29.9773, 31.1325] }, // الجيزة
    { id: 3, name: "Nutraxx", price: "$5.29", position: [31.2001, 29.9187] },    // إسكندرية
  ];

  return (
    <MapContainer center={[30.0444, 31.2357]} zoom={6} style={{ height: "500px", width: "100%" }}>
      {/* ده بيجيب شكل الخريطة الأساسي من OpenStreetMap */}
<TileLayer
  url={`https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=${import.meta.env.VITE_JAWG_TOKEN}`}
  attribution='&copy; <a href="https://www.jawg.io/">Jawg Maps</a>'
/>









      {/* بنعمل ماركر لكل صيدلية */}
      {pharmacies.map((pharmacy) => (
        <Marker key={pharmacy.id} position={pharmacy.position}>
          <Popup>
            <b>{pharmacy.name}</b> <br />
            Price: {pharmacy.price}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default PharmacyMap;
