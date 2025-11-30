import React, { useEffect, useRef, useState } from "react";
import styles from "./LoginModal.module.css";
import { useAuth } from "../../../hooks/useAuth";
import postLogin from "../../../shared/api/postLogin";
import postUser from "../../../shared/api/postUser";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../../../components/common/Toast";

export default function LoginModal({ isOpen, onClose }) {
  const { loginWithToken } = useAuth();
  const overlayRef = useRef(null);
  const [tab, setTab] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [toast, setToast] = useState(null);

  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRole, setRegRole] = useState("user"); // user or admin
  const [regDob, setRegDob] = useState(""); // For user and admin
  const [regAddress, setRegAddress] = useState(""); // For user and admin
  const [regLicense, setRegLicense] = useState(""); // For admin only
  const [regLatitude, setRegLatitude] = useState("");
  const [regLongitude, setRegLongitude] = useState("");
  const [regErrors, setRegErrors] = useState({});
  const [regSuccess, setRegSuccess] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");

  // Navigation hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect handled by AuthProvider via `loginWithToken` (role is derived from the JWT payload)

  useEffect(() => {
    if (location.hash === "#register") setTab("register");
  }, [isOpen, location]);

  // Get user's geolocation when admin role is selected
  useEffect(() => {
    if (regRole === "admin" && (!regLatitude || !regLongitude)) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setRegLatitude(position.coords.latitude.toString());
            setRegLongitude(position.coords.longitude.toString());
          },
          (error) => {
            console.error("Geolocation error:", error);
            setRegError("Failed to get location. Please enable geolocation.");
          }
        );
      } else {
        setRegError("Geolocation is not supported by your browser.");
      }
    }
  }, [regRole]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setLoginEmail("");
      setLoginPassword("");
      setLoginErrors({});
      setRegFirstName("");
      setRegLastName("");
      setRegEmail("");
      setRegPassword("");
      setRegConfirm("");
      setRegPhone("");
      setRegRole("user");
      setRegDob("");
      setRegAddress("");
      setRegLicense("");
      setRegLatitude("");
      setRegLongitude("");
      setRegErrors({});
      setLoginSuccess(false);
      setRegSuccess(false);
      setLoginError("");
      setRegError("");
    }
  }, [isOpen]);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePassword = (v, min = 6) => v.length >= min;
  const validatePhone = (v) => /^\+?[0-9]{7,15}$/.test(v); // يسمح بالـ + اختياريًا ثم 7-15 رقم

  // Extract user-friendly message and optional field errors from API errors
  const parseApiError = (error) => {
    try {
      const payload = error && error.payload ? error.payload : null;
      // payload may contain { status, data: { msg: '...' } } or { message }
      const status =
        error && error.status
          ? error.status
          : (payload && payload.status) || null;

      // prefer payload.data.msg (backend sample), then payload.message, then error.message
      const backendMsg =
        payload && payload.data && (payload.data.msg || payload.data.message);
      const message =
        backendMsg ||
        (payload && (payload.message || payload.error)) ||
        error.message ||
        "Request failed";

      // if payload contains field-level errors (common shapes), try to map them
      let fieldErrors = null;
      // Example: payload.data.errors = { email: 'Invalid', password: '...' }
      if (
        payload &&
        payload.data &&
        typeof payload.data.errors === "object" &&
        !Array.isArray(payload.data.errors)
      ) {
        fieldErrors = payload.data.errors;
      } else if (
        payload &&
        payload.errors &&
        typeof payload.errors === "object" &&
        !Array.isArray(payload.errors)
      ) {
        fieldErrors = payload.errors;
      }

      return {
        message: status ? `Error (${status}): ${message}` : message,
        fieldErrors,
      };
    } catch {
      return { message: error?.message || "Request failed", fieldErrors: null };
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginEmail) errs.email = "Email is required";
    else if (!validateEmail(loginEmail))
      errs.email = "Please enter a valid email address";
    if (!loginPassword) errs.password = "Password is required";
    else if (!validatePassword(loginPassword, 6))
      errs.password = "Password must be at least 6 characters";
    setLoginErrors(errs);
    if (Object.keys(errs).length) return;

    setLoginLoading(true);
    setLoginError("");

    (async () => {
      try {
        const payload = await postLogin({
          email: loginEmail,
          password: loginPassword,
        });
        const token = payload?.data?.token;
        if (!token) throw new Error("No token returned from server");

        // Delegate token handling to AuthContext
        await loginWithToken(token);

        // prefer backend message if available
        const msg =
          payload?.data?.msg || payload?.message || "Login successful!";
        setToast({ message: msg, type: "success" });

        setLoginLoading(false);
        setLoginSuccess(true);

        // close modal briefly after success (AuthProvider will redirect)
        setTimeout(() => {
          setLoginSuccess(false);
          onClose();
        }, 600);
      } catch (error) {
        setLoginLoading(false);
        const { message, fieldErrors } = parseApiError(error);
        if (fieldErrors)
          setLoginErrors((prev) => ({ ...prev, ...fieldErrors }));
        setLoginError(message || "Login failed. Please try again.");
      }
    })();
  };

  const onRegSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!regFirstName || regFirstName.trim().length < 2)
      errs.firstName = "First name must be at least 2 characters";
    if (!regLastName || regLastName.trim().length < 2)
      errs.lastName = "Last name must be at least 2 characters";
    if (!regEmail) errs.email = "Email is required";
    else if (!validateEmail(regEmail))
      errs.email = "Please enter a valid email address";
    if (!regPassword || !validatePassword(regPassword, 8))
      errs.password = "Password must be at least 8 characters";
    if (!regConfirm) errs.confirm = "Please confirm your password";
    else if (regPassword !== regConfirm)
      errs.confirm = "Passwords do not match";
    if (!regPhone) errs.phone = "Mobile number is required";
    else if (!validatePhone(regPhone))
      errs.phone =
        "Please enter a valid phone number (7-15 digits, optional +)";

    // Common fields for user and admin
    if (!regDob) errs.dob = "Date of birth is required";
    if (!regAddress || regAddress.trim().length < 3)
      errs.address = "Address is required (at least 3 characters)";

    // Admin-specific fields
    if (regRole === "admin") {
      if (!regLicense || regLicense.trim().length < 3)
        errs.license = "License is required";
      if (!regLatitude || regLatitude === "")
        errs.latitude = "Latitude is required - enable location access";
      if (!regLongitude || regLongitude === "")
        errs.longitude = "Longitude is required - enable location access";
    }

    setRegErrors(errs);
    if (Object.keys(errs).length) return;

    setRegLoading(true);
    setRegError("");

    (async () => {
      try {
        const form = new FormData();
        form.append("firstname", regFirstName.trim());
        form.append("lastname", regLastName.trim());
        form.append("email", regEmail.trim());
        form.append("password", regPassword);
        form.append("role", regRole);
        form.append("phone", regPhone.trim());
        form.append("dob", regDob);
        form.append("address", regAddress.trim());

        if (regRole === "admin") {
          form.append("license", regLicense.trim());
          form.append("latitude", regLatitude);
          form.append("longitude", regLongitude);
        }

        // Debug: Log the form data
        console.log("Sending registration data:", {
          firstname: regFirstName.trim(),
          lastname: regLastName.trim(),
          email: regEmail.trim(),
          password: "***",
          role: regRole,
          phone: regPhone.trim(),
          dob: regDob,
          address: regAddress.trim(),
          ...(regRole === "admin" && {
            license: regLicense.trim(),
            latitude: regLatitude,
            longitude: regLongitude,
          }),
        });

        const payload = await postUser(form);
        const token = payload?.data?.token;

        if (token) {
          // delegate token handling to AuthContext
          await loginWithToken(token);
          const msg =
            payload?.data?.msg ||
            payload?.message ||
            "Registration successful!";
          setToast({ message: msg, type: "success" });
          setRegLoading(false);
          setRegSuccess(true);
          setTimeout(() => {
            setRegSuccess(false);
            onClose();
          }, 600);
        } else {
          // No token returned (email verification required) -> redirect to verification page
          const emailToShow = payload?.data?.user?.email || regEmail;
          setToast({
            message:
              payload?.data?.msg ||
              payload?.message ||
              "Registration successful. Please verify your email.",
            type: "info",
          });
          setRegLoading(false);
          setRegSuccess(true);
          // Navigate to the verification page while preserving the user's email in query string
          setTimeout(() => {
            setRegSuccess(false);
            onClose();
            navigate(`/verify-email?email=${encodeURIComponent(emailToShow)}`);
          }, 400);
        }
      } catch (error) {
        setRegLoading(false);
        const { message, fieldErrors } = parseApiError(error);
        if (fieldErrors) setRegErrors((prev) => ({ ...prev, ...fieldErrors }));
        setRegError(message || "Registration failed. Please try again.");
      }
    })();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={`${styles.modalOverlay} ${isOpen ? styles.active : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className={styles.formContainer}>
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tab} ${
                tab === "login" ? styles.active : ""
              }`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              className={`${styles.tab} ${
                tab === "register" ? styles.active : ""
              }`}
              onClick={() => setTab("register")}
            >
              Register
            </button>
          </div>

          {tab === "login" && (
            <div
              className={`${styles.formSection} ${styles.active}`}
              id="loginForm"
            >
              <h2 className={styles.formTitle}>Welcome Back</h2>
              <div
                className={`${styles.successMessage} ${
                  loginSuccess ? styles.show : ""
                }`}
              >
                Login successful!
              </div>
              {loginError && (
                <div
                  className={`${styles.alertBox} ${styles.alertError}`}
                  role="alert"
                >
                  <div className={styles.alertIcon}>!</div>
                  <div className={styles.alertContent}>{loginError}</div>
                  <button
                    className={styles.alertClose}
                    onClick={() => setLoginError("")}
                    aria-label="Dismiss"
                  >
                    ×
                  </button>
                </div>
              )}
              <form id="loginFormElement" onSubmit={onLoginSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="loginEmail">Email Address</label>
                  <input
                    id="loginEmail"
                    className={`${styles.formInput} ${
                      loginErrors.email ? styles.error : ""
                    }`}
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    onBlur={() => {
                      if (loginEmail && !validateEmail(loginEmail))
                        setLoginErrors((p) => ({
                          ...p,
                          email: "Please enter a valid email address",
                        }));
                      else
                        setLoginErrors((p) => {
                          const copy = { ...p };
                          delete copy.email;
                          return copy;
                        });
                    }}
                    placeholder="Enter your email"
                  />
                  <div
                    className={`${styles.errorMessage} ${
                      loginErrors.email ? styles.show : ""
                    }`}
                  >
                    {loginErrors.email}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    id="loginPassword"
                    className={`${styles.formInput} ${
                      loginErrors.password ? styles.error : ""
                    }`}
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onBlur={() => {
                      if (loginPassword && !validatePassword(loginPassword, 6))
                        setLoginErrors((p) => ({
                          ...p,
                          password: "Password must be at least 6 characters",
                        }));
                      else
                        setLoginErrors((p) => {
                          const copy = { ...p };
                          delete copy.password;
                          return copy;
                        });
                    }}
                    placeholder="Enter your password"
                  />
                  <div
                    className={`${styles.errorMessage} ${
                      loginErrors.password ? styles.show : ""
                    }`}
                  >
                    {loginErrors.password}
                  </div>
                </div>

                <button
                  className={styles.submitBtn}
                  type="submit"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className={styles.forgotPassword}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onClose === "function") onClose();
                    navigate("/forgot-password");
                  }}
                >
                  Forgot your password?
                </a>
              </div>
              <div className={styles.divider}>
                <span>or continue with</span>
              </div>
              <div className={styles.socialLogin}>
                <button
                  className={styles.socialBtn}
                  onClick={() => alert("Google login")}
                >
                  {" "}
                  Google
                </button>
                <button
                  className={styles.socialBtn}
                  onClick={() => alert("Facebook login")}
                >
                  {" "}
                  Facebook
                </button>
              </div>
            </div>
          )}

          {tab === "register" && (
            <div
              className={`${styles.formSection} ${styles.active}`}
              id="registerForm"
            >
              <h2 className={styles.formTitle}>Create Account</h2>
              <div
                className={`${styles.successMessage} ${
                  regSuccess ? styles.show : ""
                }`}
              >
                Registration successful!
              </div>
              {regError && (
                <div
                  className={`${styles.alertBox} ${styles.alertError}`}
                  role="alert"
                >
                  <div className={styles.alertIcon}>!</div>
                  <div className={styles.alertContent}>{regError}</div>
                  <button
                    className={styles.alertClose}
                    onClick={() => setRegError("")}
                    aria-label="Dismiss"
                  >
                    ×
                  </button>
                </div>
              )}
              <form id="registerFormElement" onSubmit={onRegSubmit}>
                {/* Role Selection Dropdown */}
                <div className={styles.formGroup}>
                  <label htmlFor="registerRole">Account Type</label>
                  <select
                    id="registerRole"
                    className={styles.formInput}
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                  >
                    <option value="user">User (Customer)</option>
                    <option value="admin">Admin (Pharmacy Owner)</option>
                  </select>
                </div>

                <div
                  className={styles.formGroup}
                  style={{ display: "flex", gap: "12px" }}
                >
                  <div style={{ flex: 1 }}>
                    <label htmlFor="registerFirstName">First Name</label>
                    <input
                      id="registerFirstName"
                      className={`${styles.formInput} ${
                        regErrors.firstName ? styles.error : ""
                      }`}
                      type="text"
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                      onBlur={() => {
                        if (regFirstName && regFirstName.trim().length < 2)
                          setRegErrors((p) => ({
                            ...p,
                            firstName:
                              "First name must be at least 2 characters",
                          }));
                        else
                          setRegErrors((p) => {
                            const c = { ...p };
                            delete c.firstName;
                            return c;
                          });
                      }}
                      placeholder="First name"
                    />
                    <div
                      className={`${styles.errorMessage} ${
                        regErrors.firstName ? styles.show : ""
                      }`}
                    >
                      {regErrors.firstName}
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <label htmlFor="registerLastName">Last Name</label>
                    <input
                      id="registerLastName"
                      className={`${styles.formInput} ${
                        regErrors.lastName ? styles.error : ""
                      }`}
                      type="text"
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                      onBlur={() => {
                        if (regLastName && regLastName.trim().length < 2)
                          setRegErrors((p) => ({
                            ...p,
                            lastName: "Last name must be at least 2 characters",
                          }));
                        else
                          setRegErrors((p) => {
                            const c = { ...p };
                            delete c.lastName;
                            return c;
                          });
                      }}
                      placeholder="Last name"
                    />
                    <div
                      className={`${styles.errorMessage} ${
                        regErrors.lastName ? styles.show : ""
                      }`}
                    >
                      {regErrors.lastName}
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="registerEmail">Email Address</label>
                  <input
                    id="registerEmail"
                    className={`${styles.formInput} ${
                      regErrors.email ? styles.error : ""
                    }`}
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    onBlur={() => {
                      if (regEmail && !validateEmail(regEmail))
                        setRegErrors((p) => ({
                          ...p,
                          email: "Please enter a valid email address",
                        }));
                      else
                        setRegErrors((p) => {
                          const c = { ...p };
                          delete c.email;
                          return c;
                        });
                    }}
                    placeholder="Enter your email"
                  />
                  <div
                    className={`${styles.errorMessage} ${
                      regErrors.email ? styles.show : ""
                    }`}
                  >
                    {regErrors.email}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="registerPhone">Mobile Number</label>
                  <input
                    id="registerPhone"
                    className={`${styles.formInput} ${
                      regErrors.phone ? styles.error : ""
                    }`}
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    onBlur={() => {
                      if (regPhone && !validatePhone(regPhone))
                        setRegErrors((p) => ({
                          ...p,
                          phone:
                            "Please enter a valid phone number (7-15 digits, optional +)",
                        }));
                      else
                        setRegErrors((p) => {
                          const c = { ...p };
                          delete c.phone;
                          return c;
                        });
                    }}
                    placeholder="+201234567890 or 01234567890"
                  />
                  <div
                    className={`${styles.errorMessage} ${
                      regErrors.phone ? styles.show : ""
                    }`}
                  >
                    {regErrors.phone}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="registerPassword">Password</label>
                  <input
                    id="registerPassword"
                    className={`${styles.formInput} ${
                      regErrors.password ? styles.error : ""
                    }`}
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    onBlur={() => {
                      if (regPassword && !validatePassword(regPassword, 8))
                        setRegErrors((p) => ({
                          ...p,
                          password: "Password must be at least 8 characters",
                        }));
                      else
                        setRegErrors((p) => {
                          const c = { ...p };
                          delete c.password;
                          return c;
                        });
                    }}
                    placeholder="Create a password"
                  />
                  <div
                    className={`${styles.errorMessage} ${
                      regErrors.password ? styles.show : ""
                    }`}
                  >
                    {regErrors.password}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    className={`${styles.formInput} ${
                      regErrors.confirm ? styles.error : ""
                    }`}
                    type="password"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    onBlur={() => {
                      if (regConfirm && regPassword !== regConfirm)
                        setRegErrors((p) => ({
                          ...p,
                          confirm: "Passwords do not match",
                        }));
                      else
                        setRegErrors((p) => {
                          const c = { ...p };
                          delete c.confirm;
                          return c;
                        });
                    }}
                    placeholder="Confirm your password"
                  />
                  <div
                    className={`${styles.errorMessage} ${
                      regErrors.confirm ? styles.show : ""
                    }`}
                  >
                    {regErrors.confirm}
                  </div>
                </div>

                {/* Common Fields for User and Admin */}
                <div className={styles.formGroup}>
                  <label htmlFor="registerDob">Date of Birth</label>
                  <input
                    id="registerDob"
                    className={`${styles.formInput} ${
                      regErrors.dob ? styles.error : ""
                    }`}
                    type="date"
                    value={regDob}
                    onChange={(e) => setRegDob(e.target.value)}
                    onBlur={() => {
                      if (!regDob)
                        setRegErrors((p) => ({
                          ...p,
                          dob: "Date of birth is required",
                        }));
                      else
                        setRegErrors((p) => {
                          const c = { ...p };
                          delete c.dob;
                          return c;
                        });
                    }}
                  />
                  <div
                    className={`${styles.errorMessage} ${
                      regErrors.dob ? styles.show : ""
                    }`}
                  >
                    {regErrors.dob}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="registerAddress">Address</label>
                  <input
                    id="registerAddress"
                    className={`${styles.formInput} ${
                      regErrors.address ? styles.error : ""
                    }`}
                    type="text"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    onBlur={() => {
                      if (regAddress && regAddress.trim().length < 3)
                        setRegErrors((p) => ({
                          ...p,
                          address: "Address must be at least 3 characters",
                        }));
                      else
                        setRegErrors((p) => {
                          const c = { ...p };
                          delete c.address;
                          return c;
                        });
                    }}
                    placeholder="Enter your full address"
                  />
                  <div
                    className={`${styles.errorMessage} ${
                      regErrors.address ? styles.show : ""
                    }`}
                  >
                    {regErrors.address}
                  </div>
                </div>

                {/* Admin-Only Fields */}
                {regRole === "admin" && (
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="registerLicense">License Number</label>
                      <input
                        id="registerLicense"
                        className={`${styles.formInput} ${
                          regErrors.license ? styles.error : ""
                        }`}
                        type="text"
                        value={regLicense}
                        onChange={(e) => setRegLicense(e.target.value)}
                        onBlur={() => {
                          if (regLicense && regLicense.trim().length < 3)
                            setRegErrors((p) => ({
                              ...p,
                              license: "License must be at least 3 characters",
                            }));
                          else
                            setRegErrors((p) => {
                              const c = { ...p };
                              delete c.license;
                              return c;
                            });
                        }}
                        placeholder="Enter pharmacy license number"
                      />
                      <div
                        className={`${styles.errorMessage} ${
                          regErrors.license ? styles.show : ""
                        }`}
                      >
                        {regErrors.license}
                      </div>
                    </div>

                    {/* Hidden inputs for latitude and longitude - auto-filled, not shown to user */}
                    <input type="hidden" value={regLatitude} readOnly />
                    <input type="hidden" value={regLongitude} readOnly />
                  </>
                )}

                <button
                  className={styles.submitBtn}
                  type="submit"
                  disabled={regLoading}
                >
                  {regLoading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className={styles.divider}>
                <span>or continue with</span>
              </div>
              <div className={styles.socialLogin}>
                <button
                  className={styles.socialBtn}
                  onClick={() => alert("Google register")}
                >
                  {" "}
                  Google
                </button>
                <button
                  className={styles.socialBtn}
                  onClick={() => alert("Facebook register")}
                >
                  {" "}
                  Facebook
                </button>
              </div>
            </div>
          )}
        </div>
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
