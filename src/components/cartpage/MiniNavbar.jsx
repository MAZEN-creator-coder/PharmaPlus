import { motion } from "framer-motion";
import styles from "./MiniNavbar.module.css";

export default function MiniNavbar({ currentStep, maxStep = 1, onStepClick }) {
  const steps = [
    { id: 1, title: "Shopping Cart" },
    { id: 2, title: "Checkout Details" },
    { id: 3, title: "Order Complete" },
  ];

  return (
    <div className={styles.miniNavbar}>
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          className={`${styles.step} ${
            currentStep === step.id ? styles.active : ""
          } ${currentStep > step.id ? styles.completed : ""} ${step.id>maxStep? styles.disabled: ''}`}
          onClick={() => step.id<=maxStep && onStepClick(step.id)}
          whileHover={{}}
          whileTap={{}}
          transition={{ duration: 0.15 }}
        >
          <motion.div 
            className={styles.stepNumber}
            initial={{ scale: 1 }}
            animate={{ 
              scale: 1,
              rotate: currentStep > step.id ? 0 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            {currentStep > step.id ? "✓" : step.id}
          </motion.div>
          <span className={styles.stepTitle}>{step.title}</span>
        </motion.div>
      ))}

      {/* خط السلايدر مع انيميشن */}
      <motion.div
        className={styles.underline}
        initial={{ left: "0%", width: "0%" }}
        animate={{
          left: `${(currentStep - 1) * (100 / steps.length)}%`,
          width: `${100 / steps.length}%`,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </div>
  );
}
