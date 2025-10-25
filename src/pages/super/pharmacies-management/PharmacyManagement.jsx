import React, { useState } from "react";
import styles from "./PharmacyManagement.module.css";
import responsive from "../../../components/pharmacies/responsive.module.css";
import { FaPlus, FaFileCsv, FaHistory, FaSearch, FaFilter } from "react-icons/fa";
import PharmacyTable from "../../../components/pharmacies/PharmacyTable";
import PharmacyCard from "../../../components/pharmacies/PharmacyCard";
import AddPharmacyModal from "../../../components/pharmacies/AddPharmacyModal";
import { pharmaciesData } from "../../../shared/data.js";

export default function PharmacyManagement() {
  const [query, setQuery] = useState("");
  const [pharmacies, setPharmacies] = useState(pharmaciesData || []);
  const [editingPharmacy, setEditingPharmacy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setEditingPharmacy(null);
    setIsModalOpen(true);
  };

  const openEditModal = (pharmacy) => {
    setEditingPharmacy(pharmacy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPharmacy(null);
  };

  const addPharmacy = (pharmacy) => {
    setPharmacies((prev) => [{ ...pharmacy, id: Date.now() }, ...prev]);
  };

  const updatePharmacy = (pharmacy) => {
    setPharmacies((prev) => 
      prev.map((p) => p.id === pharmacy.id ? { ...pharmacy } : p)
    );
  };

  const deletePharmacy = (id) => {
    if (window.confirm('Are you sure you want to delete this pharmacy?')) {
      setPharmacies((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filtered = pharmacies.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2>Pharmacies Management</h2>
      </header>

      <div className={styles.actions}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input
            placeholder="Search pharmacies by name or address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.filterBtn}>
            <FaFilter /> Filter
          </button>
        </div>
        
        <div className={styles.controls}>
          <button className={styles.primary} onClick={openModal}>
            <FaPlus /> Add New Pharmacy
          </button>
          <button className={styles.secondary}>
            <FaFileCsv /> Export Data
          </button>
          <button className={styles.secondary}>
            <FaHistory /> Activity Log
          </button>
        </div>
      </div>

      <section className={styles.tableCard}>
        <h3>Current Pharmacies</h3>
        <p className={styles.subtitle}>Manage the pharmacies in your network.</p>

        <div className={responsive.responsiveContainer}>
          {/* Table view for larger screens */}
          <div className={responsive.tableView}>
            <PharmacyTable 
              pharmacies={filtered}
              onEdit={openEditModal}
              onDelete={deletePharmacy}
            />
          </div>

          {/* Card layout for small screens */}
          <div className={responsive.cardView}>
            {filtered.map((pharmacy) => (
              <PharmacyCard 
                key={pharmacy.id}
                pharmacy={pharmacy}
                onEdit={openEditModal}
                onDelete={deletePharmacy}
              />
            ))}
          </div>
        </div>
      </section>

      <AddPharmacyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={addPharmacy}
        onUpdate={updatePharmacy}
        pharmacy={editingPharmacy}
      />
    </div>
  );
}