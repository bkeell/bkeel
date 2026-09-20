import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Pill, 
  Activity, 
  Heart, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  User, 
  RefreshCw,
  Plus
} from 'lucide-react';
import { Appointment, Language, TabType } from '../types';
import { MOCK_LAB_RESULTS, MOCK_PRESCRIPTIONS, MOCK_VITALS } from '../data/mockData';

interface RecordsTabProps {
  language: Language;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onNavigate: (tab: TabType) => void;
}

export const RecordsTab: React.FC<RecordsTabProps> = ({
  language,
  appointments,
  onCancelAppointment,
  onNavigate,
}) => {
  const isAr = language === 'ar';
  const [activeSection, setActiveSection] = useState<'appointments' | 'vitals' | 'prescriptions' | 'labs'>('appointments');
  const [refillRequested, setRefillRequested] = useState<{ [key: string]: boolean }>({});

  const handleRequestRefill = (id: string) => {
    setRefillRequested((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Patient Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-teal-600/20">
            HN
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Haythem Al Namer
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {isAr ? 'ملف نشط' : 'Active Patient'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
              <span>{isAr ? 'رقم السجل الطبي:' : 'Medical Record No:'} <strong className="text-slate-800 font-mono">BKL-MRN-90241</strong></span>
              <span>•</span>
              <span>{isAr ? 'فصيلة الدم:' : 'Blood Group:'} <strong className="text-slate-800">O+</strong></span>
              <span>•</span>
              <span>{isAr ? 'العمر:' : 'Age:'} <strong className="text-slate-800">38</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => onNavigate('booking')}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'حجز استشارة جديدة' : 'New Appointment'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'appointments', labelEn: 'Appointments', labelAr: 'المواعيد والزيارات', icon: <Calendar className="w-4 h-4" /> },
          { id: 'vitals', labelEn: 'Vital Signs', labelAr: 'المؤشرات الحيوية', icon: <Heart className="w-4 h-4" /> },
          { id: 'prescriptions', labelEn: 'Prescriptions', labelAr: 'الوصفات والأدوية', icon: <Pill className="w-4 h-4" /> },
          { id: 'labs', labelEn: 'Diagnostic Reports', labelAr: 'نتائج الفحوصات', icon: <Activity className="w-4 h-4" /> },
        ].map((sec) => {
          const active = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sec.icon}
              <span>{isAr ? sec.labelAr : sec.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: APPOINTMENTS */}
      {activeSection === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {isAr ? 'المواعيد المحجوزة والزيارات القادمة' : 'Scheduled Visits & Consultations'}
            </h2>
            <span className="text-xs text-slate-500">{appointments.length} {isAr ? 'مواعيد' : 'records'}</span>
          </div>

          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {apt.bookingRef}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">{apt.doctorName}</h3>
                      <p className="text-xs text-slate-500 font-medium">{apt.departmentName}</p>
                    </div>

                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200/50">
                      {isAr ? 'مؤكد' : 'Confirmed'}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block">{isAr ? 'التاريخ' : 'Date'}</span>
                      <span className="font-semibold text-slate-800">{apt.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">{isAr ? 'الوقت' : 'Time'}</span>
                      <span className="font-semibold text-slate-800">{apt.time}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-slate-400">{isAr ? 'النمط:' : 'Type:'}</span>
                      <span className="font-semibold text-teal-700 capitalize">
                        {apt.type === 'telehealth' ? (isAr ? 'عن بعد (فيديو)' : 'Telehealth Video') : (isAr ? 'حضوري بالعيادة' : 'In-Person Clinic')}
                      </span>
                    </div>
                  </div>

                  {apt.notes && (
                    <p className="text-xs text-slate-500 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/40">
                      "{apt.notes}"
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => onCancelAppointment(apt.id)}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      {isAr ? 'إلغاء الموعد' : 'Cancel Appointment'}
                    </button>
                    <span className="text-xs text-slate-400">
                      {isAr ? 'عيادات كوكب بكيّل الطبي' : 'Bkeel Medical Clinic'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800">{isAr ? 'لا توجد مواعيد قادمة' : 'No scheduled appointments'}</h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'احجز موعدك الآن مع أحد استشاريينا المتميزين' : 'Schedule a consultation with one of our specialized doctors.'}
              </p>
              <button
                onClick={() => onNavigate('booking')}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                {isAr ? 'حجز موعد جديد' : 'Book Appointment'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: VITALS */}
      {activeSection === 'vitals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {isAr ? 'لوحة القياسات والمؤشرات الحيوية' : 'Vital Signs & Health Biomarkers'}
            </h2>
            <span className="text-xs text-slate-500">{isAr ? 'محدثة تلقائياً من الزيارات الأخيرة' : 'Updated automatically from clinic check-ins'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_VITALS.map((vital) => (
              <div
                key={vital.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">
                    {isAr ? vital.label.ar : vital.label.en}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {vital.status}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{vital.value}</span>
                  <span className="text-xs text-slate-500 font-medium">{vital.unit}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{isAr ? 'آخر قراءة:' : 'Measured:'} {vital.lastChecked}</span>
                  <span className="text-teal-600 font-semibold">{isAr ? 'مستقر' : 'Stable'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: PRESCRIPTIONS */}
      {activeSection === 'prescriptions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {isAr ? 'الوصفات الطبية الإلكترونية النشطة' : 'Active Prescriptions & Medications'}
            </h2>
            <span className="text-xs text-slate-500">{MOCK_PRESCRIPTIONS.length} {isAr ? 'أدوية نشطة' : 'active medications'}</span>
          </div>

          <div className="space-y-3">
            {MOCK_PRESCRIPTIONS.map((rx) => (
              <div
                key={rx.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">{rx.medication}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800">
                      {rx.dosage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {isAr ? rx.frequency.ar : rx.frequency.en} • {isAr ? rx.duration.ar : rx.duration.en}
                  </p>
                  <p className="text-xs text-slate-400">
                    {isAr ? 'الطبيب الموصي:' : 'Prescribed by:'} {rx.prescribedBy} • {isAr ? 'البدء:' : 'Started:'} {rx.startDate}
                  </p>
                  <p className="text-xs text-teal-700 font-medium pt-1">
                    "{isAr ? rx.instructions.ar : rx.instructions.en}"
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <span className="text-xs text-slate-500">
                    {isAr ? 'مرات التكرار المتبقية:' : 'Refills Left:'} <strong className="text-slate-800">{rx.refillsRemaining}</strong>
                  </span>
                  <button
                    onClick={() => handleRequestRefill(rx.id)}
                    disabled={refillRequested[rx.id]}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      refillRequested[rx.id]
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {refillRequested[rx.id]
                      ? (isAr ? 'تم طلب إعادة الصرف ✓' : 'Refill Requested ✓')
                      : (isAr ? 'طلب إعادة صرف' : 'Request Pharmacy Refill')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: LABS */}
      {activeSection === 'labs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {isAr ? 'تقارير المختبر والتحاليل التشخيصية' : 'Verified Diagnostic Reports & Pathology'}
            </h2>
            <button
              onClick={() => onNavigate('lab')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              {isAr ? 'حجز فحص مخبري جديد' : 'Order New Lab Test'}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {MOCK_LAB_RESULTS.map((lab) => (
                <div
                  key={lab.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {isAr ? lab.testName.ar : lab.testName.en}
                      </h4>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        lab.status === 'normal' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {lab.status === 'normal' ? (isAr ? 'طبيعي' : 'Normal') : (isAr ? 'تنبيه' : 'Attention')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      {isAr ? lab.category.ar : lab.category.en} • {isAr ? 'تاريخ الفحص:' : 'Date:'} {lab.date} • {lab.doctor}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-base font-bold text-slate-900">
                        {lab.value} <span className="text-xs font-normal text-slate-500">{lab.unit}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {isAr ? 'المعدل الطبيعي: ' : 'Ref: '}{lab.referenceRange}
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Downloading verified PDF report for ${lab.testName.en}...`)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                      title={isAr ? 'تنزيل التقرير' : 'Download PDF'}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
