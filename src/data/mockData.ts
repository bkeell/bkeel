import { Doctor, Department, LabResult, Prescription, VitalSign, Appointment } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'general',
    name: { en: 'Internal & General Medicine', ar: 'الطب الباطني والعام' },
    description: { en: 'Primary healthcare, chronic disease management, and wellness checks', ar: 'الرعاية الصحية الأولية وعلاج الأمراض المزمنة والفحوصات الدورية' },
    icon: 'Stethoscope',
    doctorCount: 8,
    waitDuration: '10-15 mins',
    color: 'teal'
  },
  {
    id: 'cardiology',
    name: { en: 'Cardiology & Heart Center', ar: 'مركز القلب والأوعية الدموية' },
    description: { en: 'Advanced cardiovascular diagnostics, ECG, echocardiography, and hypertension care', ar: 'تشخيص القلب المتقدم، تخطيط القلب، وعلاج ضغط الدم' },
    icon: 'HeartPulse',
    doctorCount: 5,
    waitDuration: '15-20 mins',
    color: 'rose'
  },
  {
    id: 'pediatrics',
    name: { en: 'Pediatrics & Neonatology', ar: 'طب الأطفال وحديثي الولادة' },
    description: { en: 'Comprehensive child healthcare, developmental milestones, and vaccinations', ar: 'رعاية صحة الطفل، متابعة النمو، والتطعيمات' },
    icon: 'Baby',
    doctorCount: 6,
    waitDuration: '10-15 mins',
    color: 'amber'
  },
  {
    id: 'dermatology',
    name: { en: 'Dermatology & Aesthetic Clinic', ar: 'الجلدية والتجميل والليزر' },
    description: { en: 'Skin disorders, laser treatments, cosmetic dermatology, and phototherapy', ar: 'علاج الأمراض الجلدية، الليزر، والعناية بالبشرة' },
    icon: 'Sparkles',
    doctorCount: 4,
    waitDuration: '20 mins',
    color: 'purple'
  },
  {
    id: 'orthopedics',
    name: { en: 'Orthopedics & Sports Medicine', ar: 'جراحة العظام والطب الرياضي' },
    description: { en: 'Joint care, spine health, fractures, and rehabilitation programs', ar: 'صحة المفاصل والعمود الفقري والكسور والتأهيل' },
    icon: 'Activity',
    doctorCount: 4,
    waitDuration: '15-25 mins',
    color: 'blue'
  },
  {
    id: 'dental',
    name: { en: 'Dental & Maxillofacial Care', ar: 'طب وجراحة الفم والأسنان' },
    description: { en: 'Restorative dentistry, orthodontics, implants, and oral hygiene', ar: 'زراعة وتقويم الأسنان وعلاجات اللثة والابتسامة' },
    icon: 'Smile',
    doctorCount: 5,
    waitDuration: '10 mins',
    color: 'cyan'
  },
  {
    id: 'lab',
    name: { en: 'Laboratory & Diagnostics', ar: 'المختبر والتشخيص الدقيق' },
    description: { en: 'Automated clinical pathology, hematology, immunology, and molecular testing', ar: 'الفحوصات المخبرية الشاملة، تحاليل الدم، والمناعة' },
    icon: 'FlaskConical',
    doctorCount: 3,
    waitDuration: '5-10 mins',
    color: 'emerald'
  },
  {
    id: 'emergency',
    name: { en: '24/7 Urgent Care & Triage', ar: 'الطوارئ والعناية الفورية 24/7' },
    description: { en: 'Immediate response unit equipped for acute trauma and medical emergencies', ar: 'وحدة الاستجابة السريعة للحالات الطارئة والحرجة' },
    icon: 'ShieldAlert',
    doctorCount: 7,
    waitDuration: 'Immediate',
    color: 'red'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: { en: 'Dr. Tariq Al-Bakeel', ar: 'د. طارق البكيل' },
    title: { en: 'Senior Consultant Internist & Medical Director', ar: 'استشاري أول الأمراض الباطنية والمدير الطبي' },
    department: 'general',
    departmentName: { en: 'Internal Medicine', ar: 'الطب الباطني' },
    experience: 21,
    rating: 4.9,
    reviewCount: 342,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Sat'],
    nextAvailable: 'Today, 4:00 PM',
    consultationFee: 350,
    languages: ['Arabic', 'English'],
    education: { en: 'FRCP (London), MD Internal Medicine', ar: 'زمالة الكلية الملكية للأطباء (لندن)، دكتوراه الطب الباطني' },
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=250&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-2',
    name: { en: 'Dr. Sarah Mansoor', ar: 'د. سارة منصور' },
    title: { en: 'Consultant Interventional Cardiologist', ar: 'استشارية أمراض وقسطرة القلب' },
    department: 'cardiology',
    departmentName: { en: 'Cardiology', ar: 'مركز القلب' },
    experience: 16,
    rating: 4.95,
    reviewCount: 289,
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri'],
    nextAvailable: 'Tomorrow, 10:30 AM',
    consultationFee: 420,
    languages: ['Arabic', 'English', 'French'],
    education: { en: 'American Board of Cardiology, Johns Hopkins Fellow', ar: 'البورد الأمريكي في أمراض القلب، زمالة جونز هوبكنز' },
    avatar: 'https://images.unsplash.com/photo-1594824813624-9dfa8fa1947b?w=250&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-3',
    name: { en: 'Dr. Zaid Al-Hashimi', ar: 'د. زيد الهاشمي' },
    title: { en: 'Pediatric Specialist & Child Health', ar: 'أخصائي طب الأطفال وصحة المواليد' },
    department: 'pediatrics',
    departmentName: { en: 'Pediatrics', ar: 'طب الأطفال' },
    experience: 14,
    rating: 4.88,
    reviewCount: 410,
    availableDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
    nextAvailable: 'Today, 5:30 PM',
    consultationFee: 280,
    languages: ['Arabic', 'English'],
    education: { en: 'MRCPCH (UK), Fellowship in Pediatric Care', ar: 'عضوية الكلية الملكية لطب الأطفال (بريطانيا)' },
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=250&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-4',
    name: { en: 'Dr. Layla Nour', ar: 'د. ليلى نور' },
    title: { en: 'Consultant Dermatologist & Cosmetic Laser', ar: 'استشارية الأمراض الجلدية والعلاج بالليزر' },
    department: 'dermatology',
    departmentName: { en: 'Dermatology', ar: 'الجلدية والتجميل' },
    experience: 12,
    rating: 4.92,
    reviewCount: 198,
    availableDays: ['Tue', 'Wed', 'Thu', 'Sat'],
    nextAvailable: 'Wednesday, 2:00 PM',
    consultationFee: 320,
    languages: ['Arabic', 'English'],
    education: { en: 'European Board of Dermatology, Paris V', ar: 'البورد الأوروبي للأمراض الجلدية، جامعة باريس' },
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=250&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-5',
    name: { en: 'Dr. Omar Farouk', ar: 'د. عمر فاروق' },
    title: { en: 'Orthopedic Surgeon & Sports Traumatology', ar: 'جراح العظام وإصابات الملاعب' },
    department: 'orthopedics',
    departmentName: { en: 'Orthopedics', ar: 'طب العظام' },
    experience: 18,
    rating: 4.87,
    reviewCount: 265,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu'],
    nextAvailable: 'Thursday, 11:00 AM',
    consultationFee: 380,
    languages: ['Arabic', 'English', 'German'],
    education: { en: 'German Facharzt Orthopedics & Trauma', ar: 'البورد الألماني (فاخ أرتست) في جراحة العظام' },
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=250&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    bookingRef: 'BKL-78291',
    patientName: 'Haythem Al Namer',
    patientPhone: '+971 50 123 4567',
    patientAge: 38,
    doctorId: 'doc-1',
    doctorName: 'Dr. Tariq Al-Bakeel',
    department: 'general',
    departmentName: 'Internal & General Medicine',
    date: '2026-09-24',
    time: '04:00 PM',
    type: 'in-person',
    status: 'confirmed',
    notes: 'Annual executive physical check-up and blood work review',
    createdAt: '2026-09-20'
  },
  {
    id: 'apt-102',
    bookingRef: 'BKL-91402',
    patientName: 'Haythem Al Namer',
    patientPhone: '+971 50 123 4567',
    patientAge: 38,
    doctorId: 'doc-2',
    doctorName: 'Dr. Sarah Mansoor',
    department: 'cardiology',
    departmentName: 'Cardiology & Heart Center',
    date: '2026-09-28',
    time: '10:30 AM',
    type: 'in-person',
    status: 'confirmed',
    notes: 'Routine cardiovascular screening & ECG baseline',
    createdAt: '2026-09-20'
  }
];

