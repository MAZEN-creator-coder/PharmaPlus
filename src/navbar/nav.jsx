import { useState } from "react";
import { FaStarOfLife, FaCartShopping } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./nav.module.css";

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <FaStarOfLife />
        <h1>Pharmaplus</h1>
      </div>

      <ul className={`${styles.navList} ${showMenu ? styles.active : ""}`}>
        <li>Home</li>
        <li>Search Medicine</li>
        <li>Chat</li>
      </ul>

      <GiHamburgerMenu className={styles.menu} onClick={toggleMenu} />

      <div className={styles.other}>
        <FaCartShopping />
        {true ? (<MdPerson />) : (<button className={styles.btn}>Login/Sign</button>)}
        <img src="/avatrer.webp" alt="profile image" />
      </div>
    </nav>
  );
}
