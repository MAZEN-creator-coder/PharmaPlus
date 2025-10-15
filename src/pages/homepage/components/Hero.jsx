import React from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Manage Your Pharmacy Smarter
          </h1>
          <p className={styles.description}>
            PharmaFlow helps you simplify pharmacy management — inventory, billing, and prescriptions — all in one secure platform.
          </p>

          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton} onClick={scrollTo("products")}>
              Get Started
            </button>
            <button className={styles.secondaryButton} onClick={scrollTo("about")}>
              Learn More
            </button>
          </div>

          <div className={styles.scrollWrapper}>
            <button className={styles.scrollDown} onClick={scrollTo("products")}>
              <span>↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
