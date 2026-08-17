import { 
  Activity, 
  Droplets, 
  Dna, 
  ShieldCheck, 
  Zap, 
  Microscope, 
  Scan, 
  HeartPulse, 
  BrainCircuit,
  Bone,
  Eye,
  Thermometer,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { ServiceItem, PackageItem, DiagnosticTest, TestimonialItem } from './types';

export const GOOGLE_PROFILE_URL = 'https://share.google/DwSfsckeACq5hXrcr';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/2F2TuzAi6SoycW158';
export const LAB_PHONE_NUMBER = "+91 98765 43210";
export const LAB_WHATSAPP_NUMBER = "919876543210";
export const LAB_ADDRESS = "Sun Life Path Lab, Palam / Dwarka, New Delhi";

export const NAV_LINKS = [
  { label: 'Tests', href: '#test-directory' },
  { label: 'Packages', href: '#packages' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Imaging', href: '#imaging' },
  { label: 'How It Works', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  {
    id: 'test-cbc',
    name: 'Complete Blood Count (CBC + ESR)',
    category: 'hematology',
    price: 350,
    originalPrice: 500,
    sampleType: 'Blood (EDTA tube)',
    fastingRequired: false,
    turnaroundTime: '4 - 6 Hours',
    description: 'Measures RBC, WBC, Hemoglobin, Platelets, MCV, MCH, MCHC and automated ESR for infection and anemia screening.',
    parametersCount: 24,
    popular: true
  },
  {
    id: 'test-lipid',
    name: 'Lipid Profile (Comprehensive)',
    category: 'biochemistry',
    price: 650,
    originalPrice: 1000,
    sampleType: 'Blood (Serum)',
    fastingRequired: true,
    fastingHours: 12,
    turnaroundTime: '6 - 8 Hours',
    description: 'Total Cholesterol, HDL, LDL, VLDL, Triglycerides and Atherogenic Risk Ratios for cardiovascular screening.',
    parametersCount: 8,
    popular: true
  },
  {
    id: 'test-thyroid',
    name: 'Thyroid Profile Total (T3, T4, TSH)',
    category: 'hormones',
    price: 500,
    originalPrice: 850,
    sampleType: 'Blood (Serum)',
    fastingRequired: true,
    fastingHours: 8,
    turnaroundTime: '6 - 8 Hours',
    description: 'High-sensitivity chemiluminescence immunoassay for thyroid gland function, metabolism, and weight regulation.',
    parametersCount: 3,
    popular: true
  },
  {
    id: 'test-hba1c',
    name: 'HbA1c (Glycated Hemoglobin)',
    category: 'diabetes',
    price: 450,
    originalPrice: 700,
    sampleType: 'Blood (EDTA tube)',
    fastingRequired: false,
    turnaroundTime: '4 - 6 Hours',
    description: 'Gold standard HPLC method assessing average 3-month blood glucose control with estimated Average Glucose (eAG).',
    parametersCount: 2,
    popular: true
  },
  {
    id: 'test-fbs',
    name: 'Fasting Blood Sugar (FBS / PPBS)',
    category: 'diabetes',
    price: 100,
    originalPrice: 180,
    sampleType: 'Blood (Fluoride tube)',
    fastingRequired: true,
    fastingHours: 8,
    turnaroundTime: '3 - 5 Hours',
    description: 'Direct enzymatic glucose test for immediate detection and monitoring of prediabetes and diabetes mellitus.',
    parametersCount: 1
  },
  {
    id: 'test-lft',
    name: 'Liver Function Test (LFT Complete)',
    category: 'biochemistry',
    price: 700,
    originalPrice: 1100,
    sampleType: 'Blood (Serum)',
    fastingRequired: true,
    fastingHours: 8,
    turnaroundTime: '6 - 8 Hours',
    description: 'SGOT, SGPT, Bilirubin Total/Direct/Indirect, Alkaline Phosphatase, Total Protein, Albumin, Globulin & A/G Ratio.',
    parametersCount: 11,
    popular: true
  },
  {
    id: 'test-kft',
    name: 'Kidney Function Test (KFT / RFT)',
    category: 'biochemistry',
    price: 650,
    originalPrice: 1050,
    sampleType: 'Blood (Serum)',
    fastingRequired: false,
    turnaroundTime: '6 - 8 Hours',
    description: 'Urea, Blood Urea Nitrogen, Serum Creatinine, Uric Acid, Calcium, and Phosphorus with eGFR calculation.',
    parametersCount: 7,
    popular: true
  },
  {
    id: 'test-vitd',
    name: 'Vitamin D 25-Hydroxy',
    category: 'vitamins',
    price: 999,
    originalPrice: 1600,
    sampleType: 'Blood (Serum)',
    fastingRequired: false,
    turnaroundTime: '12 - 24 Hours',
    description: 'Quantitative measurement of 25-OH Vitamin D for bone density, calcium metabolism, and immunity evaluation.',
    parametersCount: 1,
    popular: true
  },
  {
    id: 'test-vitb12',
    name: 'Vitamin B12 (Cyanocobalamin)',
    category: 'vitamins',
    price: 850,
    originalPrice: 1400,
    sampleType: 'Blood (Serum)',
    fastingRequired: true,
    fastingHours: 8,
    turnaroundTime: '12 - 24 Hours',
    description: 'Chemiluminescent assay assessing nerve function, cognitive health, fatigue levels, and red cell synthesis.',
    parametersCount: 1,
    popular: true
  },
  {
    id: 'test-urine',
    name: 'Urine Routine & Microscopy',
    category: 'hematology',
    price: 200,
    originalPrice: 350,
    sampleType: 'Fresh Midstream Urine',
    fastingRequired: false,
    turnaroundTime: '4 - 6 Hours',
    description: 'Physical, chemical, and microscopic examination for UTI, protein leak, kidney stones, and glucose presence.',
    parametersCount: 18
  },
  {
    id: 'test-dengue',
    name: 'Dengue Duo (NS1 Antigen + IgG/IgM)',
    category: 'infections',
    price: 900,
    originalPrice: 1400,
    sampleType: 'Blood (Serum)',
    fastingRequired: false,
    turnaroundTime: '4 - 6 Hours',
    description: 'Rapid immuno-chromatographic detection of acute dengue infection and antibodies with platelet correlation.',
    parametersCount: 3
  },
  {
    id: 'test-iron',
    name: 'Iron Deficiency Profile (Iron + TIBC + Ferritin)',
    category: 'biochemistry',
    price: 1100,
    originalPrice: 1800,
    sampleType: 'Blood (Serum)',
    fastingRequired: true,
    fastingHours: 8,
    turnaroundTime: '8 - 12 Hours',
    description: 'Comprehensive iron stores, transferrin saturation, and serum ferritin for persistent fatigue and anemia.',
    parametersCount: 4
  },
  {
    id: 'test-electrolytes',
    name: 'Serum Electrolytes (Na+, K+, Cl-)',
    category: 'biochemistry',
    price: 450,
    originalPrice: 750,
    sampleType: 'Blood (Serum)',
    fastingRequired: false,
    turnaroundTime: '4 - 6 Hours',
    description: 'Ion-selective electrode measurement of sodium, potassium, and chloride for fluid balance and blood pressure.',
    parametersCount: 3
  },
  {
    id: 'test-ecg',
    name: '12-Lead Resting ECG',
    category: 'imaging',
    price: 300,
    originalPrice: 500,
    sampleType: 'In-Lab Diagnostic',
    fastingRequired: false,
    turnaroundTime: 'Instant / 15 Mins',
    description: 'High-definition 12-channel electrocardiography reviewed by consulting cardiologist for rhythm analysis.',
    parametersCount: 1
  }
];

export const HEMATOLOGY_SERVICES: ServiceItem[] = [
  {
    id: 'h1',
    title: 'Complete Blood Count (CBC)',
    description: 'Detailed analysis of RBCs, WBCs, Platelets, and automated ESR for infection and vitality screening.',
    icon: Droplets,
    tags: ['Hemoglobin', 'Platelet Count', 'ESR', 'TLC/DLC'],
  },
  {
    id: 'h2',
    title: 'Lipid & Cardiac Risk',
    description: 'Comprehensive cholesterol screening to assess cardiovascular risk and atherogenic index.',
    icon: HeartPulse,
    tags: ['Cholesterol', 'Triglycerides', 'HDL', 'LDL'],
  },
  {
    id: 'h3',
    title: 'Diabetic Screen & HbA1c',
    description: 'Precision glucose monitoring including 3-month average HbA1c and fasting blood sugar.',
    icon: Activity,
    tags: ['HbA1c', 'Fasting Glucose', 'PPBS'],
  },
];

export const ADVANCED_SCREENING: ServiceItem[] = [
  {
    id: 'a1',
    title: 'Thyroid & Endocrine',
    description: 'Ultra-sensitive T3, T4, and TSH hormone analysis for metabolism, mood, and thyroid balance.',
    icon: Activity,
    tags: ['Total T3', 'Total T4', 'Ultrasensitive TSH'],
  },
  {
    id: 'a2',
    title: 'Liver Function Panel (LFT)',
    description: 'Assessment of SGOT, SGPT, Bilirubin fractions, and protein synthesis for hepatic health.',
    icon: Zap,
    tags: ['SGOT', 'SGPT', 'Bilirubin', 'Alkaline Phosphatase'],
  },
  {
    id: 'a3',
    title: 'Kidney Function Panel (KFT)',
    description: 'Evaluation of Serum Creatinine, Blood Urea, Uric Acid, and electrolytes with eGFR.',
    icon: Activity,
    tags: ['Urea', 'Creatinine', 'Uric Acid', 'eGFR'],
  },
];

export const INFECTION_SHIELD: ServiceItem[] = [
  {
    id: 'i1',
    title: 'Viral & Infectious Markers',
    description: 'Rapid detection of Hepatitis B (HBsAg), HCV, HIV, and acute seasonal pathogens.',
    icon: ShieldCheck,
    tags: ['HBsAg', 'HCV', 'HIV I & II', 'VDRL'],
  },
  {
    id: 'i2',
    title: 'Vector-Borne & Fever Profile',
    description: 'Precision antigen & antibody testing for Dengue NS1, Malaria parasite, and Typhoid Widal.',
    icon: Dna,
    tags: ['Dengue NS1', 'Malaria MP', 'Typhoid Widal'],
  },
  {
    id: 'i3',
    title: 'Vitamins & Micronutrients',
    description: 'Advanced Vitamin D3 and Vitamin B12 chemiluminescent assays for fatigue and immunity.',
    icon: Thermometer,
    tags: ['Vitamin D 25-OH', 'Vitamin B12', 'Serum Iron'],
  },
];

export const IMAGING_SERVICES = [
  {
    id: 'img1',
    title: 'Digital X-Ray (High Res)',
    desc: 'High-resolution low-radiation digital radiography for chest, bones, joints, and spine.',
    icon: Bone,
  },
  {
    id: 'img2',
    title: 'Ultrasound / Sonography',
    desc: 'Advanced ultrasound for whole abdomen, pelvis, KUB, thyroid, and obstetrics.',
    icon: Activity,
  },
  {
    id: 'img3',
    title: '12-Lead Computerized ECG',
    desc: 'Immediate resting electrocardiogram evaluated for arrhythmias and ischemic changes.',
    icon: HeartPulse,
  },
  {
    id: 'img4',
    title: 'CT & MRI Network Support',
    desc: 'Seamless appointment facilitation with certified imaging centers at discounted rates.',
    icon: BrainCircuit,
  },
];

export const PACKAGES: PackageItem[] = [
  {
    id: 'pkg1',
    name: 'ESSENTIAL WELLNESS',
    testsIncluded: 48,
    price: '₹799',
    priceNumber: 799,
    originalPrice: '₹1,600',
    recommendedFor: 'Routine Annual Health Check',
    fasting: '10 - 12 Hours Fasting',
    reportTime: 'Same Day (6-8 Hrs)',
    popular: false,
    features: [
      'Complete Blood Count (CBC + 24 Parameters)',
      'Fasting Blood Sugar (FBS)',
      'Lipid Profile (Cholesterol, Triglycerides, HDL, LDL)',
      'Kidney Function (Urea, Creatinine, Uric Acid)',
      'Liver Screen (SGOT, SGPT, Bilirubin)',
      'Urine Routine & Microscopic (18 Parameters)'
    ],
  },
  {
    id: 'pkg2',
    name: 'FULL BODY EXECUTIVE SHIELD',
    testsIncluded: 88,
    price: '₹1,999',
    priceNumber: 1999,
    originalPrice: '₹4,200',
    recommendedFor: 'Adults 25+ / Working Professionals',
    fasting: '10 - 12 Hours Fasting',
    reportTime: 'Same Day (8-10 Hrs)',
    popular: true,
    features: [
      'Complete Blood Count (CBC + ESR)',
      'Comprehensive Liver Function Test (11 Parameters)',
      'Kidney Function & Electrolytes (KFT + Na/K/Cl)',
      'Complete Lipid Profile (8 Parameters)',
      'Thyroid Profile (T3, T4, TSH Ultrasensitive)',
      'HbA1c & Fasting Blood Sugar (Diabetes Screen)',
      'Vitamin D (25-OH) & Vitamin B12 Assay',
      'Urine Routine & Automated Microscopic'
    ],
  },
  {
    id: 'pkg3',
    name: 'SENIOR CITIZEN COMPREHENSIVE',
    testsIncluded: 98,
    price: '₹2,999',
    priceNumber: 2999,
    originalPrice: '₹5,800',
    recommendedFor: 'Seniors Age 50+ & Chronic Care',
    fasting: '10 - 12 Hours Fasting',
    reportTime: 'Same Day (8-12 Hrs)',
    popular: false,
    features: [
      'Everything in Full Body Executive Shield',
      'Cardiac Risk Markers & Atherogenic Ratios',
      'Calcium, Phosphorus & Bone Mineral Screen',
      'Serum Ferritin & Iron Deficiency Profile',
      'Uric Acid (Gout & Joint Pain Evaluation)',
      'Prostate Screen (PSA for Men) / Hormone Check',
      'Free Doctor Report Consultation on WhatsApp'
    ],
  },
];

export const PATIENT_GUIDELINES = [
  {
    title: 'Fasting Guidelines',
    icon: Clock,
    summary: '10 - 12 hours of overnight fasting required for Lipid Profile, Fasting Sugar, and LFT.',
    details: 'You may drink plain water. Avoid tea, coffee, milk, juices, chewing gum, or tobacco before sample collection.'
  },
  {
    title: 'Medication Rules',
    icon: AlertCircle,
    summary: 'Do not discontinue prescribed blood pressure or heart medications unless instructed.',
    details: 'Thyroid medication should generally be taken AFTER the morning blood draw. Inform our phlebotomist about current medications.'
  },
  {
    title: 'Urine Sample Collection',
    icon: Droplets,
    summary: 'Collect clean catch mid-stream urine in the provided sterile container.',
    details: 'First morning urine is preferred for routine urinalysis. Wash hands thoroughly before collection to prevent contamination.'
  },
  {
    title: 'Digital QR Report Delivery',
    icon: FileText,
    summary: 'Receive signed, NABL-standard PDF reports directly on WhatsApp and Email.',
    details: 'Each report contains a verifiable QR code, reference intervals, and certified pathologist digital signature.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev1',
    name: 'Rajesh Sharma',
    location: 'Sector 7, Dwarka',
    rating: 5,
    comment: 'The phlebotomist arrived right on time at 7:00 AM for home sample collection. Completely painless blood draw using BD Vacutainer for my elderly parents. Received the WhatsApp PDF report by 2:30 PM with QR verification. Highly recommended!',
    date: '3 days ago',
    testName: 'Senior Citizen Comprehensive Package',
    category: 'home_collection',
    verifiedPatient: true,
    userInitials: 'RS'
  },
  {
    id: 'rev2',
    name: 'Pooja Verma',
    location: 'Palam Colony',
    rating: 5,
    comment: 'Best diagnostic pathology lab in the area. Very transparent pricing compared to big corporate chains with the exact same high NABL accuracy. Our family physician reviewed the reports and was thoroughly satisfied with the findings.',
    date: '1 week ago',
    testName: 'Full Body Executive Shield (88 Tests)',
    category: 'package',
    verifiedPatient: true,
    userInitials: 'PV'
  },
  {
    id: 'rev3',
    name: 'Dr. Vivek Malhotra',
    location: 'Dwarka Sector 12',
    rating: 5,
    comment: 'I routinely refer patients for HbA1c and Lipid Profiles here. Their automated HPLC analyzer yields gold-standard precision with clear biological reference intervals. Exceptional service and prompt digital reporting.',
    date: '1 week ago',
    testName: 'HbA1c & Cardiac Lipid Profile',
    category: 'doctor',
    verifiedPatient: true,
    userInitials: 'VM'
  },
  {
    id: 'rev4',
    name: 'Amit Kumar',
    location: 'Manglapuri / Palam',
    rating: 5,
    comment: 'Uploaded my doctor prescription on their website at 8:15 AM. Within 5 minutes, their pathologist WhatsApped the discounted bundle quotation and scheduled sample pickup. Flawless doorstep experience!',
    date: '2 weeks ago',
    testName: 'Doctor Prescription Upload & Tests',
    category: 'home_collection',
    verifiedPatient: true,
    userInitials: 'AK'
  },
  {
    id: 'rev5',
    name: 'Sunita Devi',
    location: 'Sadh Nagar',
    rating: 5,
    comment: 'Regular patient for quarterly diabetic screening. Phlebotomists are very polite, sterile, and always open sealed vacutainer needles right in front of us. Same-day PDF reports with doctor signature.',
    date: '3 weeks ago',
    testName: 'Diabetes Screen & Thyroid Total',
    category: 'fast_reports',
    verifiedPatient: true,
    userInitials: 'SD'
  },
  {
    id: 'rev6',
    name: 'Vikramaditya Singh',
    location: 'Mahavir Enclave',
    rating: 5,
    comment: 'Needed urgent Dengue NS1 & CBC platelet count on a Sunday morning. The team reached within 40 minutes and delivered the verified digital report in 3 hours. True lifesaver during medical emergencies.',
    date: '1 month ago',
    testName: 'CBC + Dengue Serology Screen',
    category: 'fast_reports',
    verifiedPatient: true,
    userInitials: 'VS'
  }
];

export const FAQS = [
  {
    q: 'How do I book a home sample collection with Sun Life Path Lab?',
    a: 'You can easily book online by clicking "Book Home Visit", selecting your tests, or sending your prescription directly on WhatsApp to +91 98765 43210. Our team confirms your time slot within minutes.'
  },
  {
    q: 'Are the home sample collection phlebotomists certified and safe?',
    a: 'Yes, all our phlebotomists are certified medical laboratory professionals who use single-use, pre-sealed BD Vacutainer vacuum needles and sterile barcoded collection tubes.'
  },
  {
    q: 'When will I receive my test reports?',
    a: 'Routine blood tests (CBC, Sugar, Thyroid, LFT, KFT, Lipid) are delivered within 4 to 8 hours on the same day. Specialized assays (Vitamins, Hormones) are reported within 12 to 24 hours via WhatsApp & Email.'
  },
  {
    q: 'Can I upload my doctor\'s prescription instead of choosing individual tests?',
    a: 'Yes! Use our "Upload Prescription" feature or WhatsApp your prescription photo. Our lab pathologist will review the doctor\'s advice, suggest the exact tests needed, and share a discounted quotation.'
  }
];
