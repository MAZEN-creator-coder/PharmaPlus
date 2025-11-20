import React, { useState, useEffect } from "react";
import styles from "./MedicineManagement.module.css";
import responsive from "../../components/medicines/responsive.module.css";
import { FaPlus, FaFileCsv, FaSearch, FaFilter } from "react-icons/fa";
import AddMedicineModal from "../../components/medicines/AddMedicineModal.jsx";
import SearchHeader from "../../components/medicines/SearchHeader";
import MedicineTable from "../../components/medicines/MedicineTable";
import MedicineCard from "../../components/medicines/MedicineCard";
import {
  getAllMedicines,
  deleteMedicine,
  createMedicine,
  updateMedicine,
} from "../../shared/api/medicineApi";
import PaginationControls from "../../components/medicines/PaginationControls";
import Toast from "../../components/common/Toast";
import ConfirmDialog from "../../components/common/ConfirmDialog";

export default function MedicineManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    medicineId: null,
  });

  // Load medicines on component mount
  useEffect(() => {
    loadMedicines(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMedicines = async (p = 1) => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("pharmaplus_token");
      const res = await getAllMedicines(p, limit, token);
      // getAllMedicines now returns { medicines, pagination }
      setMedicines(res.medicines || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setPage(res.pagination?.page || p);
    } catch (err) {
      const errorMsg = err?.message || "Failed to load medicines";
      setError(errorMsg);
      console.error("Load medicines error:", err);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleAddMedicine = async (med) => {
    try {
      const token = localStorage.getItem("pharmaplus_token");
      // Ensure we include the current user's pharmacy id (required by backend)
      try {
        const rawUser = localStorage.getItem("pharmaplus_user");
        const parsed = rawUser ? JSON.parse(rawUser) : null;
        const pharmacyId =
          parsed?.pharmacyId || parsed?.pharmacy || parsed?._id || parsed?.id;
        if (pharmacyId && !med.pharmacy) med.pharmacy = pharmacyId;
      } catch {
        // ignore parsing errors; backend will complain if pharmacy is missing
      }

      const newMedicine = await createMedicine(med, token);

      // Refresh pages and try to find which page contains the new medicine.
      const refreshed = await getAllMedicines(page, limit, token);
      const foundOnCurrent = refreshed.medicines.some(
        (m) => (m._id || m.id) === (newMedicine._id || newMedicine.id)
      );
      if (foundOnCurrent) {
        setMedicines(refreshed.medicines);
        setTotalPages(refreshed.pagination?.totalPages || totalPages);
        setPage(refreshed.pagination?.page || page);
      } else {
        // Not on current page: load last page (where new items often appear)
        const lastPage = refreshed.pagination?.totalPages || page;
        const last = await getAllMedicines(lastPage, limit, token);
        setMedicines(last.medicines || []);
        setTotalPages(last.pagination?.totalPages || lastPage);
        setPage(last.pagination?.page || lastPage);
      }

      // show backend message if provided
      if (newMedicine?._serverMessage)
        setToast({ message: newMedicine._serverMessage, type: "success" });
      closeModal();
    } catch (err) {
      // Surface backend error message when available
      const msg =
        err?.message ||
        err?.payload?.message ||
        JSON.stringify(err?.payload || err) ||
        "Failed to add medicine";
      setError(msg);
      console.error("Add medicine error:", err);
    }
  };

  const handleUpdateMedicine = async (med) => {
    try {
      const token = localStorage.getItem("pharmaplus_token");
      const updatedMedicine = await updateMedicine(
        med._id || med.id,
        med,
        token
      );
      setMedicines((prev) =>
        prev.map((m) =>
          (m._id || m.id) === (med._id || med.id) ? updatedMedicine : m
        )
      );
      if (updatedMedicine?._serverMessage)
        setToast({ message: updatedMedicine._serverMessage, type: "success" });
      closeModal();
    } catch (err) {
      const msg =
        err?.message ||
        err?.payload?.message ||
        JSON.stringify(err?.payload || err) ||
        "Failed to update medicine";
      setError(msg);
      console.error("Update medicine error:", err);
    }
  };

  const handleDeleteMedicine = async (id) => {
    setConfirmDialog({ isOpen: true, medicineId: id });
  };

  const confirmDeleteMedicine = async () => {
    const id = confirmDialog.medicineId;
    setConfirmDialog({ isOpen: false, medicineId: null });

    try {
      const token = localStorage.getItem("pharmaplus_token");
      const res = await deleteMedicine(id, token);
      setMedicines((prev) => prev.filter((m) => (m._id || m.id) !== id));
      const backendMsg =
        res?.data?.msg ||
        res?.message ||
        res?.msg ||
        "Medicine deleted successfully";
      setToast({ message: backendMsg, type: "success" });
    } catch (err) {
      const msg =
        err?.message ||
        err?.payload?.message ||
        JSON.stringify(err?.payload || err) ||
        "Failed to delete medicine";
      setError(msg);
      console.error("Delete medicine error:", err);
    }
  };

  const filtered = medicines.filter(
    (m) =>
      (m.name || "").toLowerCase().includes(query.toLowerCase()) ||
      (m.category || "").toLowerCase().includes(query.toLowerCase())
  );

  // Apply status filter if selected
  const applyStatusFilter = (items) => {
    if (!filterStatus || filterStatus === "all") return items;
    return items.filter((m) => {
      const s = (m.status || "").toLowerCase();
      if (filterStatus === "instock")
        return (
          s === "available" || s === "instock" || (m.stock && m.stock > 20)
        );
      if (filterStatus === "low")
        return s === "lowstock" || (m.stock && m.stock > 0 && m.stock <= 20);
      if (filterStatus === "out")
        return (
          s === "outofstock" ||
          s === "outofstock" ||
          m.stock === 0 ||
          m.stock === undefined
        );
      return true;
    });
  };

  const finalFiltered = applyStatusFilter(filtered);

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
          <button
            className={styles.filterBtn}
            onClick={() => setShowFilters((s) => !s)}
          >
            <FaFilter /> Filter
          </button>
          {showFilters && (
            <div className={styles.filterPanel} style={{ marginLeft: 12 }}>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="instock">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <button className={styles.primary} onClick={openModal}>
            <FaPlus /> Add New Medicine
          </button>
          <button
            className={styles.secondary}
            onClick={() => {
              const csvContent = [
                ["Name", "Category", "Price", "Stock", "Description", "Status"],
                ...finalFiltered.map((m) => [
                  m.name,
                  m.category || "",
                  m.price || "",
                  m.stock || "",
                  m.description || "",
                  m.status || "",
                ]),
              ]
                .map((row) => row.map((cell) => `"${cell}"`).join(","))
                .join("\n");

              const blob = new Blob([csvContent], {
                type: "text/csv;charset=utf-8;",
              });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `medicines-${
                new Date().toISOString().split("T")[0]
              }.csv`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            }}
          >
            <FaFileCsv /> Export Data
          </button>
        </div>
      </div>

      <section className={styles.tableCard}>
        <h3>Current Inventory</h3>
        <p className={styles.subtitle}>
          Manage your pharmacy's medicine stock.
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Loading overlay above table, styled as a card */}
        {isLoading && (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 1px 4px rgba(15,23,42,0.08)',
            padding: '32px',
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '18px',
            fontWeight: 500,
            color: '#0891b2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}>
            <svg width="32" height="32" viewBox="0 0 100 100" style={{marginRight:8}}>
              <circle cx="50" cy="50" r="32" stroke="#0891b2" strokeWidth="8" fill="none" strokeDasharray="50 50" strokeDashoffset="0">
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
            Loading medicines...
          </div>
        )}

        <div className={responsive.responsiveContainer}>
          {/* Table view for larger screens */}
          <div className={responsive.tableView}>
            <MedicineTable
              medicines={finalFiltered}
              onEdit={openEditModal}
              onDelete={handleDeleteMedicine}
            />
          </div>

          {/* Card layout for small screens */}
          <div className={responsive.cardView}>
            {finalFiltered.map((medicine) => (
              <MedicineCard
                key={medicine._id || medicine.id}
                medicine={medicine}
                onEdit={openEditModal}
                onDelete={handleDeleteMedicine}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pagination controls */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />

      <AddMedicineModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddMedicine}
        onUpdate={handleUpdateMedicine}
        medicine={editingMedicine}
      />

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirm delete dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Medicine"
        message="Are you sure you want to delete this medicine? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={confirmDeleteMedicine}
        onCancel={() => setConfirmDialog({ isOpen: false, medicineId: null })}
      />
    </div>
  );
}
