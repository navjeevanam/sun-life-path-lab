import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  CalendarCheck, 
  UploadCloud, 
  Search, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  HeartPulse, 
  Droplets, 
  Activity, 
  ArrowRight,
  Star,
  Zap,
  Microscope,
  Award
} from 'lucide-react';
import { PackageItem, DiagnosticTest } from '../types';
import { GOOGLE_MAPS_URL, GOOGLE_PROFILE_URL, LAB_WHATSAPP_NUMBER } from '../constants';

export interface CarouselSlide {
  id: string;
  badge: string;
  badgeType: 'promo' | 'featured' | 'trust' | 'service';
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  primaryActionLabel: string;
  primaryActionType: 'book' | 'upload' | 'explore' | 'whatsapp';
  secondaryActionLabel: string;
  secondaryActionType: 'book' | 'upload' | 'explore' | 'whatsapp' | 'package';
  tagList: string[];
  metrics: { label: string; value: string; icon: any }[];
  bgGradient: string;
  accentColor: string;
  accentBadgeColor: string;
  packageRefId?: string;
  highlightPrice?: { current: string; original?: string; discount?: string };
}

interface HeroCarouselProps {
  onBookVisit: (testName?: string) => void;
  onUploadRx: () => void;
  onExploreTests: () => void;
  onSelectPackage?: (pkg: PackageItem) => void;
  packages: PackageItem[];
}

