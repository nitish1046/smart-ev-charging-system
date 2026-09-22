import React, { useState } from 'react';
import { useEV } from '../../context/EVContext';
import {
  Car,
  Zap,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Play,
  RotateCcw,
} from 'lucide-react';

export default function BookingFlowView() {
  const {
    registeredEVs,
    slots,
    createBooking,
    preselectedSlotForBooking,
    startLiveCharging,
    setCurrentAppTab,
  } = useEV();

  // 4-Step Flow State: 1: Select EV, 2: Select Slot, 3: Select Duration, 4: Confirm
  const [currentStep, setCurrentStep] = useState(1);

  // Selections
  const [selectedEvId, setSelectedEvId] = useState(registeredEVs[0]?.id || '');
  const [selectedSlotId, setSelectedSlotId] = useState(() => {
    if (preselectedSlotForBooking) return preselectedSlotForBooking;
    const firstAvail = slots.find((s) => s.status === 'Available');
    return firstAvail ? firstAvail.id : slots[0]?.id || '';
  });
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [targetBatteryPercent, setTargetBatteryPercent] = useState(90);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const selectedEV = registeredEVs.find((e) => e.id === selectedEvId) || registeredEVs[0];
  const selectedSlot = slots.find((s) => s.id === selectedSlotId) || slots[0];

  // Energy & Price estimation
  const neededSoC = Math.max(10, targetBatteryPercent - (selectedEV?.currentBatteryPercent || 40));
  const estimatedKwh = Number((((neededSoC / 100) * (selectedEV?.batteryCapacity || 50))).toFixed(1));
  const ratePerKwh = selectedSlot?.pricePerKwh || 18.0;
  const estimatedSubtotal = Number((estimatedKwh * ratePerKwh).toFixed(2));
  const estimatedTax = Number((estimatedSubtotal * 0.05).toFixed(2));
  const estimatedTotal = Number((estimatedSubtotal + estimatedTax).toFixed(2));

  const handleConfirmBooking = () => {
    const booking = createBooking({
      evId: selectedEvId,
      slotId: selectedSlotId,
      durationMinutes,
      targetBatteryPercent,
    });

    if (booking) {
      setConfirmedBooking(booking);
    }
  };

  const handleResetWizard = () => {
    setConfirmedBooking(null);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-left">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          Reserve a Charging Slot
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Complete the 4-step booking process to secure your high-speed charging bay.
        </p>
      </div>

      {/* Booking Confirmation Success Screen (Prompt requirement: "Charging Slot Successfully Booked" + Booking ID) */}
      {confirmedBooking ? (
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200 shadow-elevated text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 font-bold shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
            Confirmation Verified
          </span>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mt-3 mb-1">
            Charging Slot Successfully Booked
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
            Your reservation is locked in our station management registry.
          </p>

          {/* Booking Pass Card */}
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-left space-y-3 font-mono text-xs mb-8">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-slate-500">Booking ID:</span>
              <span className="text-sm font-black text-emerald-700">{confirmedBooking.bookingId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Assigned Bay:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.slotNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Vehicle:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.vehicleNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Duration / Target:</span>
              <span className="text-slate-700">{confirmedBooking.durationMinutes} mins • {confirmedBooking.targetBatteryPercent}% SoC</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Est. Energy Consumed:</span>
              <span className="font-bold text-emerald-700">{confirmedBooking.estimatedKwh} kWh</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm">
              <span className="text-slate-800 font-bold">Estimated Cost:</span>
              <span className="font-black text-slate-950">₹{confirmedBooking.estimatedCost.toFixed(2)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                startLiveCharging(confirmedBooking);
                setCurrentAppTab('dashboard');
              }}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <Play className="w-4 h-4 fill-current" />
              Simulate Plug-In & Start Charging
            </button>
            <button
              onClick={handleResetWizard}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Book Another Slot
            </button>
            <button
              onClick={() => setCurrentAppTab('slots')}
              className="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
            >
              View Station Bays
            </button>
          </div>
        </div>
      ) : (
        /* 4-Step Booking Wizard */
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-soft">
          {/* Progress Indicator */}
          <div className="grid grid-cols-4 gap-2 mb-8 pb-6 border-b border-slate-100 text-center text-xs font-bold">
            {[
              { num: 1, label: "Select EV" },
              { num: 2, label: "Select Slot" },
              { num: 3, label: "Duration" },
              { num: 4, label: "Confirm" },
            ].map((step) => {
              const isCurrent = currentStep === step.num;
              const isDone = currentStep > step.num;
              return (
                <div
                  key={step.num}
                  className={`p-2.5 rounded-xl border transition ${
                    isCurrent
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-500 shadow-sm'
                      : isDone
                      ? 'bg-slate-50 text-emerald-700 border-slate-200'
                      : 'bg-white text-slate-400 border-slate-100'
                  }`}
                >
                  <span className="font-mono text-[11px] block">Step {step.num}</span>
                  <span className="text-xs">{step.label}</span>
                </div>
              );
            })}
          </div>

          {/* STEP 1: Select EV */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Step 1: Select Your Electric Vehicle
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Choose the vehicle you want to charge from your registered garage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {registeredEVs.map((ev) => {
                  const isSelected = selectedEvId === ev.id;
                  return (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEvId(ev.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 shadow-glow-green'
                          : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {ev.vehicleNumber}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                          {ev.batteryCapacity} kWh
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mb-1">{ev.vehicleType}</p>
                      <p className="text-[11px] text-slate-500">
                        Current Battery: <span className="font-bold text-emerald-700">{ev.currentBatteryPercent}%</span>
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2"
                >
                  Next: Select Charging Slot
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Charging Slot */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Step 2: Select Charging Bay
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Choose an available slot with the connector and power rating that matches your vehicle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {slots.map((slot) => {
                  const isAvailable = slot.status === 'Available';
                  const isSelected = selectedSlotId === slot.id;

                  return (
                    <div
                      key={slot.id}
                      onClick={() => {
                        if (isAvailable) setSelectedSlotId(slot.id);
                      }}
                      className={`p-4 rounded-2xl border transition ${
                        !isAvailable
                          ? 'bg-slate-100/60 border-slate-200 opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'bg-emerald-50 border-emerald-500 shadow-glow-green cursor-pointer'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-sm text-slate-900">{slot.slotNumber}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isAvailable
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {slot.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">{slot.connector} ({slot.powerKw} kW)</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">{slot.voltage} • {slot.bay}</p>
                      <p className="text-xs font-bold text-emerald-700 font-mono mt-2">
                        ₹{slot.pricePerKwh.toFixed(2)} / kWh
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2"
                >
                  Next: Duration & Target
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Select Duration & Target % */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                Step 3: Select Charging Duration
              </h3>
              <p className="text-xs text-slate-500">
                Specify duration and desired target battery percentage for accurate tariff computation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Charging Duration
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { mins: 30, label: "30 Mins (Quick)" },
                      { mins: 45, label: "45 Mins (Standard)" },
                      { mins: 60, label: "60 Mins (Deep)" },
                      { mins: 90, label: "90 Mins (Full)" },
                    ].map((opt) => (
                      <button
                        key={opt.mins}
                        type="button"
                        onClick={() => setDurationMinutes(opt.mins)}
                        className={`p-3 rounded-xl border text-left transition ${
                          durationMinutes === opt.mins
                            ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="block text-xs font-bold">{opt.mins} Minutes</span>
                        <span className="block text-[10px] text-slate-500">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Target Battery Level (SoC)
                  </label>
                  <div className="space-y-2">
                    {[
                      { pct: 80, desc: "80% Recommended for battery health" },
                      { pct: 90, desc: "90% Fast highway travel" },
                      { pct: 100, desc: "100% Maximum range top-off" },
                    ].map((item) => (
                      <button
                        key={item.pct}
                        type="button"
                        onClick={() => setTargetBatteryPercent(item.pct)}
                        className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                          targetBatteryPercent === item.pct
                            ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold">{item.pct}% Battery</span>
                          <span className="text-[10px] text-slate-500 block">{item.desc}</span>
                        </div>
                        <span className="font-mono text-xs text-emerald-600 font-bold">{item.pct}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2"
                >
                  Next: Review & Confirm
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirm Booking */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                Step 4: Confirm Booking Summary
              </h3>
              <p className="text-xs text-slate-500">
                Please review reservation parameters prior to generating your confirmed Booking ID.
              </p>

              {/* Review Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-sans font-semibold">Vehicle:</span>
                  <span className="font-bold text-slate-900">
                    {selectedEV.vehicleNumber} ({selectedEV.vehicleType})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans font-semibold">Bay & Charger:</span>
                  <span className="font-bold text-emerald-700">
                    {selectedSlot.slotNumber} • {selectedSlot.powerKw} kW ({selectedSlot.connector})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans font-semibold">Duration:</span>
                  <span className="text-slate-800">{durationMinutes} Minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans font-semibold">Estimated Energy:</span>
                  <span className="font-bold text-slate-900">{estimatedKwh} kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans font-semibold">Rate:</span>
                  <span className="text-slate-800">₹{ratePerKwh.toFixed(2)} / kWh</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm">
                  <span className="font-bold font-sans text-slate-900">Total Estimated Cost:</span>
                  <span className="font-black text-emerald-700">₹{estimatedTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition shadow-elevated shadow-emerald-600/25 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Booking Now
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
