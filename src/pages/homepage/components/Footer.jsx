import React from "react";
import styles from "./Footer.module.css";
import logo from "../../../assets/img/Logo.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import siteConfig from "../../../shared/siteConfig";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <img src={logo} alt="PharmaPlus" />
            </div>
            <p className={styles.description}>
              Your trusted pharmacy partner for quality medications and healthcare services.
            </p>
            <div className={styles.socialLinks}>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="PharmaPlus Facebook (opens in new tab)"
                title="PharmaPlus Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="PharmaPlus Instagram (opens in new tab)"
                title="PharmaPlus Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="PharmaPlus Twitter (opens in new tab)"
                title="PharmaPlus Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="PharmaPlus LinkedIn (opens in new tab)"
                title="PharmaPlus LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Quick Links</h4>
              <ul className={styles.linkList}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li>
                  <Link to={{ pathname: "/", hash: "#about" }}>About Us</Link>
                </li>
                <li>
                  <Link to="/chat">Contact</Link>
                </li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Services</h4>
              <ul className={styles.linkList}>
                <li>
                  <Link to="/upload-prescription">Prescription Delivery</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/", hash: "#about" }}>Health Consultations</Link>
                </li>
                <li>
                  <Link to="/search-medicine">Medicine Search</Link>
                </li>
                <li>
                  <Link to={{ pathname: "/", hash: "#contact" }}>Emergency Care</Link>
                </li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Support</h4>
              <ul className={styles.linkList}>
                <li><Link >Help Center</Link></li>
                <li><Link >Privacy Policy</Link></li>
                <li><Link >Terms of Service</Link></li>
                <li><Link >FAQ</Link></li>
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

