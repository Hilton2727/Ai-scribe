
import React from 'react';
import { PenTool } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center mr-3 flex-shrink-0 mt-1">
          <PenTool className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      
      <div className={`message-bubble ${isUser ? 'message-user' : 'message-assistant'}`}>
        {!isUser && (
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-gray-300">Scribe.Ai</span>
          </div>
        )}
        {isUser ? (
          <p className="text-white whitespace-pre-wrap leading-relaxed">{message}</p>
        ) : (
          <div className="text-white whitespace-pre-wrap leading-relaxed">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        )}
        {timestamp && (
          <div className="text-xs text-gray-400 mt-2">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
