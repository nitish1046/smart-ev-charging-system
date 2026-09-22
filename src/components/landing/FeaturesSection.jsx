import React from 'react';
import { useEV } from '../../context/EVContext';
import {
  Car,
  ListFilter,
  Zap,
  CalendarCheck,
  Receipt,
  LogOut,
  ArrowRight,
  ShieldCheck,
  BatteryCharging,
  Layers,
} from 'lucide-react';

export default function FeaturesSection() {
  const { setViewMode, setCurrentAppTab, demoLogin, slots, registeredEVs } = useEV();

  const availableSlotsCount = slots.filter((s) => s.status === 'Available').length;
  const bookedSlotsCount = slots.filter((s) => s.status === 'Booked').length;
  const occupiedSlotsCount = slots.filter((s) => s.status === 'Occupied').length;

  const features = [
    {
      id: "register-ev",
      badge: "Feature A",
      title: "Register EV",
      icon: <Car className="w-5 h-5 text-emerald-600" />,
      color: "emerald",
      description: "Seamlessly register and store your electric vehicle details in our persistent database.",
      fields: ["Owner Name", "Vehicle Number (Plate)", "Vehicle Type (Sedan/SUV)", "Battery Capacity (kWh)"],
      actionLabel: "Try EV Registration",
      targetTab: "my-evs",
    },
    {
      id: "view-evs",
      badge: "Feature B",
      title: "View Registered EVs",
      icon: <ListFilter className="w-5 h-5 text-sky-600" />,
      color: "sky",
      description: "Display all registered vehicles in high-clarity cards and responsive table format with live SoC meters.",
      fields: [`${registeredEVs.length} Vehicles in Garage`, "Real-Time Battery %", "Connector Standards (CCS2/Type2)", "Vehicle Status"],
      actionLabel: "Open My Garage",
      targetTab: "my-evs",
    },
    {
      id: "view-slots",
      badge: "Feature C",
      title: "View Charging Slots",
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      color: "amber",
      description: "Visual 5-slot dashboard with color indicators for real-time station availability.",
      customSlotVisual: true,
      fields: [
        `Total: ${slots.length} Slots`,
        `Available (${availableSlotsCount}): Green`,
        `Booked (${bookedSlotsCount}): Blue`,
        `Occupied (${occupiedSlotsCount}): Red/Gray`,
      ],
      actionLabel: "View 5-Slot Grid",
      targetTab: "slots",
    },
    {
      id: "book-slot",
      badge: "Feature D",
      title: "Book Charging Slot",
      icon: <CalendarCheck className="w-5 h-5 text-emerald-600" />,
      color: "emerald",
      description: "Select an available charging slot, choose charging duration, and obtain an instant verified booking confirmation.",
      fields: ["Select Vehicle", "Choose Available Bay", "Set Charging Duration", "Unique Booking ID"],
      actionLabel: "Book a Bay Now",
      targetTab: "book",
    },
    {
      id: "generate-bill",
      badge: "Feature E",
      title: "Generate Digital Bill",
      icon: <Receipt className="w-5 h-5 text-teal-600" />,
      color: "teal",
      description: "Automated digital tax invoice calculation with complete audit trail and printable format.",
      fields: ["Owner & Vehicle No", "Battery Capacity", "Energy Consumed (kWh)", "Rate & Total Amount"],
      actionLabel: "View Sample Invoice",
      targetTab: "billing",
    },
    {
      id: "auth-security",
      badge: "Feature F",
      title: "Secure Session & Logout",
      icon: <LogOut className="w-5 h-5 text-rose-600" />,
      color: "rose",
      description: "Secure user sessions with localStorage encryption, driver/admin role separation, and one-click logout.",
      fields: ["Encrypted Auth Tokens", "Role-Based Permissions", "Instant Session Termination", "Zero Leakage"],
      actionLabel: "Test Session Control",
      targetTab: "dashboard",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            Core System Modules
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Engineered For Frictionless Charging
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Explore the six essential modules that power the Smart EV Charging Station Management System.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="p-7 rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center font-bold group-hover:scale-110 transition">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-500">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  {feat.description}
                </p>

                {/* Specific Visual Slot Indicators for Feature C */}
                {feat.customSlotVisual ? (
                  <div className="mb-5 p-3 rounded-xl bg-white border border-slate-200">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Visual Indicators Standard
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
                      <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                        Available
                      </div>
                      <div className="p-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-300">
                        <span className="inline-block w-2 h-2 rounded-full bg-sky-500 mr-1"></span>
                        Booked
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-300">
                        <span className="inline-block w-2 h-2 rounded-full bg-slate-400 mr-1"></span>
                        Occupied
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Fields / Data Points */}
                <div className="space-y-1.5 mb-6">
                  {feat.fields.map((field, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-medium text-slate-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                      <span>{field}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setViewMode('app');
                  setCurrentAppTab(feat.targetTab);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-emerald-700 font-bold text-xs transition flex items-center justify-between group/btn shadow-sm"
              >
                <span>{feat.actionLabel}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:text-emerald-600 transition" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
