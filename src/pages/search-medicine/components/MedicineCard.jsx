import React, { useContext } from "react";
import styles from "./ComponentSearch.module.css";
import { ProductContext } from "../../../context/productContext";
import { SlLocationPin } from "react-icons/sl";

const MedicineCard = ({ medicine }) => {
  console.log(medicine);
  const { selectedProducts, toggleProduct, getSelectedCount } = useContext(ProductContext);

  // استخدام _id من API بدلاً من id
  const medicineId = medicine._id || medicine.id;
  const isAdded = selectedProducts.some(p => (p._id || p.id) === medicineId);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // منع تمرير الحدث للأعلى
    e.preventDefault();
    toggleProduct({
      ...medicine,
      id: medicineId, // تأكد من وجود id للتوافق
    });
  };
console.log('Selected Products:', medicine);
  return (
    <div className={styles.medicineCard}>
      <div className={styles.header}>
        <div className={styles.medicineDetails}>
          <img
            src={`http://localhost:3000/${medicine.medicineImage}`}
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
          onClick={handleAddToCart}
          onMouseDown={(e) => e.preventDefault()} // منع التحديد
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
          {medicine.distance ? `${medicine.distance.toFixed(2)} m` : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default MedicineCard;
