import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  AlertCircle
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
    const message = `*Custom Lab Booking Request*%0A%0A*Patient Name:* ${patientName || 'Not specified'}%0A*Phone:* ${patientPhone || 'Not specified'}%0A*Address:* ${patientAddress || 'Not specified'}%0A*Preferred Slot:* ${encodeURIComponent(preferredSlot)}%0A%0A*Selected Tests:*%0A${testsList}%0A%0A*Estimated Total:* ₹${finalPayable} ${isFreeHomeCollection ? '(Free Home Collection)' : ''}%0A*Total Savings:* ₹${totalSavings}%0A%0APlease confirm my appointment time.`;

    window.open(`https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="calculator" className="container mx-auto px-4 md:px-8 mb-24 md:mb-32 pt-12 md:pt-20">
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sterile-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Interactive Price Estimator
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-cyan-500">Custom Test Package</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mt-2">
              Select specific tests needed for your doctor visit or routine monitoring and get an instant transparent quote.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Test Checkboxes */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Tests ({selectedTests.length} selected)
                </span>
                {selectedTests.length > 0 && (
                  <button 
                    onClick={onClearAll}
                    className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                {DIAGNOSTIC_TESTS.map(test => {
                  const isChecked = selectedTests.includes(test.id);
                  return (
                    <div
                      key={test.id}
                      onClick={() => onToggleTest(test)}
                      className={`
                        p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none
                        ${isChecked 
                          ? 'bg-amber-500/10 border-amber-500/50 dark:bg-amber-950/20 text-slate-900 dark:text-white ring-1 ring-amber-500/30' 
                          : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-400 text-slate-700 dark:text-slate-300'}
                      `}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`
                          w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors
                          ${isChecked ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}
                        `}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold truncate">{test.name}</p>
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
            </div>

            {/* Right: Price Summary & Instant WhatsApp Order */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base md:text-lg mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sterile-cyan" />
                Package Summary
              </h3>

              {selectedTestObjects.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl mb-6">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No tests selected yet. Click any test from the left to calculate your estimate.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 mb-6 max-h-40 overflow-y-auto pr-1">
                  {selectedTestObjects.map(test => (
                    <div key={test.id} className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                      <span className="truncate pr-2">• {test.name}</span>
                      <span className="font-semibold shrink-0">₹{test.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Tests Total</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Home Sample Collection</span>
                  <span className={isFreeHomeCollection ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-900 dark:text-white font-semibold"}>
                    {isFreeHomeCollection ? 'FREE (Orders > ₹500)' : (subtotal > 0 ? '₹100' : '₹0')}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg">
                    <span>Your Total Savings</span>
                    <span>- ₹{totalSavings}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm md:text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>Final Estimated Amount</span>
                  <span className="text-amber-500 font-sans text-lg md:text-xl">₹{finalPayable}</span>
                </div>
              </div>

              {/* Patient Quick Booking Form */}
              <form onSubmit={handleWhatsAppBooking} className="mt-6 space-y-3">
                <div>
                  <input 
                    type="text" 
                    placeholder="Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Contact Number (+91)"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="Address for Sample Collection"
                    value={patientAddress}
                    onChange={(e) => setPatientAddress(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  >
                    <option>Morning (7:00 AM - 9:00 AM)</option>
                    <option>Morning (9:00 AM - 11:00 AM)</option>
                    <option>Afternoon (11:00 AM - 2:00 PM)</option>
                    <option>Evening (4:00 PM - 7:00 PM)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={selectedTestObjects.length === 0}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  <Send className="w-4 h-4" />
                  Order Custom Package via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
