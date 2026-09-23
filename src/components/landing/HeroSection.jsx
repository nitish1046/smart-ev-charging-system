import React from 'react';
import { useEV } from '../../context/EVContext';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Receipt,
  Leaf,
  Activity,
  Car,
  Clock,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export default function HeroSection() {
  const {
    BRAND_INFO,
    setViewMode,
    setCurrentAppTab,
    setAuthModalOpen,
    demoLogin,
    slots,
  } = useEV();

  const availableCount = slots.filter((s) => s.status === 'Available').length;

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/20">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-400/10 via-teal-400/10 to-sky-400/10 blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top Team & Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Team {BRAND_INFO.team}</span>
              <span className="text-emerald-300">•</span>
              <span className="text-slate-600">{BRAND_INFO.mainTagline}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
              Charge Smarter.{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                Drive Greener.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              {BRAND_INFO.heroSubheading}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => setViewMode('presentation')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-elevated shadow-cyan-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 border border-cyan-400/40"
              >
                <Layers className="w-4 h-4 text-cyan-200" />
                <span>Launch 3D PPT Deck</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase tracking-wider font-mono">
                  11 Slides
                </span>
              </button>

              <button
                onClick={() => {
                  setViewMode('app');
                  setCurrentAppTab('dashboard');
                }}
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-elevated shadow-emerald-600/25 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5"
              >
                Launch App Console
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-sm transition transform hover:-translate-y-0.5"
              >
                Explore Features
              </button>

              <button
                onClick={() => demoLogin('driver')}
                className="px-4 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Instant Demo
              </button>
            </div>

            {/* Small Feature Badges */}
            <div className="pt-4 border-t border-slate-200/80">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Core Capabilities
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-soft">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  Smart Charging
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-soft">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  Easy Slot Booking
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-soft">
                  <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                  Digital Billing
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-soft">
                  <Leaf className="w-3.5 h-3.5 text-teal-600" />
                  Sustainable Future
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Premium Electric Car Connected to Modern EV Charging Station */}
          <div className="lg:col-span-6 relative">
            {/* Main Interactive Visual Card */}
            <div className="relative rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 shadow-elevated p-6 sm:p-8 overflow-hidden">
              {/* Station Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

              {/* Station Live Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Supercharger Bay B1 • Active
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold border border-emerald-200">
                  {availableCount} of 5 Slots Free
                </span>
              </div>

              {/* SVG Art: Modern EV Connected to Smart Charging Station */}
              <div className="my-6 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 680 380"
                  className="w-full h-auto max-h-[300px] select-none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="50%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#0369A1" />
                    </linearGradient>
                    <linearGradient id="chargerBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#064E3B" />
                      <stop offset="100%" stopColor="#022C22" />
                    </linearGradient>
                    <linearGradient id="cableFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Clean Background Skyline Silhouette */}
                  <path
                    d="M30 240 L70 240 L70 190 L110 190 L110 240 L160 240 L160 160 L210 160 L210 240 L280 240 L280 180 L340 180 L340 240 L440 240 L440 170 L490 170 L490 240 L650 240"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Ground Line */}
                  <line x1="20" y1="290" x2="660" y2="290" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
                  <line x1="20" y1="294" x2="660" y2="294" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />

                  {/* Charging Station Pedestal (Right) */}
                  <g transform="translate(480, 70)">
                    {/* Tower shadow */}
                    <ellipse cx="65" cy="220" rx="55" ry="8" fill="#E2E8F0" />
                    {/* Main Station Unit */}
                    <rect x="25" y="20" width="80" height="200" rx="14" fill="url(#chargerBodyGrad)" />
                    {/* Top Glowing Accent Fin */}
                    <rect x="35" y="12" width="60" height="8" rx="4" fill="#10B981" filter="url(#softGlow)" />
                    {/* Station Brand Title */}
                    <text x="65" y="42" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                      SILENT CODERS
                    </text>
                    {/* Digital Touchscreen HUD */}
                    <rect x="35" y="52" width="60" height="54" rx="8" fill="url(#screenGrad)" stroke="#10B981" strokeWidth="1.5" />
                    <text x="65" y="68" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle">
                      84%
                    </text>
                    <text x="65" y="80" fill="#E2E8F0" fontSize="7" textAnchor="middle">
                      120 kW FAST
                    </text>
                    <text x="65" y="93" fill="#A7F3D0" fontSize="6.5" textAnchor="middle">
                      32.4 kWh DELIVERED
                    </text>
                    {/* Pulsing Station Status LED */}
                    <circle cx="65" cy="120" r="5" fill="#10B981" filter="url(#softGlow)" className="animate-pulse" />
                    {/* Station Holster */}
                    <rect x="15" y="130" width="16" height="28" rx="4" fill="#334155" />
                    <rect x="10" y="136" width="10" height="16" rx="2" fill="#64748B" />
                  </g>

                  {/* Modern Sleek Electric Car (Left/Center) */}
                  <g transform="translate(60, 120)">
                    {/* Car Wheels Shadow */}
                    <ellipse cx="90" cy="168" rx="80" ry="10" fill="#E2E8F0" />
                    <ellipse cx="280" cy="168" rx="80" ry="10" fill="#E2E8F0" />

                    {/* Aerodynamic Car Body */}
                    <path
                      d="M30 145 C40 120, 80 105, 120 100 L180 65 C220 50, 270 50, 310 65 L360 98 C390 105, 410 120, 420 145 C420 155, 410 160, 380 160 L350 160 C345 135, 315 135, 305 160 L150 160 C140 135, 110 135, 100 160 L40 160 C30 160, 20 155, 30 145 Z"
                      fill="url(#carBodyGrad)"
                    />
                    {/* Car Cabin & Windows */}
                    <path
                      d="M135 98 L188 68 C220 56, 260 56, 298 68 L345 98 Z"
                      fill="#0F172A"
                      opacity="0.85"
                    />
                    {/* Window Divider */}
                    <path d="M235 60 L235 98" stroke="#334155" strokeWidth="3" />

                    {/* Headlights (Cyan/White Glow) */}
                    <path d="M28 140 Q38 135 48 142" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" filter="url(#softGlow)" />
                    {/* Taillights (Red LED bar) */}
                    <path d="M415 135 Q418 142 410 146" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" filter="url(#softGlow)" />

                    {/* Front Wheel */}
                    <circle cx="125" cy="160" r="28" fill="#1E293B" stroke="#64748B" strokeWidth="4" />
                    <circle cx="125" cy="160" r="16" fill="#0F172A" />
                    <circle cx="125" cy="160" r="6" fill="#38BDF8" />

                    {/* Rear Wheel */}
                    <circle cx="328" cy="160" r="28" fill="#1E293B" stroke="#64748B" strokeWidth="4" />
                    <circle cx="328" cy="160" r="16" fill="#0F172A" />
                    <circle cx="328" cy="160" r="6" fill="#38BDF8" />

                    {/* Charging Port on Car (Rear Quarter) */}
                    <circle cx="370" cy="122" r="7" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" filter="url(#softGlow)" />
                    <circle cx="370" cy="122" r="3" fill="#FFFFFF" />
                  </g>

                  {/* Pulsing Flexible High-Voltage Cable from Charger to Car */}
                  <path
                    d="M495 210 C460 230, 445 235, 430 185"
                    stroke="#1E293B"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M495 210 C460 230, 445 235, 430 185"
                    stroke="url(#cableFlow)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="10 8"
                    className="animate-flow-cable"
                    fill="none"
                  />

                  {/* Connector Plug Gun */}
                  <rect x="422" y="177" width="16" height="14" rx="3" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />

                  {/* Floating Live Telemetry Badge over car */}
                  <g transform="translate(180, 25)">
                    <rect width="170" height="34" rx="17" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" filter="url(#softGlow)" />
                    <circle cx="18" cy="17" r="7" fill="#10B981" />
                    <text x="18" y="20" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">⚡</text>
                    <text x="32" y="17" fill="#0F172A" fontSize="9.5" fontWeight="bold">Charging Active</text>
                    <text x="32" y="27" fill="#059669" fontSize="8" fontWeight="bold">420V • 285A • 120kW</text>
                    <text x="145" y="21" fill="#0F172A" fontSize="10" fontWeight="black">84%</text>
                  </g>
                </svg>
              </div>

              {/* Real-Time Telemetry Bar underneath hero graphic */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-soft">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Charging Speed</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">120 kW</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">DC Fast Supercharger</p>
                </div>
                <div className="text-left border-x border-slate-100 px-2 sm:px-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time Remaining</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">12 mins</p>
                  <p className="text-[10px] text-sky-600 font-semibold">To 90% Target SoC</p>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Session Cost</p>
                  <p className="text-sm sm:text-base font-extrabold text-emerald-700 font-mono">₹583.20</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Auto-Bill Prepared</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 font-bold">
                <Car className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">1,250+</p>
              <h4 className="text-xs font-bold text-slate-900 mt-1">EV Registration</h4>
              <p className="text-xs text-slate-500 mt-0.5">Vehicles securely registered in database</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft text-left">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">5 Bays</p>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Slot Management</h4>
              <p className="text-xs text-slate-500 mt-0.5">Live availability & auto-booking</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">100%</p>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Smart Billing</h4>
              <p className="text-xs text-slate-500 mt-0.5">Automated GST digital invoices</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft text-left">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3 font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">Zero</p>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Eco-Friendly Charging</h4>
              <p className="text-xs text-slate-500 mt-0.5">100% renewable solar-grid backed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
