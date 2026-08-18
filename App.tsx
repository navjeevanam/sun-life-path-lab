import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, MapPin, ChevronRight, 
  FlaskConical, Activity, ArrowRight, ShieldCheck, 
  Stethoscope, Send, CalendarCheck, Sun, Moon,
  Clock, Microscope, Heart, ExternalLink, Star, Navigation,
  UploadCloud, FileText, CheckCircle2, Search, Sparkles
} from 'lucide-react';
import HeroScene from './components/HeroScene';
import ServiceCard from './components/ServiceCard';
import Logo from './components/Logo';
import TestDirectory from './components/TestDirectory';
import CostEstimator from './components/CostEstimator';
import PrescriptionUploadModal from './components/PrescriptionUploadModal';
import SampleReportModal from './components/SampleReportModal';
import HomeCollectionProcess from './components/HomeCollectionProcess';
import PatientGuidelines from './components/PatientGuidelines';
import ReviewsSection from './components/ReviewsSection';
import FloatingActionBar from './components/FloatingActionBar';
import HeroCarousel from './components/HeroCarousel';
import { 
  NAV_LINKS, 
  HEMATOLOGY_SERVICES, 
  ADVANCED_SCREENING, 
  INFECTION_SHIELD, 
  IMAGING_SERVICES,
  PACKAGES,
  GOOGLE_PROFILE_URL,
  GOOGLE_MAPS_URL,
  LAB_PHONE_NUMBER,
  LAB_WHATSAPP_NUMBER,
  LAB_ADDRESS
} from './constants';
import { DiagnosticTest, PackageItem } from './types';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isSampleReportModalOpen, setIsSampleReportModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState<'hematology' | 'advanced' | 'infection'>('hematology');
  const [scrolled, setScrolled] = useState(false);

  // Selected tests for custom builder / cart
  const [selectedTests, setSelectedTests] = useState<string[]>(['test-cbc', 'test-thyroid']);

  // Booking Modal Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    test: '',
    timeSlot: 'Morning (7:00 AM - 10:00 AM)',
    date: ''
  });

  useEffect(() => {
    // Theme initialization - default to light theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const getActiveServices = () => {
    switch(activeServiceTab) {
      case 'hematology': return HEMATOLOGY_SERVICES;
      case 'advanced': return ADVANCED_SCREENING;
      case 'infection': return INFECTION_SHIELD;
      default: return HEMATOLOGY_SERVICES;
    }
  };

  const handleToggleTestInCart = (test: DiagnosticTest) => {
    setSelectedTests(prev => 
      prev.includes(test.id) ? prev.filter(id => id !== test.id) : [...prev, test.id]
    );
  };

  const handleClearAllTests = () => {
    setSelectedTests([]);
  };

  const handleSelectTestForDirectBooking = (testName: string) => {
    setFormData(prev => ({ ...prev, test: testName }));
    setIsBookingModalOpen(true);
  };

  const handleSelectPackageForBooking = (pkg: PackageItem) => {
    setFormData(prev => ({ 
      ...prev, 
      test: `${pkg.name} (${pkg.price} - ${pkg.testsIncluded} Tests)` 
    }));
    setIsBookingModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Home Collection Appointment Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Address:* ${formData.address}%0A*Preferred Slot:* ${encodeURIComponent(formData.timeSlot)}%0A*Preferred Date:* ${formData.date || 'Earliest available'}%0A*Test / Package Required:* ${formData.test || "General Health Screening"}%0A%0APlease confirm my home collection slot.`;
    
    window.open(`https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${message}`, '_blank');
    setIsBookingModalOpen(false);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-obsidian text-slate-800 dark:text-slate-200 font-sans selection:bg-sterile-cyan/30 selection:text-white transition-colors duration-500">
      
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0 opacity-60 transition-opacity duration-500 pointer-events-none">
        <HeroScene isDarkMode={isDarkMode} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 dark:via-obsidian/70 to-slate-50 dark:to-obsidian pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      </div>

      {/* Navigation Header */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
        bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-slate-200/90 dark:border-slate-800/90
        ${scrolled ? 'py-2 sm:py-2.5 shadow-md' : 'py-2.5 sm:py-3.5 shadow-xs'}
      `}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3">
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group cursor-pointer shrink-0"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links (Visible on xl screens and above >= 1280px) */}
          <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
            {NAV_LINKS.map(link => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors tracking-wide relative group cursor-pointer uppercase whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop Action Buttons (Visible on xl screens >= 1280px) */}
          <div className="hidden xl:flex items-center gap-2.5 shrink-0">
            {/* Upload Prescription Button */}
            <button
              onClick={() => setIsPrescriptionModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Rx</span>
            </button>

            {/* Sample Report Preview (2xl screens) */}
            <button
              onClick={() => setIsSampleReportModalOpen(true)}
              className="hidden 2xl:flex px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-sterile-cyan" />
              <span>Sample Report</span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Book Home Visit CTA */}
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-sterile-cyan hover:from-amber-600 hover:to-cyan-600 text-white font-bold text-xs rounded-full transition-all duration-300 shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Home Visit</span>
            </button>
          </div>

          {/* Compact / Mobile / Tablet Header Controls (< 1280px) */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden shrink-0">
            <button
              onClick={() => setIsPrescriptionModalOpen(true)}
              className="px-2 sm:px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap"
              title="Upload Doctor Prescription"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">Upload Rx</span>
              <span className="xs:hidden sm:hidden">Rx</span>
            </button>

            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="hidden md:flex px-3 py-1.5 bg-gradient-to-r from-amber-500 to-sterile-cyan text-white font-bold text-xs rounded-full shadow-sm items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>

            <button 
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Prominent Hamburger Menu Button */}
            <button 
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-amber-500/10 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400 transition-all cursor-pointer flex items-center justify-center shrink-0 min-w-[36px] min-h-[36px]"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-slate-900 dark:text-slate-100" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-slate-950 flex flex-col xl:hidden"
          >
            {/* Drawer Top Header Bar */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md shrink-0">
              <Logo size="sm" />
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  aria-label="Toggle Theme"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white hover:text-amber-500 transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Navigation Area */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              
              {/* Primary CTAs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsBookingModalOpen(true); }}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-sky-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 text-center"
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span>Book Home Visit</span>
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsPrescriptionModalOpen(true); }}
                  className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold text-xs flex flex-col items-center justify-center gap-1.5 text-center"
                >
                  <UploadCloud className="w-5 h-5" />
                  <span>Upload Prescription</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-2">
                  Navigation
                </p>
                {NAV_LINKS.map(link => (
                  <a 
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="flex items-center justify-between p-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <span className="text-slate-400 text-xs">→</span>
                  </a>
                ))}
              </div>

              {/* Quick Access Links */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-2">
                  Quick Access
                </p>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsSampleReportModalOpen(true); }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sterile-cyan" />
                    View Sample Report PDF
                  </span>
                  <span className="text-[10px] text-slate-400">Preview</span>
                </button>

                <a
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    Google Reviews & Rating (4.9 ★)
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-500" />
                    Lab Location on Google Maps
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              {/* Direct Support Strip */}
              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Need Urgent Help?</h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Certified Pathologist Support</p>
                  </div>
                  <a
                    href={`https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Sun Life Path Lab, I need assistance with lab tests.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-modal relative w-full max-w-md p-6 md:p-8 rounded-3xl overflow-hidden z-10 my-8"
            >
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-3 text-amber-500 border border-amber-500/20">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white">Book Home Collection</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Certified phlebotomist visit to your doorstep. Free collection on orders above ₹500.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Patient Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs md:text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs md:text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Address for Sample Pickup</label>
                  <textarea 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs md:text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="House/Flat No., Landmark, Sector"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Preferred Time Slot</label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option>Morning (7:00 AM - 9:00 AM)</option>
                      <option>Morning (9:00 AM - 11:00 AM)</option>
                      <option>Afternoon (11:00 AM - 2:00 PM)</option>
                      <option>Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tests / Package Required</label>
                  <input 
                    type="text" 
                    name="test"
                    value={formData.test}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs md:text-sm text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="e.g. CBC, Lipid, Thyroid, Full Body Shield"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition-all text-xs md:text-sm"
                >
                  <Send className="w-4 h-4" />
                  Send Request via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Prescription Modal */}
      <PrescriptionUploadModal 
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
      />

      {/* Sample Report Modal */}
      <SampleReportModal 
        isOpen={isSampleReportModalOpen}
        onClose={() => setIsSampleReportModalOpen(false)}
      />

      {/* Main Content */}
      <main className="relative z-10 pt-20 md:pt-28 pb-20 overflow-hidden">
        
        {/* Hero Section Carousel */}
        <section id="hero" className="mb-8 md:mb-12">
          <HeroCarousel 
            onBookVisit={(testName) => {
              if (testName) {
                setFormData(prev => ({ ...prev, test: testName }));
              }
              setIsBookingModalOpen(true);
            }}
            onUploadRx={() => setIsPrescriptionModalOpen(true)}
            onExploreTests={() => scrollToSection('#test-directory')}
            onSelectPackage={handleSelectPackageForBooking}
            packages={PACKAGES}
          />
        </section>

        {/* Test Directory & Search Component */}
        <TestDirectory 
          selectedTests={selectedTests}
          onToggleTestInCart={handleToggleTestInCart}
          onSelectTestForBooking={handleSelectTestForDirectBooking}
        />

        {/* Pricing Packages */}
        <section id="packages" className="bg-slate-100 dark:bg-slate-950/50 py-16 md:py-24 border-y border-slate-200 dark:border-slate-900 relative pt-12 md:pt-20">
          <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern opacity-10 dark:opacity-[0.03] pointer-events-none" />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Comprehensive Preventive Checkups
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-3">
                Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sterile-cyan">Packages</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                Tailored health packages for routine wellness, working professionals, and senior citizens.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
              {PACKAGES.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className={`
                    relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border 
                    ${pkg.popular ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)] scale-100 lg:scale-105 z-10' : 'border-slate-200 dark:border-slate-800'}
                    p-6 md:p-8 rounded-3xl flex flex-col h-full transition-transform hover:-translate-y-1 shadow-sm
                  `}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                      MOST POPULAR • BEST VALUE
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-bold font-sans text-slate-900 dark:text-white">{pkg.price}</span>
                      <span className="text-xs md:text-sm text-slate-400 line-through decoration-rose-500">{pkg.originalPrice}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md">
                        For: {pkg.recommendedFor}
                      </p>
                      {pkg.fasting && (
                        <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-md">
                          {pkg.fasting}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow mb-8 space-y-2.5">
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-3 border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
                      <span>INCLUDES {pkg.testsIncluded} KEY TESTS</span>
                      <span className="text-[10px] text-emerald-500 font-semibold">{pkg.reportTime}</span>
                    </div>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleSelectPackageForBooking(pkg)}
                    className={`
                      w-full py-3.5 font-bold rounded-xl transition-all duration-300 text-xs md:text-sm flex items-center justify-center gap-2
                      ${pkg.popular 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/20' 
                        : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white'}
                    `}
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Book This Package
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Test Package Builder / Interactive Price Estimator */}
        <CostEstimator 
          selectedTests={selectedTests}
          onToggleTest={handleToggleTestInCart}
          onClearAll={handleClearAllTests}
        />

        {/* Home Sample Collection 4-Step Process Visualizer */}
        <HomeCollectionProcess 
          onBookClick={() => setIsBookingModalOpen(true)}
        />

        {/* Services / Specialty Category Section */}
        <section id="services" className="container mx-auto px-4 md:px-8 mb-24 md:mb-32 pt-12 md:pt-20">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 md:mb-12 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="mb-6 md:mb-0 w-full md:w-auto">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">
                Clinical Pathology Wings
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-2">
                Specialized <span className="text-sterile-cyan">Departments</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
                Equipped with automated chemiluminescence, hematology & immunology analyzers.
              </p>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {[
                { id: 'hematology', label: 'Hematology', icon: FlaskConical },
                { id: 'advanced', label: 'Biochemistry', icon: Activity },
                { id: 'infection', label: 'Immunology & Vitamins', icon: ShieldCheck }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceTab(tab.id as any)}
                  className={`
                    flex items-center gap-2 px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap
                    ${activeServiceTab === tab.id 
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                      : 'bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
                  `}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='wait'>
              {getActiveServices().map((service, index) => (
                <ServiceCard 
                  key={service.id}
                  {...service}
                  delay={index * 0.1}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Imaging & Radiology Grid */}
        <section id="imaging" className="container mx-auto px-4 md:px-8 mb-24 md:mb-32 pt-12 md:pt-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 md:w-12 h-[2px] bg-vitality-green"></div>
              <span className="text-vitality-green font-bold text-xs md:text-sm tracking-widest uppercase">Visualization Centre</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Radiology & <span className="text-vitality-green">Imaging Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {IMAGING_SERVICES.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-56 md:h-64 overflow-hidden border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur rounded-2xl hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 dark:from-slate-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4 group-hover:border-vitality-green group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300">
                    <img.icon className="w-6 h-6 md:w-8 md:h-8 text-slate-400 dark:text-slate-400 group-hover:text-vitality-green transition-colors" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">{img.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-xs text-xs md:text-sm">{img.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-4 md:px-8 mt-24 md:mt-32 pt-12 md:pt-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2">
              <div className="relative mb-6">
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl"></div>
                <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2 relative z-10">Why Choose Us</h2>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6 relative z-10">
                  The Sun Life <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sterile-cyan">Advantage</span>
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                    <Microscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Automated Analyzers</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      We utilize calibrated automated chemistry and chemiluminescence analyzers to guarantee high precision, quality control, and dependable test results.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center shrink-0 text-green-600 dark:text-green-400">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Patient-Centric Care</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      From gentle, hygienic sample collection to clear report delivery, we prioritize patient comfort and understanding.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center shrink-0 text-cyan-600 dark:text-cyan-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Rapid Turnaround & Home Visits</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Prompt sample pick-up from your doorstep and fast digital report dispatch via WhatsApp and Email.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <h4 className="text-3xl font-bold text-amber-500 mb-1">10k+</h4>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Patients Served</p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">99.8%</h4>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Diagnostic Accuracy</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">NABL</h4>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Standard Quality</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <h4 className="text-3xl font-bold text-vitality-green mb-1">24/7</h4>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Booking Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Patient Guidelines & FAQs */}
        <PatientGuidelines />

        {/* Patient Reviews & Google Trust */}
        <ReviewsSection />

        {/* Contact / Location & Google Map Card */}
        <section id="contact" className="container mx-auto px-4 md:px-8 mt-24 md:mt-32 pt-12 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-6 md:p-12 rounded-3xl relative overflow-hidden shadow-sm">
            
            {/* CTA & Details */}
            <div className="relative z-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  PHYSICAL LAB LOCATION
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
                Visit <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-sterile-cyan">Sun Life Path Lab</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Visit our diagnostic centre or schedule a certified phlebotomist home collection. View our verified location on Google Maps below.
              </p>
              
              <div className="space-y-5">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">Lab Address</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">{LAB_ADDRESS}</p>
                      <a 
                        href={GOOGLE_MAPS_URL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-xs font-semibold text-sterile-cyan hover:underline mt-1"
                      >
                        Open exact pin in Google Maps
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20">
                      <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">Contact & Helpline</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">{LAB_PHONE_NUMBER}</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20">
                      <Star className="w-5 h-5 md:w-6 md:h-6 fill-amber-500 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">Google Business Profile</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Verified reviews, lab ratings & photos</p>
                      <a 
                        href={GOOGLE_PROFILE_URL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 hover:underline mt-1"
                      >
                        View Google profile & feedback
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8 md:mt-10">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="py-3 px-6 bg-gradient-to-r from-amber-500 to-sterile-cyan hover:from-amber-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 text-xs md:text-sm flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book Home Visit
                </button>
                <a 
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700 text-xs md:text-sm flex items-center gap-2 group"
                >
                  <Navigation className="w-4 h-4 text-sterile-cyan group-hover:scale-110 transition-transform" />
                  Get Directions
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Interactive Map Visual Link Card */}
            <a 
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-80 lg:h-full min-h-[320px] bg-slate-100 dark:bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col justify-between p-6 transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer"
            >
              {/* Map background grid pattern & pulse */}
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                <div className="w-full h-full bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#475569_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
              </div>

              {/* Top status banner */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live on Google Maps
                </span>
                <span className="p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-slate-700 dark:text-slate-300 group-hover:text-amber-500 transition-colors shadow-sm">
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>

              {/* Center Map Pin Graphic */}
              <div className="relative z-10 text-center my-auto flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-md group-hover:bg-amber-500/30 transition-all" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7" />
                  </div>
                </div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-lg md:text-xl group-hover:text-amber-500 transition-colors">
                  Sun Life Path Lab
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                  Click to launch Navigation & Directions in Google Maps
                </p>
              </div>

              {/* Bottom Quick Bar */}
              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/60 -mx-6 -mb-6 p-4 px-6 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>Google Ratings & Reviews</span>
                </div>
                <span className="text-xs font-bold text-sterile-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Open Maps →
                </span>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Floating Action Bar */}
      <FloatingActionBar 
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
        selectedCount={selectedTests.length}
        visible={!isMobileMenuOpen && !isBookingModalOpen && !isPrescriptionModalOpen && !isSampleReportModalOpen}
      />

      {/* Footer */}
      <footer className="relative z-10 bg-slate-100 dark:bg-black py-10 md:py-14 border-t border-slate-200 dark:border-slate-900 mt-16 md:mt-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <Logo size="md" />

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-slate-600 dark:text-slate-400">
              <a 
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                Google Business Profile
              </a>
              <a 
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sterile-cyan transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-sterile-cyan" />
                Google Maps Location
              </a>
              <button 
                onClick={() => setIsPrescriptionModalOpen(true)}
                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
              >
                <UploadCloud className="w-4 h-4 text-amber-500" />
                Upload Rx
              </button>
              <button 
                onClick={() => setIsSampleReportModalOpen(true)}
                className="hover:text-sterile-cyan transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-sterile-cyan" />
                Sample Report
              </button>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-500" />
                Book Home Visit
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-slate-500 text-xs md:text-sm">
              © {new Date().getFullYear()} SUN LIFE PATH LAB. NABL ACCREDITED DIAGNOSTIC CENTRE.
            </p>
            <p className="text-slate-400 text-xs">
              Precision Pathology • Certified Technicians • Rapid Reporting
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
