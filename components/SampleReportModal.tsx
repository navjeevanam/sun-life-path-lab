import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  FileText, 
  QrCode, 
  CheckCircle2, 
  Download, 
  ShieldCheck,
  Building2,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';
import Logo from './Logo';
import { GOOGLE_PROFILE_URL, LAB_PHONE_NUMBER } from '../constants';

interface SampleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleReportModal: React.FC<SampleReportModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 p-6 md:p-8 font-sans"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Report Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="mb-2">
                <Logo size="sm" showSubtitle={false} />
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                Approved by Govt. of NCT Delhi • A.E.R.B. Approved • ISO 9001:2008 Certified Lab
              </p>
              <p className="text-[10px] text-slate-500">
                Plot No.2, Main Mkt. Ranhola Road, Vikas Nagar, Uttam Nagar, New Delhi-110059 • Helpline: {LAB_PHONE_NUMBER}
              </p>
            </div>

            <div className="text-right flex flex-col items-end">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                QR VERIFIED REPORT
              </span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">LAB REF: SLPL-2026-8941</span>
            </div>
          </div>
        </div>

        {/* Patient Demographics Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-xs grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Patient Name</span>
            <span className="font-bold text-slate-900">Mr. Sample Patient</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Age / Gender</span>
            <span className="font-bold text-slate-900">38 Yrs / Male</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Sample Collected</span>
            <span className="font-bold text-slate-900">Today, 07:30 AM</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Report Reported</span>
            <span className="font-bold text-slate-900">Today, 01:15 PM</span>
          </div>
        </div>

        {/* Test Results Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-100 text-slate-700 font-bold">
                <th className="py-2 px-3">Test Parameter</th>
                <th className="py-2 px-3">Observed Value</th>
                <th className="py-2 px-3">Unit</th>
                <th className="py-2 px-3">Biological Reference</th>
                <th className="py-2 px-3">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-900">Hemoglobin (Hb)</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">14.6</td>
                <td className="py-2.5 px-3">g/dL</td>
                <td className="py-2.5 px-3 text-slate-500">13.0 - 17.0</td>
                <td className="py-2.5 px-3 text-[10px] text-slate-400">Photometry</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-900">Fasting Blood Sugar</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">92.0</td>
                <td className="py-2.5 px-3">mg/dL</td>
                <td className="py-2.5 px-3 text-slate-500">70.0 - 100.0</td>
                <td className="py-2.5 px-3 text-[10px] text-slate-400">GOD-POD</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-900">HbA1c (Glycated Hb)</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">5.4</td>
                <td className="py-2.5 px-3">%</td>
                <td className="py-2.5 px-3 text-slate-500">&lt; 5.7 (Normal)</td>
                <td className="py-2.5 px-3 text-[10px] text-slate-400">HPLC</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-900">Serum Cholesterol</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">174.0</td>
                <td className="py-2.5 px-3">mg/dL</td>
                <td className="py-2.5 px-3 text-slate-500">&lt; 200.0</td>
                <td className="py-2.5 px-3 text-[10px] text-slate-400">CHOD-PAP</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-900">Thyroid Stimulating Hormone (TSH)</td>
                <td className="py-2.5 px-3 text-emerald-700 font-bold">2.45</td>
                <td className="py-2.5 px-3">μIU/mL</td>
                <td className="py-2.5 px-3 text-slate-500">0.45 - 4.50</td>
                <td className="py-2.5 px-3 text-[10px] text-slate-400">CLIA</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-900">25-OH Vitamin D</td>
                <td className="py-2.5 px-3 text-amber-600 font-bold">24.2</td>
                <td className="py-2.5 px-3">ng/mL</td>
                <td className="py-2.5 px-3 text-slate-500">30.0 - 100.0 (Optimal)</td>
                <td className="py-2.5 px-3 text-[10px] text-slate-400">ECLIA</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Report Footer & Signatures */}
        <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-100 rounded-lg p-1 border border-slate-300 flex items-center justify-center">
              <QrCode className="w-10 h-10 text-slate-800" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800">Scan QR Code to Verify</p>
              <p className="text-[10px] text-slate-500">Cryptographically secure authenticity token</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-serif italic text-slate-800 font-bold">Dr. V. K. Sharma (MD Pathology)</p>
            <p className="text-[10px] text-slate-500">Consultant Pathologist & Lab Director</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-colors"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SampleReportModal;
