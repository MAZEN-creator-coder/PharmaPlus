import ChatButton from "./ChatButton";
import CartButton from "./CartButton";
import AuthWidget from "./AuthWidget";
import styles from "./Navbar.module.css";
import {motion} from 'framer-motion';

export default function RightControls({ onOpenLogin, isOpen, className, setIsOpen }) {
  return (
    <motion.div 
    initial={{
        opacity: 0,
        scaleX: 0.8
      }}
      animate={{
        opacity: 1,
        scaleX: 1,
        transition: { type: 'spring', stiffness: 120, damping: 20 }
      }}
    className={`${className} ${isOpen ? styles.open : ""}`}>
      <ChatButton onOpenLogin={onOpenLogin} />
      <CartButton onOpenLogin={onOpenLogin} />
      <AuthWidget isOpen={isOpen} setIsOpen={setIsOpen} onOpenLogin={onOpenLogin} />
    </motion.div>
  );
}
