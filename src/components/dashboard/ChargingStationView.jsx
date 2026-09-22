import React, { useState } from 'react';
import { useEV } from '../../context/EVContext';
import {
  Zap,
  CheckCircle2,
  Clock,
  Car,
  ShieldCheck,
  AlertCircle,
  Play,
  ArrowRight,
  BatteryCharging,
  X,
} from 'lucide-react';

export default function ChargingStationView() {
  const {
    slots,
    registeredEVs,
    createBooking,
    setCurrentAppTab,
    startLiveCharging,
    setPreselectedSlotForBooking,
  } = useEV();

  const [selectedSlotForModal, setSelectedSlotForModal] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    registeredEVs[0]?.id || ''
  );
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [targetSoc, setTargetSoc] = useState(90);

  const totalSlots = slots.length;
  const availableSlots = slots.filter((s) => s.status === 'Available').length;
  const bookedSlots = slots.filter((s) => s.status === 'Booked').length;
  const occupiedSlots = slots.filter((s) => s.status === 'Occupied').length;

  const handleSlotClick = (slot) => {
    if (slot.status === 'Available') {
      setSelectedSlotForModal(slot);
      setPreselectedSlotForBooking(slot.id);
    } else {
      setSelectedSlotForModal(slot);
    }
  };

  const handleConfirmQuickBooking = () => {
    if (!selectedSlotForModal || !selectedVehicleId) return;

    createBooking({
      evId: selectedVehicleId,
      slotId: selectedSlotForModal.id,
      durationMinutes,
      targetBatteryPercent: targetSoc,
    });

    setSelectedSlotForModal(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Charging Station Bays
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Interactive visual 5-slot dashboard. Click any bay to inspect specs or confirm reservation.
          </p>
        </div>

        {/* Color Legend Standard */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Available
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            Booked
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            Occupied
          </span>
        </div>
      </div>

      {/* 3 Overview Stat Counters (Exact Prompt Requirement: Total: 5, Available, Booked) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Charging Slots
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              5
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono">{totalSlots}</p>
          <p className="text-xs text-slate-500 mt-1">High-capacity automated charging bays</p>
        </div>

        <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 shadow-soft text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Available Slots
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-950 font-mono">{availableSlots}</p>
          <p className="text-xs text-emerald-700 mt-1">Ready for instantaneous booking</p>
        </div>

        <div className="p-6 rounded-3xl bg-sky-50/70 border border-sky-200 shadow-soft text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Booked Slots
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-sky-950 font-mono">{bookedSlots}</p>
          <p className="text-xs text-sky-700 mt-1">Reserved bays with active confirmation</p>
        </div>
      </div>

      {/* Visual 5 Charging Slots Dashboard (Exact Prompt Requirement) */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-elevated border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono mb-2 border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>Silent Coders Smart Hub • Live Sensor Grid</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Physical Bay Overview (Slots 01 – 05)
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Click any bay to trigger booking modal or inspect session
          </p>
        </div>

        {/* 5 Slots Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {slots.map((slot) => {
            const isAvailable = slot.status === 'Available';
            const isBooked = slot.status === 'Booked';
            const isOccupied = slot.status === 'Occupied';

            return (
              <div
                key={slot.id}
                onClick={() => handleSlotClick(slot)}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col justify-between ${
                  isAvailable
                    ? 'bg-slate-800/90 border-emerald-500/50 hover:border-emerald-400 hover:shadow-glow-green'
                    : isBooked
                    ? 'bg-slate-800/90 border-sky-500/50 hover:border-sky-400 hover:shadow-glow-blue'
                    : 'bg-slate-800/60 border-slate-700 opacity-80'
                }`}
              >
                {/* Bay Top Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {slot.bay}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        isAvailable
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : isBooked
                          ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                          : 'bg-slate-700 text-slate-300 border-slate-600'
                      }`}
                    >
                      {slot.status}
                    </span>
                  </div>

                  {/* Visual Charger Dispenser Silhouette */}
                  <div className="my-3 flex items-center justify-center p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="relative flex flex-col items-center">
                      <div className="w-12 h-20 rounded-lg bg-slate-900 border border-slate-700 flex flex-col items-center justify-between p-1.5 shadow-inner">
                        <div
                          className={`w-8 h-6 rounded flex items-center justify-center text-[9px] font-mono font-bold ${
                            isAvailable
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                              : isBooked
                              ? 'bg-sky-950 text-sky-400 border border-sky-600'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {slot.powerKw}kW
                        </div>
                        <span
                          className={`w-3 h-3 rounded-full ${
                            isAvailable
                              ? 'bg-emerald-400 shadow-glow-green animate-pulse'
                              : isBooked
                              ? 'bg-sky-400 shadow-glow-blue'
                              : 'bg-slate-500'
                          }`}
                        ></span>
                      </div>
                      <div className="w-16 h-2 bg-slate-700 rounded-full mt-1"></div>
                    </div>
                  </div>

                  <h4 className="text-base font-black text-white tracking-tight">
                    {slot.slotNumber}
                  </h4>
                  <p className="text-xs text-slate-300 font-semibold mt-0.5">
                    {slot.connector}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {slot.type} • {slot.voltage}
                  </p>
                </div>

                {/* Bottom info / Click prompt */}
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-emerald-400 font-bold">
                    ₹{slot.pricePerKwh.toFixed(2)}/kWh
                  </span>
                  <span
                    className={`font-semibold ${
                      isAvailable
                        ? 'text-emerald-400 hover:underline'
                        : isBooked
                        ? 'text-sky-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {isAvailable ? 'Book Slot →' : isBooked ? 'Details' : 'Busy'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Confirmation / Slot Details Modal */}
      {selectedSlotForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                    selectedSlotForModal.status === 'Available'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-sky-50 text-sky-700'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {selectedSlotForModal.slotNumber} — {selectedSlotForModal.status}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedSlotForModal.bay} • {selectedSlotForModal.powerKw} kW {selectedSlotForModal.connector}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSlotForModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedSlotForModal.status === 'Available' ? (
              /* Booking Confirmation Flow for Available Slot */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Slot is Ready for Immediate Reservation
                  </div>
                  <p className="text-xs text-emerald-800">
                    Confirm your vehicle and charging duration to reserve this bay.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Your Vehicle
                  </label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    {registeredEVs.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.vehicleNumber} — {ev.vehicleType} ({ev.batteryCapacity} kWh)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Duration
                    </label>
                    <select
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes (Recommended)</option>
                      <option value={60}>60 Minutes (Full Charge)</option>
                      <option value={90}>90 Minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Battery %
                    </label>
                    <select
                      value={targetSoc}
                      onChange={(e) => setTargetSoc(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      <option value={80}>80% (Eco Fast)</option>
                      <option value={90}>90% (Standard)</option>
                      <option value={100}>100% (Maximum Range)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Power Tariff Rate:</span>
                    <span className="font-bold text-slate-900">
                      ₹{selectedSlotForModal.pricePerKwh.toFixed(2)}/kWh
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voltage & Phase:</span>
                    <span>{selectedSlotForModal.voltage}</span>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedSlotForModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmQuickBooking}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            ) : (
              /* Details for Booked / Occupied Slot */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                  <span className="text-xs font-bold text-sky-900 uppercase tracking-wider block mb-1">
                    Slot Currently Booked
                  </span>
                  <p className="text-xs text-sky-800 leading-relaxed">
                    This bay is reserved under booking reference{' '}
                    <span className="font-mono font-bold">
                      {selectedSlotForModal.currentBooking?.bookingId || 'SC-EV-84920'}
                    </span>
                    .
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reserved For:</span>
                    <span className="font-bold text-slate-900">
                      {selectedSlotForModal.currentBooking?.ownerName || 'Rahul Sharma'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vehicle Number:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {selectedSlotForModal.currentBooking?.vehicleNumber || 'MH-12-AB-1234'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vehicle Type:</span>
                    <span className="text-slate-700">
                      {selectedSlotForModal.currentBooking?.vehicleType || 'Tesla Model 3'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Start Time:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {selectedSlotForModal.currentBooking?.startTime || '14:15'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedSlotForModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
                  >
                    Close
                  </button>
                  {selectedSlotForModal.currentBooking && (
                    <button
                      onClick={() => {
                        startLiveCharging(selectedSlotForModal.currentBooking);
                        setSelectedSlotForModal(null);
                        setCurrentAppTab('dashboard');
                      }}
                      className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-md shadow-sky-600/20 transition flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Simulate Plug-In Charging
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
