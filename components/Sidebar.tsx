import React from 'react';

interface SidebarProps {
  onHome: () => void;
  onNewChat: () => void;
  onAbout: () => void;
}

const sidebarOptions = [
  { label: 'Home', icon: '🏠', key: 'home' },
  { label: 'New Chat', icon: '💬', key: 'newChat' },
  { label: 'About', icon: 'ℹ️', key: 'about' },
];

const Sidebar: React.FC<SidebarProps> = ({ onHome, onNewChat, onAbout }) => {
  return (
    <aside className="h-full w-56 bg-[#18181b] text-slate-100 flex flex-col py-6 px-3 border-r border-[#23232a]">
      <div className="mb-8 flex items-center justify-center">
        <span className="text-xl font-bold tracking-wide">ChatAi</span>
      </div>
      <nav className="flex flex-col gap-2">
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#23232a] transition-colors text-left"
          onClick={onHome}
        >
          <span className="text-lg">🏠</span>
          <span className="text-sm">Home</span>
        </button>
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#23232a] transition-colors text-left"
          onClick={onNewChat}
        >
          <span className="text-lg">💬</span>
          <span className="text-sm">New Chat</span>
        </button>
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#23232a] transition-colors text-left mt-8"
          onClick={onAbout}
        >
          <span className="text-lg">ℹ️</span>
          <span className="text-sm">About</span>
        </button>
      </nav>
      <div className="flex-grow" />
    </aside>
  );
};

export default Sidebar; 