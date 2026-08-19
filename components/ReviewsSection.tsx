import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ExternalLink, MessageSquare, CheckCircle2, ShieldCheck, ThumbsUp, MapPin, Award } from 'lucide-react';
import { TESTIMONIALS, GOOGLE_PROFILE_URL, GOOGLE_MAPS_URL } from '../constants';

export const ReviewsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'home_collection' | 'package' | 'doctor' | 'fast_reports'>('all');

  const filteredReviews = activeFilter === 'all' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(r => r.category === activeFilter);

  return (
    <section id="reviews" className="container mx-auto px-4 md:px-8 mb-20 md:mb-28 pt-8 md:pt-16">
      <div className="bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-sm">
        
        {/* Header with Google Rating Scorecard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          
          {/* Left: Heading & Badge */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Verified Patient Trust
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Real Feedback
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-sky-500">Patients Say</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              Authentic reviews from patients who experienced our doorstep home sample collection, preventive health packages, and certified pathology reports.
            </p>

            {/* Micro trust pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Automated Barcode Tracking
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Zero Sample Mixing
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Doctor Verified Signatures
              </span>
            </div>
          </div>

          {/* Right: Google Scorecard Box */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md">
            
            {/* Rating Big Number */}
            <div className="flex flex-col items-center justify-center sm:pr-5 sm:border-r border-slate-200 dark:border-slate-700 text-center shrink-0">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-none font-display">
                4.9
              </span>
              <div className="flex text-amber-400 mt-2 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">
                180+ Google Reviews
              </p>
            </div>

            {/* Rating Distribution & Actions */}
            <div className="w-full space-y-2">
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-8 text-slate-500 font-semibold">5 Star</span>
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full w-[96%]" />
                  </div>
                  <span className="w-7 text-right font-mono text-slate-600 dark:text-slate-300 font-bold">96%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-slate-500 font-semibold">4 Star</span>
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full w-[4%]" />
                  </div>
                  <span className="w-7 text-right font-mono text-slate-600 dark:text-slate-300 font-bold">4%</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 w-full">
                <a
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-3.5 py-2.5 sm:py-1.5 rounded-xl sm:rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs transition-all flex items-center justify-center gap-1.5 border border-amber-500/30 min-h-[38px]"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-500 shrink-0" />
                  <span>Write Review & Feedback</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-3.5 py-2.5 sm:py-1.5 rounded-xl sm:rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 min-h-[38px]"
                >
                  <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>View Location on Maps</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar touch-pan-x">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] shrink-0 ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Reviews ({TESTIMONIALS.length})
          </button>
          
          <button
            onClick={() => setActiveFilter('home_collection')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] shrink-0 ${
              activeFilter === 'home_collection'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Home Collection
          </button>

          <button
            onClick={() => setActiveFilter('package')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] shrink-0 ${
              activeFilter === 'package'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Health Packages
          </button>

          <button
            onClick={() => setActiveFilter('doctor')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] shrink-0 ${
              activeFilter === 'doctor'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Doctor & Lab Quality
          </button>

          <button
            onClick={() => setActiveFilter('fast_reports')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[36px] shrink-0 ${
              activeFilter === 'fast_reports'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Same-Day Reports
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev, i) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 p-5 sm:p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Top Bar: Stars, Date, & Google Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        Google Review
                      </span>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Patient / Doctor Details */}
                <div className="pt-3.5 border-t border-slate-100 dark:border-slate-700/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-sky-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {rev.userInitials || rev.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          {rev.name}
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" title="Verified Patient" />
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{rev.location}</p>
                      </div>
                    </div>
                  </div>

                  {rev.testName && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium truncate max-w-full">
                        Test: {rev.testName}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Actions Banner */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center lg:text-left">
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Have you had a diagnostic visit with us recently? Share your experience!</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-2.5 rounded-xl sm:rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-amber-500/20 min-h-[46px] cursor-pointer"
            >
              <Star className="w-4 h-4 fill-white shrink-0" />
              <span>Write a Google Review</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
            </a>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-2.5 rounded-xl sm:rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold transition-all min-h-[46px] cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
              <span>View Location on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
