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
