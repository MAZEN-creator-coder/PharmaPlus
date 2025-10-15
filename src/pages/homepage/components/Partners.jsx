import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./Partners.module.css"; // استيراد الموديول

export default function Partners() {
  useScrollReveal(`.${styles.logos} img`); // تأثير الظهور على الصور

  const logos = [
    { id: 1, src: "https://dummyimage.com/160x60/ebf8ff/0b5d8f&text=MediCare", alt: "MediCare Logo" },
    { id: 2, src: "https://dummyimage.com/160x60/e6fffa/0b8f74&text=HealthHub", alt: "HealthHub Logo" },
    { id: 3, src: "https://dummyimage.com/160x60/edfdf4/2b9348&text=PharmaPlus", alt: "PharmaPlus Logo" },
    { id: 4, src: "https://dummyimage.com/160x60/f0f7ff/2563eb&text=WellCare", alt: "WellCare Logo" },
  ];

  return (
    <section id="partners" className={`${styles.partners} section`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Famous Pharmacies</h2>
        <div className={styles.logos}>
          {logos.map(logo => (
            <img key={logo.id} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
