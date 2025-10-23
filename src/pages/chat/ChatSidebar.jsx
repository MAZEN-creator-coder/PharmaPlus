import styles from './ChatSidebar.module.css';
import ConversationItem from './ConversationItem';

const ChatSidebar = ({ conversations, selectedChat, onSelectChat, unreadCounts, isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <div className={styles.header}>
        <h2>Chats</h2>
      </div>
      
      <div className={styles.searchContainer}>
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#6b7280" strokeWidth="2"/>
          <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search conversations..." 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.conversationList}>
        {conversations.map(conversation => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedChat === conversation.id}
            onClick={() => onSelectChat(conversation.id)}
            unread={unreadCounts[conversation.id] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
