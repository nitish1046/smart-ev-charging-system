import React from 'react';
import { EVProvider, useEV } from './context/EVContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/ToastContainer';

// Landing Page Components
import HeroSection from './components/landing/HeroSection';
import ProblemSection from './components/landing/ProblemSection';
import SolutionSection from './components/landing/SolutionSection';
import FeaturesSection from './components/landing/FeaturesSection';
import TechnologySection from './components/landing/TechnologySection';
import SystemArchitecture from './components/landing/SystemArchitecture';
import ScopeComparisonSection from './components/landing/ScopeComparisonSection';
import RealWorldImpactSection from './components/landing/RealWorldImpactSection';

// Dashboard & App Components
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardOverview from './components/dashboard/DashboardOverview';
import MyEvsView from './components/dashboard/MyEvsView';
import ChargingStationView from './components/dashboard/ChargingStationView';
import BookingFlowView from './components/dashboard/BookingFlowView';
import BookingsView from './components/dashboard/BookingsView';
import BillingView from './components/dashboard/BillingView';
import AdminDashboardView from './components/dashboard/AdminDashboardView';
import ProfileView from './components/dashboard/ProfileView';

// Modals
import AuthModal from './components/auth/AuthModal';
import DigitalBillModal from './components/dashboard/DigitalBillModal';

import Presentation3DDeck from './components/presentation/Presentation3DDeck';

function AppContent() {
  const { viewMode, currentAppTab } = useEV();

  // If in 3D Presentation / PPT mode, render immersive fullscreen presentation deck
  if (viewMode === 'presentation') {
    return (
      <>
        <Presentation3DDeck />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-emerald-500 selection:text-white">
      {/* Top Main Navbar */}
      <Navbar />

      {/* Conditional View Mode */}
      {viewMode === 'landing' ? (
        <main className="flex-1">
          {/* 1. Landing Hero */}
          <HeroSection />

          {/* 2. Problem Section */}
          <ProblemSection />

          {/* 3. Solution Section (with 5-step visual workflow) */}
          <SolutionSection />

          {/* 4. Interactive Features Section */}
          <FeaturesSection />

          {/* 12. C++ & Object-Oriented Technology Bridge */}
          <TechnologySection />

          {/* 13. System Architecture Diagram */}
          <SystemArchitecture />

          {/* 14. Current vs Future Scope */}
          <ScopeComparisonSection />

          {/* 15. Real-World Impact Section */}
          <RealWorldImpactSection />

          {/* Footer on Landing page */}
          <Footer />
        </main>
      ) : (
        /* Full SaaS Web App Mode */
        <DashboardLayout>
          {currentAppTab === 'dashboard' && <DashboardOverview />}
          {currentAppTab === 'my-evs' && <MyEvsView />}
          {currentAppTab === 'slots' && <ChargingStationView />}
          {currentAppTab === 'book' && <BookingFlowView />}
          {currentAppTab === 'bookings' && <BookingsView />}
          {currentAppTab === 'billing' && <BillingView />}
          {currentAppTab === 'admin' && <AdminDashboardView />}
          {currentAppTab === 'profile' && <ProfileView />}
        </DashboardLayout>
      )}

      {/* Global Modals & Notifications */}
      <AuthModal />
      <DigitalBillModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <EVProvider>
      <AppContent />
    </EVProvider>
  );
}
