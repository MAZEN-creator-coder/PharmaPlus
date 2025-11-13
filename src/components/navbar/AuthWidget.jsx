import React, { useEffect, useState, useRef } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

export default function AuthWidget({ isOpen, setIsOpen, onOpenLogin }) {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [displayName, setDisplayName] = useState(() => {
    const first = user?.firstName ?? user?.firstname ?? user?.first_name;
    const last = user?.lastName ?? user?.lastname ?? user?.last_name;
    if (first || last) return `${first || ''} ${last || ''}`.trim();
    if (user?.name) return user.name;
    return '';
  });
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (onOpenLogin) onOpenLogin();
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    if (isOpen && setIsOpen) setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Keep displayName in sync with user from AuthContext
  useEffect(() => {
    const first = user?.firstName ?? user?.firstname ?? user?.first_name;
    const last = user?.lastName ?? user?.lastname ?? user?.last_name;
    if (first || last) {
      setDisplayName(`${first || ''} ${last || ''}`.trim());
      return;
    }

    if (user?.name) {
      setDisplayName(user.name);
      return;
    }
    // If no name/first+last available, leave empty
    setDisplayName('');
  }, [user]);


  //  AuthWidget only reads `user` and `profileLoading`.
  if (isLoading) {
    return (
      <button className={styles.signupButton} disabled>
        Loading...
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <button className={styles.signupButton} onClick={handleLoginClick}>
        Login
      </button>
    );
  }

  return (
    <div className={styles.userBox} ref={dropdownRef}>
      {/* Desktop: button toggles dropdown */}
      <button 
        className={styles.userTrigger} 
        onClick={() => setOpen((v) => !v)}
      >
        <img
          src={`http://localhost:3000/${user?.avatar || "uploads/avatar.webp"}`}
          alt="profile"
          className={styles.avatar}
        />
        <span>
          {(displayName && displayName !== '') ? displayName : "Loading…"}
        </span>
        <motion.div
          className={styles.caret}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FaChevronDown />
        </motion.div>
      </button>

      {/* Desktop: Dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Link
              to="/profile"
              className={styles.dropdownItem}
              onClick={() => {
                setOpen(false);
                if (isOpen && setIsOpen) setIsOpen(false);
              }}
            >
              Profile
            </Link>
            <button className={styles.dropdownItem} onClick={handleLogout}>
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: Link to profile + logout button */}
      <div className={styles.mobileAuthContainer}>
        <Link 
          to="/profile" 
          className={styles.mobileProfileLink}
          onClick={() => {
            if (isOpen && setIsOpen) setIsOpen(false);
          }}
        >
          <img
            src={`http://localhost:3000/${user?.avatar || "uploads/avatar.webp"}`}
            alt="profile"
            className={styles.avatar}
          />
          <span>{(displayName && displayName !== '') ? displayName : "Loading…"}</span>
        </Link>
        <button 
          className={styles.mobileLogoutBtn}
          onClick={() => {
            handleLogout();
            if (isOpen && setIsOpen) setIsOpen(false);
          }}
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
