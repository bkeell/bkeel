import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight, 
  ShieldAlert, 
  Calendar, 
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import { Language, TabType } from '../types';

interface TriageTabProps {
  language: Language;
  onNavigate: (tab: TabType, filter?: string) => void;
}

interface SymptomOption {
  id: string;
  nameEn: string;
  nameAr: string;
  department: string;
  urgency: 'critical' | 'urgent' | 'routine';
}

const COMMON_SYMPTOMS: SymptomOption[] = [
  { id: 'chest-pain', nameEn: 'Chest Pain or Pressure', nameAr: 'ألم أو ضغط حاد في الصدر', department: 'emergency', urgency: 'critical' },
  { id: 'breathing', nameEn: 'Severe Shortness of Breath', nameAr: 'صعوبة حادة ومفاجئة في التنفس', department: 'emergency', urgency: 'critical' },
  { id: 'fever', nameEn: 'Persistent High Fever (>38.5°C)', nameAr: 'حمى مستمرة وارتفاع الحرارة', department: 'general', urgency: 'urgent' },
  { id: 'palpitations', nameEn: 'Heart Palpitations or Irregular Beat', nameAr: 'خفقان القلب أو تسارع غير منتظم', department: 'cardiology', urgency: 'urgent' },
  { id: 'child-fever', nameEn: 'Child Lethargy or Rash with Fever', nameAr: 'خمول الطفل أو طفح جلدي مع حرارة', department: 'pediatrics', urgency: 'urgent' },
  { id: 'joint-pain', nameEn: 'Knee, Shoulder, or Spine Pain', nameAr: 'ألم المفاصل والركبة أو العمود الفقري', department: 'orthopedics', urgency: 'routine' },
  { id: 'skin-rash', nameEn: 'Eczema, Acne, or Unexplained Rash', nameAr: 'إكزيما أو حب شباب أو حساسية جلدية', department: 'dermatology', urgency: 'routine' },
  { id: 'dental-pain', nameEn: 'Severe Toothache or Swollen Gum', nameAr: 'ألم الأسنان الشديد أو انتفاخ اللثة', department: 'dental', urgency: 'urgent' },
  { id: 'fatigue', nameEn: 'Chronic Fatigue & Dizziness', nameAr: 'إرهاق مزمن ودوخة عامة', department: 'general', urgency: 'routine' },
  { id: 'stomach', nameEn: 'Abdominal Cramps or Indigestion', nameAr: 'مغص في البطن أو عسر هضم', department: 'general', urgency: 'routine' },
];

