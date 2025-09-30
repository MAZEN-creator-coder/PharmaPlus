import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthWidget() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <button
        className={styles.signupButton}
        onClick={() =>
          setUser({ name: "Noha", avatar: "../../public/avatar.webp" })
        }
      >
        Sign Up
      </button>
    );
  }

  return (
    <div className={styles.userBox}>
      <button className={styles.userTrigger} onClick={() => setOpen((v) => !v)}>
        <img src={user.avatar} alt="profile" className={styles.avatar} />
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
            <Link to="/profile" className={styles.dropdownItem}>
              Profile
            </Link>
            <button
              className={styles.dropdownItem}
              onClick={() => setUser(null)}
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
