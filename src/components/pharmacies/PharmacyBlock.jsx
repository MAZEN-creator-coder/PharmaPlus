import React, { useEffect, useState } from "react";
import { getMedicinesByPharmacy } from "../../shared/api/pharmaciesApi";
import ProductSlider from "./ProductSlider";
import styles from "./PharmacyBlock.module.css";
import { FaStar } from "react-icons/fa";
import { ProductContext } from "../../context/productContext";

export default function PharmacyBlock({ pharmacy }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const meds = await getMedicinesByPharmacy(pharmacy._id || pharmacy.id);
        if (mounted) setProducts(meds);
      } catch (err) {
        console.error(
          "Failed to load medicines for pharmacy",
          pharmacy._id,
          err
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [pharmacy]);

  return (
    <section className={styles.block}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>
            {pharmacy.name}
            {typeof pharmacy.rating !== "undefined" && (
              <span
                className={styles.rating}
                title={`Rating ${pharmacy.rating}`}
              >
                <FaStar className={styles.starIcon} /> {pharmacy.rating}
              </span>
            )}
          </h3>
          <p className={styles.meta}>
            {pharmacy.position?.city || pharmacy.address || "No location"}
          </p>
        </div>
        <div className={styles.small}>{pharmacy.status || ""}</div>
      </div>

      <div className={styles.subheader}>
        <small>{pharmacy.description || ""}</small>
      </div>

      <ProductSlider
        products={products}
        isLoading={loading}
        pharmacy={pharmacy}
      />
    </section>
  );
}
