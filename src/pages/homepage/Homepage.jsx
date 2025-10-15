import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Offers from "./components/Offers";
import About from "./components/About";
import Partners from "./components/Partners";
import Footer from "./components/Footer";
import CursorEffect from "./components/CursorEffect";
import styles from "./Homepage.module.css";

export default function Homepage() {
  useEffect(() => {
    // Optional: show login modal if URL has #login or #register
  }, []);

  return (
    <>
      <CursorEffect />
      <main className={styles.main}>
        <Hero />
        <section id="products">
          <Products />
        </section>
        <section id="offers">
          <Offers />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="partners">
          <Partners />
        </section>
      </main>
      <Footer />
    </>
  );
}