export const MOCK_LAB_RESULTS: LabResult[] = [
  {
    id: 'lab-1',
    testName: { en: 'Comprehensive Metabolic Panel (CMP)', ar: 'لوحة الأيض الشاملة' },
    category: { en: 'Clinical Biochemistry', ar: 'الكيمياء الحيوية السريرية' },
    date: '2026-09-18',
    value: '98',
    referenceRange: '70 - 100',
    unit: 'mg/dL (Glucose)',
    status: 'normal',
    doctor: 'Dr. Tariq Al-Bakeel'
  },
  {
    id: 'lab-2',
    testName: { en: 'Lipid Panel (Total Cholesterol)', ar: 'تحليل الدهون والكوليسترول الكامل' },
    category: { en: 'Cardiovascular Marker', ar: 'مؤشرات صحة القلب' },
    date: '2026-09-18',
    value: '185',
    referenceRange: '< 200',
    unit: 'mg/dL',
    status: 'normal',
    doctor: 'Dr. Sarah Mansoor'
  },
  {
    id: 'lab-3',
    testName: { en: 'Vitamin D (25-Hydroxy)', ar: 'فحص فيتامين د' },
    category: { en: 'Nutritional Endocrinology', ar: 'الفيتامينات والغدد' },
    date: '2026-09-15',
    value: '22.4',
    referenceRange: '30.0 - 100.0',
    unit: 'ng/mL',
    status: 'attention',
    doctor: 'Dr. Tariq Al-Bakeel'
  },
  {
    id: 'lab-4',
    testName: { en: 'Hemoglobin A1c (Glycated Hb)', ar: 'السكر التراكمي (HbA1c)' },
    category: { en: 'Diabetes Monitoring', ar: 'مراقبة داء السكري' },
    date: '2026-09-10',
    value: '5.4',
    referenceRange: '< 5.7',
    unit: '%',
    status: 'normal',
    doctor: 'Dr. Tariq Al-Bakeel'
  },
  {
    id: 'lab-5',
    testName: { en: 'Complete Blood Count (WBC)', ar: 'تعداد الدم الكامل (كريات الدم البيضاء)' },
    category: { en: 'Hematology', ar: 'أمراض الدم' },
    date: '2026-09-10',
    value: '6.8',
    referenceRange: '4.5 - 11.0',
    unit: '10^3/uL',
    status: 'normal',
    doctor: 'Dr. Tariq Al-Bakeel'
  }
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-1',
    medication: 'Cholecalciferol (Vitamin D3)',
    dosage: '50,000 IU',
    frequency: { en: 'Once weekly with meals', ar: 'مرة أسبوعياً مع الوجبة' },
    duration: { en: '8 weeks', ar: 'لمدة 8 أسابيع' },
    prescribedBy: 'Dr. Tariq Al-Bakeel',
    startDate: '2026-09-16',
    refillsRemaining: 2,
    instructions: { en: 'Take with a fat-containing meal for optimal absorption.', ar: 'تناول الدواء مع وجبة تحتوي على دهون صحية لامتصاص أفضل.' }
  },
  {
    id: 'rx-2',
    medication: 'Omega-3 Marine Triglyceride',
    dosage: '1000 mg',
    frequency: { en: 'One capsule daily', ar: 'كبسولة واحدة يومياً' },
    duration: { en: '3 months', ar: 'لمدة 3 أشهر' },
    prescribedBy: 'Dr. Sarah Mansoor',
    startDate: '2026-09-18',
    refillsRemaining: 3,
    instructions: { en: 'Supports cardiovascular resilience and lipid health.', ar: 'يدعم صحة القلب ومستويات الدهون الطبيعية.' }
  }
];

