import React, { useState } from 'react';
import { useEV } from '../../context/EVContext';
import {
  Zap,
  Menu,
  X,
  LayoutDashboard,
  Car,
  CalendarCheck,
  Receipt,
  ShieldCheck,
  LogOut,
  ChevronDown,
  User,
  ExternalLink,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function Navbar() {
  const {
    BRAND_INFO,
    currentUser,
    logout,
    viewMode,
    setViewMode,
    setCurrentAppTab,
    setAuthModalOpen,
    demoLogin,
  } = useEV();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (viewMode !== 'landing') {
      setViewMode('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToAppTab = (tab) => {
    setViewMode('app');
    setCurrentAppTab(tab);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white font-bold">
              <Zap className="w-6 h-6 fill-current text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  Smart EV <span className="text-emerald-600">Station</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                  Silent Coders
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium tracking-wide">
                {BRAND_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links (Landing view mode) */}
          {viewMode === 'landing' ? (
            <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
              <button
                onClick={() => scrollToSection('hero')}
                className="hover:text-emerald-600 transition"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('problem')}
                className="hover:text-emerald-600 transition"
              >
                Problem
              </button>
              <button
                onClick={() => scrollToSection('solution')}
                className="hover:text-emerald-600 transition"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="hover:text-emerald-600 transition"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('technology')}
                className="hover:text-emerald-600 transition flex items-center gap-1 text-slate-700"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                C++ & Tech
              </button>
              <button
                onClick={() => scrollToSection('architecture')}
                className="hover:text-emerald-600 transition"
              >
                Architecture
              </button>
              <button
                onClick={() => scrollToSection('impact')}
                className="hover:text-emerald-600 transition"
              >
                Impact
              </button>
            </nav>
          ) : (
            /* App View mode top breadcrumbs */
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setViewMode('landing')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
              >
                ← Back to Landing Page
              </button>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Station Console
              </span>
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 transition text-sm font-semibold text-slate-800"
                >
                  <span className="text-lg">{currentUser.avatar || '⚡'}</span>
                  <div className="text-left">
                    <span className="block text-xs font-bold leading-tight">{currentUser.name}</span>
                    <span className="block text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => navigateToAppTab('dashboard')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      Driver Dashboard
                    </button>
                    <button
                      onClick={() => navigateToAppTab('my-evs')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5"
                    >
                      <Car className="w-4 h-4 text-emerald-600" />
                      My Registered EVs
                    </button>
                    <button
                      onClick={() => navigateToAppTab('slots')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5"
                    >
                      <Zap className="w-4 h-4 text-emerald-600" />
                      Charging Slots (5 Bays)
                    </button>
                    <button
                      onClick={() => navigateToAppTab('billing')}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5"
                    >
                      <Receipt className="w-4 h-4 text-emerald-600" />
                      Invoices & Billing
                    </button>
                    {currentUser.role === 'admin' ? (
                      <button
                        onClick={() => navigateToAppTab('admin')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 flex items-center gap-2.5 font-bold"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        Admin Analytics Panel
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          demoLogin('admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <ShieldCheck className="w-4 h-4 text-slate-400" />
                        Switch to Admin Role
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1.5"></div>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => demoLogin('driver')}
                  className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-md shadow-emerald-600/20 transition transform active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Try Live Demo
                </button>
              </>
            )}

            {/* 3D PPT Presentation Deck Button */}
            <button
              onClick={() => setViewMode('presentation')}
              className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded-xl shadow-md shadow-cyan-600/25 transition transform active:scale-95 flex items-center gap-1.5 border border-cyan-400/30"
              title="Launch Interactive 3D Presentation (PPT Deck with 3D Animations)"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping"></span>
              <Layers className="w-4 h-4 text-cyan-200" />
              <span>3D PPT Deck</span>
              <span className="px-1.5 py-0.5 bg-white/20 text-[10px] rounded-full uppercase tracking-wider font-mono">3D</span>
            </button>

            {viewMode === 'landing' && (
              <button
                onClick={() => {
                  setViewMode('app');
                  setCurrentAppTab('dashboard');
                }}
                className="px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                Launch App
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setViewMode('app');
                  setCurrentAppTab('dashboard');
                }}
                className="px-2.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 rounded-lg"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => demoLogin('driver')}
                className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg"
              >
                Demo
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-slate-700">
            <button
              onClick={() => scrollToSection('hero')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('problem')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50"
            >
              Problem
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('technology')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50 text-emerald-600 font-bold"
            >
              C++ & OOP Bridge
            </button>
            <button
              onClick={() => scrollToSection('architecture')}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50"
            >
              Architecture
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setViewMode('presentation');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-cyan-200" />
              <span>Launch 3D PPT Deck</span>
            </button>
            <button
              onClick={() => {
                setViewMode('app');
                setCurrentAppTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"
            >
              Open Full Web App
            </button>
            {!currentUser ? (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-center text-sm font-semibold border border-slate-200 rounded-xl text-slate-700"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    demoLogin('driver');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-center text-sm font-semibold bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200"
                >
                  Driver Demo
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
              >
                Log Out ({currentUser.name})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
