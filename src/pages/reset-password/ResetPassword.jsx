import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import resetPasswordApi from "../../shared/api/resetPassword";
import Toast from "../../components/common/Toast";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!token) {
      setToast({ message: "Invalid reset link", type: "error" });
    }
  }, [token]);

  async function handleSubmit(e) {
    e?.preventDefault?.();
    if (password.length < 8)
      return setToast({
        message: "Password must be >= 8 chars",
        type: "error",
      });
    if (password !== confirm)
      return setToast({ message: "Passwords do not match", type: "error" });
    setLoading(true);
    try {
      const payload = await resetPasswordApi(token, password);
      const msg =
        payload?.data?.msg || payload?.message || "Password reset successful";
      setToast({ message: msg, type: "success" });
      setLoading(false);
      // After successful reset, navigate to login after a short delay
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setLoading(false);
      const message =
        err?.payload?.data?.msg || err?.message || "Failed to reset password";
      setToast({ message, type: "error" });
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Reset password</h2>
        <p className={styles.subtitle}>Set a new password for your account.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label
            htmlFor="newPass"
            style={{ fontWeight: 600, color: "#018994" }}
          >
            New password
          </label>
          <input
            id="newPass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Enter new password"
            required
          />
          <label
            htmlFor="confirmPass"
            style={{ fontWeight: 600, color: "#018994" }}
          >
            Confirm password
          </label>
          <input
            id="confirmPass"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={styles.input}
            placeholder="Confirm password"
            required
          />

          <div className={styles.formActions}>
            <button
              className={styles.submitBtn}
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save new password"}
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
