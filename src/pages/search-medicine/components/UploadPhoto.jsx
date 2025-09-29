import React from 'react';
import styles from './ComponentSearch.module.css';
import { IoCameraOutline } from "react-icons/io5";

const UploadPhoto = () => {
  return (
    <button className={styles.uploadButton}>
      <IoCameraOutline className={styles.cameraIcon} /> Upload Prescription
    </button>
  );
};

export default UploadPhoto;