import logo from '../../assets/img/logo.png';
import styles from './Navbar.module.css';
import {motion} from 'framer-motion';

export default function Brand() {
  return (
    <a className={styles.brand} href="/" aria-label="Go to homepage">
      <motion.img 
        initial={{ y: -70 }} 
        animate={{ y: 0 }} 
        transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
        src={logo} 
        alt="PharmaPlus store logo"  
        className={styles.logo} />
    </a>
  );
}
