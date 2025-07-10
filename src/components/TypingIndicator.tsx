
import React from 'react';
import { PenTool } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center mr-3 flex-shrink-0">
        <PenTool className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="message-bubble message-assistant">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-300">Scribe.Ai</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
