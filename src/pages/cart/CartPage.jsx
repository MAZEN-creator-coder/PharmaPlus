import { useState } from "react";
import MiniNavbar from "../../components/cartpage/MiniNavbar";
import styles from "./CartPage.module.css";

// المحتوى الخاص بكل تاب
import ShoppingCart from "../../components/cartpage/ShoppingCart";
import CheckoutDetails from "../../components/cartpage/CheckoutDetails";
import OrderComplete from "../../components/cartpage/OrderComplete";

export default function CartPage() {
  const [currentStep, setCurrentStep] = useState(1); // تحديد التاب النشط

  // تغيير التاب النشط عند الضغط
  const handleStepClick = (id) => {
    setCurrentStep(id);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Shopping Cart</h1>
        <p className={styles.subtitle}>Your medicine is waiting for you</p>
      </header>

      {/* تمرير currentStep و handleStepClick إلى MiniNavbar */}
      <div className={styles.miniNavbarContainer}>
        <MiniNavbar currentStep={currentStep} onStepClick={handleStepClick} />
      </div>

      {/* عرض المحتوى بناءً على التاب النشط */}
      <div className={styles.content}>
        {currentStep === 1 && <ShoppingCart />}
        {currentStep === 2 && <CheckoutDetails />}
        {currentStep === 3 && <OrderComplete />}
      </div>
    </div>
  );
}
