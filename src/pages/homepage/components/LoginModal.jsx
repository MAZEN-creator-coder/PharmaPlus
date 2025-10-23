import React, { useEffect, useRef, useState } from "react";
import styles from "./LoginModal.module.css";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Added


export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const overlayRef = useRef(null);
  const [tab, setTab] = useState("login");

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regErrors, setRegErrors] = useState({});
  const [regSuccess, setRegSuccess] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');

  // Navigation hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect user based on role after login/register
  const goToRoleHome = (role) => {
    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else if (role === "superAdmin") {
      navigate("/super", { replace: true });
    } else {
      const from = location.state?.from?.pathname;
      navigate(from || "/profile", { replace: true });
    }
  };

  useEffect(() => {
    if (location.hash === "#register") setTab("register");
  }, [isOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setLoginEmail(""); setLoginPassword(""); setLoginErrors({});
      setRegName(""); setRegEmail(""); setRegPassword(""); setRegConfirm(""); setRegErrors({});
      setLoginSuccess(false); setRegSuccess(false);
      setLoginError(''); setRegError('');
    }
  }, [isOpen]);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePassword = (v, min=6) => v.length >= min;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginEmail) errs.email = "Email is required";
    else if (!validateEmail(loginEmail)) errs.email = "Please enter a valid email address";
    if (!loginPassword) errs.password = "Password is required";
    else if (!validatePassword(loginPassword, 6)) errs.password = "Password must be at least 6 characters";
    setLoginErrors(errs);
    if (Object.keys(errs).length) return;

    setLoginLoading(true);
    setLoginError('');

    // Simulate API call
    setTimeout(() => {
      try {
        // TODO: Replace this mock with real backend response later
        const roleFromBackendMock =
          loginEmail.endsWith("@admin.com") ? "admin" :
          loginEmail.endsWith("@super.com") ? "superAdmin" :
          "user";

        // Save user data to context
        const userObj = login({
          email: loginEmail,
          name: loginEmail.split('@')[0],
          avatar: '/user-avatar.png',
          role: roleFromBackendMock, // replace this with real backend role later
        });
        
        setLoginLoading(false);
        setLoginSuccess(true);

        // Redirect after login
        setTimeout(() => {
          setLoginSuccess(false);
          onClose();
          goToRoleHome(userObj.role);
        }, 600);
      } catch (error) {
        setLoginLoading(false);
        setLoginError(error.message || 'Login failed. Please try again.');
      }
    }, 900);
  };

  const onRegSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!regName || regName.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!regEmail) errs.email = "Email is required";
    else if (!validateEmail(regEmail)) errs.email = "Please enter a valid email address";
    if (!regPassword || !validatePassword(regPassword, 8)) errs.password = "Password must be at least 8 characters";
    if (!regConfirm) errs.confirm = "Please confirm your password";
    else if (regPassword !== regConfirm) errs.confirm = "Passwords do not match";
    setRegErrors(errs);
    if (Object.keys(errs).length) return;

    setRegLoading(true);
    setRegError('');

    // Simulate API call
    setTimeout(() => {
      try {
        // TODO: Replace this mock with backend response role
        const roleFromBackendMock = "user";

        const userObj = login({
          email: regEmail,
          name: regName,
          avatar: '/user-avatar.png',
          role: roleFromBackendMock,
        });

        setRegLoading(false);
        setRegSuccess(true);

        // Redirect after registration
        setTimeout(() => {
          setRegSuccess(false);
          onClose();
          goToRoleHome(userObj.role);
        }, 600);
      } catch (error) {
        setRegLoading(false);
        setRegError(error.message || 'Registration failed. Please try again.');
      }
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className={`${styles.modalOverlay} ${isOpen ? styles.active : ''}`} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>

        <div className={styles.formContainer}>
          <div className={styles.tabContainer}>
            <button className={`${styles.tab} ${tab === "login" ? styles.active : ""}`} onClick={() => setTab("login")}>Login</button>
            <button className={`${styles.tab} ${tab === "register" ? styles.active : ""}`} onClick={() => setTab("register")}>Register</button>
          </div>

          {tab === "login" && (
            <div className={`${styles.formSection} ${styles.active}`} id="loginForm">
              <h2 className={styles.formTitle}>Welcome Back</h2>
              <div className={`${styles.successMessage} ${loginSuccess ? styles.show : ""}`}>Login successful!</div>
              <div className={`${styles.errorMessage} ${loginError ? styles.show : ""}`}>{loginError}</div>
              <form id="loginFormElement" onSubmit={onLoginSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="loginEmail">Email Address</label>
                  <input 
                    id="loginEmail"
                    className={`${styles.formInput} ${loginErrors.email ? styles.error : ""}`}
                    type="email"
                    value={loginEmail}
                    onChange={(e)=>setLoginEmail(e.target.value)}
                    onBlur={() => { 
                      if (loginEmail && !validateEmail(loginEmail)) 
                        setLoginErrors(p=>({...p,email:"Please enter a valid email address"})); 
                      else 
                        setLoginErrors(p=>{ const copy={...p}; delete copy.email; return copy; }); 
                    }}
                    placeholder="Enter your email" 
                  />
                  <div className={`${styles.errorMessage} ${loginErrors.email ? styles.show : ""}`}>{loginErrors.email}</div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="loginPassword">Password</label>
                  <input 
                    id="loginPassword"
                    className={`${styles.formInput} ${loginErrors.password ? styles.error : ""}`}
                    type="password"
                    value={loginPassword}
                    onChange={(e)=>setLoginPassword(e.target.value)}
                    onBlur={() => { 
                      if (loginPassword && !validatePassword(loginPassword,6)) 
                        setLoginErrors(p=>({...p,password:"Password must be at least 6 characters"})); 
                      else 
                        setLoginErrors(p=>{ const copy={...p}; delete copy.password; return copy; }); 
                    }}
                    placeholder="Enter your password" 
                  />
                  <div className={`${styles.errorMessage} ${loginErrors.password ? styles.show : ""}`}>{loginErrors.password}</div>
                </div>

                {/* Optional: you can add a role select for testing if needed */}

                <button className={styles.submitBtn} type="submit" disabled={loginLoading}>
                  {loginLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className={styles.forgotPassword}>
                <a href="#" onClick={(e)=>{e.preventDefault(); alert("Forgot password flow")}}>
                  Forgot your password?
                </a>
              </div>
              <div className={styles.divider}><span>or continue with</span></div>
              <div className={styles.socialLogin}>
                <button className={styles.socialBtn} onClick={()=>alert("Google login")}>🔍 Google</button>
                <button className={styles.socialBtn} onClick={()=>alert("Facebook login")}>📘 Facebook</button>
              </div>
            </div>
          )}

          {tab === "register" && (
            <div className={`${styles.formSection} ${styles.active}`} id="registerForm">
              <h2 className={styles.formTitle}>Create Account</h2>
              <div className={`${styles.successMessage} ${regSuccess ? styles.show : ""}`}>Registration successful!</div>
              <div className={`${styles.errorMessage} ${regError ? styles.show : ""}`}>{regError}</div>
              <form id="registerFormElement" onSubmit={onRegSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="registerName">Full Name</label>
                  <input 
                    id="registerName"
                    className={`${styles.formInput} ${regErrors.name ? styles.error : ""}`}
                    type="text"
                    value={regName}
                    onChange={(e)=>setRegName(e.target.value)}
                    placeholder="Enter your full name" 
                  />
                  <div className={`${styles.errorMessage} ${regErrors.name ? styles.show : ""}`}>{regErrors.name}</div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="registerEmail">Email Address</label>
                  <input 
                    id="registerEmail"
                    className={`${styles.formInput} ${regErrors.email ? styles.error : ""}`}
                    type="email"
                    value={regEmail}
                    onChange={(e)=>setRegEmail(e.target.value)}
                    onBlur={()=>{ 
                      if (regEmail && !validateEmail(regEmail)) 
                        setRegErrors(p=>({...p,email:"Please enter a valid email address"})); 
                      else 
                        setRegErrors(p=>{ const c={...p}; delete c.email; return c; }); 
                    }}
                    placeholder="Enter your email" 
                  />
                  <div className={`${styles.errorMessage} ${regErrors.email ? styles.show : ""}`}>{regErrors.email}</div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="registerPassword">Password</label>
                  <input 
                    id="registerPassword"
                    className={`${styles.formInput} ${regErrors.password ? styles.error : ""}`}
                    type="password"
                    value={regPassword}
                    onChange={(e)=>setRegPassword(e.target.value)}
                    onBlur={()=>{ 
                      if (regPassword && !validatePassword(regPassword,8)) 
                        setRegErrors(p=>({...p,password:"Password must be at least 8 characters"})); 
                      else 
                        setRegErrors(p=>{ const c={...p}; delete c.password; return c; }); 
                    }}
                    placeholder="Create a password" 
                  />
                  <div className={`${styles.errorMessage} ${regErrors.password ? styles.show : ""}`}>{regErrors.password}</div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input 
                    id="confirmPassword"
                    className={`${styles.formInput} ${regErrors.confirm ? styles.error : ""}`}
                    type="password"
                    value={regConfirm}
                    onChange={(e)=>setRegConfirm(e.target.value)}
                    onBlur={()=>{ 
                      if (regConfirm && regPassword !== regConfirm) 
                        setRegErrors(p=>({...p,confirm:"Passwords do not match"})); 
                      else 
                        setRegErrors(p=>{ const c={...p}; delete c.confirm; return c; }); 
                    }}
                    placeholder="Confirm your password" 
                  />
                  <div className={`${styles.errorMessage} ${regErrors.confirm ? styles.show : ""}`}>{regErrors.confirm}</div>
                </div>

                <button className={styles.submitBtn} type="submit" disabled={regLoading}>
                  {regLoading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className={styles.divider}><span>or continue with</span></div>
              <div className={styles.socialLogin}>
                <button className={styles.socialBtn} onClick={()=>alert("Google register")}>🔍 Google</button>
                <button className={styles.socialBtn} onClick={()=>alert("Facebook register")}>📘 Facebook</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}