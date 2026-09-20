export type Language = 'en' | 'ar';

export type TabType = 'overview' | 'doctors' | 'booking' | 'records' | 'triage' | 'lab';

export interface Doctor {
  id: string;
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  department: string;
  departmentName: { en: string; ar: string };
  experience: number;
  rating: number;
  reviewCount: number;
  availableDays: string[];
  nextAvailable: string;
  consultationFee: number;
  languages: string[];
  education: { en: string; ar: string };
  avatar: string;
}

export interface Department {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  doctorCount: number;
  waitDuration: string;
  color: string;
}

export interface Appointment {
  id: string;
  bookingRef: string;
  patientName: string;
  patientPhone: string;
  patientAge: number;
  doctorId: string;
  doctorName: string;
  department: string;
  departmentName: string;
  date: string;
  time: string;
  type: 'in-person' | 'telehealth';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface LabResult {
  id: string;
  testName: { en: string; ar: string };
  category: { en: string; ar: string };
  date: string;
  value: string;
  referenceRange: string;
  unit: string;
  status: 'normal' | 'attention' | 'critical';
  doctor: string;
  downloadUrl?: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: { en: string; ar: string };
  duration: { en: string; ar: string };
  prescribedBy: string;
  startDate: string;
  refillsRemaining: number;
  instructions: { en: string; ar: string };
}

export interface VitalSign {
  id: string;
  label: { en: string; ar: string };
  value: string;
  unit: string;
  status: 'normal' | 'optimal' | 'elevated' | 'warning';
  lastChecked: string;
  trend: 'up' | 'down' | 'stable';
}
