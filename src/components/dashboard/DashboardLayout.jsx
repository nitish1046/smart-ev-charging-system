import React, { useState } from 'react';
import { useEV } from '../../context/EVContext';
import {
  LayoutDashboard,
  Car,
  Zap,
  CalendarCheck,
  Bookmark,
  Receipt,
  User,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  ExternalLink,
  PlusCircle,
  Bell,
  Search,
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const {
    BRAND_INFO,
    currentUser,
    logout,
    currentAppTab,
    setCurrentAppTab,
    setViewMode,
    demoLogin,
    slots,
    registeredEVs,
    bookings,
  } = useEV();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const availableSlotsCount = slots.filter((s) => s.status === 'Available').length;
  const activeBookingsCount = bookings.filter((b) => b.status === 'Active').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'my-evs',
      label: 'My EVs',
      icon: <Car className="w-4 h-4" />,
      badge: registeredEVs.length,
    },
    {
      id: 'slots',
      label: 'Charging Slots',
      icon: <Zap className="w-4 h-4" />,
      badge: `${availableSlotsCount}/5`,
      badgeColor: 'emerald',
    },
    { id: 'book', label: 'Book Slot', icon: <CalendarCheck className="w-4 h-4" /> },
    {
      id: 'bookings',
      label: 'My Bookings',
      icon: <Bookmark className="w-4 h-4" />,
      badge: activeBookingsCount > 0 ? activeBookingsCount : undefined,
      badgeColor: 'sky',
    },
    { id: 'billing', label: 'Billing & Invoices', icon: <Receipt className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  const handleSelectTab = (tabId) => {
    setCurrentAppTab(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center gap-2" onClick={() => setViewMode('landing')}>
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="font-extrabold text-sm text-slate-900 tracking-tight">
            Smart EV Station
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('landing')}
            className="text-[11px] font-semibold text-slate-600 px-2.5 py-1 bg-slate-100 rounded-lg"
          >
            Landing
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-slate-600 rounded-lg border border-slate-200"
            aria-label="Toggle Sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-100">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setViewMode('landing')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
                    Smart EV Station
                  </h1>
                </div>
                <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mt-1">
                  {BRAND_INFO.team}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Landing Page Switcher */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => setViewMode('landing')}
              className="text-slate-500 hover:text-emerald-700 font-semibold flex items-center gap-1 transition"
            >
              <span>← View Landing Page</span>
            </button>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-left">
              Main Menu
            </p>
            {navItems.map((item) => {
              const isActive = currentAppTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold shadow-sm border border-emerald-200/60'
                      : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-emerald-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.badgeColor === 'emerald'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.badgeColor === 'sky'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Admin Panel Link */}
            <div className="pt-2">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-left">
                Station Management
              </p>
              <button
                onClick={() => handleSelectTab('admin')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  currentAppTab === 'admin'
                    ? 'bg-amber-50 text-amber-900 font-bold shadow-sm border border-amber-200/60'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className={`w-4 h-4 ${
                      currentAppTab === 'admin' ? 'text-amber-600' : 'text-slate-400'
                    }`}
                  />
                  <span>Admin Panel</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                  KPIs
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer (User session & Logout) */}
        <div className="p-4 border-t border-slate-200/90 bg-slate-50/50">
          {currentUser ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 px-2">
                <span className="text-xl">{currentUser.avatar || '⚡'}</span>
                <div className="text-left min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">
                    {currentUser.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (currentUser.role === 'admin') {
                      demoLogin('driver');
                    } else {
                      demoLogin('admin');
                    }
                  }}
                  className="flex-1 py-1.5 px-2 text-[10px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition truncate"
                >
                  {currentUser.role === 'admin' ? 'Switch to Driver' : 'Switch to Admin'}
                </button>
                <button
                  onClick={logout}
                  className="py-1.5 px-2 text-[10px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition flex items-center gap-1"
                  title="Log out"
                >
                  <LogOut className="w-3 h-3" />
                  Exit
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => demoLogin('driver')}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
              >
                Sign In as Driver
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main App Content Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top App Bar */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200/80 sticky top-0 z-20">
          {/* Breadcrumbs & Title */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Console</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-bold text-slate-900 capitalize">
              {currentAppTab.replace('-', ' ')}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{availableSlotsCount} of 5 Bays Free</span>
            </div>

            <button
              onClick={() => setCurrentAppTab('book')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Book Charging Slot
            </button>
          </div>
        </div>

        {/* View Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
