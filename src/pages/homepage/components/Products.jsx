import React from "react";
import styles from "./Products.module.css";

const products = [
  {
    id: 1,
    name: "Aspirin 100mg",
    price: "$12.99",
    image: "/aspirin.jpg",
    description: "Pain relief and anti-inflammatory"
  },
  {
    id: 2,
    name: "Paracetamol 500mg",
    price: "$8.99",
    image: "/paracetamol.jpg",
    description: "Fever reducer and pain relief"
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    price: "$15.99",
    image: "/vitaminc.jpg",
    description: "Immune system support"
  }
];

export default function Products() {
  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.productsGrid}>
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productFooter}>
                  <span className={styles.price}>{product.price}</span>
                  <button className={styles.addToCartBtn}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

