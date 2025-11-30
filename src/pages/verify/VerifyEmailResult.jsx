import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiFetch from "../../shared/api/apiFetch";
import styles from "./EmailVerificationPending.module.css";
import resendVerification from "../../shared/api/resendVerification";
import { useAuth } from "../../hooks/useAuth";

export default function VerifyEmailResult() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    message: "",
  });

  useEffect(() => {
    async function verify() {
      try {
        const payload = await apiFetch(`/users/verify-email/${token}`, {
          method: "GET",
        });
        const msg =
          payload?.data?.msg ||
          payload?.message ||
          payload?.data?.message ||
          "Email verified successfully";
        setStatus({ loading: false, success: true, message: msg });

        // If backend returned a token, use it to log the user in immediately
        const tokenFromApi = payload?.data?.token;
        if (tokenFromApi) {
          try {
            await loginWithToken(tokenFromApi);
            // loginWithToken already navigates to dashboard; but if it doesn't, we do nothing
            return;
          } catch (err) {
            // fallback: notify user and stay on the page
            console.error("Auto-login failed", err);
          }
        }
      } catch (err) {
        const msg =
          err?.payload?.data?.msg || err?.message || "Invalid or expired token";
        setStatus({ loading: false, success: false, message: msg });
      }
    }
    if (token) verify();
  }, [token, loginWithToken]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} role="main">
        <div style={{ marginBottom: 14 }}>
          {status.loading ? (
            <div style={{ fontSize: 20, fontWeight: 600 }}>Verifying...</div>
          ) : status.success ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                className={styles.iconContainer}
                style={{ background: "#ecfdf3" }}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="1.5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h1 className={styles.title}>Email verified</h1>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                className={styles.iconContainer}
                style={{ background: "#fff1f2" }}
              >
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx={12}
                    cy={12}
                    r={10}
                    fill="#fff1f2"
                    stroke="#fca5a5"
                  />
                  <path
                    d="M12 8v6"
                    stroke="#dc2626"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="17" r="0.8" fill="#dc2626" />
                </svg>
              </div>
              <h1 className={styles.title}>Verification failed</h1>
            </div>
          )}
        </div>
        <p className={styles.subtitle}>
          {status.loading
            ? "Please wait while we verify your email..."
            : status.message}
        </p>
        <div className={styles.actions}>
          {status.success ? (
            <button className={styles.resendBtn} onClick={() => navigate("/")}>
              Back to homepage
            </button>
          ) : (
            <>
              <button
                className={styles.resendBtn}
                onClick={() => navigate("/")}
              >
                Register new
              </button>
              <button
                className={styles.backBtn}
                onClick={async () => {
                  const email = window.prompt(
                    "Enter email to resend verification:"
                  );
                  if (!email) return;
                  try {
                    const r = await resendVerification(email);
                    alert(
                      r?.message ||
                        r?.data?.message ||
                        "Verification link resent"
                    );
                  } catch (err) {
                    alert(
                      err?.message ||
                        err?.payload?.data?.msg ||
                        "Failed to resend verification"
                    );
                  }
                }}
              >
                Resend link
              </button>
            </>
          )}
        </div>
        {!status.loading && !status.success && (
          <div className={styles.reasonBox}>
            <div className={styles.reasonTitle}>Possible reasons:</div>
            <ul className={styles.reasonList}>
              <li>Link expired (more than 24 hours)</li>
              <li>Link already used</li>
              <li>Invalid link</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
