import React from 'react';

const CircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
    className={className}
  >
    <circle cx="16" cy="16" r="12" fill="#fff" />
  </svg>
);

export default CircleIcon; 