import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <img src="/src/assets/img/Logo.png" alt="PharmaPlus" />
            </div>
            <p className={styles.description}>
              Your trusted pharmacy partner for quality medications and healthcare services.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>📘</a>
              <a href="#" className={styles.socialLink}>📷</a>
              <a href="#" className={styles.socialLink}>🐦</a>
              <a href="#" className={styles.socialLink}>💼</a>
            </div>
          </div>
          
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Quick Links</h4>
              <ul className={styles.linkList}>
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Services</h4>
              <ul className={styles.linkList}>
                <li><a href="#">Prescription Delivery</a></li>
                <li><a href="#">Health Consultations</a></li>
                <li><a href="#">Medicine Search</a></li>
                <li><a href="#">Emergency Care</a></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Support</h4>
              <ul className={styles.linkList}>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2024 PharmaPlus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

