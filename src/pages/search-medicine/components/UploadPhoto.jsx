import React from 'react';
import styles from './ComponentSearch.module.css';
import { IoCameraOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const UploadPhoto = () => {
  const navigate = useNavigate();
   const handleClick = () => {
    navigate("/upload-prescription"); 
  };
  return (
    <button className={styles.uploadButton} onClick={handleClick}>
      <IoCameraOutline className={styles.cameraIcon} /> Upload Prescription
    </button>
  );
};

export default UploadPhoto;