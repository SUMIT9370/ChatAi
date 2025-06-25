import React, { useState, useCallback } from 'react';
import SendIcon from './icons/SendIcon';
import LoadingDots from './LoadingDots';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSend = useCallback(() => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  }, [message, isLoading, onSendMessage]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-[#131314]">
      <div className="relative mx-auto max-w-3xl">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="w-full p-4 pr-16 bg-[#1e1f20] text-slate-100 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
          style={{ overflowY: 'hidden' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-500 text-white disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? <LoadingDots /> : <SendIcon />}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
