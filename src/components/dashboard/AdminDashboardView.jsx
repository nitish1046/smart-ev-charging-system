import React, { useState } from 'react';
import { useEV } from '../../context/EVContext';
import {
  Users,
  Car,
  Zap,
  CalendarCheck,
  DollarSign,
  Activity,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';

export default function AdminDashboardView() {
  const { adminMetrics, slots, updateSlotStatus, resetToDefaultData } = useEV();

  // Slot Override Controls State
  const [overrideSlotId, setOverrideSlotId] = useState(slots[0]?.id || 'slot-01');
  const [overrideStatus, setOverrideStatus] = useState('Available');

  const handleApplyOverride = () => {
    updateSlotStatus(overrideSlotId, overrideStatus, null);
  };

  // Mock chart data for BTech Demonstration
  const dailyBookingsData = [
    { day: 'Mon', bookings: 12, usageKwh: 340, revenue: 6120 },
    { day: 'Tue', bookings: 18, usageKwh: 480, revenue: 8640 },
    { day: 'Wed', bookings: 15, usageKwh: 410, revenue: 7380 },
    { day: 'Thu', bookings: 22, usageKwh: 590, revenue: 10620 },
    { day: 'Fri', bookings: 28, usageKwh: 760, revenue: 13680 },
    { day: 'Sat', bookings: 34, usageKwh: 920, revenue: 16560 },
    { day: 'Sun', bookings: 30, usageKwh: 840, revenue: 15120 },
  ];

  const maxBookings = Math.max(...dailyBookingsData.map((d) => d.bookings));
  const maxUsage = Math.max(...dailyBookingsData.map((d) => d.usageKwh));
  const maxRevenue = Math.max(...dailyBookingsData.map((d) => d.revenue));

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            Station Administrator Telemetry
          </div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Station Administration & Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time grid utilization, revenue performance, and bay state override controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaultData}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reset Initial Demo State
          </button>
        </div>
      </div>

      {/* 6 Required Admin KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* 1. Total Users */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            {adminMetrics.totalUsers}
          </p>
          <h4 className="text-[11px] font-bold text-slate-600 mt-1 uppercase tracking-wider">
            Total Users
          </h4>
        </div>

        {/* 2. Total EVs */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <Car className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            {adminMetrics.totalEVs}
          </p>
          <h4 className="text-[11px] font-bold text-slate-600 mt-1 uppercase tracking-wider">
            Total EVs
          </h4>
        </div>

        {/* 3. Total Charging Slots */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            {adminMetrics.totalSlots}
          </p>
          <h4 className="text-[11px] font-bold text-slate-600 mt-1 uppercase tracking-wider">
            Total Slots
          </h4>
        </div>

        {/* 4. Active Bookings */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            {adminMetrics.activeBookingsCount}
          </p>
          <h4 className="text-[11px] font-bold text-slate-600 mt-1 uppercase tracking-wider">
            Active Bookings
          </h4>
        </div>

        {/* 5. Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            ₹{(adminMetrics.totalRevenue / 1000).toFixed(1)}k
          </p>
          <h4 className="text-[11px] font-bold text-slate-600 mt-1 uppercase tracking-wider">
            Revenue
          </h4>
        </div>

        {/* 6. Slot Utilization */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <Activity className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-emerald-700 font-mono">
            {adminMetrics.slotUtilizationRate}%
          </p>
          <h4 className="text-[11px] font-bold text-slate-600 mt-1 uppercase tracking-wider">
            Slot Utilization
          </h4>
        </div>
      </div>

      {/* 4 Simple Analytics Charts (Daily Bookings, Charging Usage, Revenue, Slot Occupancy) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Daily Bookings */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Daily Bookings</h3>
              <p className="text-xs text-slate-500">Reservations per day (Weekly view)</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">159 Total</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
            {dailyBookingsData.map((d, i) => {
              const heightPct = Math.round((d.bookings / maxBookings) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-900 font-bold">
                    {d.bookings}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg h-32 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-emerald-500 group-hover:bg-emerald-600 rounded-t-lg transition-all duration-500"
                      style={{ height: `${heightPct}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Charging Usage (kWh) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Charging Usage (kWh)</h3>
              <p className="text-xs text-slate-500">Grid energy supplied across all 5 bays</p>
            </div>
            <span className="text-xs font-mono font-bold text-sky-700">4,340 kWh</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
            {dailyBookingsData.map((d, i) => {
              const heightPct = Math.round((d.usageKwh / maxUsage) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-900 font-bold">
                    {d.usageKwh}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg h-32 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-sky-500 group-hover:bg-sky-600 rounded-t-lg transition-all duration-500"
                      style={{ height: `${heightPct}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3: Revenue Trend */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Revenue Trend (₹)</h3>
              <p className="text-xs text-slate-500">Tariff income generated per day</p>
            </div>
            <span className="text-xs font-mono font-bold text-teal-700">₹78,120 Total</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
            {dailyBookingsData.map((d, i) => {
              const heightPct = Math.round((d.revenue / maxRevenue) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-900 font-bold">
                    ₹{(d.revenue / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg h-32 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-teal-500 group-hover:bg-teal-600 rounded-t-lg transition-all duration-500"
                      style={{ height: `${heightPct}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 4: Slot Occupancy Breakdown */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Slot Occupancy Breakdown</h3>
                <p className="text-xs text-slate-500">Real-time status ratio of the 5 bays</p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-700">5 Bays</span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="h-8 w-full bg-slate-100 rounded-2xl overflow-hidden flex my-6 p-1 border border-slate-200">
              <div
                className="h-full bg-emerald-500 rounded-l-xl transition-all"
                style={{ width: `${(adminMetrics.availableSlots / 5) * 100}%` }}
                title={`Available: ${adminMetrics.availableSlots}`}
              ></div>
              <div
                className="h-full bg-sky-500 transition-all"
                style={{ width: `${(adminMetrics.bookedSlots / 5) * 100}%` }}
                title={`Booked: ${adminMetrics.bookedSlots}`}
              ></div>
              <div
                className="h-full bg-slate-400 rounded-r-xl transition-all"
                style={{ width: `${(adminMetrics.occupiedSlots / 5) * 100}%` }}
                title={`Occupied: ${adminMetrics.occupiedSlots}`}
              ></div>
            </div>

            {/* Legend with exact bay counts */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Available</span>
                <span className="text-base font-black text-emerald-950 font-mono">
                  {adminMetrics.availableSlots} Bays
                </span>
              </div>
              <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
                <span className="text-[10px] font-bold text-sky-800 uppercase block">Booked</span>
                <span className="text-base font-black text-sky-950 font-mono">
                  {adminMetrics.bookedSlots} Bay
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-700 uppercase block">Occupied</span>
                <span className="text-base font-black text-slate-900 font-mono">
                  {adminMetrics.occupiedSlots} Bays
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4">
            *Updated dynamically as drivers reserve bays or complete charging.
          </p>
        </div>
      </div>

      {/* Admin Slot Override Controller */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-elevated border border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base font-black">Station Hardware Bay Controller</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Admin manual override to test slot states, simulate maintenance lockouts, or free occupied bays.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Target Bay</label>
            <select
              value={overrideSlotId}
              onChange={(e) => setOverrideSlotId(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
            >
              {slots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.slotNumber} (Currently {s.status})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Set State</label>
            <select
              value={overrideStatus}
              onChange={(e) => setOverrideStatus(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Available">Available (Green)</option>
              <option value="Booked">Booked (Blue)</option>
              <option value="Occupied">Occupied (Gray)</option>
            </select>
          </div>

          <div className="pt-5">
            <button
              onClick={handleApplyOverride}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
            >
              Apply State Override
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
