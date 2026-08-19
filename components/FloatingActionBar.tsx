import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, UploadCloud, ChevronUp } from 'lucide-react';
import { LAB_WHATSAPP_NUMBER, LAB_PHONE_NUMBER } from '../constants';

interface FloatingActionBarProps {
  onOpenPrescription: () => void;
  onOpenBooking: () => void;
  selectedCount: number;
  visible?: boolean;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onOpenPrescription,
  onOpenBooking,
  selectedCount,
  visible = true
}) => {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show floating buttons only after scrolling past the top landing area (> 120px)
      const isPastTop = scrollY > 120;
      
      // Hide floating menu when reaching near the bottom of the page (e.g. footer area)
      const isNearBottom = (windowHeight + scrollY) >= (documentHeight - 160);

      if (isPastTop && !isNearBottom) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleDirectWhatsApp = () => {
    const message = encodeURIComponent("Hello Sun Life Path Lab, I would like to inquire about diagnostic tests and home sample collection.");
    window.open(`https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${LAB_PHONE_NUMBER.replace(/\s+/g, '')}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isVisible = visible && showBar;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 35, scale: 0.92 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2 p-1.5 sm:p-2 bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-full shadow-2xl"
        >
          {/* Upload Prescription Icon Button */}
          <button
            onClick={onOpenPrescription}
            className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-slate-700/80 hover:border-amber-500/50 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
            title="Upload Doctor Prescription"
            aria-label="Upload Prescription"
          >
            <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
            
            {/* Tooltip on Desktop */}
            <span className="hidden sm:group-hover:block absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-md shadow-lg border border-slate-700 whitespace-nowrap pointer-events-none">
              Upload Rx
            </span>
          </button>

          {/* Call Lab Icon Button */}
          <button
            onClick={handleCall}
            className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 border border-slate-700/80 hover:border-sky-500/50 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
            title="Call Lab Hotline"
            aria-label="Call Laboratory"
          >
            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />

            {/* Tooltip on Desktop */}
            <span className="hidden sm:group-hover:block absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-md shadow-lg border border-slate-700 whitespace-nowrap pointer-events-none">
              Call Lab
            </span>
          </button>

          {/* WhatsApp Direct Chat Icon Button */}
          <button
            onClick={handleDirectWhatsApp}
            className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-200 cursor-pointer active:scale-95"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <MessageCircle className="w-6 h-6 fill-white group-hover:rotate-12 transition-transform" />

            {/* Tooltip on Desktop */}
            <span className="hidden sm:group-hover:block absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-md shadow-lg border border-slate-700 whitespace-nowrap pointer-events-none">
              WhatsApp
            </span>
          </button>

          {/* Scroll To Top Icon Button */}
          <button
            onClick={scrollToTop}
            className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />

            {/* Tooltip on Desktop */}
            <span className="hidden sm:group-hover:block absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-md shadow-lg border border-slate-700 whitespace-nowrap pointer-events-none">
              Top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionBar;
