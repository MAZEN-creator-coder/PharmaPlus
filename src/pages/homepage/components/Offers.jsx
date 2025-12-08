import React from "react";
import styles from "./Offers.module.css";

export default function Offers() {

  const offers = [
    {
      id: 1,
      title: "Free Delivery",
      description: "On orders over $50",
      btnText: "Shop Now",
      btnLink: "#products",
      gradientClass: styles.gradientPrimary
    },
    {
      id: 2,
      title: "20% Off",
      description: "First time customers",
      btnText: "View Deals",
      btnLink: "#products",
      gradientClass: styles.gradientSecondary
    },
    {
      id: 3,
      title: "24/7 Support",
      description: "Always here to help",
      btnText: "Learn More",
      btnLink: "#about",
      gradientClass: styles.gradientAccent
    }
  ];

  return (
   <section id="offers" className={styles.offers}>
  <div className={styles.container}>
    <h2 className={styles.sectionTitle}>Special Offers</h2>
    <div className={styles.offersGrid}>
      {offers.map(offer => (
        <article 
          key={offer.id} 
          className={`${styles.offerCard} ${offer.gradientClass}`}
        >
          <div className={styles.offerContent}>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <a 
              href={offer.btnLink} 
              className={`${styles.btn} ${styles.small} ${styles.white}`}
            >
              {offer.btnText}
            </a>
          </div>
        </article>
      ))}
    </div>
  </div>

 
  <div className={styles.marqueeWrapper}>
    <div className={styles.marquee}>
      <p>Free Shipping on First Order!</p>
    </div>
  </div>
</section>

  );
}
