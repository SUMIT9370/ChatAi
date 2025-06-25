import React from 'react';
import { ChatMessageData, MessageRole } from '../types';
import UserIcon from './icons/UserIcon';
import SparkleIcon from './icons/SparkleIcon';
import LoadingDots from './LoadingDots';

interface ChatMessageItemProps {
  message: ChatMessageData;
  isActiveStreamTarget: boolean;
}

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message, isActiveStreamTarget }) => {
  const isUser = message.role === MessageRole.USER;

  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const bubbleClasses = isUser
    ? 'bg-[#333537] rounded-2xl'
    : 'bg-transparent';

  const renderTextWithLinks = (text: string): React.ReactNode => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        if (urlRegex.test(part)) {
            return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{part}</a>;
        }
        return part;
    });
  };

  return (
    <div className={`flex items-start space-x-3 ${containerClasses}`}>
      {!isUser && (
        <div className="w-8 h-8 flex-shrink-0">
          <SparkleIcon className="w-8 h-8 text-blue-400" />
        </div>
      )}
      <div className={`p-3 ${bubbleClasses}`}>
        <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap break-words">
          {renderTextWithLinks(message.text)}
        </div>
        {isActiveStreamTarget && <LoadingDots />}
      </div>
      {isUser && (
        <div className="w-8 h-8 flex-shrink-0">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessageItem;
