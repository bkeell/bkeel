import React from 'react';
import { 
  Activity, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  Heart
} from 'lucide-react';
import { Language, TabType } from '../types';

interface FooterProps {
  language: Language;
  onNavigate: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
}) => {
  const isAr = language === 'ar';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  {isAr ? 'كوكب بكيّل الطبي' : 'Bkeel Medical'}
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-teal-900 text-teal-300 ml-1">
                  {isAr ? 'بلانيت' : 'Planet'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'مركز التميز الطبي المتكامل والرعاية الصحية المتقدمة. ملتزمون بتقديم أعلى مستويات التشخيص والعلاج الطبي الدقيق.'
                : 'Advanced multi-specialty healthcare medical center committed to precision diagnostics, evidence-based care, and patient-first clinical excellence.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-teal-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'مرخص من هيئة الصحة بدبي ووزارة الصحة' : 'Licensed by DHA & UAE MOHAP'}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              {isAr ? 'الخدمات والأقسام' : 'Clinical Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('doctors')} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'استشاريو الطب الباطني والقلب' : 'Cardiology & Internal Medicine'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctors')} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'طب الأطفال وحديثي الولادة' : 'Pediatrics & Child Wellness'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctors')} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'الجلدية والليزر والتجميل' : 'Dermatology & Laser Aesthetics'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lab')} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'الفحوصات المخبرية الشاملة' : 'Diagnostic Lab & Pathology'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('triage')} className="hover:text-white transition-colors cursor-pointer">
                  {isAr ? 'الفرز والتقييم السريري' : 'Symptom Triage Protocol'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinic Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              {isAr ? 'مواعيد العمل' : 'Working Hours'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">{isAr ? 'قسم الطوارئ والاستقبال:' : '24/7 Urgent Care:'}</span>
                  <span>{isAr ? 'مفتوح على مدار الساعة طوال أيام الأسبوع' : 'Open 24 Hours / 7 Days a week'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="font-semibold text-white block">{isAr ? 'العيادات التخصصية:' : 'Outpatient Specialty Clinics:'}</span>
                <span>{isAr ? 'السبت - الخميس: 8:00 ص - 10:00 م' : 'Sat – Thu: 8:00 AM – 10:00 PM'}</span>
                <span className="block">{isAr ? 'الجمعة: 2:00 م - 9:00 م' : 'Friday: 2:00 PM – 9:00 PM'}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              {isAr ? 'التواصل والعناوين' : 'Contact & Locations'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'مدينة دبي الطبية، مبنى 64، دبي، الإمارات العربية المتحدة' : 'Dubai Healthcare City, Building 64, Dubai, UAE'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:80025335" className="hover:text-white font-semibold text-white">800-BKEEL (800-25335)</a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>care@bkeelmedical.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bkeel Medical Planet. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>{isAr ? 'صحة مستدامة برعاية طبية متميزة' : 'Dedicated to Precision Health & Compassion'}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
