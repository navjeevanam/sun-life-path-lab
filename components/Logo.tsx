import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showSubtitle = true,
  className = '' 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-10 h-10 sm:w-12 sm:h-12',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg md:text-xl',
    lg: 'text-lg sm:text-xl md:text-2xl',
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none shrink-0 ${className}`}>
      {/* Sun Life Path Lab Emblem */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-orange-500 to-sterile-cyan rounded-xl blur-[6px] opacity-40 animate-pulse" />
        
        {/* Badge container */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-cyan-600 p-[1.5px] shadow-lg shadow-amber-500/20">
          <div className="w-full h-full bg-slate-950 dark:bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden">
            {/* Custom SVG Sun + Pulse Logo */}
            <svg 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-4/5 h-4/5"
            >
              {/* Sun Core & Rays */}
              <circle cx="20" cy="20" r="7" fill="url(#sunGradient)" />
              
              {/* Sun Rays */}
              <g stroke="url(#rayGradient)" strokeWidth="1.8" strokeLinecap="round">
                <line x1="20" y1="3" x2="20" y2="7" />
                <line x1="20" y1="33" x2="20" y2="37" />
                <line x1="3" y1="20" x2="7" y2="20" />
                <line x1="33" y1="20" x2="37" y2="20" />
                <line x1="8" y1="8" x2="11" y2="11" />
                <line x1="29" y1="29" x2="32" y2="32" />
                <line x1="8" y1="32" x2="11" y2="29" />
                <line x1="29" y1="11" x2="32" y2="8" />
              </g>

              {/* Heartbeat / Diagnostic Pulse Line across center */}
              <path 
                d="M10 20.5H16L18 16L21 25L23 18L24.5 20.5H30" 
                stroke="#FFFFFF" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              <defs>
                <linearGradient id="sunGradient" x1="13" y1="13" x2="27" y2="27" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#EF4444" />
                </linearGradient>
                <linearGradient id="rayGradient" x1="3" y1="3" x2="37" y2="37" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FBBF24" />
                  <stop offset="0.5" stopColor="#F97316" />
                  <stop offset="1" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
          <span className={`font-display font-black tracking-wide text-slate-900 dark:text-white ${textSizes[size]}`}>
            SUN LIFE
          </span>
          <span className={`font-display font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-cyan-500 ${textSizes[size]}`}>
            PATH LAB
          </span>
        </div>
        {showSubtitle && (
          <span className="hidden sm:block text-[8.5px] md:text-[9.5px] text-slate-500 dark:text-slate-400 font-semibold tracking-widest uppercase mt-0.5 whitespace-nowrap">
            Pathology & Diagnostics
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
