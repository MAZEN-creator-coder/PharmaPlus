import React, { useEffect, useState } from "react";
import styles from "./PharmacyManagement.module.css";
import responsive from "../../../components/pharmacies/responsive.module.css";
import { FaFileCsv, FaSearch, FaFilter } from "react-icons/fa";
import PharmacyTable from "../../../components/pharmacies/PharmacyTable";
import PharmacyCard from "../../../components/pharmacies/PharmacyCard";
import AddPharmacyModal from "../../../components/pharmacies/AddPharmacyModal";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import Toast from "../../../components/common/Toast";
import {
  getPharmacies,
  updatePharmacy as updatePharmacyApi,
  deletePharmacy as deletePharmacyApi,
} from "../../../shared/api/pharmaciesApi";

import PaginationControls from "./PaginationControls";

export default function PharmacyManagement() {
  const [query, setQuery] = useState("");
  const [pharmacies, setPharmacies] = useState([]);
  const [editingPharmacy, setEditingPharmacy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    pharmacyId: null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  // Pagination state and logic (like MedicineManagement)
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setIsLoading(true);
      const token = localStorage.getItem("pharmaplus_token");
      try {
        // getPharmacies should support pagination: (page, limit, token)
        const res = await getPharmacies(page, limit, token);
        if (!mounted) return;
        setPharmacies(res.pharmacies || res || []);
        setTotalPages(res.pagination?.totalPages || 1);
        setPage(res.pagination?.page || page);
      } catch (err) {
        console.error(err);
        setToast({
          message: err?.message || "Failed to load pharmacies",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [page]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // Note: Add button removed; modal is opened via edit flow only

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

  async function updatePharmacy(pharmacy) {
    const token = localStorage.getItem("pharmaplus_token");
    try {
      if (
        pharmacy &&
        (pharmacy._id ||
          (typeof pharmacy.id === "string" && pharmacy.id.length > 8))
      ) {
        const id = pharmacy._id || pharmacy.id;
        const updated = await updatePharmacyApi(id, pharmacy, token);
        const payload = updated?.pharmacy || updated || pharmacy;
        setPharmacies((prev) =>
          prev.map((p) =>
            p._id === payload._id || p.id === payload.id ? payload : p
          )
        );
        const backendMsg =
          updated?.data?.msg || updated?.msg || updated?.message;
        setToast({
          message: backendMsg || "Pharmacy updated",
          type: "success",
        });
      } else {
        setPharmacies((prev) =>
          prev.map((p) => (p.id === pharmacy.id ? { ...pharmacy } : p))
        );
        setToast({ message: "Pharmacy updated (local)", type: "success" });
      }
    } catch (err) {
      console.error(err);
      setToast({
        message: err?.message || "Failed to update pharmacy",
        type: "error",
      });
    }
  }

  const requestDeletePharmacy = (id) => {
    setConfirmDialog({ isOpen: true, pharmacyId: id });
  };

  async function confirmDelete() {
    const id = confirmDialog.pharmacyId;
    setConfirmDialog({ isOpen: false, pharmacyId: null });
    if (!id) return;
    const token = localStorage.getItem("pharmaplus_token");
    try {
      const res = await deletePharmacyApi(id, token);
      setPharmacies((prev) => prev.filter((p) => p._id !== id && p.id !== id));
      const backendMsg = res?.data?.msg || res?.msg || res?.message;
      setToast({ message: backendMsg || "Pharmacy deleted", type: "success" });
    } catch (err) {
      console.error(err);
      setToast({
        message: err?.message || "Failed to delete pharmacy",
        type: "error",
      });
    }
  }

  const filtered = pharmacies
    .filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.address || "").toLowerCase().includes(query.toLowerCase())
    )
    .filter((p) =>
      filterStatus === "all"
        ? true
        : (p.status || "").toLowerCase() === filterStatus
    );

  useEffect(() => {
    let mounted = true;
    async function load() {
      const token = localStorage.getItem("pharmaplus_token");
      try {
        const list = await getPharmacies(1, 100, token);
        if (!mounted) return;
        setPharmacies(list);
      } catch (err) {
        console.error(err);
        setToast({
          message: err?.message || "Failed to load pharmacies",
          type: "error",
        });
      } finally {
        /* finished loading */
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

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
          <button
            className={styles.filterBtn}
            onClick={() => setShowFilters((s) => !s)}
          >
            <FaFilter /> Filter
          </button>
          {showFilters && (
            <div className={styles.filterPanel}>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <button
            className={styles.secondary}
            onClick={() => {
              const csvContent = [
                ["Name", "Address", "Status", "Contact", "Email"],
                ...filtered.map((p) => [
                  p.name,
                  p.address || "",
                  p.status || "",
                  p.contact || "",
                  p.email || "",
                ]),
              ]
                .map((row) => row.join(","))
                .join("\n");

              const blob = new Blob([csvContent], {
                type: "text/csv;charset=utf-8;",
              });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `pharmacies-${
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
        <h3>Current Pharmacies</h3>
        <p className={styles.subtitle}>
          Manage the pharmacies in your network.
        </p>

        <div className={responsive.responsiveContainer}>
          {/* Table view for larger screens */}
          <div className={responsive.tableView}>
            <PharmacyTable
              pharmacies={filtered}
              onEdit={openEditModal}
              onDelete={requestDeletePharmacy}
            />
          </div>

          {/* Card layout for small screens */}
          <div className={responsive.cardView}>
            {filtered.map((pharmacy) => (
              <PharmacyCard
                key={pharmacy._id || pharmacy.id}
                pharmacy={pharmacy}
                onEdit={openEditModal}
                onDelete={requestDeletePharmacy}
              />
            ))}
          </div>
        </div>
        {/* Pagination Controls - positioned after the list */}
        <PaginationControls
          page={page}
          totalPages={totalPages}
          isLoading={isLoading}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </section>

      <AddPharmacyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={addPharmacy}
        onUpdate={updatePharmacy}
        pharmacy={editingPharmacy}
      />
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Pharmacy"
        message="Are you sure you want to delete this pharmacy? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, pharmacyId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
