import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  AlertCircle, 
  Droplet, 
  FileText, 
  ChevronDown, 
  HelpCircle,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { PATIENT_GUIDELINES, FAQS } from '../constants';

export const PatientGuidelines: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="guidelines" className="container mx-auto px-4 md:px-8 mb-24 md:mb-32 pt-12 md:pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Test Preparation Guidelines */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              Patient Instructions
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Test Preparation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sterile-cyan">Guidelines</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mt-2">
              Proper sample preparation ensures 100% diagnostic accuracy. Follow these simple steps prior to sample collection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PATIENT_GUIDELINES.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-500 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {item.summary}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-2 mt-2">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Frequently Asked Questions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="px-3 py-1 bg-sterile-cyan/10 border border-sterile-cyan/30 text-sterile-cyan font-bold text-xs rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              Patient Help
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Frequently <span className="text-sterile-cyan">Asked Questions</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mt-2">
              Got questions regarding reporting or home sample collection?
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden transition-colors shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs md:text-sm font-bold text-slate-900 dark:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-500' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PatientGuidelines;
