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
          {/* Envelope SVG, visually centered and lines colored green */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 48 48"
            fill="none"
          >
            <rect width="48" height="48" rx="24" fill="#eaf6ff" />
            {/* envelope body */}
            <rect
              x="10"
              y="14"
              width="28"
              height="20"
              rx="2"
              stroke="#018994"
              strokeWidth="2"
              fill="none"
            />
            {/* flap */}
            <path
              d="M10 14L24 26L38 14"
              stroke="#018994"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <h2 className={styles.title} style={{ color: "#018994" }}>
          Check your email
        </h2>
        <div className={styles.subtitle}>We sent a verification link to</div>
        <div className={styles.email} style={{ color: "#018994" }}>
          {email || "(no email)"}
        </div>

        <div className={styles.stepsBox}>
          <div className={styles.stepsTitle} style={{ color: "#018994" }}>
            Verification steps:
          </div>
          <ol style={{ margin: 0, paddingLeft: 18 }}>
            <li>Open your email inbox.</li>
            <li>Look for an email from PharmaPlus and open it.</li>
            <li>
              Click the verification link in the email to activate your account.
            </li>
          </ol>
        </div>

        <div style={{ color: "#475569", fontSize: "0.98rem", marginBottom: 8 }}>
          You received this email because you (or someone using your email)
          created an account on PharmaPlus. The link helps verify it's your
          email and activate your account.
        </div>

        {message && <div className={styles.success}>{message}</div>}
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button
            className={styles.resendBtn}
            onClick={handleResend}
            disabled={loading}
          >
            {loading ? "Resending..." : "Resend verification email"}
          </button>
          <button className={styles.backBtn} onClick={() => navigate("/")}>
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
