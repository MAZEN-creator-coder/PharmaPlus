import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EmailVerificationPending.module.css";
import resendVerification from "../../shared/api/resendVerification";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function EmailVerificationPending() {
  const navigate = useNavigate();
  const query = useQuery();
  const emailFromQuery = query.get("email") || "";
  const [email] = useState(() => {
    try {
      return (
        emailFromQuery || localStorage.getItem("pharmaplus_pending_email") || ""
      );
    } catch {
      return emailFromQuery || "";
    }
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleResend() {
    if (!email) return setError("Email not provided");
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const payload = await resendVerification(email);
      const msg =
        payload?.message ||
        payload?.data?.message ||
        "Verification link resent";
      setMessage(msg);
    } catch (err) {
      const msg = err?.message || "Failed to resend verification email";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  // Save the email in localStorage for user convenience (used on verify pages for resending)
  React.useEffect(() => {
    if (email) {
      try {
        localStorage.setItem("pharmaplus_pending_email", email);
      } catch {
        /* ignore */
      }
    }
  }, [email]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} role="main">
        <div className={styles.iconContainer} aria-hidden>
          {/* Simple envelope SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2d8cf0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7" />
            <path d="M22 7L12 13 2 7" />
            <path d="M22 7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2" />
          </svg>
        </div>

        <h1 className={styles.title}>Check your email</h1>
        <p className={styles.subtitle}>We sent a verification link to</p>
        <div className={styles.email}>{email || "(no email)"}</div>

        <div className={styles.stepsBox}>
          <div className={styles.stepsTitle}>Verification steps:</div>
          <ol>
            <li>Open your email inbox.</li>
            <li>Look for an email from PharmaPlus and open it.</li>
            <li>
              Click the verification link in the email to activate your account.
            </li>
          </ol>
        </div>

        <p style={{ color: "#475569", marginTop: 10 }}>
          You received this email because you (or someone using your email)
          created an account on PharmaPlus. The link helps verify it's your
          email and activate your account.
        </p>

        {message && <div className={styles.success}>{message}</div>}
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button
            className={styles.resendBtn}
            onClick={handleResend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Resend verification email"}
          </button>
          <button className={styles.backBtn} onClick={() => navigate("/")}>
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
