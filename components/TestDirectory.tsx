import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  Droplet, 
  Plus, 
  Check, 
  Sparkles, 
  AlertCircle, 
  Send,
  CalendarCheck,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { DIAGNOSTIC_TESTS, LAB_WHATSAPP_NUMBER } from '../constants';
import { DiagnosticTest } from '../types';

interface TestDirectoryProps {
  onSelectTestForBooking: (testName: string) => void;
  selectedTests: string[];
  onToggleTestInCart: (test: DiagnosticTest) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Tests' },
  { id: 'hematology', label: 'Blood & CBC' },
  { id: 'biochemistry', label: 'Liver & Kidney' },
  { id: 'diabetes', label: 'Diabetes & Sugar' },
  { id: 'hormones', label: 'Thyroid & Hormones' },
  { id: 'vitamins', label: 'Vitamins & Minerals' },
  { id: 'infections', label: 'Fever & Infections' },
  { id: 'imaging', label: 'ECG & Imaging' }
];

export const TestDirectory: React.FC<TestDirectoryProps> = ({
  onSelectTestForBooking,
  selectedTests,
  onToggleTestInCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTests = useMemo(() => {
    return DIAGNOSTIC_TESTS.filter(test => {
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      const matchesSearch = 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.sampleType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleQuickWhatsAppBook = (test: DiagnosticTest) => {
    const message = `*Quick Test Booking Request*%0A%0A*Test:* ${encodeURIComponent(test.name)}%0A*Price:* ₹${test.price}%0A*Sample:* ${encodeURIComponent(test.sampleType)}%0A%0APlease confirm phlebotomist slot for home sample collection.`;
    window.open(`https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="test-directory" className="container mx-auto px-4 md:px-8 mb-24 md:mb-32 pt-12 md:pt-20">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-12 border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-sterile-cyan/10 border border-sterile-cyan/30 text-sterile-cyan font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Pathology Catalog
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white">
            Diagnostic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-cyan-500">Test Directory</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-2 max-w-xl">
            Search our comprehensive diagnostic test menu with transparent pricing, sample requirements, and turnaround times.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CBC, Lipid, Thyroid, Sugar, LFT..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`
              px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-1.5
              ${selectedCategory === cat.id 
                ? 'bg-gradient-to-r from-amber-500 to-sterile-cyan text-white shadow-md shadow-amber-500/20 scale-[1.02]' 
                : 'bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400'}
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredTests.map((test, index) => {
            const isSelected = selectedTests.includes(test.id);
            return (
              <motion.div
                key={test.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className={`
                  relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between
                  bg-white dark:bg-slate-900/80 backdrop-blur-md border 
                  ${isSelected 
                    ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'}
                `}
              >
                {/* Popular Badge */}
                {test.popular && (
                  <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold border border-amber-500/20">
                    POPULAR
                  </div>
                )}

                <div>
                  {/* Category & Parameters */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {test.category}
                    </span>
                    {test.parametersCount && (
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md font-semibold">
                        {test.parametersCount} Parameters
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {test.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {test.description}
                  </p>

                  {/* Badges / Requirements */}
                  <div className="space-y-1.5 mb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Droplet className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">Sample: <strong className="text-slate-700 dark:text-slate-300">{test.sampleType}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-sterile-cyan shrink-0" />
                      <span>Report in: <strong className="text-slate-700 dark:text-slate-300">{test.turnaroundTime}</strong></span>
                    </div>

                    {test.fastingRequired && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-md mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Fasting Required ({test.fastingHours} hrs overnight)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Price & Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl md:text-2xl font-bold font-sans text-slate-900 dark:text-white">
                        ₹{test.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{test.originalPrice}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      Save ₹{test.originalPrice - test.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Multi-select add to cart/custom builder */}
                    <button
                      onClick={() => onToggleTestInCart(test)}
                      className={`
                        p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all
                        ${isSelected 
                          ? 'bg-amber-500 text-white border-amber-500' 
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500'}
                      `}
                      title={isSelected ? 'Remove from booking list' : 'Add to booking list'}
                    >
                      {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>

                    {/* Direct Quick WhatsApp book */}
                    <button
                      onClick={() => handleQuickWhatsAppBook(test)}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-400 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredTests.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No matching tests found</h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Need a test not listed in the quick menu? Contact us directly or upload your doctor's prescription for instant assistance.
          </p>
          <button
            onClick={() => onSelectTestForBooking(searchQuery || 'Custom Test Request')}
            className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-sterile-cyan text-white text-xs font-bold rounded-full shadow"
          >
            Inquire about "{searchQuery}" on WhatsApp
          </button>
        </div>
      )}
    </section>
  );
};

export default TestDirectory;
