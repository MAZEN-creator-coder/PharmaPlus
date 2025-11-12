import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

export default function AuthWidget({ isOpen, setIsOpen, onOpenLogin }) {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (onOpenLogin) {
      onOpenLogin();
    }
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

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <button
        className={styles.signupButton}
        disabled
      >
        Loading...
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <button
        className={styles.signupButton}
        onClick={handleLoginClick}
      >
        Login
      </button>
    );
  }


   console.log('user in AuthWidget', user);
  return (
    <div className={styles.userBox} ref={dropdownRef}>
      <button className={styles.userTrigger} onClick={() => setOpen((v) => !v)}>
        <img src={`http://localhost:3000/${user?.avatar || 'uploads/avatar.webp'}`} alt="profile" className={styles.avatar} />
        <span>{user.name}</span>

        {/* السهم بيتحرك */}
        <motion.div
          className={styles.caret}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FaChevronDown />
        </motion.div>
      </button>

      {/* القائمة المنسدلة */}
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
            <button
              className={styles.dropdownItem}
              onClick={handleLogout}
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
