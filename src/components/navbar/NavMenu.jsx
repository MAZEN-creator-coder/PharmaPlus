// src/components/navbar/NavMenu.jsx
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import RightControls from "./RightControls.jsx";
import styles from "./Navbar.module.css";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/search-medicine", label: "Search Medicine" },
  { to: "/upload-prescription", label: "Upload Prescription" },
  { to: "/blog", label: "Blog" },
];

export default function NavMenu({ isOpen, setIsOpen }) {
  const location = useLocation();
  const listRef = useRef(null);
  const linkRefs = useRef({});
  const [target, setTarget] = useState({ x: 0, w: 0 });

  const x = useSpring(0, { stiffness: 120, damping: 26, mass: 1 });
  const w = useSpring(0, { stiffness: 140, damping: 28, mass: 1 });

  function recalc() {
    const current =
      LINKS.find((l) => location.pathname === l.to)?.to ||
      LINKS.find((l) => location.pathname.startsWith(l.to))?.to ||
      LINKS[0].to;

    const a = linkRefs.current[current];
    if (!a || !listRef.current) return;

    const li = a.parentElement; // <li> أدق لأن فيه padding اللينك
    setTarget({ x: li.offsetLeft, w: li.offsetWidth });
  }

  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [location.pathname]);

  // حرّكي الـ springs عند تغيّر الهدف
  useEffect(() => {
    x.set(target.x);
    w.set(target.w);
  }, [target, x, w]);

  return (
    <nav
      aria-label="Primary"
      className={`${styles.navMenu} ${isOpen ? styles.open : ""}`}
    >
      <ul ref={listRef} className={styles.navbarMenu}>
        {/* Indicator spring */}
        <motion.span
          className={styles.indicator}
          style={{ x, width: w }}
          aria-hidden="true"
        />
        {LINKS.map(({ to, label }) => (
          <li key={to} className={styles.item}>
            <NavLink
              to={to}
              ref={(el) => (linkRefs.current[to] = el)}
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => isOpen && setIsOpen(false)}
              // لو عايزة تتبع الـ hover مؤقتًا:
              // onMouseEnter={() => {
              //   const a = linkRefs.current[to];
              //   if (!a || !listRef.current) return;
              //   const li = a.parentElement;
              //   x.set(li.offsetLeft);
              //   w.set(li.offsetWidth);
              // }}
              // onMouseLeave={() => recalc()}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      
      {/* Mobile separator and right controls */}
      {isOpen && (
        <>
          <div className={styles.mobileSeparator}></div>
          <div className={styles.mobileRightControls}>
            <RightControls isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </>
      )}
    </nav>
  );
}
