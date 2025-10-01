import React from 'react';
import styles from './ComponentSearch.module.css';
import MedicineCard from './MedicineCard';
import {data} from  '../../../shared/data';

const SearchResults = () => {
  // const medicines = [
  //   {
  //     name: "Aspirin",
  //     medicineImage: "/aspirin.jpg",
  //     price: 100,
  //     status: "Available",
  //     distance: "2.5km",
  //     category: "teblets",
  //     pharmacy: "Pharmacy A",
  //   },
  //   {
  //     name: "Paracetamol",
  //     medicineImage: "/paracetamol.jpg",
  //     price: 100,
  //     status: "lowStock",
  //     distance: "2.5km",
  //     category: "capsules",
  //   },
  //   {
  //     name: "Vitamin C",
  //     medicineImage: "/vitaminc.jpg",
  //     price: 100,
  //     status: "outOfStock",
  //     distance: "3km",
  //     category: "drink",
  //   },
  // ]; // Will be populated from API
  const medicines= data;
  

  return (
    <div className={styles.searchResults}>
      <h2 className={styles.text1}>Search Results</h2>
      <div className={styles.medicineGrid}>
        {medicines.map((medicine, index) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;