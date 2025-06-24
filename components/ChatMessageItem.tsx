
import React from 'react';
import { ChatMessageData, MessageRole } from '../types';
import UserIcon from './icons/UserIcon';
import SparkleIcon from './icons/SparkleIcon';
import LoadingDots from './LoadingDots'; // Import LoadingDots

interface ChatMessageItemProps {
  message: ChatMessageData;
  isActiveStreamTarget?: boolean; // New prop
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message, isActiveStreamTarget }) => {
  const isUser = message.role === MessageRole.USER;

  const renderTextWithLinks = (text: string): React.ReactNode => {
    const parts = text.split(/(\[.*?\]\(.*?\)|```[\s\S]*?```)/g); // Split by [text](url) or ```code```
    return parts.map((part, index) => {
      if (!part) return null;

      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            {linkMatch[1]}
          </a>
        );
      }
      
      const codeBlockMatch = part.match(/^```([\s\S]*?)```$/);
      if (codeBlockMatch) {
        const codeContent = codeBlockMatch[1].trim();
        return (
          <pre key={index} className="bg-slate-800 p-2 rounded-md my-2 overflow-x-auto text-sm">
            <code>{codeContent}</code>
          </pre>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 max-w-xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-indigo-500' : 'bg-pink-500'} text-white`}>
          {isUser ? <UserIcon className="w-5 h-5" /> : <SparkleIcon className="w-5 h-5" />}
        </div>
        <div
          className={`px-4 py-3 rounded-lg shadow ${
            isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-600 text-slate-100 rounded-bl-none'
          }`}
        >
          {isUser ? (
            <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap break-words">
              {renderTextWithLinks(message.text)}
            </div>
          ) : ( // AI message
            isActiveStreamTarget && message.text === '' ? (
              <LoadingDots />
            ) : (
              <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap break-words">
                {renderTextWithLinks(message.text)}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
