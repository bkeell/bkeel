import React, { useState } from 'react';
import { 
  FlaskConical, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Home, 
  Building2, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language, TabType } from '../types';

interface LabTabProps {
  language: Language;
  onNavigate: (tab: TabType) => void;
}

interface LabPackage {
  id: string;
  titleEn: string;
  titleAr: string;
  testsCount: number;
  price: number;
  fastingRequired: boolean;
  tat: string;
  includedEn: string[];
  includedAr: string[];
  recommendedForEn: string;
  recommendedForAr: string;
}

const LAB_PACKAGES: LabPackage[] = [
  {
    id: 'pkg-1',
    titleEn: 'Comprehensive Executive Health Panel',
    titleAr: 'باقة الفحص الشامل التنفيذي',
    testsCount: 65,
    price: 699,
    fastingRequired: true,
    tat: 'Same Day (4 Hours)',
    includedEn: ['Complete Blood Count (CBC)', 'Lipid Profile (Cholesterol & Triglycerides)', 'Liver Function Tests (LFT)', 'Kidney Function & Electrolytes', 'Fasting Blood Glucose & HbA1c', 'Vitamin D3 & Vitamin B12', 'Thyroid Stimulating Hormone (TSH)'],
    includedAr: ['تعداد الدم الكامل (CBC)', 'فحص الدهون والكوليسترول الشامل', 'وظائف الكبد والإنزيمات', 'وظائف الكلى والأملاح', 'سكر الدم الصائم والسكر التراكمي', 'فيتامين د3 وفيتامين ب12', 'هرمون الغدة الدرقية (TSH)'],
    recommendedForEn: 'Annual baseline screening for adults seeking total wellness transparency',
    recommendedForAr: 'فحص سنوي وقائي شامل لجميع البالغين لمتابعة المؤشرات الحيوية'
  },
  {
    id: 'pkg-2',
    titleEn: 'Advanced Cardiovascular Biomarker Panel',
    titleAr: 'باقة مؤشرات صحة القلب والأوعية الدموية',
    testsCount: 28,
    price: 450,
    fastingRequired: true,
    tat: 'Same Day (3 Hours)',
    includedEn: ['High-Sensitivity CRP (hs-CRP)', 'Lipoprotein(a)', 'Apolipoprotein B & A1', 'Homocysteine Level', 'Direct LDL & HDL Subfractions', 'Troponin-I Baseline'],
    includedAr: ['بروتين سي التفاعلي عالي الحساسية (hs-CRP)', 'البروتين الدهني أ', 'صميم البروتين الشحمي B و A1', 'مستوى الهوموسيستين', 'الكوليسترول الضار والنافع الدقيق', 'مؤشر التروبونين الأولي'],
    recommendedForEn: 'Patients with hypertension, family history of heart disease, or elevated cholesterol',
    recommendedForAr: 'لمن يعانون من ارتفاع ضغط الدم أو تاريخ عائلي لأمراض القلب'
  },
  {
    id: 'pkg-3',
    titleEn: 'Diabetes & Metabolic Health Check',
    titleAr: 'باقة تشخيص ومتابعة داء السكري والأيض',
    testsCount: 16,
    price: 290,
    fastingRequired: true,
    tat: '2 Hours',
    includedEn: ['Fasting Blood Glucose', 'Glycated Hemoglobin (HbA1c)', 'Fasting Insulin & HOMA-IR', 'Urinary Microalbumin / Creatinine Ratio', 'Serum Creatinine & eGFR'],
    includedAr: ['سكر الدم الصائم', 'السكر التراكمي (HbA1c)', 'مستوى الإنسولين ومقاومة الإنسولين', 'زلال البول الدقيق ونسبة الكرياتينين', 'كفاءة الترشيح الكلوي'],
    recommendedForEn: 'Monitoring pre-diabetes, insulin resistance, or established type 1/2 diabetes',
    recommendedForAr: 'لمتابعة مقدمات السكري، مقاومة الإنسولين، وضبط جرعات العلاج'
  },
  {
    id: 'pkg-4',
    titleEn: 'Vitamin, Mineral & Immunity Micronutrient Panel',
    titleAr: 'باقة الفيتامينات والمعادن والمناعة',
    testsCount: 22,
    price: 380,
    fastingRequired: false,
    tat: '4 Hours',
    includedEn: ['Vitamin D 25-OH', 'Vitamin B12 Active', 'Serum Ferritin & Iron Studies', 'Magnesium & Calcium Ionized', 'Zinc & Copper Ratio', 'Complete Blood Picture'],
    includedAr: ['فيتامين د النشط', 'فيتامين ب12', 'مخزون الحديد والفيريتين', 'المغنيسيوم والكالسيوم المتأين', 'الزنك والنحاس', 'صورة الدم الكاملة والمناعة'],
    recommendedForEn: 'Individuals with fatigue, hair loss, muscle cramps, or nutritional deficiencies',
    recommendedForAr: 'لحالات الخمول، تساقط الشعر، آلام العضلات ونقص المناعة'
  }
];

