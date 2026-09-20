import React from 'react';
import { 
  Calendar, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  UserCheck, 
  Microscope, 
  HeartHandshake, 
  PhoneCall,
  CheckCircle2,
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { Language, TabType } from '../types';
import { DEPARTMENTS, DOCTORS } from '../data/mockData';

interface OverviewTabProps {
  language: Language;
  onNavigate: (tab: TabType, filter?: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  language,
  onNavigate,
}) => {
  const isAr = language === 'ar';

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
        <div className="relative max-w-5xl mx-auto px-6 py-12 sm:py-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'مركز التميز الطبي والرعاية الفائقة' : 'Center of Medical Excellence & Precision Care'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {isAr ? (
                <>
                  رعايتك الصحية، بأعلى <span className="text-teal-400">معايير الدقة والأمان</span>
                </>
              ) : (
                <>
                  Your Health, Elevated by <span className="text-teal-400">World-Class Specialists</span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {isAr
                ? 'يقدم كوكب بكيّل الطبي منظومة رعاية متكاملة تضم نخبة من الاستشاريين، وأحدث تقنيات التشخيص المخبري والفحص الإشعاعي لخدمتك وخدمة عائلتك.'
                : 'Bkeel Medical Planet brings together board-certified consultants, comprehensive clinical laboratories, and compassionate care to keep you and your family thriving.'}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="hero-book-btn"
                onClick={() => onNavigate('booking')}
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition-all shadow-md shadow-teal-500/20 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>{isAr ? 'حجز موعد استشارة' : 'Book Consultation'}</span>
              </button>

              <button
                id="hero-triage-btn"
                onClick={() => onNavigate('triage')}
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                <Stethoscope className="w-5 h-5 text-teal-400" />
                <span>{isAr ? 'الفحص الذاتي للأعراض' : 'Symptom Triage'}</span>
              </button>
            </div>
          </div>

          {/* Quick Clinic Highlights Badge Card */}
          <div className="w-full lg:w-80 bg-slate-800/90 backdrop-blur-md rounded-2xl p-5 border border-slate-700/60 shadow-lg text-left space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">
              {isAr ? 'معايير المركز الطبي' : 'Clinic Highlights'}
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 mt-0.5">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{isAr ? 'استشاريون معتمدون' : 'Board-Certified Doctors'}</h4>
                  <p className="text-xs text-slate-300">{isAr ? 'خبرة تزيد عن 15 عاماً' : '15+ average years of practice'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 mt-0.5">
                  <Microscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{isAr ? 'مختبرات تشخيص متطورة' : 'Automated Fast Lab'}</h4>
                  <p className="text-xs text-slate-300">{isAr ? 'نتائج خلال 2 - 4 ساعات' : 'Same-day results in 2-4 hours'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{isAr ? 'طوارئ واستجابة فورية' : 'Zero Wait Urgent Triage'}</h4>
                  <p className="text-xs text-slate-300">{isAr ? 'خدمة متواصلة على مدار الساعة' : 'Open 24 hours / 7 days'}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/80">
              <a 
                href="tel:80025335" 
                className="flex items-center justify-between text-xs text-teal-300 hover:text-teal-200 transition-colors"
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <PhoneCall className="w-3.5 h-3.5" />
                  {isAr ? 'الخط الساخن المباشر' : 'Direct Helpline'}
                </span>
                <span className="font-bold">800-BKEEL</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Award className="w-5 h-5 text-teal-600" />, value: '45+', labelEn: 'Specialist Doctors', labelAr: 'طبيباً واستشارياً' },
          { icon: <HeartHandshake className="w-5 h-5 text-teal-600" />, value: '99.4%', labelEn: 'Patient Satisfaction', labelAr: 'نسبة الرضا' },
          { icon: <ShieldCheck className="w-5 h-5 text-teal-600" />, value: '18+', labelEn: 'Specialty Clinics', labelAr: 'عيادة تخصصية' },
          { icon: <Clock className="w-5 h-5 text-teal-600" />, value: '< 15m', labelEn: 'Average Wait Time', labelAr: 'متوسط الانتظار' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-teal-50">
              {stat.icon}
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-xs font-medium text-slate-600">{isAr ? stat.labelAr : stat.labelEn}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Specialties & Departments Section */}
      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isAr ? 'العيادات والتخصصات الطبية' : 'Clinical Specialties & Services'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {isAr ? 'اختر التخصص المطلوب للتعرف على الفريق الطبي والمواعيد المتاحة' : 'Select a department to explore clinical teams and available booking slots'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('doctors')}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
          >
            <span>{isAr ? 'عرض كل الأطباء' : 'View All Specialists'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              onClick={() => onNavigate('booking', dept.id)}
              className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {dept.doctorCount} {isAr ? 'أطباء' : 'Doctors'}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    {isAr ? dept.name.ar : dept.name.en}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {isAr ? dept.description.ar : dept.description.en}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                <span>{isAr ? 'حجز موعد' : 'Book in this clinic'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Doctors Spotlight */}
      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isAr ? 'أطباء واستشاريون مميزون' : 'Featured Medical Specialists'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {isAr ? 'أطباء نخبة يحملون زمالات بورد دولية وسمعة طبية رائدة' : 'Internationally accredited consultants available for consultations and procedures'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('doctors')}
            className="text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
          >
            {isAr ? 'عرض كامل القائمة' : 'Browse Directory'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DOCTORS.slice(0, 3).map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={doctor.avatar}
                    alt={isAr ? doctor.name.ar : doctor.name.en}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-100 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800">
                      {isAr ? doctor.departmentName.ar : doctor.departmentName.en}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-1">
                      {isAr ? doctor.name.ar : doctor.name.en}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {isAr ? doctor.title.ar : doctor.title.en}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">{isAr ? 'التقييم:' : 'Patient Rating:'}</span>
                    <span className="font-bold text-amber-700">★ {doctor.rating} ({doctor.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">{isAr ? 'أقرب موعد:' : 'Next Available:'}</span>
                    <span className="font-semibold text-emerald-800">{doctor.nextAvailable}</span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-600">{isAr ? 'رسوم الكشف: ' : 'Fee: '}</span>
                  <span className="font-bold text-slate-900">AED {doctor.consultationFee}</span>
                </div>
                <button
                  onClick={() => onNavigate('booking', doctor.id)}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {isAr ? 'حجز الموعد' : 'Book Visit'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Patient Health Hub Banner */}
      <section className="bg-teal-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isAr ? 'البوابة الصحية للمرضى' : 'Patient Health Portal'}</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {isAr ? 'تابع نتائج التحاليل والوصفات الطبية ومؤشراتك الحيوية' : 'Access Your Digital Health Record & Lab Results'}
          </h3>
          <p className="text-sm text-teal-100 max-w-xl">
            {isAr
              ? 'سجل طبي رقمي موحد يتيح لك استعراض تقارير المختبر، تنزيل الوصفات الطبية الإلكترونية، وتتبع قياسات الضغط والسكر بكل سهولة.'
              : 'Securely review your verified diagnostic reports, active prescription dosages, and chronic health vitals in one single encrypted dashboard.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('records')}
          className="whitespace-nowrap bg-white text-teal-950 hover:bg-teal-50 font-bold px-6 py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          {isAr ? 'عرض ملفي الصحي' : 'Open My Health Portal'}
        </button>
      </section>
    </div>
  );
};
