import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion as Motion, useSpring } from "framer-motion";
import RightControls from "./RightControls.jsx";
import styles from "./Navbar.module.css";

// Define the links for each role
const USER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/search-medicine", label: "Search Medicine" },
  { to: "/upload-prescription", label: "Upload Prescription" },
];

const ADMIN_LINKS = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/medicine-management", label: "Medicines" },
  { to: "/admin/orders", label: "Orders" },
];

const SUPER_ADMIN_LINKS = [
  { to: "/super", label: "Dashboard" },
  { to: "/super/pharmacies-management", label: "Pharmacies" },
  { to: "/super/reports", label: "Reports" },
  { to: "/super/global-analytics", label: "Analytics" },
];

export default function NavMenu({ isOpen, setIsOpen, userRole, onOpenLogin }) {
  const location = useLocation();
  const listRef = useRef(null);
  const linkRefs = useRef({});
  const [target, setTarget] = useState({ x: 0, w: 0 });

  // springs for smooth motion
  const x = useSpring(0, { stiffness: 140, damping: 28, mass: 1 });
  const w = useSpring(0, { stiffness: 160, damping: 32, mass: 1 });

  const visibleLinks =
    userRole === "admin"
      ? ADMIN_LINKS
      : userRole === "superAdmin"
      ? SUPER_ADMIN_LINKS
      : USER_LINKS;

  useEffect(() => {
    const visibleLinksLocal = visibleLinks;

    const recalc = () => {
      const current =
        visibleLinksLocal.find((l) => location.pathname === l.to)?.to ||
        visibleLinksLocal.find((l) => location.pathname.startsWith(l.to))?.to ||
        visibleLinksLocal[0].to;

      const a = linkRefs.current[current];
      if (!a || !listRef.current) return;

      const li = a.parentElement;
      setTarget({ x: li.offsetLeft, w: li.offsetWidth });
    };

    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [location.pathname, userRole, visibleLinks]);

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
        <Motion.span
          className={styles.indicator}
          style={{ x, width: w }}
          aria-hidden="true"
        />

        {visibleLinks.map(({ to, label }) => (
          <li key={to} className={styles.item}>
            <NavLink
              to={to}
              ref={(el) => (linkRefs.current[to] = el)}
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => isOpen && setIsOpen(false)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {isOpen && (
        <>
          <div className={styles.mobileSeparator}></div>
          <div className={styles.mobileRightControls}>
            <RightControls
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onOpenLogin={onOpenLogin}
            />
          </div>
        </>
      )}
    </nav>
  );
}
