import React, { useContext } from "react";
import styles from "./ComponentSearch.module.css";
import { ProductContext } from "../../../context/ProductContext";
import { SlLocationPin } from "react-icons/sl";

const MedicineCard = ({ medicine }) => {
  const { selectedProducts, toggleProduct ,getSelectedCount} = useContext(ProductContext);

  const isAdded = selectedProducts.some(p => p.id === medicine.id);

  return (
    <div className={styles.medicineCard}>
      <div className={styles.header}>
  <div className={styles.medicineDetails}>
    <img
      src={medicine.medicineImage}
      alt={medicine.name}
      className={styles.medicineImage}
    />
    <div>
      <p>{medicine.name}</p>
      <p className={styles.category}>{medicine.category}</p>
    </div>
  </div>

  <button
    className={styles.addToCartButton}
    onClick={() => toggleProduct(medicine)}
  >
    {isAdded ? "Added" : "Add to Cart"}
  </button>
</div>


      <div className={styles.medicineInfo}>
        <div className={styles.inventory}>
          <span className={styles.price}>${medicine.price}</span>
          <span className={styles[medicine.status]}>{medicine.status}</span>
        </div>
        <span className={styles.distance}>
          <SlLocationPin />
          {medicine.distance}
        </span>
      </div>
    </div>
  );
};

export default MedicineCard;
