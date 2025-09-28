import { IoChatbubbleEllipses } from "react-icons/io5";
import styles from "./Navbar.module.css";
export default function ChatButton({ onClick }) {
  return (
    <button
      type="button"
      className={styles.chatIcon}
      aria-label="Open chat"
      onClick={onClick}
      title="Chat"
    >
      <IoChatbubbleEllipses aria-hidden="true" />
    </button>
  );
}
