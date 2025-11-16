import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchMedicine } from "../../../hooks/useSearchMedicine";

// Component to center map on user location
const MapCenter = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 13);
    }
  }, [position, map]);
  
  return null;
};

const PharmacyMap = () => {
  const { userLocation, medicines, searchQuery, fetchUserLocation } = useSearchMedicine();
  const [initialPosition, setInitialPosition] = useState([30.0444, 31.2357]);

  // Get user location on load
  useEffect(() => {
    if (!userLocation) {
      fetchUserLocation();
    } else {
      setInitialPosition([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation, fetchUserLocation]);

  // Extract pharmacies from searched medicines
  const pharmaciesFromMedicines = medicines.map((medicine) => ({
    id: medicine._id,
    name: medicine.pharmacy.name,
    position: [medicine.pharmacy.position.lat, medicine.pharmacy.position.lng],
    medicine: {
      name: medicine.name,
      price: medicine.price,
      image: medicine.medicineImage,
      distance: medicine.distance,
      status: medicine.status,
    },
  }));

  return (
    <MapContainer 
      center={initialPosition} 
      zoom={13} 
      style={{ height: "500px", width: "100%" }}
    >
      {/* OpenStreetMap via Jawg */}
      <TileLayer
        url={`https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=${import.meta.env.VITE_JAWG_TOKEN}`}
        attribution='&copy; <a href="https://www.jawg.io/">Jawg Maps</a>'
      />

      {/* Center map on user location */}
      {userLocation && <MapCenter position={userLocation} />}

      {/* User's current location marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>
            <b>📍 Your Current Location</b>
          </Popup>
        </Marker>
      )}

      {/* Pharmacy markers from search results */}
      {pharmaciesFromMedicines.length > 0 ? (
        pharmaciesFromMedicines.map((pharmacy) => (
          <Marker key={pharmacy.id} position={pharmacy.position}>
            <Popup>
              <div style={{ minWidth: "250px" }}>
                <h3 style={{ margin: "0 0 10px 0" }}>{pharmacy.name}</h3>
                <div style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}>
                  <p style={{ margin: "5px 0" }}>
                    <b>💊 Medicine:</b> {pharmacy.medicine.name}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <b>💰 Price:</b> {pharmacy.medicine.price} EGP
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <b>📏 Distance:</b> {pharmacy.medicine.distance?.toFixed(2)} m
                  </p>
                  <p style={{ 
                    margin: "5px 0",
                    color: pharmacy.medicine.status === "Available" ? "green" : "red"
                  }}>
                    <b>📦 Status:</b> {pharmacy.medicine.status}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))
      ) : (
        searchQuery && (
          <div style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            zIndex: 1000
          }}>
            <p>🔍 No pharmacies found for this medicine</p>
          </div>
        )
      )}
    </MapContainer>
  );
};

export default PharmacyMap;
