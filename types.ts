import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  icon: LucideIcon;
  tags: string[];
}

export interface DiagnosticTest {
  id: string;
  name: string;
  category: 'hematology' | 'biochemistry' | 'hormones' | 'diabetes' | 'vitamins' | 'infections' | 'imaging' | 'special';
  price: number;
  originalPrice: number;
  sampleType: string;
  fastingRequired: boolean;
  fastingHours?: number;
  turnaroundTime: string;
  description: string;
  parametersCount?: number;
  popular?: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  testsIncluded: number;
  price: string;
  priceNumber: number;
  originalPrice: string;
  features: string[];
  recommendedFor: string;
  popular?: boolean;
  fasting?: string;
  reportTime?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  testName?: string;
  category?: 'home_collection' | 'package' | 'fast_reports' | 'doctor';
  verifiedPatient?: boolean;
  userInitials?: string;
}

export enum SectionType {
  HERO = 'hero',
  TESTS = 'tests',
  SERVICES = 'services',
  IMAGING = 'imaging',
  PACKAGES = 'packages',
  CALCULATOR = 'calculator',
  PROCESS = 'process',
  ABOUT = 'about',
  GUIDELINES = 'guidelines',
  REVIEWS = 'reviews',
  CONTACT = 'contact',
}