export const TriageTab: React.FC<TriageTabProps> = ({
  language,
  onNavigate,
}) => {
  const isAr = language === 'ar';
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState<'today' | 'days' | 'weeks'>('today');
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => 
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setHasEvaluated(false);
  };

  const getTriageResult = () => {
    const selected = COMMON_SYMPTOMS.filter((s) => selectedSymptoms.includes(s.id));
    if (selected.some((s) => s.urgency === 'critical')) {
      return {
        level: 'emergency',
        titleEn: 'Immediate Emergency Care Required',
        titleAr: 'تتطلب الحالة عناية طارئة وفورية',
        descEn: 'One or more of your symptoms may indicate an acute cardiovascular or respiratory emergency. Please proceed to our 24/7 emergency unit immediately or call an ambulance.',
        descAr: 'أحد الأعراض المحددة قد يشير إلى حالة قلبية أو تنفسية حادة. يرجى التوجه فوراً لوحدة الطوارئ 24/7 أو الاتصال بالإسعاف.',
        department: 'emergency',
        color: 'red'
      };
    }
    if (selected.some((s) => s.urgency === 'urgent') || duration === 'today') {
      return {
        level: 'urgent',
        titleEn: 'Priority Same-Day Clinical Evaluation',
        titleAr: 'تقييم طبي عاجل في نفس اليوم',
        descEn: 'Your symptoms warrant timely evaluation by an attending physician within 12 to 24 hours to prevent complications.',
        descAr: 'تتطلب الأعراض فحصاً من قبل الطبيب المعالج خلال 12 إلى 24 ساعة لتشخيص السبب وتفادي المضاعفات.',
        department: selected[0]?.department || 'general',
        color: 'amber'
      };
    }
    return {
      level: 'routine',
      titleEn: 'Scheduled Specialist Consultation Recommended',
      titleAr: 'ينصح بحجز استشارة تخصصية مجدولة',
      descEn: 'Your symptoms appear stable. Scheduling a comprehensive review with the relevant clinical department will provide a tailored diagnostic and treatment plan.',
      descAr: 'حالتك مستقرة. ننصحك بحجز موعد استشارة مع العيادة المتخصصة لإجراء الفحوصات الطبية المناسبة.',
      department: selected[0]?.department || 'general',
      color: 'teal'
    };
  };

  const triage = getTriageResult();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>{isAr ? 'التقييم السريري الذكي للأعراض' : 'Clinical Symptom Triage Protocol'}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          {isAr ? 'ما هي الأعراض أو الشكوى التي تشعر بها؟' : 'Identify Symptoms & Recommended Clinic'}
        </h1>
        <p className="text-xs text-slate-500">
          {isAr 
            ? 'حدد الأعراض التي تعاني منها للحصول على التوجيه الطبي الصحيح للعيادة أو استدعاء الطوارئ الفورية.'
            : 'Select all symptoms you are currently experiencing to receive instant departmental routing and urgency assessment.'}
        </p>
      </div>

      {/* Symptom Selection Cards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <label className="block text-sm font-bold text-slate-900">
          {isAr ? '1. حدد الأعراض التي تشعر بها (يمكن اختيار أكثر من عرض)' : '1. Select all active symptoms'}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COMMON_SYMPTOMS.map((sym) => {
            const isSelected = selectedSymptoms.includes(sym.id);
            return (
              <button
                key={sym.id}
                type="button"
                onClick={() => toggleSymptom(sym.id)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? sym.urgency === 'critical'
                      ? 'bg-red-50 border-red-400 text-red-950 font-semibold ring-1 ring-red-400'
                      : 'bg-teal-50 border-teal-500 text-teal-950 font-semibold ring-1 ring-teal-500'
                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                }`}
              >
                <span className="text-xs">{isAr ? sym.nameAr : sym.nameEn}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Duration selector */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <label className="block text-sm font-bold text-slate-900">
            {isAr ? '2. منذ متى بدأت هذه الأعراض؟' : '2. How long have you felt these symptoms?'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'today', en: 'Started Today (Acute)', ar: 'بدأت اليوم (مفاجئة)' },
              { id: 'days', en: '2 - 7 Days', ar: 'منذ يومين إلى أسبوع' },
              { id: 'weeks', en: 'More than a Week', ar: 'أكثر من أسبوع (مزمنة)' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDuration(d.id as any)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  duration === d.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isAr ? d.ar : d.en}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3">
          <button
            type="button"
            disabled={selectedSymptoms.length === 0}
            onClick={() => setHasEvaluated(true)}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              selectedSymptoms.length > 0
                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isAr ? 'إظهار نتيجة التقييم والتوصية الطبية' : 'Evaluate & Get Clinical Guidance'}
          </button>
        </div>
      </div>

      {/* Result Card */}
      {hasEvaluated && (
        <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
          triage.level === 'emergency' 
            ? 'bg-red-50/80 border-red-300 text-red-950' 
            : triage.level === 'urgent'
            ? 'bg-amber-50/80 border-amber-300 text-amber-950'
            : 'bg-teal-50/80 border-teal-300 text-teal-950'
        }`}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 mt-1">
              {triage.level === 'emergency' ? (
                <ShieldAlert className="w-6 h-6 text-red-600" />
              ) : triage.level === 'urgent' ? (
                <AlertCircle className="w-6 h-6 text-amber-600" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-teal-600" />
              )}
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                {isAr ? 'نتيجة الفحص الأولي' : 'Triage Assessment'}
              </span>
              <h3 className="text-xl font-bold">
                {isAr ? triage.titleAr : triage.titleEn}
              </h3>
              <p className="text-xs opacity-90 leading-relaxed">
                {isAr ? triage.descAr : triage.descEn}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3">
            {triage.level === 'emergency' ? (
              <a
                href="tel:80025335"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isAr ? 'الاتصال الفوري بالطوارئ (800-BKEEL)' : 'Call 24/7 Emergency Dispatch'}</span>
              </a>
            ) : (
              <button
                onClick={() => onNavigate('booking', triage.department)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{isAr ? 'حجز موعد في العيادة المقترحة' : 'Book in Recommended Department'}</span>
              </button>
            )}

            <span className="text-xs opacity-75">
              {isAr ? '* هذا الفحص استرشادي ولا يغني عن تشخيص الطبيب' : '* Informational triage only. Consult physician for definitive diagnosis.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
