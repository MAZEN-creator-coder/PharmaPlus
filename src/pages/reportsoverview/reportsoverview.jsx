import React, { useState } from "react";
import styles from "./reportsoverview.module.css";
import SummaryCards from "./components/SummaryCards/SummaryCards";
import ReportsFilter from "./components/ReportsFilter/ReportsFilter";
import ReportsTable from "./components/ReportsTable/ReportsTable";
import { reportsData } from "./data";
import ExportAlert from "./components/ExportAlert/ExportAlert"; 

export default function ReportsOverview() {

  const [reports, setReports] = useState(reportsData);
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = (query) => setSearchQuery(query);

  const handleFilterChange = (value) => setFilterType(value);

  const filteredReports = reports.filter((r) => {
    const matchesFilter = filterType ? r.type === filterType : true;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.pharmacy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportAll = () => {
    console.log("Exporting all reports...");
    setShowAlert(true); 
  };

  const handleDelete = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className={styles.container}>
  
      <h1 className={styles.title}>Reports Overview</h1>
      <p className={styles.subtitle}>
        Generate and manage detailed reports on pharmacies, sales, and compliance across the MediConnect platform.
      </p>
      <SummaryCards reports={reports} />

      <ReportsFilter
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onExport={handleExportAll}
      />
      
      <ReportsTable reports={filteredReports} onDelete={handleDelete} />

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
