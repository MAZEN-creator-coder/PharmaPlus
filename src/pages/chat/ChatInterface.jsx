import { useState } from 'react';
import styles from './ChatInterface.module.css';
import ChatSidebar from './ChatSidebar';
import ChatConversation from './ChatConversation';

const ChatInterface = () => {
  const [selectedChat, setSelectedChat] = useState('alice');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({
    alice: 4,
    bob: 2,
    charlie: 2,
    diana: 0,
    eve: 0,
  });
  const [allMessages, setAllMessages] = useState({
    alice: [
      {
        id: 1,
        text: 'Hi, I have a question about my recent order #12345.',
        time: '10:00 AM',
        sender: 'other',
      },
      
      {
        id: 2,
        text: 'Hello Alice! How can I help you?',
        time: '10:05 AM',
        sender: 'me',
      },
      {
        id: 3,
        text: 'Is it possible to change the delivery address?',
        time: '10:10 AM',
        sender: 'other',
      },
      {
        id: 4,
        text: 'Let me check for you. Please provide the new address.',
        time: '10:15 AM',
        sender: 'me',
      },
      {
        id: 5,
        text: "It's 123 Main St, Anytown. Thank you for the update!",
        time: '10:30 AM',
        sender: 'other',
      },
      {
        id: 6,
        text: 'noha',
        time: '10:00 AM',
        sender: 'me',
      } 
    ],
    bob: [
      {
        id: 1,
        text: 'Can you send me the invoice for order #67890?',
        time: 'Yesterday',
        sender: 'other',
      },
      {
        id: 2,
        text: 'Sure, I\'ll send it over.',
        time: 'Yesterday',
        sender: 'me',
      }
    ],
  charlie: [
      {
        id: 1,
        text: 'Can you send me the invoice for order #67890?',
        time: 'Yesterday',
        sender: 'other',
      },
      {
        id: 2,
        text: 'Sure, I\'ll send it over.',
        time: 'Yesterday',
        sender: 'me',
      }
    ]
  });

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting chat
    // Clear unread count when opening chat
    setUnreadCounts(prev => ({
      ...prev,
      [chatId]: 0,
    }));
  };

  const conversations = [
    {
      id: 'alice',
      name: 'Alice Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Thank you for the update!',
      time: '10:30 AM',
    },
    {
      id: 'bob',
      name: 'Bob Smith',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'Sure, I\'ll send it over.',
      time: 'Yesterday',
    },
    {
      id: 'charlie',
      name: 'Charlie Brown',
      avatar: 'https://i.pravatar.cc/150?img=13',
      lastMessage: 'Okay, I understand.',
      time: 'Mon',
    },
    {
      id: 'diana',
      name: 'Diana Prince',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Thanks for the quick response!',
      time: 'Last Week',
    },
    {
      id: 'eve',
      name: 'Eve Adams',
      avatar: 'https://i.pravatar.cc/150?img=9',
      lastMessage: 'Yes, that works for me.',
      time: 'Last Month',
    },
  ];

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (messageText) => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        time: getCurrentTime(),
        sender: 'me',
      };

      setAllMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage],
      }));
    }
  };

  const currentConversation = conversations.find(c => c.id === selectedChat);
  const currentMessages = allMessages[selectedChat] || [];

  return (
    <div className={styles.chatInterface}>
      {isSidebarOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <ChatSidebar
        conversations={conversations}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
        unreadCounts={unreadCounts}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <ChatConversation
        conversation={currentConversation}
        messages={currentMessages}
        onSendMessage={handleSendMessage}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
    </div>
  );
};

export default ChatInterface;
