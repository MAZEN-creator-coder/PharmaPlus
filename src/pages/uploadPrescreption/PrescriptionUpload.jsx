import { useState, useCallback } from "react";
import phoneImage from "../../assets/phone-prescription.png";
import styles from "./PrescriptionUpload.module.css";

const mockFiles = [
  {
    id: "1",
    name: "Prescription_20240726.pdf",
    status: "reviewed",
    date: "Jul 26, 2024 10:30 AM",
  },
  {
    id: "2",
    name: "RX_Antibiotics_Dr_Smith.jpg",
    status: "processing",
    date: "Jul 25, 2024 03:15 PM",
  },
  {
    id: "3",
    name: "Eye_Drops_Refill.png",
    status: "pending",
    date: "Jul 25, 2024 08:00 AM",
  },
];

const statusConfig = {
  reviewed: { label: "Reviewed" },
  processing: { label: "Processing" },
  pending: { label: "Pending Review" },
};

export default function PrescriptionUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (title, description) => {
    setNotification({ title, description });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      showNotification("File uploaded", `${files[0].name} has been uploaded successfully.`);
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      showNotification("File uploaded", `${files[0].name} has been uploaded successfully.`);
    }
  }, []);

  const handleCamera = useCallback(() => {
    showNotification("Camera access", "Camera feature would be activated here.");
  }, []);

  return (
    <div className={styles.prescriptionContainer}>
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(6, 182, 212, 0.95)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 1000,
          maxWidth: '300px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{notification.title}</div>
          <div style={{ fontSize: '0.9rem' }}>{notification.description}</div>
        </div>
      )}

      <div className={styles.prescriptionWrapper}>
        {/* Header Section */}
        <div className={styles.prescriptionHeader}>
          {/* Left: Phone Image */}
          <div className={styles.prescriptionImageContainer}>
            <img
              src={phoneImage}
              alt="Prescription on phone"
              className={styles.prescriptionPhoneImage}
            />
          </div>

          {/* Right: Title and Description */}
          <div className={styles.prescriptionTitleSection}>
            <h1 className={styles.prescriptionTitle}>
              Upload Your Prescription with AI OCR
            </h1>
            <p className={styles.prescriptionDescription}>
              Easily submit your prescriptions by uploading an image or PDF. Our
              advanced AI-powered OCR technology will automatically scan and extract
              medication details for a faster and more accurate processing. We support
              various formats including JPG, PNG, and PDF.
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className={styles.uploadCard}>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`${styles.uploadDropzone} ${isDragging ? styles.dragging : ""}`}
          >
            <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            
            <p className={styles.uploadText}>
              Drag & drop your prescription image here
            </p>

            <p className={styles.uploadOr}>or</p>

            <div className={styles.uploadButtons}>
              <label htmlFor="file-upload" className={styles.uploadButton}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Browse Files
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*,.pdf"
                className={styles.hidden}
                onChange={handleFileSelect}
              />

              <button className={styles.uploadButton} onClick={handleCamera}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Use Camera
              </button>
            </div>
          </div>

          <p className={styles.uploadNote}>
            We use AI-powered OCR to accurately scan and process your prescription details.
          </p>
        </div>

        {/* Submitted Prescriptions */}
        <div className={styles.submissionsSection}>
          <h2 className={styles.submissionsTitle}>
            Keep track of your submitted prescriptions.
          </h2>

          <div className={styles.submissionsGrid}>
            {mockFiles.map((file) => (
              <div key={file.id} className={styles.fileCard}>
                <div className={styles.fileHeader}>
                  <svg className={styles.fileIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className={styles.fileName}>
                    {file.name}
                  </div>
                </div>

                <div className={styles.fileStatusRow}>
                  <span className={`${styles.statusBadge} ${styles[file.status]}`}>
                    {statusConfig[file.status].label}
                  </span>
                  <span className={styles.fileDate}>{file.date}</span>
                </div>

                <a href="#" className={styles.viewDetailsLink}>
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
