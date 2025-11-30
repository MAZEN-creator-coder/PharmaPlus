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
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 999,
                  background: "#ecfdf3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
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
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 999,
                  background: "#fff1f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                >
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <h1 className={styles.title}>Verification failed</h1>
            </div>
          )}
        </div>
        <p style={{ color: "#475569" }}>
          {status.loading
            ? "Please wait while we verify your email..."
            : status.message}
        </p>
        <div style={{ marginTop: 14 }}>
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
          <div
            style={{
              marginTop: 18,
              background: "#fffbeb",
              borderRadius: 8,
              padding: 12,
              color: "#92400e",
            }}
          >
            <strong>Possible reasons:</strong>
            <ul style={{ marginTop: 6, marginBottom: 0 }}>
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
