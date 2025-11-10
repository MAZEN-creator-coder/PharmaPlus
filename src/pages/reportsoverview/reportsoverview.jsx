import React, { useState } from "react";
import styles from "./reportsoverview.module.css";
import SummaryCards from "./components/SummaryCards/SummaryCards";
import ReportsFilter from "./components/ReportsFilter/ReportsFilter";
import ReportsTable from "./components/ReportsTable/ReportsTable";
import { reportsData } from "./data";
import ExportAlert from "./components/ExportAlert/ExportAlert"; // ✅ أضفنا مكون التنبيه

export default function ReportsOverview() {
  // ✅ الحالة الأساسية
  const [reports, setReports] = useState(reportsData);
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ حالة ظهور التنبيه
  const [showAlert, setShowAlert] = useState(false);

  // 🔍 البحث
  const handleSearch = (query) => setSearchQuery(query);

  // 🔽 الفلترة
  const handleFilterChange = (value) => setFilterType(value);

  // 🧮 فلترة البيانات حسب البحث والفلتر
  const filteredReports = reports.filter((r) => {
    const matchesFilter = filterType ? r.type === filterType : true;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.pharmacy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 📤 تصدير كل التقارير
  const handleExportAll = () => {
    console.log("Exporting all reports...");
    setShowAlert(true); // ✅ أظهر التنبيه
  };

  // ❌ حذف تقرير
  const handleDelete = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className={styles.container}>
      {/* 🧾 العنوان */}
      <h1 className={styles.title}>Reports Overview</h1>
      <p className={styles.subtitle}>
        Generate and manage detailed reports on pharmacies, sales, and compliance across the MediConnect platform.
      </p>

      {/* 📊 الكروت */}
      <SummaryCards reports={reports} />

      {/* 🔍 فلترة وبحث وتصدير */}
      <ReportsFilter
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onExport={handleExportAll}
      />

      {/* 📋 جدول التقارير */}
      <ReportsTable reports={filteredReports} onDelete={handleDelete} />

      {/* ⚠️ التنبيه */}
      {showAlert && (
        <ExportAlert
          type="success"
          message="✅ Reports exported successfully!"
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
