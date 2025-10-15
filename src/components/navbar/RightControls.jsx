import ChatButton from "./ChatButton";
import CartButton from "./CartButton";
import AuthWidget from "./AuthWidget";
import styles from "./Navbar.module.css";

export default function RightControls({ onOpenChat, onOpenCart, onOpenLogin, isOpen, className, setIsOpen }) {
  const handleClick = (callback) => {
    if (callback) callback();
    // Close mobile menu when clicking on controls
    if (isOpen && setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`${className} ${isOpen ? styles.open : ""}`}>
      <ChatButton onClick={() => handleClick(onOpenChat)} />
      <CartButton count={0} onClick={() => handleClick(onOpenCart)} />
      <AuthWidget isOpen={isOpen} setIsOpen={setIsOpen} onOpenLogin={onOpenLogin} />
    </div>
  );
}
