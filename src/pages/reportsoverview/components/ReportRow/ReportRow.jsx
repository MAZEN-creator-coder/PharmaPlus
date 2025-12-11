import React from 'react';
import styles from './ReportRow.module.css';

const ReportRow = ({ report }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return styles.statusCompleted;
      case 'Review': return styles.statusReview;
      case 'Pending': return styles.statusPending;
      case 'Failed': return styles.statusFailed;
      default: return '';
    }
  };
  return (
    <tr className={styles.reportRow}>
      <td>{report.reportID}</td>
      <td>{report.reportName}</td>
      <td>{report.pharmacy}</td>
      <td>{report.dateGenerated}</td>
      <td>
        <span className={`${styles.statusBadge} ${getStatusClass(report.status)}`}>
          {report.status}
        </span>
      </td>
      <td>{report.generatedBy}</td>
      <td className={styles.actionsColumn}>
      </td>
    </tr>
  );
};

export default ReportRow;