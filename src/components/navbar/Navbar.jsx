import Brand from "./Brand.jsx";
import NavMenu from "./NavMenu.jsx";
import RightControls from "./RightControls.jsx";
import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Brand />
        <NavMenu />
        <RightControls />
      </div>
    </nav>
  );
}
