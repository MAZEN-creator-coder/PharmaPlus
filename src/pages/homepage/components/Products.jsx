import React from "react";
import styles from "./Products.module.css";


import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const products = [
  { id: 1, name: "Aspirin 100mg", price: "$12.99", image: "/aspirin.jpg", description: "Pain relief and anti-inflammatory", rating: 4.5 },
  { id: 2, name: "Paracetamol 500mg", price: "$8.99", image: "/paracetamol.jpg", description: "Fever reducer and pain relief", rating: 4 },
  { id: 3, name: "Vitamin C 1000mg", price: "$15.99", image: "/vitaminc.jpg", description: "Immune system support", rating: 5 },
  { id: 4, name: "Ibuprofen 200mg", price: "$10.49", image: "/ibuprofen.jpg", description: "Reduces inflammation and pain", rating: 4 },
  { id: 5, name: "Zinc Supplements", price: "$9.99", image: "/zinc.jpg", description: "Boosts immunity & improves skin health", rating: 4.5 },
  { id: 6, name: "Omega 3 Fish Oil", price: "$18.50", image: "/omega3.jpg", description: "Supports heart & brain function", rating: 5 },
  { id: 7, name: "Moisturizing Skin Cream", price: "$14.25", image: "/skincream.jpg", description: "Deep hydration for dry and sensitive skin", rating: 4 },
  { id: 8, name: "Antibacterial Hand Gel", price: "$5.99", image: "/handgel.jpg", description: "Kills 99.9% of germs instantly", rating: 4 },
  { id: 9, name: "Vitamin D3 5000IU", price: "$13.75", image: "/vitamind3.jpg", description: "Supports bone health and immune function", rating: 5 },
];

export default function Products() {
  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3} 
          spaceBetween={30}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className={styles.sliderWrapper}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className={styles.slide}>
              <div className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </div>

                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>

                  <div className={styles.rating}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.round(product.rating)
                            ? styles.starFilled
                            : styles.starEmpty
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className={styles.productDescription}>{product.description}</p>

                  <div className={styles.productFooter}>
                    <span className={styles.price}>{product.price}</span>
                    <button className={styles.addToCartBtn}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
