import { useState } from "react";
import styles from "./Navbar.module.css";
export default function AuthWidget() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  if (!user) {
    return (
      <button
        className={styles.signupButton}
        onClick={() => setUser({ name: "Noha", avatar: "../../public/avatar.webp" })}
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
        <span className={styles.caret}>▾</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          <button className={styles.dropdownItem}>Profile</button>
          <button className={styles.dropdownItem} onClick={() => setUser(null)}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