export const HERO_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-home-pickup',
    badge: 'NABL Quality Standard & Doorstep Care',
    badgeType: 'trust',
    title: 'Precision Pathology,',
    titleHighlight: 'At Your Doorstep',
    subtitle: 'Sun Life Path Lab • Accurate Diagnostic Solutions',
    description: 'Certified phlebotomists, automated barcoded sample handling, and verifiable digital PDF reports delivered straight to your WhatsApp in 4-8 hours.',
    primaryActionLabel: 'Book Free Home Visit',
    primaryActionType: 'book',
    secondaryActionLabel: 'Upload Doctor Prescription',
    secondaryActionType: 'upload',
    tagList: ['Zero Sample Mixing', 'Pre-sealed Vacutainers', 'Same Day WhatsApp Reports'],
    metrics: [
      { label: 'Google Rating', value: '4.9 ★', icon: Star },
      { label: 'Happy Patients', value: '50k+', icon: HeartPulse },
      { label: 'Turnaround', value: '4-8 Hrs', icon: Clock },
    ],
    bgGradient: 'from-amber-500/15 via-sky-500/10 to-transparent',
    accentColor: 'text-amber-500 dark:text-amber-400',
    accentBadgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  },
  {
    id: 'slide-full-body',
    badge: 'Limited Period Offer • 52% Flat Discount',
    badgeType: 'promo',
    title: 'Full Body Executive',
    titleHighlight: 'Shield Health Package',
    subtitle: '88 Vital Parameters Including Vitamins & Thyroid',
    description: 'Complete screening of Liver, Kidney, Lipid, Sugar, CBC, Thyroid Profile, and Vitamin D & B12 for whole-body preventive wellness.',
    primaryActionLabel: 'Book Package @ ₹1,999',
    primaryActionType: 'book',
    secondaryActionLabel: 'Explore All Packages',
    secondaryActionType: 'explore',
    tagList: ['88 Tests Included', '10-12 Hrs Fasting', 'Free Home Collection'],
    metrics: [
      { label: 'Package Price', value: '₹1,999', icon: Sparkles },
      { label: 'Actual Value', value: '₹4,200', icon: Award },
      { label: 'Total Parameters', value: '88+', icon: Activity },
    ],
    bgGradient: 'from-sky-500/15 via-indigo-500/10 to-transparent',
    accentColor: 'text-sky-500 dark:text-sky-400',
    accentBadgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
    packageRefId: 'pkg2',
    highlightPrice: { current: '₹1,999', original: '₹4,200', discount: '52% OFF' }
  },
  {
    id: 'slide-rx-upload',
    badge: 'Quick & Convenient 2-Minute Booking',
    badgeType: 'service',
    title: 'Have a Doctor’s',
    titleHighlight: 'Prescription Slip?',
    subtitle: 'Upload Photo & Get Instant Lab Quotation on WhatsApp',
    description: 'Avoid confusion with handwritten tests. Our certified pathologist analyzes your prescription, applies best package discounts, and schedules sample pickup.',
    primaryActionLabel: 'Upload Prescription Now',
    primaryActionType: 'upload',
    secondaryActionLabel: 'Chat with Lab on WhatsApp',
    secondaryActionType: 'whatsapp',
    tagList: ['Instant Quotation', 'Pharmacist Assistance', 'Best Bundle Pricing'],
    metrics: [
      { label: 'Response Time', value: '< 5 Mins', icon: Clock },
      { label: 'Discount Benefit', value: 'Up to 50%', icon: Zap },
      { label: 'Accuracy Check', value: 'Pathologist Verified', icon: ShieldCheck },
    ],
    bgGradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    accentColor: 'text-emerald-500 dark:text-emerald-400',
    accentBadgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'slide-diabetes-cardiac',
    badge: 'Specialized Metabolic & Cardiac Care',
    badgeType: 'featured',
    title: 'Diabetes & Heart',
    titleHighlight: 'Risk Evaluation',
    subtitle: 'Gold Standard HPLC HbA1c, Lipid Profile & ECG',
    description: 'Prevent complications with accurate 3-month average glucose monitoring (HbA1c), Atherogenic lipid index, and computerized resting 12-lead ECG.',
    primaryActionLabel: 'Book Diabetes Screen (₹450)',
    primaryActionType: 'book',
    secondaryActionLabel: 'Search All Tests',
    secondaryActionType: 'explore',
    tagList: ['HbA1c & Fasting Glucose', 'Lipid Risk Ratios', 'Cardiologist Verified ECG'],
    metrics: [
      { label: 'HbA1c Method', value: 'HPLC Standard', icon: Microscope },
      { label: 'Report Delivery', value: '4-6 Hours', icon: Clock },
      { label: 'ECG Duration', value: '15 Mins', icon: HeartPulse },
    ],
    bgGradient: 'from-amber-500/15 via-rose-500/10 to-transparent',
    accentColor: 'text-amber-500 dark:text-amber-400',
    accentBadgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    highlightPrice: { current: '₹450', original: '₹700', discount: '35% OFF' }
  }
];

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onBookVisit,
  onUploadRx,
  onExploreTests,
  onSelectPackage,
  packages
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleAction = (type: string, slide: CarouselSlide) => {
    switch (type) {
      case 'book':
        if (slide.packageRefId && packages) {
          const pkg = packages.find(p => p.id === slide.packageRefId);
          if (pkg && onSelectPackage) {
            onSelectPackage(pkg);
            return;
          }
        }
        if (slide.id === 'slide-diabetes-cardiac') {
          onBookVisit('HbA1c & Diabetes Risk Screen (₹450)');
        } else {
          onBookVisit();
        }
        break;
      case 'upload':
        onUploadRx();
        break;
      case 'explore':
        onExploreTests();
        break;
      case 'whatsapp':
        window.open(
          `https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Hello Sun Life Path Lab, I would like to inquire about diagnostic tests and home sample collection.`
          )}`,
          '_blank'
        );
        break;
      default:
        onBookVisit();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div 
      id="hero-carousel-container"
      className="relative w-full overflow-hidden pt-4 pb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Main Carousel Card */}
        <div className="relative min-h-[460px] md:min-h-[420px] rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl dark:shadow-2xl overflow-hidden p-6 sm:p-8 md:p-12">
          
          {/* Subtle gradient overlay per slide */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.bgGradient} opacity-60 pointer-events-none transition-all duration-700`} />
          
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Headings, details, actions */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                
                {/* Badge Row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border flex items-center gap-1.5 ${currentSlide.accentBadgeColor}`}>
                    <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                    {currentSlide.badge}
                  </span>
                  
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    100% Certified Phlebotomists
                  </span>
                </div>

                {/* Main Titles */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-2 font-display">
                  {currentSlide.title}{' '}
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-sky-500 to-teal-500`}>
                    {currentSlide.titleHighlight}
                  </span>
                </h1>

                {/* Subtitle / Punchline */}
                <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400 mb-3">
                  {currentSlide.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                  {currentSlide.description}
                </p>

                {/* Key feature pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentSlide.tagList.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id={`hero-action-primary-${currentIndex}`}
                    onClick={() => handleAction(currentSlide.primaryActionType, currentSlide)}
                    className="px-6 sm:px-8 py-3.5 bg-gradient-to-r from-amber-500 to-sky-600 hover:from-amber-600 hover:to-sky-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>{currentSlide.primaryActionLabel}</span>
                  </button>

                  <button
                    id={`hero-action-secondary-${currentIndex}`}
                    onClick={() => handleAction(currentSlide.secondaryActionType, currentSlide)}
                    className="px-5 sm:px-6 py-3.5 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-full border border-slate-200 dark:border-slate-700 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:border-amber-500/50"
                  >
                    {currentSlide.secondaryActionType === 'upload' ? (
                      <UploadCloud className="w-4 h-4 text-amber-500" />
                    ) : currentSlide.secondaryActionType === 'whatsapp' ? (
                      <Activity className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Search className="w-4 h-4 text-sky-500" />
                    )}
                    <span>{currentSlide.secondaryActionLabel}</span>
                  </button>
                </div>

              </div>

              {/* Right Column: Visual Feature Card & Quick Metrics */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="p-6 rounded-2xl bg-slate-50/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-md">
                  
                  {currentSlide.highlightPrice ? (
                    <div className="mb-5 pb-5 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Offer Pricing</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          {currentSlide.highlightPrice.discount}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                          {currentSlide.highlightPrice.current}
                        </span>
                        {currentSlide.highlightPrice.original && (
                          <span className="text-sm font-semibold text-slate-400 line-through">
                            {currentSlide.highlightPrice.original}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Zero Home Sample Collection Fee
                      </p>
                    </div>
                  ) : null}

                  {/* Highlights Grid */}
                  <div className="space-y-3.5">
                    {currentSlide.metrics.map((metric, mIdx) => {
                      const IconComp = metric.icon;
                      return (
                        <div 
                          key={mIdx}
                          className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                              {metric.label}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                            {metric.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Action Footer in Card */}
                  <div className="mt-4 pt-3 text-center">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Slot confirmation within 5 minutes
                    </p>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Controls */}
          <div className="absolute bottom-4 left-6 right-6 md:left-12 md:right-12 z-20 flex items-center justify-between pointer-events-none">
            
            {/* Dots / Indicators */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  id={`carousel-dot-${idx}`}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex 
                      ? 'w-8 bg-amber-500 dark:bg-amber-400' 
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                id="carousel-prev-btn"
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md transition-all cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                id="carousel-next-btn"
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md transition-all cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Autoplay Progress Timer Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200/50 dark:bg-slate-800">
            <motion.div
              key={currentIndex}
              initial={{ width: '0%' }}
              animate={{ width: isPaused ? '0%' : '100%' }}
              transition={{ duration: isPaused ? 0 : 6, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-amber-500 via-sky-500 to-teal-500"
            />
          </div>

        </div>

        {/* 4-Item Quick Trust & Convenience Strip below hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Painless Collection</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">BD Vacutainers & Sterile Kit</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Same-Day Reports</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">WhatsApp & Email PDF Delivery</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Barcoded Safety</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Zero Sample Error Guarantee</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 fill-purple-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">4.9 ★ on Google</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Verified Patient Trust</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroCarousel;
