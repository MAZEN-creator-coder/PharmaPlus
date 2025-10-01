import { motion } from "framer-motion";
import styles from "./MiniNavbar.module.css";

export default function MiniNavbar({ currentStep, onStepClick }) {
  const steps = [
    { id: 1, title: "Shopping Cart" },
    { id: 2, title: "Checkout Details" },
    { id: 3, title: "Order Complete" },
  ];

  return (
    <div className={styles.miniNavbar}>
      {steps.map((step) => (
        <div
          key={step.id}
          className={`${styles.step} ${
            currentStep === step.id ? styles.active : ""
          }`}
          onClick={() => onStepClick(step.id)} // عند الضغط على التاب، نغير currentStep
        >
          <div className={styles.stepNumber}>{step.id}</div>
          <span className={styles.stepTitle}>{step.title}</span>
        </div>
      ))}

      {/* خط السلايدر */}
      <motion.div
        className={styles.underline}
        initial={{ left: "0%", width: "0%" }}
        animate={{
          left: `${(currentStep - 1) * (100 / steps.length)}%`,
          width: `${100 / steps.length}%`,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      ></motion.div>
    </div>
  );
}
