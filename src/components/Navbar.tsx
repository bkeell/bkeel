import React from 'react';
import { 
  Activity, 
  Calendar, 
  PhoneCall, 
  UserRound, 
  Stethoscope, 
  FlaskConical, 
  FileText, 
  Globe2,
  ShieldCheck
} from 'lucide-react';
import { Language, TabType } from '../types';

interface NavbarProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
}) => {
  const isAr = language === 'ar';

  const navItems: { id: TabType; labelEn: string; labelAr: string; icon: React.ReactNode }[] = [
    { id: 'overview', labelEn: 'Overview', labelAr: 'الرئيسية', icon: <Activity className="w-4 h-4" /> },
    { id: 'doctors', labelEn: 'Specialists', labelAr: 'الأطباء', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'booking', labelEn: 'Book Visit', labelAr: 'حجز موعد', icon: <Calendar className="w-4 h-4" /> },
    { id: 'records', labelEn: 'My Records', labelAr: 'ملفي الصحي', icon: <FileText className="w-4 h-4" /> },
    { id: 'triage', labelEn: 'Symptom Triage', labelAr: 'تقييم الأعراض', icon: <UserRound className="w-4 h-4" /> },
    { id: 'lab', labelEn: 'Diagnostics & Lab', labelAr: 'المختبر والفحوصات', icon: <FlaskConical className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner with Emergency Contact & Accreditations */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-teal-400 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {isAr ? 'طوارئ 24/7 مفتوحة' : '24/7 Urgent Care Available'}
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <a href="tel:80025335" className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-semibold text-white">800-BKEEL</span> (800-25335)
          </a>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <span className="hidden md:flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            {isAr ? 'معتمد من هيئة الصحة وJCI' : 'JCI & DHA Accredited Medical Center'}
          </span>
          <button
            id="lang-toggle-btn"
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 font-medium transition-colors cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentTab('overview')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  {isAr ? 'كوكب بكيّل الطبي' : 'Bkeel Medical'}
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                  {isAr ? 'بلانيت' : 'Planet'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-none mt-0.5">
                {isAr ? 'المركز الطبي والعيادات التخصصية' : 'Advanced Specialty Healthcare'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-teal-50 text-teal-800 border border-teal-200/60 shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className={active ? 'text-teal-700' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{isAr ? item.labelAr : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2">
            <button
              id="header-book-btn"
              onClick={() => setCurrentTab('booking')}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm shadow-teal-600/20 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'حجز موعد فوري' : 'Book Appointment'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Scroll Nav */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-teal-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{isAr ? item.labelAr : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
