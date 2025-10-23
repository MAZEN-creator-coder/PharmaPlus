import styles from './ConversationItem.module.css';

const ConversationItem = ({ conversation, isSelected, onClick, unread }) => {
  return (
    <div 
      className={`${styles.conversationItem} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <div className={styles.avatarContainer}>
        <img 
          src={conversation.avatar} 
          alt={conversation.name}
          className={styles.avatar}
        />
        <div className={styles.onlineIndicator}></div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{conversation.name}</h3>
          <span className={styles.time}>{conversation.time}</span>
        </div>
        <div className={styles.messagePreview}>
          <p className={styles.lastMessage}>{conversation.lastMessage}</p>
          {unread > 0 && (
            <span className={styles.unreadBadge}>{unread}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
