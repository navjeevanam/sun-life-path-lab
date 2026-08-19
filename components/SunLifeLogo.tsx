import React from 'react';

interface SunLifeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'full' | 'icon-only' | 'image';
}

export const SunLifeLogo: React.FC<SunLifeLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'full'
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-sm', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-base', sub: 'text-[10px]' },
    lg: { icon: 'w-14 h-14', text: 'text-xl', sub: 'text-xs' },
    xl: { icon: 'w-20 h-20', text: 'text-2xl', sub: 'text-sm' },
  };

  const selectedSize = sizeMap[size];

  if (variant === 'image') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <img
          src="/src/assets/images/sunlife_logo_1787101447914.jpg"
          alt="Sun Life Path Lab Logo"
          className={`${selectedSize.icon} object-contain rounded-xl`}
          referrerPolicy="no-referrer"
        />
        {showText && (
          <div className="flex flex-col">
            <span className={`font-extrabold tracking-tight text-teal-800 dark:text-teal-300 uppercase leading-none font-display ${selectedSize.text}`}>
              Sun Life
            </span>
            <span className={`font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase leading-tight ${selectedSize.sub}`}>
              Path Lab
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Authentic Vector Logo Emblem */}
      <div className={`relative ${selectedSize.icon} flex-shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Radiant Sun Rays (Golden Yellow) */}
          <g fill="#F59E0B">
            {/* Center Top Ray */}
            <path d="M60 4L63 22H57L60 4Z" />
            {/* Top Right Rays */}
            <path d="M78 10L76 26L71 23L78 10Z" />
            <path d="M94 22L87 35L83 31L94 22Z" />
            <path d="M106 38L93 47L91 42L106 38Z" />
            <path d="M112 58L96 61L96 55L112 58Z" />
            {/* Top Left Rays */}
            <path d="M42 10L49 23L44 26L42 10Z" />
            <path d="M26 22L37 31L33 35L26 22Z" />
            <path d="M14 38L29 42L27 47L14 38Z" />
            <path d="M8 58L24 55L24 61L8 58Z" />
          </g>

          {/* Semi-Circle Sun Disc */}
          <path
            d="M26 62C26 43.2223 41.2223 28 60 28C78.7777 28 94 43.2223 94 62H26Z"
            fill="#FBBF24"
          />

          {/* Stylized Test Tube & Heart Diagnostic Emblem (Teal/Cyan) */}
          <g stroke="#0D9488" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Test Tube Neck / Rim at top */}
            <path d="M53 36H67" strokeWidth="4.5" />
            
            {/* Test tube stem descending into intertwined heart loops */}
            <path d="M55 36V52C55 52 46 54 42 61C37 69 40 80 50 83C57 85 60 89 60 96C60 89 63 85 70 83C80 80 83 69 78 61C74 54 65 52 65 52V36" />
            
            {/* Inner fluid / capillary curve */}
            <path d="M57 60C57 68 60 76 60 84C60 76 63 68 63 60" stroke="#0284C7" strokeWidth="3" />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && variant !== 'icon-only' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-none font-display ${selectedSize.text}`}>
              Sun Life
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <span className={`font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase leading-tight ${selectedSize.sub}`}>
            Path Lab
          </span>
        </div>
      )}
    </div>
  );
};

export default SunLifeLogo;
