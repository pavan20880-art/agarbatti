import React from 'react';

interface OrnamentalDividerProps {
  className?: string;
  variant?: 'gold' | 'maroon' | 'subtle';
}

export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({
  className = '',
  variant = 'gold'
}) => {
  const color = variant === 'maroon' ? '#5B131F' : variant === 'subtle' ? '#D5C4A1' : '#C5A059';

  return (
    <div className={`flex items-center justify-center gap-3 my-6 select-none ${className}`}>
      <div
        className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-current opacity-60"
        style={{ color }}
      />
      {/* Ornate Indian Lotus / Diamond Motif */}
      <svg
        width="32"
        height="18"
        viewBox="0 0 32 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-85"
      >
        <path
          d="M16 1C17.5 5.5 21 8.5 25 9C21 9.5 17.5 12.5 16 17C14.5 12.5 11 9.5 7 9C11 8.5 14.5 5.5 16 1Z"
          fill={color}
        />
        <circle cx="16" cy="9" r="2" fill="#FAF6F0" />
        <circle cx="29" cy="9" r="1.5" fill={color} opacity="0.6" />
        <circle cx="3" cy="9" r="1.5" fill={color} opacity="0.6" />
      </svg>
      <div
        className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-current opacity-60"
        style={{ color }}
      />
    </div>
  );
};
