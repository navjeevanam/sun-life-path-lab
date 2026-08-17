import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
  delay?: number;
  highlight?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  tags, 
  delay = 0,
  highlight = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`
        group relative p-6 h-full flex flex-col justify-between rounded-2xl overflow-hidden
        bg-white/70 dark:bg-slate-900/60 backdrop-blur-md 
        border border-slate-200 dark:border-slate-700/50 
        hover:border-sterile-cyan/40 hover:bg-white/90 dark:hover:bg-slate-800/60 transition-all duration-300
        ${highlight ? 'shadow-[0_0_20px_rgba(6,182,212,0.15)] border-sterile-cyan/30' : 'hover:shadow-lg shadow-sm'}
      `}
    >
      {/* Scanning Animation Layer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-0">
        <div className="scan-line" />
        <div className="absolute inset-0 bg-sterile-cyan/5" />
      </div>

      <div className="relative z-10">
        <div className={`
          w-12 h-12 mb-5 rounded-xl flex items-center justify-center 
          bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 
          group-hover:bg-sterile-cyan/10 group-hover:border-sterile-cyan/30
          transition-colors duration-300
        `}>
          <Icon className={`w-6 h-6 ${highlight ? 'text-sterile-cyan' : 'text-slate-500 dark:text-slate-400 group-hover:text-sterile-cyan'}`} />
        </div>

        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-sterile-cyan transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {tags && tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2 mt-2 pt-4 border-t border-slate-200 dark:border-slate-800/50">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[11px] font-medium px-2 py-1 bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-md text-slate-500 dark:text-slate-300 group-hover:border-sterile-cyan/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ServiceCard;