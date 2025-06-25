import React from 'react';

const SOCIALS = [
  { name: 'X', icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M17.53 6.47L6.47 17.53M6.47 6.47L17.53 17.53" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
  ), link: '#' },
  { name: 'LinkedIn', icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4.98 3.5C3.87 3.5 3 4.37 3 5.48c0 1.1.87 1.98 1.98 1.98 1.1 0 1.98-.88 1.98-1.98A1.98 1.98 0 0 0 4.98 3.5zM3.5 8.5h2.97v12H3.5v-12zm7.5 0h2.85v1.64h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.33h-2.97v-4.73c0-1.13-.02-2.58-1.57-2.58-1.57 0-1.81 1.23-1.81 2.5v4.81h-2.98v-12z" fill="#fff"/></svg>
  ), link: '#' },
  { name: 'GitHub', icon: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" fill="#fff"/></svg>
  ), link: '#' },
  { name: 'LeetCode', icon: (
    <svg width="28" height="28" viewBox="0 0 50 50" fill="none"><path d="M35.5 36.5L25 47 14.5 36.5M25 3v44" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="25" cy="25" r="22" stroke="#fff" strokeWidth="3"/></svg>
  ), link: '#' },
];

const TECHNOLOGIES = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Google Gemini API',
  'Modern CSS',
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#18181b] px-4 py-12 text-slate-100">
      <div className="bg-[#23232a] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <img src="/profile.jpg" alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow mb-4" />
        <h1 className="text-2xl font-bold mb-1">Your Name</h1>
        <p className="text-slate-400 mb-4 text-center">Web Developer | AI Enthusiast</p>
        <div className="flex gap-6 mb-6">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
              <span className="bg-[#18181b] p-2 rounded-full border border-slate-700 group-hover:bg-blue-600 transition-colors">{s.icon}</span>
              <span className="text-xs text-slate-400 mt-1">{s.name}</span>
            </a>
          ))}
        </div>
        <div className="w-full border-t border-slate-700 my-4"></div>
        <h2 className="text-lg font-semibold mb-2">About This Application</h2>
        <p className="text-slate-300 text-center mb-2">This chat application was built as a modern, responsive AI chat interface using the following technologies:</p>
        <ul className="flex flex-wrap justify-center gap-2 mb-2">
          {TECHNOLOGIES.map((tech) => (
            <li key={tech} className="bg-slate-700 px-3 py-1 rounded-full text-xs">{tech}</li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 mt-2 text-center">For more details or to connect, use the links above!</p>
      </div>
    </div>
  );
};

export default AboutPage; 