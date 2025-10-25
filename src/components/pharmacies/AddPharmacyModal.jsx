import React, { useState, useEffect, useRef } from 'react';
import styles from './AddPharmacyModal.module.css';
import { FaTimes } from 'react-icons/fa';

export default function AddPharmacyModal({ isOpen, onClose, onAdd, onUpdate, pharmacy }) {
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    contact: '',
    address: '',
    email: '',
    description: '',
    status: 'Active',
    img: 'https://placehold.co/400x400/018994/ffffff?text=P',
    rating: 4.0,
    medicines: [],
    categorys: []
  });

  const fileRef = useRef(null);

  useEffect(() => {
    if (pharmacy) {
      setFormData(pharmacy);
    } else if (!isOpen) {
      // reset when modal closed and not editing
      setFormData({
        name: '',
        license: '',
        contact: '',
        address: '',
        email: '',
        description: '',
        status: 'Active',
        img: 'https://placehold.co/400x400/018994/ffffff?text=P',
        rating: 4.0,
        medicines: [],
        categorys: []
      });
    }
  }, [pharmacy, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pharmacy) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setFormData(prev => ({ ...prev, img: url }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{pharmacy ? 'Edit Pharmacy' : 'Add New Pharmacy'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* Left Column */}
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label>Image</label>
                <div className={styles.imageUpload} onClick={()=>fileRef.current?.click()}>
                  {formData.img ? (
                    <img src={formData.img} alt="preview" className={styles.preview} />
                  ) : (
                    <div className={styles.placeholder}>Click to upload</div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{display:'none'}} />
                </div>
              </div>

            {/* rest of left column */}
              <div className={styles.formGroup}>
                <label>Pharmacy Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter pharmacy name"
                />
              </div>

              <div className={styles.formGroup}>
                <label>License Number*</label>
                <input
                  type="text"
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                  required
                  placeholder="Enter license number"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Contact Number*</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="Enter contact number"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label>Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter pharmacy address"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="Enter rating (0-5)"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter pharmacy description"
                />
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {pharmacy ? 'Update Pharmacy' : 'Add Pharmacy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}