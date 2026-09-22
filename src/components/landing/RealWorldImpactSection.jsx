import React from 'react';
import { useEV } from '../../context/EVContext';
import { Leaf, Sun, Wind, Trees, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function RealWorldImpactSection() {
  const { adminMetrics, setViewMode, setCurrentAppTab } = useEV();

  const impactPoints = [
    {
      title: "Promotes Clean Energy",
      desc: "Synchronizes charging cycles with peak solar and wind generation windows to maximize clean kilowatt utilization.",
      icon: <Sun className="w-5 h-5 text-amber-500" />,
    },
    {
      title: "Reduces Carbon Footprint",
      desc: `Averts ${adminMetrics.co2SavedKg.toLocaleString()} kg of direct tailpipe carbon emissions compared to traditional petrol/diesel mobility.`,
      icon: <Wind className="w-5 h-5 text-sky-500" />,
    },
    {
      title: "Encourages EV Adoption",
      desc: "Eliminates driver range anxiety by guaranteeing reserved bays with transparent tariffs and instant booking.",
      icon: <Zap className="w-5 h-5 text-emerald-500" />,
    },
    {
      title: "Smart & Efficient Charging Management",
      desc: "Optimizes localized power transformers and protects substation assets from peak overload.",
      icon: <ShieldCheck className="w-5 h-5 text-teal-500" />,
    },
  ];

  return (
    <section id="impact" className="py-20 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            Environmental Stewardship
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Driving a Cleaner Future
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Every kilowatt delivered through Silent Coders smart charging stations directly displaces fossil fuel reliance and accelerates net-zero urban transportation.
          </p>
        </div>

        {/* 4 Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactPoints.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-soft hover:shadow-elevated transition text-left"
            >
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Large Visual: EV Charging Station + Electric Vehicle + Green City */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Visual Graphic */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                <svg
                  viewBox="0 0 600 280"
                  className="w-full h-auto select-none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="cityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0F172A" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="solarCanopy" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="50%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                  </defs>

                  {/* Futuristic Green City Skyline */}
                  <path
                    d="M20 180 L40 180 L40 120 L80 120 L80 180 L110 180 L110 80 L160 80 L160 180 L190 180 L190 140 L230 140 L230 180 L290 180 L290 100 L340 100 L340 180 L400 180 L400 70 L450 70 L450 180 L520 180 L520 130 L560 130 L560 180 L580 180"
                    fill="url(#cityGrad)"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  />

                  {/* Wind Turbines on hills in distance */}
                  <g transform="translate(70, 70)">
                    <line x1="0" y1="0" x2="0" y2="40" stroke="#94A3B8" strokeWidth="2" />
                    <circle cx="0" cy="0" r="3" fill="#34D399" />
                    <line x1="0" y1="0" x2="-15" y2="-12" stroke="#34D399" strokeWidth="1.5" />
                    <line x1="0" y1="0" x2="15" y2="-12" stroke="#34D399" strokeWidth="1.5" />
                    <line x1="0" y1="0" x2="0" y2="18" stroke="#34D399" strokeWidth="1.5" />
                  </g>
                  <g transform="translate(180, 50)">
                    <line x1="0" y1="0" x2="0" y2="35" stroke="#94A3B8" strokeWidth="2" />
                    <circle cx="0" cy="0" r="3" fill="#34D399" />
                    <line x1="0" y1="0" x2="-12" y2="-10" stroke="#34D399" strokeWidth="1.5" />
                    <line x1="0" y1="0" x2="12" y2="-10" stroke="#34D399" strokeWidth="1.5" />
                    <line x1="0" y1="0" x2="0" y2="15" stroke="#34D399" strokeWidth="1.5" />
                  </g>

                  {/* Green City Ground */}
                  <line x1="10" y1="230" x2="590" y2="230" stroke="#10B981" strokeWidth="3" />
                  <path d="M10 230 C150 235, 450 235, 590 230" stroke="#059669" strokeWidth="8" opacity="0.4" />

                  {/* Solar Canopy over Charging Bays */}
                  <polygon points="260,110 520,80 500,105 240,135" fill="url(#solarCanopy)" opacity="0.9" />
                  <line x1="300" y1="125" x2="300" y2="230" stroke="#64748B" strokeWidth="5" />
                  <line x1="470" y1="95" x2="470" y2="230" stroke="#64748B" strokeWidth="5" />

                  {/* EV Charging Station Dispenser */}
                  <rect x="420" y="150" width="35" height="80" rx="6" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
                  <rect x="426" y="160" width="23" height="20" rx="3" fill="#064E3B" />
                  <text x="437" y="174" fill="#34D399" fontSize="6.5" textAnchor="middle" fontWeight="bold">
                    100% SOLAR
                  </text>
                  <circle cx="437" cy="195" r="3" fill="#10B981" className="animate-pulse" />

                  {/* Connected Electric Car */}
                  <path
                    d="M170 215 C175 195, 200 185, 225 180 L260 160 C285 150, 320 150, 345 160 L380 180 C395 185, 405 195, 410 215 L170 215 Z"
                    fill="#0284C7"
                  />
                  {/* Car Windows */}
                  <path d="M235 180 L265 162 C285 155, 310 155, 330 162 L360 180 Z" fill="#0F172A" />
                  {/* Wheels */}
                  <circle cx="215" cy="225" r="15" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                  <circle cx="365" cy="225" r="15" fill="#1E293B" stroke="#64748B" strokeWidth="2" />

                  {/* Charging Cable connecting station to car */}
                  <path d="M420 195 C400 205, 395 200, 385 195" stroke="#10B981" strokeWidth="3" fill="none" />

                  {/* Urban Green Trees */}
                  <g transform="translate(130, 195)">
                    <rect x="7" y="20" width="4" height="15" fill="#78350F" />
                    <circle cx="9" cy="15" r="14" fill="#10B981" opacity="0.8" />
                  </g>
                  <g transform="translate(530, 195)">
                    <rect x="7" y="20" width="4" height="15" fill="#78350F" />
                    <circle cx="9" cy="15" r="14" fill="#10B981" opacity="0.8" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Impact Metrics Callout */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                Silent Coders Ecological Index
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Zero Emissions. Infinite Clean Mobility.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                By replacing fossil-fueled urban commuting with intelligent EV slot orchestration, each station eliminates hundreds of metric tons of harmful exhaust emissions annually.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-2xl font-black text-emerald-400 font-mono block">
                    {adminMetrics.co2SavedKg.toLocaleString()} kg
                  </span>
                  <span className="text-xs text-slate-300 font-medium">CO₂ Emissions Averted</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-2xl font-black text-sky-400 font-mono block">
                    {Math.round(adminMetrics.co2SavedKg / 21)}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">Mature Trees Equivalent</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setViewMode('app');
                    setCurrentAppTab('slots');
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center gap-2"
                >
                  Find An Available Green Bay
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
