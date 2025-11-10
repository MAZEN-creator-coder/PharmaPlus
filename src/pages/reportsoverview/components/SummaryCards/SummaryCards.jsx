import React from "react";
import styles from "./SummaryCards.module.css";
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function SummaryCards({ reports }) {
  // 🧮 حساب القيم
  const total = reports.length;
  const pending = reports.filter(r => r.status === "Review").length;
  const failed = reports.filter(r => r.status === "Failed").length;
  const avgScore = 92; // مثال لقيمة ثابتة (تقدر تحسبها ديناميكي بعدين)

  return (
    <div className={styles.cardsContainer}>
      {/* 🧾 إجمالي التقارير */}
      <div className={`${styles.card} ${styles.total}`}>
        <FileText className={styles.icon} />
        <div>
          <h3>Total Reports</h3>
          <p>{total}</p>
          <span>Generated in last 30 days</span>
        </div>
      </div>

      {/* ✅ متوسط النتائج */}
      <div className={`${styles.card} ${styles.success}`}>
        <CheckCircle className={styles.icon} />
        <div>
          <h3>Avg. Compliance Score</h3>
          <p>{avgScore}%</p>
          <span>Across all pharmacies</span>
        </div>
      </div>

      {/* ⏳ التقارير المعلقة */}
      <div className={`${styles.card} ${styles.pending}`}>
        <Clock className={styles.icon} />
        <div>
          <h3>Pending Reviews</h3>
          <p>{pending}</p>
          <span>Reports awaiting action</span>
        </div>
      </div>

      {/* ⚠️ التنبيهات المهمة */}
      <div className={`${styles.card} ${styles.alert}`}>
        <AlertTriangle className={styles.icon} />
        <div>
          <h3>High Priority Alerts</h3>
          <p>{failed}</p>
          <span>Requiring immediate attention</span>
        </div>
      </div>
    </div>
  );
}