export const MOCK_VITALS: VitalSign[] = [
  {
    id: 'vit-1',
    label: { en: 'Blood Pressure', ar: 'ضغط الدم' },
    value: '118/76',
    unit: 'mmHg',
    status: 'optimal',
    lastChecked: 'Yesterday, 9:00 AM',
    trend: 'stable'
  },
  {
    id: 'vit-2',
    label: { en: 'Resting Heart Rate', ar: 'نبض القلب أثناء الراحة' },
    value: '68',
    unit: 'BPM',
    status: 'normal',
    lastChecked: 'Today, 7:30 AM',
    trend: 'stable'
  },
  {
    id: 'vit-3',
    label: { en: 'Fasting Blood Glucose', ar: 'سكر الدم الصائم' },
    value: '92',
    unit: 'mg/dL',
    status: 'normal',
    lastChecked: 'Today, 8:00 AM',
    trend: 'stable'
  },
  {
    id: 'vit-4',
    label: { en: 'Blood Oxygen (SpO2)', ar: 'تشبع الأكسجين' },
    value: '99',
    unit: '%',
    status: 'optimal',
    lastChecked: 'Yesterday, 9:00 AM',
    trend: 'stable'
  },
  {
    id: 'vit-5',
    label: { en: 'Body Mass Index', ar: 'مؤشر كتلة الجسم' },
    value: '23.4',
    unit: 'kg/m²',
    status: 'normal',
    lastChecked: 'Sep 15, 2026',
    trend: 'stable'
  }
];
