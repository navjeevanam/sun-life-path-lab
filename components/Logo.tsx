import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  useImage?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showSubtitle = true,
  className = '',
  useImage = false
}) => {
  const iconSizes = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-9 h-9 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20'
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg md:text-xl',
    lg: 'text-lg sm:text-xl md:text-2xl',
    xl: 'text-2xl sm:text-3xl'
  };

  const subtitleSizes = {
    sm: 'text-[8px] sm:text-[9px]',
    md: 'text-[9px] sm:text-[10px]',
    lg: 'text-[10px] sm:text-[11px]',
    xl: 'text-xs'
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none shrink-0 ${className}`}>
      {/* Sun Life Path Lab Brand Emblem */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {/* Glow backdrop on dark theme */}
        <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md opacity-60 dark:opacity-80" />
        
        {/* Emblem Container */}
        <div className="relative w-full h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-1 shadow-md shadow-amber-500/10 flex items-center justify-center overflow-hidden">
          {/* Authentic Vector Sun + Test Tube Heart Emblem */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Radiant Sun Rays (Golden Yellow) */}
            <g fill="#EAB308">
              <path d="M50 4L52.5 19H47.5L50 4Z" />
              <path d="M65 9L63 22L59 20L65 9Z" />
              <path d="M78 19L72 30L68 27L78 19Z" />
              <path d="M88 33L77 41L75 37L88 33Z" />
              <path d="M93 50L80 52L80 47L93 50Z" />
              
              <path d="M35 9L41 20L37 22L35 9Z" />
              <path d="M22 19L32 27L28 30L22 19Z" />
              <path d="M12 33L25 37L23 41L12 33Z" />
              <path d="M7 50L20 47L20 52L7 50Z" />
            </g>

            {/* Semi-Circle Sun Base */}
            <path
              d="M22 53C22 37.536 34.536 25 50 25C65.464 25 78 37.536 78 53H22Z"
              fill="#FBBF24"
            />

            {/* Stylized Test Tube & Intertwined Heart Loop (Teal #0B7C8A) */}
            <g stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Test Tube Rim */}
              <path d="M44 32H56" strokeWidth="4" />
              
              {/* Test tube stem descending into heart shape base */}
              <path d="M46 32V45C46 45 38 47 35 53C31 60 34 69 42 71C48 73 50 77 50 82C50 77 52 73 58 71C66 69 69 60 65 53C62 47 54 45 54 45V32" />
              
              {/* Central fluid indicator */}
              <path d="M47 52C47 58 50 65 50 72C50 65 53 58 53 52" stroke="#0284C7" strokeWidth="2.5" />
            </g>
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
          <span className={`font-display font-extrabold tracking-tight text-slate-900 dark:text-white uppercase ${textSizes[size]}`}>
            SUN LIFE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse hidden sm:inline-block" />
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`font-display font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase leading-tight ${subtitleSizes[size]}`}>
            PATH LAB
          </span>
          {showSubtitle && (
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500 font-medium text-[8px] sm:text-[9px]">
              • Fully Automatic Lab
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logo;
