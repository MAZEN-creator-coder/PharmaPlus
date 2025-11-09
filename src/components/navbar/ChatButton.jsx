import { IoChatbubbleEllipses } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Navbar.module.css";

export default function ChatButton({ onOpenLogin }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      onOpenLogin();
    } else {
      navigate('/chat');
    }
  };

  return (
    <button
      type="button"
      className={styles.chatIcon}
      aria-label="Open chat"
      onClick={handleClick}
      title="Chat"
    >
      <IoChatbubbleEllipses aria-hidden="true" />
    </button>
  );
}
