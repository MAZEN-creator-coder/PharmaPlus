import styles from './Message.module.css';

const Message = ({ message }) => {
  const isMe = message.sender === 'me';
  
  return (
    <div className={`${styles.messageWrapper} ${isMe ? styles.myMessage : styles.otherMessage}`}>
      <div className={styles.messageBubble}>
        <p className={styles.messageText}>{message.text}</p>
        <span className={styles.messageTime}>{message.time}</span>
      </div>
    </div>
  );
};

export default Message;