import ChatButton from "./ChatButton";
import CartButton from "./CartButton";
import AuthWidget from "./AuthWidget";
import styles from "./Navbar.module.css";

export default function RightControls({ onOpenLogin, isOpen, className, setIsOpen }) {
  return (
    <div className={`${className} ${isOpen ? styles.open : ""}`}>
      <ChatButton onOpenLogin={onOpenLogin} />
      <CartButton onOpenLogin={onOpenLogin} />
      <AuthWidget isOpen={isOpen} setIsOpen={setIsOpen} onOpenLogin={onOpenLogin} />
    </div>
  );
}
