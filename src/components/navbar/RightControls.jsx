import ChatButton from "./ChatButton";
import CartButton from "./CartButton";
import AuthWidget from "./AuthWidget";
import styles from "./Navbar.module.css";
export default function RightControls({ onOpenChat, onOpenCart , isOpen,  className }) {
  return (
    <div className= {`${className} ${isOpen ? styles.open : ""}`}>
      <ChatButton onClick={onOpenChat} />
      <CartButton count={0} onClick={onOpenCart} />
      <AuthWidget />
    </div>
  );
}
