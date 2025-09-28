import ChatButton from "./ChatButton";
import CartButton from "./CartButton";
import AuthWidget from "./AuthWidget";
import styles from "./Navbar.module.css";
export default function RightControls({ onOpenChat, onOpenCart }) {
  return (
    <div className={styles.right}>
      <ChatButton onClick={onOpenChat} />
      <CartButton count={0} onClick={onOpenCart} />
      <AuthWidget />
    </div>
  );
}
