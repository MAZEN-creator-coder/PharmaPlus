import React, { useEffect, useState } from "react";
import { getPharmacies } from "../../shared/api/pharmaciesApi";
import PharmacyBlock from "../../components/pharmacies/PharmacyBlock";
import PaginationControls from "../../components/medicines/PaginationControls";
import styles from "./PharmaciesPage.module.css";

export default function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    load(page);
  }, [page]);

  async function load(p = 1) {
    setIsLoading(true);
    try {
      const data = await getPharmacies(p, limit);
      // filter to only show active pharmacies
      const activePharmacies = (Array.isArray(data) ? data : []).filter(
        (pharmacy) => pharmacy.status === "active"
      );
      setPharmacies(activePharmacies);

      // determine if backend has more pages by checking returned length
      const more = Array.isArray(data) && data.length >= limit;
      setHasMore(Boolean(more));

      // totalPages is unknown from backend; expose at least current page and next if available
      setTotalPages(more ? p + 1 : p);
    } catch (err) {
      console.error("Failed to load pharmacies", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2>Pharmacies</h2>
        <p className={styles.sub}>
          Browse nearby pharmacies and their products
        </p>
      </header>

      {/* Loading overlay above pharmacies list, styled as a card */}
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
          Loading pharmacies...
        </div>
      )}
      <div className={styles.list}>
        {pharmacies.map((pharmacy) => (
          <PharmacyBlock
            key={pharmacy._id || pharmacy.id}
            pharmacy={pharmacy}
          />
        ))}
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => {
          // only advance if there is possibly another page
          if (hasMore) setPage((p) => p + 1);
        }}
      />
    </div>
  );
}
