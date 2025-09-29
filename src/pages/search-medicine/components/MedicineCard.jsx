import React,{use, useState} from "react";
import styles from "./ComponentSearch.module.css";
import { SlLocationPin } from "react-icons/sl";

const MedicineCard = ({ medicine }) => {
  const [status,setStatus]=useState(medicine.status); 

  return (
    <div className={styles.medicineCard}>
      <div className={styles.header}>
        <img
          src={medicine.medicineImage}
          alt={medicine.name}
          className={styles.medicineImage}
        />
        <div className={styles.medicineDetails}>
          <p>{medicine.name}</p>
          <p className={styles.category}>{medicine.category}</p>
        </div>
      </div>
      <div className={styles.medicineInfo}>
        <div className={styles.inventory}>
          <span className={styles.price}>${medicine.price}</span>
          <span className={styles[status]}>{medicine.status}</span>
        </div>
        <span className={styles.distance}><SlLocationPin />{medicine.distance}</span>
      </div>
    </div>
  );
};

export default MedicineCard;
