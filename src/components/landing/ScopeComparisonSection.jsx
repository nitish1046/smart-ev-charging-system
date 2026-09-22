import React from 'react';
import { CheckCircle2, Rocket, ArrowRight, ShieldCheck, Cpu, Database, Smartphone } from 'lucide-react';

export default function ScopeComparisonSection() {
  const currentScope = [
    { title: "Basic EV Registration", desc: "Owner, Plate, Vehicle Type & Battery capacity storage in garage." },
    { title: "Slot Booking", desc: "Interactive reservation flow with automated Booking ID assignment." },
    { title: "Bill Generation", desc: "Instant digital tax invoice calculating units consumed, tariffs and GST." },
    { title: "File-Based Data Storage", desc: "C++ fstream disk persistence bridged to reactive LocalStorage engine." },
    { title: "Modern User Interface", desc: "Clean responsive web frontend with Tesla-grade aesthetic." },
  ];

  const futureScope = [
    { title: "MySQL / Firebase Database", desc: "Distributed cloud database with multi-station multi-tenant tenancy." },
    { title: "Real-Time Slot Availability", desc: "Sub-second WebSocket sensor feeds streaming bay occupancy." },
    { title: "Online Payment Gateway", desc: "Seamless Razorpay, Stripe, and UPI auto-debit wallet integrations." },
    { title: "Native Mobile Application", desc: "React Native & Flutter iOS/Android driver companion apps." },
    { title: "Admin Panel & Analytics", desc: "Predictive power load balancing and revenue intelligence." },
    { title: "IoT-Based Smart Charging", desc: "OCPP 2.0.1 hardware integration, auto-cut relays and V2G energy return." },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Rocket className="w-3.5 h-3.5 text-emerald-600" />
            Engineering Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Current vs. Future Scope
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From an academic C++ prototype to a production-grade smart energy enterprise network.
          </p>
        </div>

        {/* 2 Comparison Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Current Scope Panel */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-soft flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Current Milestone
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">
                    Phase 1: Academic & Web MVP
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  Fully Operational
                </span>
              </div>

              <div className="space-y-4">
                {currentScope.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Implemented in current live prototype with C++ OOP foundation.
            </div>
          </div>

          {/* Future Scope Panel */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white border border-slate-800 shadow-elevated flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Future Roadmap
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    Phase 2: Enterprise Cloud & IoT
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                  Next Evolution
                </span>
              </div>

              <div className="space-y-4">
                {futureScope.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30">
                      <Rocket className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <span>Ready for commercial smart-grid deployment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
