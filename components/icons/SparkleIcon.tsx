import React from 'react';

// Modern AI Face Icon (friendly, futuristic)
const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    fill="none"
    className={className || "w-8 h-8"}
  >
    <circle cx="24" cy="24" r="20" fill="#232946" stroke="#6C63FF" strokeWidth="3" />
    <ellipse cx="17" cy="22" rx="3" ry="4" fill="#fff" />
    <ellipse cx="31" cy="22" rx="3" ry="4" fill="#fff" />
    <ellipse cx="17" cy="23" rx="1.2" ry="2" fill="#6C63FF" />
    <ellipse cx="31" cy="23" rx="1.2" ry="2" fill="#6C63FF" />
    <path d="M18 31c1.5 2 6.5 2 8 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="24" cy="36" rx="2.5" ry="1" fill="#6C63FF" fillOpacity="0.5" />
    <ellipse cx="24" cy="13" rx="7" ry="2.5" fill="#6C63FF" fillOpacity="0.2" />
  </svg>
);

export default SparkleIcon;
