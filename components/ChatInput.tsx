
import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';
import LoadingDots from './LoadingDots';

interface ChatInputProps {
  onSendMessage: (prompt: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-slate-700 p-4 border-t border-slate-600">
      <div className="flex items-center bg-slate-800 rounded-lg p-2 shadow-md">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          rows={1}
          className="flex-grow bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none resize-none p-2 max-h-28"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
          className="ml-3 p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          {isLoading ? <LoadingDots /> : <SendIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
