import { useState, useEffect, useRef } from 'react';
import styles from './ChatConversation.module.css';
import Message from './Message';

const ChatConversation = ({ conversation, messages, onSendMessage, onMenuClick }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className={styles.conversationContainer}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <button className={styles.menuButton} onClick={onMenuClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <img 
            src={conversation.avatar} 
            alt={conversation.name}
            className={styles.avatar}
          />
          <h2 className={styles.name}>{conversation.name}</h2>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.iconButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button className={styles.iconButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M23 7l-7 5 7 5V7z" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1" y="5" width="15" height="14" rx="2" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button className={styles.iconButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="1" fill="#4b5563"/>
              <circle cx="12" cy="5" r="1" fill="#4b5563"/>
              <circle cx="12" cy="19" r="1" fill="#4b5563"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.messagesContainer}>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className={styles.inputContainer} onSubmit={handleSendMessage}>
        <button type="button" className={styles.iconButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="2"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="9" r="1" fill="#6b7280"/>
            <circle cx="15" cy="9" r="1" fill="#6b7280"/>
          </svg>
        </button>
        
        <button type="button" className={styles.iconButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <input 
          type="text" 
          placeholder="Type your message..."
          className={styles.messageInput}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        
        <button type="submit" className={styles.sendButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatConversation;
