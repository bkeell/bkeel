import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  GraduationCap, 
  Languages, 
  Star, 
  CheckCircle2, 
  Filter
} from 'lucide-react';
import { Doctor, Language, TabType } from '../types';
import { DOCTORS, DEPARTMENTS } from '../data/mockData';

interface DoctorsTabProps {
  language: Language;
  onBookDoctor: (doctorId: string) => void;
  initialFilter?: string;
}

export const DoctorsTab: React.FC<DoctorsTabProps> = ({
  language,
  onBookDoctor,
  initialFilter,
}) => {
  const isAr = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState(initialFilter || 'all');

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept = selectedDept === 'all' || doc.department === selectedDept || doc.id === selectedDept;
    const nameMatch = doc.name.en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      doc.name.ar.includes(searchQuery);
    const titleMatch = doc.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       doc.title.ar.includes(searchQuery);
    return matchesDept && (nameMatch || titleMatch);
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {isAr ? 'دليل الأطباء والاستشاريين' : 'Find a Specialist Physician'}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {isAr 
                ? 'استكشف قائمة الاستشاريين ذوي الخبرة العالية واحجز استشارتك حضورياً أو عن بعد'
                : 'Browse our credentialed consultants and schedule your in-person or telehealth visit'}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className={`w-4 h-4 text-slate-400 absolute top-3 ${isAr ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              placeholder={isAr ? 'بحث بالاسم أو التخصص...' : 'Search doctor or condition...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all ${
                isAr ? 'pr-9 pl-4 text-right' : 'pl-9 pr-4'
              }`}
            />
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedDept('all')}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedDept === 'all'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'جميع التخصصات' : 'All Specialties'}
          </button>

          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedDept === dept.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isAr ? dept.name.ar : dept.name.en}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={doctor.avatar}
                    alt={isAr ? doctor.name.ar : doctor.name.en}
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800">
                      {isAr ? doctor.departmentName.ar : doctor.departmentName.en}
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg leading-snug truncate">
                      {isAr ? doctor.name.ar : doctor.name.en}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {isAr ? doctor.title.ar : doctor.title.en}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{doctor.rating}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{doctor.reviewCount} {isAr ? 'تقييماً' : 'reviews'}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">{doctor.experience} {isAr ? 'سنة خبرة' : 'yrs exp'}</span>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 space-y-2">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{isAr ? doctor.education.ar : doctor.education.en}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{isAr ? 'اللغات: ' : 'Languages: '}{doctor.languages.join(', ')}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 font-medium">
                    <div className="flex items-center gap-1.5 text-teal-700">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{isAr ? 'أقرب وقت متاح:' : 'Next available:'}</span>
                      <span className="font-bold">{doctor.nextAvailable}</span>
                    </div>
                    <div className="text-slate-900 font-semibold">
                      AED {doctor.consultationFee}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onBookDoctor(doctor.id)}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isAr ? 'حجز موعد استشارة' : 'Book Appointment'}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <Filter className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">
              {isAr ? 'لا يوجد أطباء مطابقين للبحث' : 'No doctors found'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAr ? 'يرجى تغيير التخصص أو تعديل عبارة البحث' : 'Please try selecting another specialty or clearing the search query.'}
            </p>
            <button
              onClick={() => { setSelectedDept('all'); setSearchQuery(''); }}
              className="px-4 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold hover:bg-teal-100 transition-colors"
            >
              {isAr ? 'إعادة التعيين' : 'Reset Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
