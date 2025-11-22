import React, { useState, useEffect, useRef } from "react";
import getUserById from "../../shared/api/getUserById";
import styles from "./AddPharmacyModal.module.css";
import { FaTimes } from "react-icons/fa";

export default function AddPharmacyModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  pharmacy,
}) {
  const [formData, setFormData] = useState({
    name: "",
    license: "",
    contact: "",
    address: "",
    email: "",
    description: "",
    status: "active",
    img: "https://placehold.co/400x400/018994/ffffff?text=P",
    rating: 4.0,
    medicines: [],
    categorys: [],
  });

  const fileRef = useRef(null);
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    if (pharmacy) {
      // Defensive mapping: some callers may pass the full API response object
      const src =
        (pharmacy && (pharmacy.data?.pharmacy || pharmacy.pharmacy)) ||
        pharmacy;
      // Map backend pharmacy shape into the modal form state and normalize values
      const API_BASE =
        (typeof import.meta !== "undefined" &&
          import.meta.env &&
          import.meta.env.VITE_API_BASE) ||
        "http://localhost:3000/api";
      const mediaBase = API_BASE.replace(/\/api\/?$/, "");
      const imgPath = src?.img || src?.avatar || "uploads/pharmacy-default.jpg";
      const imgSrc =
        imgPath && typeof imgPath === "string" && imgPath.startsWith("http")
          ? imgPath
          : `${mediaBase}${
              imgPath && imgPath.startsWith("/") ? "" : "/"
            }${imgPath}`;

      // Debug logs to help find missing fields
      try {
        console.debug("[AddPharmacyModal] received pharmacy prop:", pharmacy);
        console.debug("[AddPharmacyModal] using src:", src);
      } catch { // ignore 
        }

      setFormData({
        name: src?.name || src?.fullName || "",
        license:
          src?.license ||
          src?.licenseNumber ||
          (src?.manager && src.manager.license) ||
          "",
        contact: src?.contact || "",
        address: src?.address || "",
        email: src?.email || "",
        description: src?.description || "",
        status: (src?.status || "inactive").toLowerCase(),
        img: imgSrc,
        rating: src?.rating || 4.0,
        medicines: src?.medicines || [],
        categorys: src?.categorys || src?.categories || [],
      });

      // If license is still empty but we have a managerId, try to fetch the manager's user record
      (async () => {
        try {
          const token = (() => {
            try {
              return localStorage.getItem("pharmaplus_token");
            } catch {
              return null;
            }
          })();
          if ((!src?.license || src?.license === "") && src?.managerId) {
            const user = await getUserById(src.managerId, token);
            const mgrLicense =
              user?.license || user?.licenseNumber || user?.data?.license;
            if (mgrLicense) {
              setFormData((prev) => ({ ...prev, license: mgrLicense }));
            }
          }
        } catch (err) {
          // ignore
        }
      })();
    } else if (!isOpen) {
      // reset when modal closed and not editing
      setFormData({
        name: "",
        license: "",
        contact: "",
        address: "",
        email: "",
        description: "",
        status: "active",
        img: "https://placehold.co/400x400/018994/ffffff?text=P",
        rating: 4.0,
        medicines: [],
        categorys: [],
      });
    }
  }, [pharmacy, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare payload: if the user selected an image file, send FormData (multipart)
    const hasFile = !!imgFile;
    if (hasFile) {
      const fd = new FormData();

      Object.keys(formData).forEach((key) => {

        if (key === "img") return;
        const val = formData[key];

        if (Array.isArray(val)) fd.append(key, JSON.stringify(val));
        else
          fd.append(key, val === undefined || val === null ? "" : String(val));
      });
      
      // For update: append the ID so backend knows which record to update
      if (pharmacy) {
        fd.append("_id", pharmacy._id || pharmacy.id);
      }
      
      fd.append("img", imgFile);

      if (pharmacy) onUpdate(fd);
      else onAdd(fd);
    } else {

      const payload = { ...formData };
      
      // For update: include the ID
      if (pharmacy) {
        payload._id = pharmacy._id || pharmacy.id;
      }
      
      // Remove preview URL if it is an object URL or absolute URL (backend expects file path only)
      // Only send img if it's a backend path, not a preview URL
      if (payload.img && (payload.img.startsWith("blob:") || payload.img.startsWith("http") || payload.img.startsWith("data:"))) {
        delete payload.img;
      }

      if (pharmacy) onUpdate(payload);
      else onAdd(payload);
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImgFile(f);
    setFormData((prev) => ({ ...prev, img: url }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{pharmacy ? "Edit Pharmacy" : "Add New Pharmacy"}</h2>
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
                <div
                  className={styles.imageUpload}
                  onClick={() => fileRef.current?.click()}
                >
                  {formData.img ? (
                    <img
                      src={formData.img}
                      alt="preview"
                      className={styles.preview}
                    />
                  ) : (
                    <div className={styles.placeholder}>Click to upload</div>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={onFile}
                    style={{ display: "none" }}
                  />
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {pharmacy ? "Update Pharmacy" : "Add Pharmacy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
