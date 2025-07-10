
import React, { useState } from 'react';
import { Plus, Mic, ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-black border-t border-gray-800">
      <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
        <div className={`flex items-end bg-gray-900 rounded-3xl border transition-all duration-200 ${
          isFocused ? 'border-gray-600' : 'border-gray-700'
        }`}>
          {/* Left side icons */}
          <div className="flex items-center pl-4 pb-3">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors mr-1"
            >
              <Plus className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Text input */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything"
            disabled={disabled}
            className="flex-1 bg-transparent text-white placeholder-gray-500 py-3 px-2 resize-none max-h-32 min-h-[24px] focus:outline-none"
            rows={1}
            style={{ 
              height: 'auto',
              minHeight: '24px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          
          {/* Right side icons */}
          <div className="flex items-center pr-4 pb-3">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors mr-1"
            >
              <Mic className="w-5 h-5 text-gray-400" />
            </button>
            <button
              type="submit"
              className="p-2 rounded-full hover:bg-blue-700 bg-blue-600 transition-colors flex items-center justify-center disabled:opacity-50"
              disabled={disabled || !message.trim()}
              aria-label="Send"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
