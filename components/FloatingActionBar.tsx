import React from 'react';
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
  if (!visible) return null;
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

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-md backdrop-blur flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Prescription Quick Pill */}
      <button
        onClick={onOpenPrescription}
        className="px-4 py-2.5 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-amber-500/40 shadow-lg flex items-center gap-2 text-xs font-bold hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all group"
      >
        <UploadCloud className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
        <span>Upload Rx</span>
      </button>

      {/* Direct Call Button (Mobile preferred) */}
      <button
        onClick={handleCall}
        className="px-4 py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 shadow-lg flex items-center gap-2 text-xs font-bold hover:bg-slate-800 transition-all md:hidden"
      >
        <Phone className="w-4 h-4 text-emerald-400" />
        <span>Call Lab</span>
      </button>

      {/* Main WhatsApp Floating Pill / Button */}
      <button
        onClick={handleDirectWhatsApp}
        className="relative px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs md:text-sm flex items-center gap-2.5 shadow-xl shadow-green-500/30 hover:scale-105 transition-all group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
        <span className="tracking-wide">WhatsApp Us</span>
      </button>
    </div>
  );
};

export default FloatingActionBar;
