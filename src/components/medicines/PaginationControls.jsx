import React from "react";
import styles from "./PaginationControls.module.css";

export default function PaginationControls({
  page,
  totalPages,
  isLoading,
  onPrev,
  onNext,
}) {
  return (
    <div className={styles.wrap}>
      <button
        onClick={onPrev}
        disabled={page <= 1 || isLoading}
        className={styles.btn}
      >
        ◀ Previous
      </button>
      <div className={styles.info}>
        Page {page} of {totalPages}
      </div>
      <button
        onClick={onNext}
        disabled={page >= totalPages || isLoading}
        className={styles.btn}
      >
        Next ▶
      </button>
    </div>
  );
}