export const LabTab: React.FC<LabTabProps> = ({
  language,
  onNavigate,
}) => {
  const isAr = language === 'ar';
  const [selectedLocation, setSelectedLocation] = useState<'clinic' | 'home'>('clinic');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const handleBookPackage = (pkgTitle: string) => {
    setBookingSuccess(pkgTitle);
    setTimeout(() => {
      setBookingSuccess(null);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>{isAr ? 'المختبر السريري الآلي المعتمد' : 'ISO & CAP Accredited Clinical Laboratory'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isAr ? 'باقات الفحوصات المخبرية والتشخيص' : 'Diagnostic Lab & Pathology Packages'}
          </h1>
          <p className="text-xs text-slate-500">
            {isAr 
              ? 'نتائج دقيقة وسريعة تصدر خلال ساعات وتصل مباشرة إلى ملفك الطبي الرقمي' 
              : 'Precision diagnostic testing with same-day digital results verified by consultant pathologists'}
          </p>
        </div>

        {/* Location toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setSelectedLocation('clinic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedLocation === 'clinic' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'سحب العينة بالعيادة' : 'At Clinic'}</span>
          </button>
          <button
            onClick={() => setSelectedLocation('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedLocation === 'home' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'خدمة السحب المنزلي' : 'Home Blood Draw'}</span>
          </button>
        </div>
      </div>

      {bookingSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <h4 className="font-bold text-sm">
                {isAr ? 'تم تأكيد طلب الفحص المخبري بنجاح!' : 'Lab Package Reserved Successfully!'}
              </h4>
              <p className="text-xs opacity-90">
                {isAr 
                  ? `تم حجز "${bookingSuccess}" مع خيار ${selectedLocation === 'home' ? 'السحب المنزلي' : 'زيارة المختبر'}.`
                  : `Scheduled "${bookingSuccess}" via ${selectedLocation === 'home' ? 'Mobile Home Phlebotomy' : 'Clinic Lab'}.`}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('records')}
            className="text-xs font-bold underline cursor-pointer"
          >
            {isAr ? 'الانتقال لملفي الطبي' : 'View Portal'}
          </button>
        </div>
      )}

      {/* Lab Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {LAB_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800">
                    {pkg.testsCount} {isAr ? 'فحصاً مدمجاً' : 'Total Biomarkers'}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg mt-1">
                    {isAr ? pkg.titleAr : pkg.titleEn}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xl font-black text-teal-800">AED {pkg.price}</span>
                  <span className="block text-[11px] text-slate-400 font-medium">{isAr ? 'شامل الضريبة' : 'incl. VAT'}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic">
                "{isAr ? pkg.recommendedForAr : pkg.recommendedForEn}"
              </p>

              {/* Fasting & TAT badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{isAr ? 'صدور النتيجة:' : 'Result TAT:'} {pkg.tat}</span>
                </span>
                <span className={`px-2.5 py-1 rounded-md font-medium ${pkg.fastingRequired ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'}`}>
                  {pkg.fastingRequired 
                    ? (isAr ? 'يتطلب صيام 8-10 ساعات' : '8-10h Fasting Required') 
                    : (isAr ? 'لا يتطلب صيام' : 'No Fasting Required')}
                </span>
              </div>

              {/* Tests Included */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h5 className="text-xs font-bold text-slate-700">
                  {isAr ? 'أهم الفحوصات المشمولة:' : 'Core Biomarkers Included:'}
                </h5>
                <ul className="space-y-1 text-xs text-slate-600">
                  {(isAr ? pkg.includedAr : pkg.includedEn).map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => handleBookPackage(isAr ? pkg.titleAr : pkg.titleEn)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>
                  {isAr 
                    ? `طلب الباقة (${selectedLocation === 'home' ? 'سحب منزلي' : 'حضور بالمختبر'})`
                    : `Order Package (${selectedLocation === 'home' ? 'Home Visit' : 'At Clinic'})`}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
