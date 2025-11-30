import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import forgotPasswordApi from "../../shared/api/forgotPassword";
import Toast from "../../components/common/Toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e?.preventDefault?.();
    setLoading(true);
    try {
      const payload = await forgotPasswordApi(email);
      const msg =
        payload?.data?.msg ||
        payload?.message ||
        "A reset email has been sent if this address exists.";
      setToast({ message: msg, type: "success" });
      // Save pending email so we can auto-fill on future pages
      try {
        localStorage.setItem("pharmaplus_pending_email", email);
      } catch (e) {
        /* ignore */
      }
      setLoading(false);
      // Optionally navigate to a pending page or keep user here to show message
    } catch (err) {
      setLoading(false);
      const message =
        err?.payload?.data?.msg || err?.message || "Failed to send reset email";
      setToast({ message, type: "error" });
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Forgot your password?</h2>
        <p className={styles.subtitle}>
          Enter your email and we will send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label
            htmlFor="forgotEmail"
            style={{ fontWeight: 600, color: "#018994" }}
          >
            Email
          </label>
          <input
            id="forgotEmail"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
          <div className={styles.formActions}>
            <button
              className={styles.submitBtn}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => navigate("/")}
            >
              Back to homepage
            </button>
          </div>
        </form>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
