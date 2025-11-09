import { useState } from "react";
import Brand from "./Brand.jsx";
import NavMenu from "./NavMenu.jsx";
import RightControls from "./RightControls.jsx";
import styles from "./Navbar.module.css";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";


export default function Navbar({ onOpenLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Brand />

        {/* Menu */}
        <NavMenu isOpen={isOpen} setIsOpen={setIsOpen} userRole={user?.role}/>
        {/* RightControls نسخة الديسكتوب */}
        <RightControls 
          className={styles.rightControls} 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          onOpenLogin={onOpenLogin}  
          userRole={user?.role} />
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
