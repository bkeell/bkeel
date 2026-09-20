import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  Video,
  Building2,
  AlertCircle
} from 'lucide-react';
import { Doctor, Appointment, Language, TabType } from '../types';
import { DOCTORS } from '../data/mockData';

interface BookingTabProps {
  language: Language;
  preselectedDoctorId?: string;
  onAppointmentCreated: (appointment: Appointment) => void;
  onNavigate: (tab: TabType) => void;
}

export const BookingTab: React.FC<BookingTabProps> = ({
  language,
  preselectedDoctorId,
  onAppointmentCreated,
  onNavigate,
}) => {
  const isAr = language === 'ar';

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preselectedDoctorId || DOCTORS[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-25');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'telehealth'>('in-person');
  
  // Patient details
  const [patientName, setPatientName] = useState('Haythem Al Namer');
  const [patientPhone, setPatientPhone] = useState('+971 50 123 4567');
  const [patientAge, setPatientAge] = useState('38');
  const [visitNotes, setVisitNotes] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  const selectedDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];

  const availableSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:30 AM', '04:00 PM', '04:30 PM', '05:15 PM', '06:00 PM'
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `BKL-${Math.floor(10000 + Math.random() * 90000)}`;
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      bookingRef: refCode,
      patientName,
      patientPhone,
      patientAge: parseInt(patientAge, 10) || 30,
      doctorId: selectedDoctor.id,
      doctorName: isAr ? selectedDoctor.name.ar : selectedDoctor.name.en,
      department: selectedDoctor.department,
      departmentName: isAr ? selectedDoctor.departmentName.ar : selectedDoctor.departmentName.en,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      status: 'confirmed',
      notes: visitNotes,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAppointmentCreated(newAppointment);
    setConfirmedBooking(newAppointment);
  };

  if (confirmedBooking) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            {isAr ? 'تم تأكيد الموعد بنجاح' : 'Appointment Confirmed'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {isAr ? 'شكراً لاختيارك كوكب بكيّل الطبي' : 'Booking Successfully Reserved'}
          </h2>
          <p className="text-sm text-slate-600">
            {isAr 
              ? 'تم إرسال رسالة نصية وتأكيد إلكتروني إلى هاتفك المحمول مع تفاصيل الزيارة.'
              : 'A confirmation SMS and digital ticket have been sent to your registered contact number.'}
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-3 text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-slate-500">{isAr ? 'رقم الحجز المرجعي' : 'Booking Reference'}</span>
            <span className="font-mono font-bold text-teal-700 text-base">{confirmedBooking.bookingRef}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">{isAr ? 'المريض' : 'Patient Name'}</span>
            <span className="font-semibold text-slate-900">{confirmedBooking.patientName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">{isAr ? 'الطبيب المعالج' : 'Attending Specialist'}</span>
            <span className="font-semibold text-slate-900">{confirmedBooking.doctorName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">{isAr ? 'العيادة / التخصص' : 'Department'}</span>
            <span className="font-semibold text-slate-900">{confirmedBooking.departmentName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">{isAr ? 'التاريخ والوقت' : 'Date & Time Slot'}</span>
            <span className="font-semibold text-slate-900">{confirmedBooking.date} at {confirmedBooking.time}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">{isAr ? 'نوع الاستشارة' : 'Consultation Mode'}</span>
            <span className="font-semibold capitalize text-teal-700">
              {confirmedBooking.type === 'telehealth' ? (isAr ? 'استشارة مرئية عن بعد' : 'Telehealth Video') : (isAr ? 'زيارة حضورية للعيادة' : 'In-Person Clinic Visit')}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('records')}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            {isAr ? 'عرض حجوزاتي في ملفي' : 'View in My Health Records'}
          </button>

          <button
            onClick={() => {
              setConfirmedBooking(null);
              setStep(1);
            }}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            {isAr ? 'حجز موعد آخر' : 'Book Another Visit'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Step Indicator */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {isAr ? 'حجز موعد استشارة طبية' : 'Schedule a Clinic Appointment'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAr ? 'اختر الطبيب والموعد المناسب ثم قم بتأكيد بيانات المريض' : 'Select doctor, date slot, and verify patient information'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className={`px-2.5 py-1 rounded-full ${step === 1 ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-800'}`}>
            1
          </span>
          <span className="text-slate-300">——</span>
          <span className={`px-2.5 py-1 rounded-full ${step === 2 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
            2
          </span>
        </div>
      </div>

      <form onSubmit={handleConfirmBooking} className="space-y-6">
        {step === 1 ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            {/* Choose Doctor */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">
                {isAr ? '1. اختيار الطبيب والاستشاري' : '1. Select Physician & Department'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DOCTORS.map((doc) => {
                  const isSelected = doc.id === selectedDoctorId;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected 
                          ? 'border-teal-600 bg-teal-50/70 ring-2 ring-teal-600/20' 
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <img
                        src={doc.avatar}
                        alt={isAr ? doc.name.ar : doc.name.en}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {isAr ? doc.name.ar : doc.name.en}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">
                          {isAr ? doc.departmentName.ar : doc.departmentName.en}
                        </p>
                        <p className="text-[11px] font-semibold text-teal-700 mt-0.5">
                          AED {doc.consultationFee}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visit Mode */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="block text-sm font-bold text-slate-900">
                {isAr ? '2. طريقة الاستشارة' : '2. Consultation Mode'}
              </label>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAppointmentType('in-person')}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    appointmentType === 'in-person'
                      ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-600/20'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">{isAr ? 'زيارة حضورية للعيادة' : 'In-Person Clinic Visit'}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{isAr ? 'مبنى كوكب بكيّل الطبي، دبي وأبوظبي' : 'At Bkeel Medical Center Clinics'}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType('telehealth')}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    appointmentType === 'telehealth'
                      ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-600/20'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">{isAr ? 'استشارة فيديو عن بعد' : 'Telehealth Video Call'}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{isAr ? 'اتصال آمن ومريح من منزلك' : 'Encrypted consultation from home'}</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="block text-sm font-bold text-slate-900">
                {isAr ? '3. الموعد والوقت' : '3. Appointment Date & Time'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-semibold text-slate-600 mb-1">
                    {isAr ? 'تاريخ الحجز' : 'Date'}
                  </span>
                  <input
                    type="date"
                    min="2026-09-21"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <div>
                  <span className="block text-xs font-semibold text-slate-600 mb-1">
                    {isAr ? 'التوقيت المفضل' : 'Time Slot'}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.slice(0, 6).map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedTime === slot
                            ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>{isAr ? 'متابعة لبيانات المريض' : 'Proceed to Patient Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Patient Info */
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isAr ? 'بيانات المريض والمعلومات الصحية' : 'Patient Verification & Notes'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr ? 'تأكد من صحة رقم الهاتف لتلقي رسالة التأكيد ومواعيد التذكير' : 'Please provide accurate contact details for appointment SMS alerts'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isAr ? 'تغيير الطبيب أو الموعد' : 'Change Slot'}</span>
              </button>
            </div>

            {/* Selected summary capsule */}
            <div className="bg-teal-50/70 border border-teal-200/60 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDoctor.avatar}
                  alt={selectedDoctor.name.en}
                  className="w-12 h-12 rounded-xl object-cover border border-teal-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {isAr ? selectedDoctor.name.ar : selectedDoctor.name.en}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {selectedDate} at {selectedTime} • {appointmentType === 'telehealth' ? 'Telehealth' : 'In-Person'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">{isAr ? 'رسوم الاستشارة' : 'Consultation'}</span>
                <span className="text-base font-bold text-teal-800">AED {selectedDoctor.consultationFee}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {isAr ? 'الاسم الكامل للمريض' : 'Patient Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {isAr ? 'العمر' : 'Age'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="120"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {isAr ? 'رقم الهاتف المحمول (لتأكيد الرسائل النصية)' : 'Mobile Phone Number (for SMS confirmation)'}
                </label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  {isAr ? 'سبب الزيارة أو ملاحظات الأعراض (اختياري)' : 'Chief Complaint / Notes for Physician (Optional)'}
                </label>
                <textarea
                  rows={3}
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  placeholder={isAr ? 'مثال: فحص روتيني، صداع متكرر، متابعة ضغط الدم...' : 'e.g. Annual executive screening, persistent mild cough, hypertension follow up...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                {isAr ? 'رجوع للخلف' : 'Back'}
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3 rounded-xl transition-all shadow-md shadow-teal-600/20 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{isAr ? 'تأكيد حجز الموعد النهائي' : 'Confirm & Book Appointment'}</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
