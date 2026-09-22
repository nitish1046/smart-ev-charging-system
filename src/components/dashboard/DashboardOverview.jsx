import React from 'react';
import { useEV } from '../../context/EVContext';
import {
  Car,
  Zap,
  CalendarCheck,
  Receipt,
  ArrowUpRight,
  Sparkles,
  Clock,
  BatteryCharging,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  Play,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardOverview() {
  const {
    currentUser,
    registeredEVs,
    slots,
    bookings,
    bills,
    setCurrentAppTab,
    setSelectedBillForModal,
    activeChargingSession,
    startLiveCharging,
    advanceChargingSession,
    completeChargingAndBill,
  } = useEV();

  const availableSlotsCount = slots.filter((s) => s.status === 'Available').length;
  const activeBookings = bookings.filter((b) => b.status === 'Active');
  const activeBooking = activeBookings[0] || null;

  const totalBillsAmount = bills.reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 text-white shadow-elevated relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Silent Coders Smart Energy Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back 👋 {currentUser ? currentUser.name : 'EV Driver'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            All 5 charging bays are monitored in real-time. Manage your vehicles, reserve high-speed slots, and generate verified tax invoices instantly.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
          <button
            onClick={() => setCurrentAppTab('book')}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-md shadow-emerald-500/20"
          >
            <Zap className="w-4 h-4 fill-current" />
            Reserve Bay Now
          </button>
        </div>
      </div>

      {/* 4 Summary Cards (Exact Prompt Requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Registered EVs */}
        <div
          onClick={() => setCurrentAppTab('my-evs')}
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-110 transition">
              <Car className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono">
            {registeredEVs.length}
          </p>
          <h4 className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">
            Registered EVs
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">Vehicles in your garage</p>
        </div>

        {/* Card 2: Available Slots */}
        <div
          onClick={() => setCurrentAppTab('slots')}
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold group-hover:scale-110 transition">
              <Zap className="w-6 h-6" />
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">
              5 Total Bays
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono">
            {availableSlotsCount}{' '}
            <span className="text-base text-slate-400 font-normal">/ 5</span>
          </p>
          <h4 className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">
            Available Slots
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">Ready for immediate docking</p>
        </div>

        {/* Card 3: Active Booking */}
        <div
          onClick={() => setCurrentAppTab('bookings')}
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 transition">
              <CalendarCheck className="w-6 h-6" />
            </div>
            {activeBookings.length > 0 ? (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            ) : (
              <span className="text-[10px] text-slate-400">None Active</span>
            )}
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono">
            {activeBookings.length}
          </p>
          <h4 className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">
            Active Booking
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeBooking ? `${activeBooking.slotNumber} reserved` : 'No reservations pending'}
          </p>
        </div>

        {/* Card 4: Total Bills */}
        <div
          onClick={() => setCurrentAppTab('billing')}
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold group-hover:scale-110 transition">
              <Receipt className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono">
            {bills.length}
          </p>
          <h4 className="text-xs font-bold text-slate-700 mt-1 uppercase tracking-wider">
            Total Bills
          </h4>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            ₹{totalBillsAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} invoiced
          </p>
        </div>
      </div>

      {/* Live Charging Simulation Widget (If session or booking exists) */}
      {activeChargingSession ? (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-elevated border border-emerald-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40 animate-pulse">
                <BatteryCharging className="w-4 h-4" />
                <span>Live High-Power Session Active • {activeChargingSession.slotNumber}</span>
              </div>
              <h3 className="text-xl font-black">
                {activeChargingSession.vehicleNumber} ({activeChargingSession.vehicleType})
              </h3>
              <p className="text-xs text-slate-300">
                Connected to {activeChargingSession.chargingSpeedKw} kW Fast Charger. Energy Delivered: {activeChargingSession.energyDelivered} kWh.
              </p>

              {/* SoC Progress bar */}
              <div className="w-full max-w-md pt-2">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>Battery State of Charge</span>
                  <span className="text-emerald-400 font-bold">{activeChargingSession.currentSoc}%</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${activeChargingSession.currentSoc}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={advanceChargingSession}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
              >
                + Step Charge (+15%)
              </button>
              <button
                onClick={completeChargingAndBill}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition shadow-lg shadow-emerald-500/20"
              >
                Complete & Generate Bill
              </button>
            </div>
          </div>
        </div>
      ) : activeBooking ? (
        <div className="p-6 rounded-3xl bg-sky-50 border border-sky-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
              Confirmed Reservation: {activeBooking.bookingId}
            </span>
            <h3 className="text-lg font-black text-slate-900">
              {activeBooking.slotNumber} Reserved for {activeBooking.vehicleNumber}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Scheduled duration: {activeBooking.durationMinutes} minutes • Est. Energy: {activeBooking.estimatedKwh} kWh
            </p>
          </div>
          <button
            onClick={() => startLiveCharging(activeBooking)}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-md shadow-sky-600/20"
          >
            <Play className="w-4 h-4 fill-current" />
            Plug In & Start Charging
          </button>
        </div>
      ) : null}

      {/* 5-Slot Mini Visual Status Grid */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Live Station Slot Status (5 Bays)
            </h3>
            <p className="text-xs text-slate-500">
              Current real-time status across our smart charging bays
            </p>
          </div>
          <button
            onClick={() => setCurrentAppTab('slots')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Open Visual Station →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5">
          {slots.map((slot) => {
            const isAvailable = slot.status === 'Available';
            const isBooked = slot.status === 'Booked';

            return (
              <div
                key={slot.id}
                onClick={() => setCurrentAppTab('slots')}
                className={`p-4 rounded-2xl border transition text-left cursor-pointer ${
                  isAvailable
                    ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-400'
                    : isBooked
                    ? 'bg-sky-50/50 border-sky-200 hover:border-sky-400'
                    : 'bg-slate-100/70 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-sm text-slate-900">{slot.slotNumber}</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isAvailable ? 'bg-emerald-500' : isBooked ? 'bg-sky-500' : 'bg-slate-400'
                    }`}
                  ></span>
                </div>
                <div className="text-[11px] font-bold mb-1">
                  <span
                    className={
                      isAvailable
                        ? 'text-emerald-700'
                        : isBooked
                        ? 'text-sky-700'
                        : 'text-slate-500'
                    }
                  >
                    {slot.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">
                  {slot.powerKw} kW • {slot.connector}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Invoices & Quick History Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recent Digital Invoices
            </h3>
            <p className="text-xs text-slate-500">
              Verified charging bills generated by the Silent Coders Billing Module
            </p>
          </div>
          <button
            onClick={() => setCurrentAppTab('billing')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
          >
            View All Bills →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Bill ID</th>
                <th className="py-3 px-4">Vehicle Number</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Energy Consumed</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bills.slice(0, 3).map((bill) => (
                <tr key={bill.billId} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{bill.billId}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">{bill.vehicleNumber}</td>
                  <td className="py-3 px-4 text-slate-500">{bill.chargingDate}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                    {bill.energyConsumed.toFixed(1)} kWh
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    ₹{bill.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {bill.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedBillForModal(bill)}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition"
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
