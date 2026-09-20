import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TabType, Appointment } from './types';
import { INITIAL_APPOINTMENTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { OverviewTab } from './components/OverviewTab';
import { DoctorsTab } from './components/DoctorsTab';
import { BookingTab } from './components/BookingTab';
import { RecordsTab } from './components/RecordsTab';
import { TriageTab } from './components/TriageTab';
import { LabTab } from './components/LabTab';
import { Footer } from './components/Footer';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>(undefined);
  const [doctorListFilter, setDoctorListFilter] = useState<string | undefined>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  // Sync document direction for Arabic RTL vs English LTR
  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const handleNavigate = (tab: TabType, filter?: string) => {
    if (tab === 'booking' && filter) {
      setSelectedDoctorForBooking(filter);
    }
    if (tab === 'doctors' && filter) {
      setDoctorListFilter(filter);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookDoctor = (doctorId: string) => {
    setSelectedDoctorForBooking(doctorId);
    setCurrentTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedDoctorForBooking(undefined);
          setDoctorListFilter(undefined);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentTab}-${language}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {currentTab === 'overview' && (
              <OverviewTab
                language={language}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'doctors' && (
              <DoctorsTab
                language={language}
                onBookDoctor={handleBookDoctor}
                initialFilter={doctorListFilter}
              />
            )}

            {currentTab === 'booking' && (
              <BookingTab
                language={language}
                preselectedDoctorId={selectedDoctorForBooking}
                onAppointmentCreated={handleAppointmentCreated}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'records' && (
              <RecordsTab
                language={language}
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'triage' && (
              <TriageTab
                language={language}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'lab' && (
              <LabTab
                language={language}
                onNavigate={handleNavigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer
        language={language}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
