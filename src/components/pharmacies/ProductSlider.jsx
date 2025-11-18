import React, { useContext, useState, useRef } from "react";
import styles from "./ProductSlider.module.css";
import { ProductContext } from "../../context/productContext";
import Toast from "../common/Toast";

function ProductCard({
  product,
  onAdd,
  pharmacy,
  onQuantityChange,
  showToast,
}) {
  const { selectedProducts, cartItems } = useContext(ProductContext);
  const productId = product._id || product.id;
  const isAdded = selectedProducts.some((p) => (p._id || p.id) === productId);

  const cartItem = cartItems.find(
    (item) => (item._id || item.id) === productId
  );
  const quantity = cartItem?.quantity || 1;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:3000/${product.medicineImage}`}
          alt={product.name}
          className={styles.img}
        />
        {product.status && (
          <span className={`${styles.status} ${styles[product.status]}`}>
            {product.status}
          </span>
        )}
        {product.stock === 0 && (
          <div className={styles.outOfStockOverlay}>Out of stock</div>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        {product.category && (
          <div className={styles.category}>{product.category}</div>
        )}

        <div className={styles.priceRow}>
          <div className={styles.price}>${(product.price || 0).toFixed(2)}</div>
          {pharmacy?.rating > 0 && (
            <div className={styles.rating}>⭐ {pharmacy.rating.toFixed(1)}</div>
          )}
        </div>

        <div className={styles.stockInfo}>
          Stock: <span className={styles.stockValue}>{product.stock || 0}</span>{" "}
          available
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.addBtn} ${isAdded ? styles.added : ""}`}
            onClick={() => {
              if (product.stock != null && product.stock < 1) {
                if (typeof showToast === "function")
                  showToast({
                    message: "Product is out of stock",
                    type: "error",
                  });
                return;
              }
              onAdd(product);
            }}
            disabled={product.stock != null && product.stock < 1}
          >
            {product.stock != null && product.stock < 1
              ? "Out of stock"
              : isAdded
              ? "Added"
              : "Add to Cart"}
          </button>

          {isAdded && (
            <div className={styles.quantityControl}>
              <button
                className={styles.qtyBtn}
                onClick={() => onQuantityChange(productId, quantity - 1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => {
                  // Prevent increasing beyond stock
                  if (product.stock != null && quantity + 1 > product.stock) {
                    if (typeof showToast === "function")
                      showToast({
                        message: "Reached maximum stock",
                        type: "error",
                      });
                    return;
                  }
                  onQuantityChange(productId, quantity + 1);
                }}
                disabled={product.stock != null && quantity >= product.stock}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductSlider({
  products = [],
  isLoading = false,
  pharmacy = {},
}) {
  const { toggleProduct, updateQuantity } = useContext(ProductContext);
  const [toast, setToast] = useState(null);
  const trackRef = useRef(null);

  const scrollByWidth = (direction = "right") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth - 40; // scroll by visible width minus some gap
    const left = direction === "right" ? amount : -amount;
    track.scrollBy({ left, behavior: "smooth" });
  };

  const handleAdd = (product) => {
    const normalized = { ...product, id: product.id || product._id };
    toggleProduct(normalized);

    setToast({
      message: `${product.name} added to cart!`,
      type: "success",
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  if (isLoading)
    return <div className={styles.loading}>Loading products...</div>;
  if (!products || products.length === 0)
    return <div className={styles.empty}>No products</div>;

  return (
    <>
      <div className={styles.slider}>
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={() => scrollByWidth("left")}
          aria-label="Previous"
        >
          ‹
        </button>
        <div className={styles.track} ref={trackRef}>
          {products.map((p) => (
            <ProductCard
              key={p._id || p.id}
              product={p}
              onAdd={handleAdd}
              pharmacy={pharmacy}
              onQuantityChange={handleQuantityChange}
              showToast={(t) => setToast(t)}
            />
          ))}
        </div>
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={() => scrollByWidth("right")}
          aria-label="Next"
        >
          ›
        </button>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
