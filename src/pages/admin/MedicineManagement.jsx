import React, { useState } from "react";
import styles from "./MedicineManagement.module.css";
import responsive from "../../components/medicines/responsive.module.css";
import { FaPlus, FaFileCsv, FaHistory, FaSearch, FaFilter } from "react-icons/fa";
import AddMedicineModal from "../../components/medicines/AddMedicineModal.jsx";
import SearchHeader from "../../components/medicines/SearchHeader";
import MedicineTable from "../../components/medicines/MedicineTable";
import MedicineCard from "../../components/medicines/MedicineCard";
import mockData from "../../shared/data";

export default function MedicineManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState(mockData.medicines || []);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const openModal = () => {
    setEditingMedicine(null);
    setIsModalOpen(true);
  };

  const openEditModal = (medicine) => {
    setEditingMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMedicine(null);
  };

  const addMedicine = (med) => {
    setMedicines((prev) => [{ ...med, id: Date.now() }, ...prev]);
  };

  const updateMedicine = (med) => {
    setMedicines((prev) => 
      prev.map((m) => m.id === med.id ? { ...med } : m)
    );
  };

  const deleteMedicine = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.category.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <h2>Medicines Management</h2>
      </header>

      <div className={styles.actions}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input
            placeholder="Search medicines by name or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.filterBtn}>
            <FaFilter /> Filter
          </button>
        </div>
        
        <div className={styles.controls}>
          <button className={styles.primary} onClick={openModal}>
            <FaPlus /> Add New Medicine
          </button>
          <button className={styles.secondary}>
            <FaFileCsv /> Bulk Import
          </button>
          <button className={styles.secondary}>
            <FaHistory /> Audit Log
          </button>
        </div>
      </div>

      <section className={styles.tableCard}>
        <h3>Current Inventory</h3>
        <p className={styles.subtitle}>Manage your pharmacy's medicine stock.</p>

        <div className={responsive.responsiveContainer}>
          {/* Table view for larger screens */}
          <div className={responsive.tableView}>
            <MedicineTable 
              medicines={filtered}
              onEdit={openEditModal}
              onDelete={deleteMedicine}
            />
          </div>

          {/* Card layout for small screens */}
          <div className={responsive.cardView}>
            {filtered.map((medicine) => (
              <MedicineCard 
                key={medicine.id}
                medicine={medicine}
                onEdit={openEditModal}
                onDelete={deleteMedicine}
              />
            ))}
          </div>
        </div>
      </section>

      <AddMedicineModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={addMedicine}
        onUpdate={updateMedicine}
        medicine={editingMedicine}
      />
    </div>
  );
}

