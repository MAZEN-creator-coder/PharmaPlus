import logo from '../../assets/img/logo.png';
import styles from './Navbar.module.css';

export default function Brand() {
  return (
    <a className={styles.brand} href="/" aria-label="Go to homepage">
      <img src={logo} alt="Furniture store logo"  className={styles.logo} />
    </a>
  );
}
