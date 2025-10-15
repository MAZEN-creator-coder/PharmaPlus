import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./About.module.css"; // CSS Module الخاص بالـ About

export default function About() {
  useScrollReveal();

  return (
    <section id="about" className={`${styles.aboutSection} reveal`}>
      <div className={styles.container}>
        <h2 className={`${styles.aboutTitle} reveal`}>About PharmaPlus</h2>

        <p className={`${styles.aboutLead} reveal`}>
          We are a trusted pharmacy committed to providing high-quality medications 
          and healthcare services to our community. With over 20 years of experience, 
          we ensure that every customer receives personalized care and professional advice.
        </p>

        <div className={styles.aboutGrid}>
          <div className={`${styles.aboutItem} reveal`}>
            <div className={styles.icon} aria-hidden="true">🏥</div>
            <h3 className={styles.aboutSubtitle}>Licensed Professionals</h3>
            <p>Certified pharmacists and healthcare experts</p>
          </div>

          <div className={`${styles.aboutItem} reveal`}>
            <div className={styles.icon} aria-hidden="true">💊</div>
            <h3 className={styles.aboutSubtitle}>Quality Medications</h3>
            <p>Only FDA-approved and authentic products</p>
          </div>

          <div className={`${styles.aboutItem} reveal`}>
            <div className={styles.icon} aria-hidden="true">🚀</div>
            <h3 className={styles.aboutSubtitle}>Fast Delivery</h3>
            <p>Same-day delivery available in your area</p>
          </div>
        </div>
      </div>
    </section>
  );
}
