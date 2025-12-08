import doctorImage from "../assets/doctors.png";
import React from "react";
import styles from "./Hero.module.css";

function ScrollArrow() {
  return (
    <svg
      className={styles.scrollArrow}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 5v14" stroke="#018994" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 12l-7 7-7-7" stroke="#018994" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScrollDown({ toId = "products" }) {
  const onClick = () => {
    console.debug("ScrollDown clicked, target=", toId);
    const el = document.getElementById(toId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      className={styles.scrollDown}
      onClick={onClick}
      aria-label="Scroll down"
      title="Scroll down"
    >
      <ScrollArrow />
    </button>
  );
}

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Manage Your Pharmacy Smarter</h1>
          <p className={styles.description}>
            PharmaFlow helps you simplify pharmacy management — inventory,
            billing, and prescriptions — all in one secure platform.
          </p>

          <div className={styles.ctaButtons}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                console.debug("Primary Get Started clicked");
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Get Started
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => {
                console.debug("Secondary Learn More clicked");
                document.getElementById("about")?.scrollIntoView({
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

      <div className={styles.scrollWrapper}>
        <ScrollDown toId="products" />
      </div>
    </section>
  );
}
