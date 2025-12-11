import React, { useEffect } from "react";
import styles from "./ExportAlert.module.css";
import { CheckCircle, AlertTriangle, FileText } from "lucide-react";

export default function ExportAlert({ type = "success", message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500); 
    return () => clearTimeout(timer);
  }, [onClose]);

  const renderIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className={`${styles.icon} ${styles.success}`} />;
      case "error":
        return <AlertTriangle className={`${styles.icon} ${styles.error}`} />;
      default:
        return <FileText className={`${styles.icon} ${styles.info}`} />;
    }
  };

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {renderIcon()}
      <p>{message}</p>
    </div>
  );
}
