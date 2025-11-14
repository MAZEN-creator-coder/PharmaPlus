import doctorImage from "../assets/doctors.png";
import React, { useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 25; 
    const y = (e.clientY / innerHeight - 0.5) * 25; 
    if (imageRef.current) {
      imageRef.current.style.transform = `
        rotateY(${x}deg)
        rotateX(${-y}deg)
        scale(1.05)
      `;
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = `
        rotateY(0deg)
        rotateX(0deg)
        scale(1)
      `;
    }
  };

  return (
    <section
      id="home"
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Manage Your Pharmacy Smarter</h1>
          <p className={styles.description}>
            PharmaFlow helps you simplify pharmacy management — inventory,
            billing, and prescriptions — all in one secure platform.
          </p>

          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>Get Started</button>
            <button className={styles.secondaryButton}>Learn More</button>
          </div>
        </div>

        <div className={styles.heroImageWrapper}>
          <div className={styles.imageContainer}>
            <img ref={imageRef} src={doctorImage} alt="Doctors" />
          </div>
        </div>
      </div>
    </section>
  );
}
