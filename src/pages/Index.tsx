
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import WelcomeScreen from '../components/WelcomeScreen';
import TypingIndicator from '../components/TypingIndicator';
import Sidebar from '../components/Sidebar';
import { sendChatMessage } from '../services/api.service';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    try {
      const data = await sendChatMessage(messageText);
      let assistantText = '';
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        assistantText = data.choices[0].message.content;
      } else if (data.error) {
        assistantText = 'Error: ' + data.error;
      } else {
        assistantText = 'Sorry, I could not process your request.';
      }
      const assistantMessage: Message = {
        id: Date.now().toString() + '-assistant',
        text: assistantText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString() + '-assistant',
        text: 'Network error. Please try again.',
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const showWelcome = messages.length === 0 && !isTyping;

  return (
    <div className="h-screen bg-black flex flex-col ios-safe-area">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)}
        onNewChat={handleNewChat}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
      />
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto chat-container"
      >
        {showWelcome ? (
          <WelcomeScreen onSelectPrompt={handleSendMessage} />
        ) : (
          <div className="p-4 pb-0">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        )}
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  );
};

export default Index;
