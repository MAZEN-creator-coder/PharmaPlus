import doctorImage from "../assets/doctors.png";
import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {

  return (
    <section
      id="home"
      className={styles.hero}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Manage Your Pharmacy Smarter</h1>
          <p className={styles.description}>
            PharmaFlow helps you simplify pharmacy management — inventory,
            billing, and prescriptions — all in one secure platform.
          </p>

          <div className={styles.ctaButtons}>

            {/* 🔵 زرار Get Started → ينقلك لمنتجات Products */}
            <button
              className={styles.primaryButton}
              onClick={() => {
                document.getElementById("products").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Get Started
            </button>

            {/* ⚪ زرار Learn More → ينقلك لـ About */}
            <button
              className={styles.secondaryButton}
              onClick={() => {
                document.getElementById("about").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Learn More
            </button>

          </div>
        </div>

        <div className={styles.heroImageWrapper}>
          <div className={styles.imageContainer}>
            <img src={doctorImage} alt="Doctors" />
          </div>
        </div>
      </div>
    </section>
  );
}
