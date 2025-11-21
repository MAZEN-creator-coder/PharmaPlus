import { useState, useRef, useEffect } from "react";
import Brand from "./Brand.jsx";
import NavMenu from "./NavMenu.jsx";
import RightControls from "./RightControls.jsx";
import styles from "./Navbar.module.css";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar({ onOpenLogin, fixed = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when clicking outside the navbar/menu
  useEffect(() => {
    function handleDocClick(e) {
      if (!isOpen) return;
      const node = navRef.current;
      if (!node) return;
      if (!node.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocClick);
    document.addEventListener("touchstart", handleDocClick);
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("touchstart", handleDocClick);
    };
  }, [isOpen]);

  // Listen for scroll to toggle transparency
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${fixed ? styles.navbar : styles.navbarStatic} ${
        scrolled ? styles.scrolled : ""
      }`}
      ref={navRef}
    >
      <div className={styles.container}>
        <Brand />
        {/* Menu */}
        <NavMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userRole={user?.role}
          onOpenLogin={onOpenLogin}
        />
        {/* RightControls Desktop */}
        <RightControls
          className={styles.rightControls}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onOpenLogin={onOpenLogin}
          userRole={user?.role}
        />
        {/*Burger */}
        <button
          className={styles.burger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBarsStaggered />}
        </button>
      </div>
    </nav>
  );
}
