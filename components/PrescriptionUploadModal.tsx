import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  UploadCloud, 
  FileText, 
  Send, 
  CheckCircle2, 
  Image as ImageIcon,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { LAB_WHATSAPP_NUMBER } from '../constants';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Prescription Upload & Consultation Request*%0A%0A*Patient Name:* ${patientName}%0A*Phone:* ${patientPhone}%0A*Address:* ${patientAddress}%0A*Doctor Notes:* ${notes || 'Please review attached prescription photo'}%0A*Prescription Attached:* ${fileName ? fileName : 'Sending image now'}%0A%0APlease review my prescription and send the required tests and home collection quote.`;
    
    window.open(`https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${message}`, '_blank');
    onClose();
  };

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
        className="glass-modal relative w-full max-w-lg p-6 md:p-8 rounded-3xl overflow-hidden z-10 my-8"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-3 text-amber-500 border border-amber-500/20">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white">
            Upload Doctor Prescription
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mt-1">
            Don't worry about selecting individual tests. Our certified pathologist will decipher your prescription and schedule home collection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-4 text-center cursor-pointer transition-colors relative bg-slate-50 dark:bg-slate-900/40"
          >
            <input 
              type="file" 
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            
            {previewUrl ? (
              <div className="flex flex-col items-center gap-2">
                <img src={previewUrl} alt="Prescription Preview" className="max-h-32 rounded-lg object-contain border border-slate-200 dark:border-slate-700 shadow-sm" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {fileName} (Ready to attach on WhatsApp)
                </span>
              </div>
            ) : fileName ? (
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <FileText className="w-5 h-5" />
                <span>{fileName}</span>
              </div>
            ) : (
              <div className="py-3">
                <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tap to upload or take a photo of doctor prescription
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, PDF (Up to 15MB)</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Patient Name</label>
            <input 
              type="text" 
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs md:text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Phone Number</label>
              <input 
                type="tel" 
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs md:text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Collection Address</label>
              <input 
                type="text" 
                required
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                placeholder="House / Flat No., Sector"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs md:text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Additional Symptoms / Instructions (Optional)</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="e.g. Fasting sugar test needed, patient has mild fever"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs md:text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Your prescription is securely reviewed by certified medical laboratory professionals. 100% confidential.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition-all text-sm"
          >
            <Send className="w-4 h-4" />
            Submit Prescription to WhatsApp
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PrescriptionUploadModal;
