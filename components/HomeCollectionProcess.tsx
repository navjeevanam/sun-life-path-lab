import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarCheck, 
  UserCheck, 
  ThermometerSnowflake, 
  FileCheck2, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Instant Booking',
    subtitle: 'Online or WhatsApp',
    desc: 'Select your tests or upload your prescription. Choose your preferred morning time slot for home collection.',
    icon: CalendarCheck,
    color: 'from-amber-500 to-orange-500'
  },
  {
    step: '02',
    title: 'Certified Phlebotomist',
    subtitle: 'Safe & Painless Draw',
    desc: 'Vaccinated technician visits your doorstep with sterile, single-use BD Vacutainer vacuum tubes.',
    icon: UserCheck,
    color: 'from-orange-500 to-rose-500'
  },
  {
    step: '03',
    title: 'Cold-Chain Transit',
    subtitle: 'Sample Integrity',
    desc: 'Barcoded blood and urine samples transported in temperature-controlled cooler boxes to ensure zero degradation.',
    icon: ThermometerSnowflake,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    step: '04',
    title: 'Same-Day Report',
    subtitle: 'WhatsApp & Email PDF',
    desc: 'Receive digital QR-verified pathology report signed by certified MD Pathologist within 6 to 12 hours.',
    icon: FileCheck2,
    color: 'from-emerald-500 to-teal-500'
  }
];

interface HomeCollectionProcessProps {
  onBookClick: () => void;
}

export const HomeCollectionProcess: React.FC<HomeCollectionProcessProps> = ({ onBookClick }) => {
  return (
    <section id="process" className="container mx-auto px-4 md:px-8 mb-24 md:mb-32 pt-12 md:pt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <span className="px-3 py-1 bg-sterile-cyan/10 border border-sterile-cyan/30 text-sterile-cyan font-bold text-xs rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Hassle-Free Patient Experience
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
          How Home Sample <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sterile-cyan">Collection Works</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-2">
          Experience hospital-grade diagnostic accuracy without stepping out of your home.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((s, idx) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12 }}
            className="relative bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all shadow-sm group"
          >
            {/* Top Indicator & Icon */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl md:text-3xl font-black font-display text-slate-300 dark:text-slate-700 group-hover:text-amber-500 transition-colors">
                  {s.step}
                </span>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-6 h-6" />
                </div>
              </div>

              <span className="text-[10px] font-bold tracking-widest text-sterile-cyan uppercase block mb-1">
                {s.subtitle}
              </span>
              <h3 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white mb-3">
                {s.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-amber-500 transition-colors">
              <span>Step {s.step}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Safety & Hygiene Guarantee Banner */}
      <div className="mt-10 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">
              100% Sterile & Pre-sealed BD Vacutainer® Guarantee
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Zero cross-contamination. Sealed single-use needles unsealed exclusively in front of the patient.
            </p>
          </div>
        </div>

        <button
          onClick={onBookClick}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-sterile-cyan hover:from-amber-600 hover:to-cyan-600 text-white font-bold text-xs md:text-sm rounded-full shadow-md whitespace-nowrap"
        >
          Book Home Visit Today
        </button>
      </div>
    </section>
  );
};

export default HomeCollectionProcess;
