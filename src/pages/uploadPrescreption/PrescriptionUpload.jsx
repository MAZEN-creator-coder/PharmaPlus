import React, { useState, useCallback, useMemo } from "react";
import phoneImage from "../../assets/phone-prescription.png";
import styles from "./PrescriptionUpload.module.css";

// 🔴 تم إزالة mockFiles الثابتة
const API_UPLOAD_URL = "http://localhost:3000/api/prescription/upload"; 
// تأكد من أن هذا هو الرابط الصحيح لنقطة النهاية (Endpoint) الخاصة بك

const statusConfig = {
  // حالات وهمية متبقية لتنسيق history
  reviewed: { label: "Reviewed" }, 
  processing: { label: "Processing" },
  pending: { label: "Pending Review" },
  // حالات جديدة للنتائج الفعلية
  success: { label: "Analysis Complete", badgeClass: styles.statusSuccess },
  error: { label: "Upload Failed", badgeClass: styles.statusError },
};

// دالة مساعدة لتنسيق التاريخ
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('en-US', options);
};

export default function PrescriptionUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // حالات جديدة
  const [isUploading, setIsUploading] = useState(false); 
  const [apiResults, setApiResults] = useState(null); 
  const [uploadError, setUploadError] = useState(null); 
  const [uploadHistory, setUploadHistory] = useState([]); // ✅ حالة حفظ سجل الرفع

  const showNotification = useCallback((title, description) => {
    setNotification({ title, description });
    setTimeout(() => setNotification(null), 3000);
  }, []);
  
  // دالة مركزية للرفع باستخدام FETCH
  const uploadAndProcessFile = useCallback(async (file) => {
    if (!file) return;

    setIsUploading(true);
    setApiResults(null);
    setUploadError(null);
    
    const currentUploadTime = new Date();
    const formData = new FormData();
    formData.append("image", file); 
    
    let historyEntry = {
        id: Date.now(),
        name: file.name,
        date: currentUploadTime,
        status: 'processing',
        result: null,
        errorMessage: null,
    };

    // تحديث السجل بحالة "Processing"
    setUploadHistory(prevHistory => [historyEntry, ...prevHistory.slice(0, 2)]);
    
    try {
      showNotification("Uploading...", `Sending ${file.name} for AI analysis.`);

      // 🔴 استخدام Fetch بدلاً من Axios
      const response = await fetch(
        API_UPLOAD_URL, 
        {
          method: 'POST',
          body: formData,
          // لا نحتاج لـ 'Content-Type': 'multipart/form-data' مع FormData،
          // المتصفح يضبطها تلقائيًا
        }
      );

      const data = await response.json();
      
      if (!response.ok || data.status === 'error') {
          // ✅ معالجة حالات الخطأ القادمة من الباك إند (status: "error")
          const errMsg = data.message || "Unknown error from server.";
          setUploadError(`Failed to process: ${errMsg}`);
          showNotification("Upload Failed", "Could not process the image.");
          
          historyEntry = {...historyEntry, status: 'error', errorMessage: errMsg};

      } else {
          // ✅ معالجة الاستجابة الناجحة
          const results = data.data.medicinesFound;
          setApiResults(results);
          showNotification("Analysis Complete", `Found ${results.length} potential medications.`);
          
          historyEntry = {...historyEntry, status: 'success', result: results};
      }
      
    } catch (err) {
      // معالجة أخطاء الشبكة (CORS, Connection issues)
      console.error("Network or Fetch Error:", err);
      const networkErrMsg = "Network error: Could not connect to the server.";
      setUploadError(networkErrMsg);
      showNotification("Upload Failed", networkErrMsg);
      
      historyEntry = {...historyEntry, status: 'error', errorMessage: networkErrMsg};

    } finally {
      setIsUploading(false);
      
      // تحديث السجل بالنتيجة النهائية (نجاح/فشل)
      setUploadHistory(prevHistory => prevHistory.map(item => 
          item.id === historyEntry.id ? historyEntry : item
      ));
    }
  }, [showNotification]);


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
      uploadAndProcessFile(files[0]);
    }
  }, [uploadAndProcessFile]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadAndProcessFile(files[0]);
      e.target.value = null; 
    }
  }, [uploadAndProcessFile]);


  const handleCamera = useCallback(() => {
    showNotification("Camera access", "Camera feature would be activated here.");
  }, [showNotification]);


  // لتبديل عرض التفاصيل في الـ History
  const [expandedHistoryId, setExpandedHistoryId] = useState(null);

  const toggleHistoryDetails = useCallback((id) => {
    setExpandedHistoryId(id === expandedHistoryId ? null : id);
  }, [expandedHistoryId]);


  return (
    <div className={styles.prescriptionContainer}>
      {/* ... (عرض الـ notification) ... */}
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
        
        {/* Header Section remains unchanged */}
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
            {/* عرض حالة التحميل (Loading Spinner) */}
            {isUploading ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
                <p className={styles.uploadText}>
                  Analyzing image with Gemini AI... Please wait.
                </p>
              </div>
            ) : (
              // حالة الرفع العادية
              <>
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
                    accept="image/jpeg, image/png" 
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
              </>
            )}
          </div>
          
          <p className={styles.uploadNote}>
            We use AI-powered OCR to accurately scan and process your prescription details.
          </p>

          {/* 5. عرض النتائج الحالية (API Results) */}
          <div className={styles.apiResultsSection}>
            {uploadError && (
              <p className={styles.errorText}>
                ❌ {uploadError}
              </p>
            )}
            
            {apiResults && apiResults.length > 0 && (
              <>
                <h3 className={styles.resultsTitle}>Found Medications & Pharmacies:</h3>
                <ul className={styles.medsList}>
                  {apiResults.map((item, index) => (
                    <li key={index} className={styles.medsListItem}>
                      <span className={styles.medName}>
                        {item.medicine} 
                        {item.status === 'not_found' ? 
                          <span className={`${styles.statusBadge} ${styles.notFound}`}> (Not Found)</span> : 
                          <span className={`${styles.statusBadge} ${styles.found}`}> (Found)</span>
                        }
                      </span>

                      {item.status === 'found' && (
                        <ul className={styles.pharmaciesList}>
                          {item.pharmacies.map((p, pIndex) => (
                            <li key={pIndex} className={styles.pharmacyDetails}>
                              <strong>{p.pharmacyName}</strong>: {p.pharmacyAddress} - ${p.price}
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.status === 'not_found' && (
                        <p className={styles.notFoundMessage}>
                          {item.pharmacies}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {apiResults && apiResults.length === 0 && !uploadError && (
                <p className={styles.noMedsFound}>
                    No medication names could be extracted from the image. Please upload a clearer image.
                </p>
            )}
          </div>
        </div>

        {/* ✅ قسم Submissions المُعدّل لعرض history */}
        <div className={styles.submissionsSection}>
          <h2 className={styles.submissionsTitle}>
            Review Upload History ({uploadHistory.length} most recent files).
          </h2>

          <div className={styles.submissionsGrid}>
            {uploadHistory.length === 0 ? (
                <p className={styles.noHistory}>No upload history yet. Start by uploading a prescription!</p>
            ) : (
                uploadHistory.map((file) => (
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
                            {/* استخدام الحالة الفعلية (success, error, processing) */}
                            <span className={`${styles.statusBadge} ${styles[file.status]}`}>
                                {file.status === 'success' && statusConfig.success.label}
                                {file.status === 'error' && statusConfig.error.label}
                                {file.status === 'processing' && statusConfig.processing.label}
                            </span>
                            <span className={styles.fileDate}>{formatDate(file.date)}</span>
                        </div>

                        {/* ✅ عرض التفاصيل عند الضغط */}
                        {(file.status === 'success' || file.status === 'error') && (
                            <button 
                                className={styles.viewDetailsLink} 
                                onClick={() => toggleHistoryDetails(file.id)}
                            >
                                {expandedHistoryId === file.id ? "Hide Details" : "View Analysis"}
                            </button>
                        )}
                        
                        {/* عرض نتائج التحليل أو رسالة الخطأ */}
                        {expandedHistoryId === file.id && (
                            <div className={styles.historyDetails}>
                                {file.status === 'error' ? (
                                    <p className={styles.errorTextHistory}>
                                        Error: {file.errorMessage}
                                    </p>
                                ) : (
                                    file.result && file.result.length > 0 ? (
                                        <ul className={styles.historyMedsList}>
                                            {file.result.map((res, i) => (
                                                <li key={i}>
                                                    {res.medicine}: 
                                                    {res.status === 'found' ? ' Found in DB' : ' Not Found'}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className={styles.noMedsFoundHistory}>
                                            No medication names were extracted.
                                        </p>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}