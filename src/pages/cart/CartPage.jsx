import { useState } from "react";
import MiniNavbar from "../../components/cartpage/MiniNavbar";
import styles from "./CartPage.module.css";

// Components for each step
import ShoppingCart from "../../components/cartpage/ShoppingCart";
import CheckoutDetails from "../../components/cartpage/CheckoutDetails";
import OrderComplete from "../../components/cartpage/OrderComplete";

export default function CartPage() {
  const [currentStep, setCurrentStep] = useState(1); const [maxStep, setMaxStep] = useState(1); 
  const handleStepClick = (id) => {
    if (id <= maxStep) setCurrentStep(id);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Shopping Cart</h1>
        <p className={styles.subtitle}>Your medicine is waiting for you</p>
      </header>

      <div className={styles.miniNavbarContainer}>
        <MiniNavbar currentStep={currentStep} maxStep={maxStep} onStepClick={handleStepClick} />
      </div>

      <div className={styles.content}>
        {currentStep === 1 && (
          <ShoppingCart onGoToCheckout={() => { setMaxStep(2); setCurrentStep(2); }} />
        )}
        {currentStep === 2 && (
          <CheckoutDetails 
            onPlaceOrder={() => { setMaxStep(3); setCurrentStep(3); }} 
            onBack={() => setCurrentStep(1)} 
          />
        )}
        {currentStep === 3 && <OrderComplete onBackToHome={() => setCurrentStep(1)} />}
      </div>
    </div>
  );
}
