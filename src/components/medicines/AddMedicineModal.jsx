import React, { useRef, useState, useEffect } from "react";
import styles from "./AddMedicineModal.module.css";
import { FaTimes } from "react-icons/fa";

export default function AddMedicineModal({
  isOpen,
  onClose,
  onAdd,
  medicine,
  onUpdate,
}) {
  console.log("Rendering AddMedicineModal with medicine:", medicine);
  const [name, setName] = useState(medicine?.name || "");
  const [category, setCategory] = useState(medicine?.category || "");
  const [stock, setStock] = useState(medicine?.stock || 0);
  const [price, setPrice] = useState(medicine?.price || 0);
  const [description, setDescription] = useState(medicine?.description || "");
  const [threshold, setThreshold] = useState(medicine?.threshold || 10);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    medicine?.medicineImage ? `http://localhost:3000/${medicine.medicineImage}` : null
  );
  const fileRef = useRef(null);
  const isEditing = Boolean(medicine);

  useEffect(() => {
    if (medicine) {
      setName(medicine.name || "");
      setCategory(medicine.category || "");
      setStock(medicine.stock || 0);
      setPrice(medicine.price || 0);
      setDescription(medicine.description || "");
      setThreshold(medicine.threshold || 10);
      setImagePreview(  medicine?.medicineImage ? `http://localhost:3000/${medicine.medicineImage}` : null);
      setImageFile(null);
    } else if (!isOpen) {
      setName("");
      setCategory("");
      setStock(0);
      setPrice(0);
      setDescription("");
      setThreshold(10);
      setImagePreview(null);
      setImageFile(null);
    }
  }, [isOpen, medicine]);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    const url = URL.createObjectURL(f);
    setImagePreview(url);
  };

  const submit = (e) => {
    e.preventDefault();
    const medData = {
      name,
      category,
      stock: Number(stock),
      price: Number(price),
      threshold: Number(threshold),
      description,
    };

    // Add image file if it's a new file (for backend FormData)
    if (imageFile) {
      medData.medicineImage = imageFile;
    }

    if (isEditing) {
      onUpdate({ ...medData, _id: medicine._id || medicine.id });
    } else {
      onAdd(medData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button className={styles.close} onClick={onClose}>
          <FaTimes />
        </button>
        <h3>{isEditing ? "Edit Medicine" : "Add New Medicine"}</h3>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.formGrid}>
            <div className={styles.imageSection}>
              <div
                className={styles.uploadZone}
                onClick={() => fileRef.current?.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className={styles.preview}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <div className={styles.dashes}></div>
                    Click to Upload Image
                  </div>
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

            <div className={styles.fieldsSection}>
              <div className={styles.row}>
                <label>Medicine Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter medicine name"
                />
              </div>

              <div className={styles.row}>
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Anti-inflammatory">Anti-inflammatory</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Cold & Flu">Cold & Flu</option>
                  <option value="Allergy">Allergy</option>
                  <option value="Supplements">Supplements</option>
                  <option value="Gastro">Gastro</option>
                  <option value="Topical">Topical</option>
                </select>
              </div>

              <div className={styles.rowInline}>
                <div>
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label>Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className={styles.row}>
                <label>Low Stock Threshold</label>
                <input
                  type="number"
                  min="0"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder="10"
                />
              </div>

              <div className={styles.row}>
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter medicine description"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.ghost} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.primary}>
              {isEditing ? "Save Changes" : "Add Medicine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
