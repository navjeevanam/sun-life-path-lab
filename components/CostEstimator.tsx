import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Check, 
  Trash2, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Clock, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  MapPin,
  MessageCircle,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import { DIAGNOSTIC_TESTS, PACKAGES, LAB_WHATSAPP_NUMBER } from '../constants';
import { DiagnosticTest } from '../types';

interface CostEstimatorProps {
  selectedTests: string[];
  onToggleTest: (test: DiagnosticTest) => void;
  onClearAll: () => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  selectedTests,
  onToggleTest,
  onClearAll
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (7:00 AM - 10:00 AM)');

  // Selected test objects
  const selectedTestObjects = DIAGNOSTIC_TESTS.filter(t => selectedTests.includes(t.id));

  // Totals calculation
  const subtotal = selectedTestObjects.reduce((acc, t) => acc + t.price, 0);
  const originalTotal = selectedTestObjects.reduce((acc, t) => acc + t.originalPrice, 0);
  const totalSavings = originalTotal - subtotal;
  const isFreeHomeCollection = subtotal >= 500;
  const homeCollectionFee = isFreeHomeCollection || subtotal === 0 ? 0 : 100;
  const finalPayable = subtotal + homeCollectionFee;

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTestObjects.length === 0) return;

    const testsList = selectedTestObjects.map(t => `• ${t.name} (₹${t.price})`).join('%0A');
    const message = `*Custom Lab Package Booking Request*%0A%0A*Patient Name:* ${patientName || 'Not specified'}%0A*Phone:* ${patientPhone || 'Not specified'}%0A*Pickup Address:* ${patientAddress || 'Not specified'}%0A*Preferred Slot:* ${encodeURIComponent(preferredSlot)}%0A%0A*Selected Tests (${selectedTestObjects.length}):*%0A${testsList}%0A%0A*Estimated Total:* ₹${finalPayable} ${isFreeHomeCollection ? '(Free Home Collection Included)' : ''}%0A*Total Savings:* ₹${totalSavings}%0A*Free Doctor Report Consultation Included*%0A%0APlease confirm my appointment time.`;

    window.open(`https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="calculator" className="container mx-auto px-4 md:px-8 mb-24 md:mb-32 pt-12 md:pt-20">
      <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sterile-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Interactive Price Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sterile-cyan">Custom Test Package</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
              Select specific pathology tests needed for your doctor visit or routine monitoring and get an instant transparent quote.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Left Column: Interactive Test Selector */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Select Tests
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {selectedTests.length} chosen
                  </span>
                </div>
                {selectedTests.length > 0 && (
                  <button 
                    onClick={onClearAll}
                    className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {/* Tests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-h-[460px] overflow-y-auto pr-1">
                {DIAGNOSTIC_TESTS.map(test => {
                  const isChecked = selectedTests.includes(test.id);
                  return (
                    <div
                      key={test.id}
                      onClick={() => onToggleTest(test)}
                      className={`
                        p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none active:scale-[0.99]
                        ${isChecked 
                          ? 'bg-amber-500/10 border-amber-500 dark:bg-amber-950/20 text-slate-900 dark:text-white shadow-sm ring-1 ring-amber-500/30' 
                          : 'bg-slate-50/90 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/70 hover:border-amber-500/50 text-slate-700 dark:text-slate-300'}
                      `}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className={`
                          w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all
                          ${isChecked ? 'bg-amber-500 border-amber-500 text-white shadow-sm shadow-amber-500/30' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}
                        `}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold truncate text-slate-900 dark:text-white">{test.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{test.sampleType}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">₹{test.price}</span>
                        <span className="block text-[9px] text-slate-400 line-through">₹{test.originalPrice}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Perks Strip */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Free Home Pickup over ₹500
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Stethoscope className="w-3.5 h-3.5 text-sterile-cyan" />
                  Free Doctor Report Review
                </span>
              </div>
            </div>

            {/* Right Column: Price Summary & WhatsApp Order Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/90 dark:to-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 sm:p-6 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sterile-cyan" />
                  Package Summary
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {selectedTestObjects.length} Test{selectedTestObjects.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Selected Tests List */}
              {selectedTestObjects.length === 0 ? (
                <div className="text-center py-6 my-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No tests selected yet. Choose tests from the list on the left to calculate your estimate.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 my-3 max-h-36 overflow-y-auto pr-1">
                  {selectedTestObjects.map(test => (
                    <div key={test.id} className="flex items-center justify-between text-xs py-1 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800/60 last:border-0">
                      <span className="truncate pr-2 font-medium">• {test.name}</span>
                      <span className="font-semibold text-slate-900 dark:text-white shrink-0">₹{test.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between items-center">
                  <span>Tests Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Home Sample Collection</span>
                  <span className={isFreeHomeCollection ? "text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full text-[11px]" : "text-slate-900 dark:text-white font-semibold"}>
                    {isFreeHomeCollection ? 'FREE (Saved ₹100)' : (subtotal > 0 ? '₹100' : '₹0')}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-xl">
                    <span>Discounted Savings</span>
                    <span>- ₹{totalSavings}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm md:text-base font-bold text-slate-900 dark:text-white pt-2.5 border-t border-slate-200 dark:border-slate-700">
                  <span>Estimated Total</span>
                  <span className="text-amber-500 font-sans text-xl font-black">₹{finalPayable}</span>
                </div>
              </div>

              {/* Quick Patient Details Form */}
              <form onSubmit={handleWhatsAppBooking} className="mt-5 space-y-2.5">
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input 
                    type="text" 
                    placeholder="Patient Full Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 min-h-[44px]"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input 
                    type="tel" 
                    placeholder="Contact Number (+91 XXXXX XXXXX)"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 min-h-[44px]"
                  />
                </div>

                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input 
                    type="text" 
                    placeholder="Address for Sample Pickup"
                    value={patientAddress}
                    onChange={(e) => setPatientAddress(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 min-h-[44px]"
                  />
                </div>

                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 min-h-[44px]"
                  >
                    <option>Morning (7:00 AM - 9:00 AM)</option>
                    <option>Morning (9:00 AM - 11:00 AM)</option>
                    <option>Afternoon (11:00 AM - 2:00 PM)</option>
                    <option>Evening (4:00 PM - 7:00 PM)</option>
                  </select>
                </div>

                {/* WhatsApp Order CTA Button */}
                <button
                  type="submit"
                  disabled={selectedTestObjects.length === 0}
                  className="w-full py-3.5 px-4 mt-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 transition-all text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] cursor-pointer group active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white group-hover:rotate-12 transition-transform shrink-0" />
                  <span className="truncate">Order Custom Package via WhatsApp</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>

                <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 mt-1.5">
                  Instant confirmation on WhatsApp • Pay upon collection
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
