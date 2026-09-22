import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BRAND_INFO,
  INITIAL_SLOTS,
  INITIAL_EVS,
  INITIAL_BOOKINGS,
  INITIAL_BILLS,
} from '../data/initialData';

const EVContext = createContext(null);

export function EVProvider({ children }) {
  // 1. User & Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_ev_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 2. Vehicles State
  const [registeredEVs, setRegisteredEVs] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_ev_vehicles');
      return saved ? JSON.parse(saved) : INITIAL_EVS;
    } catch {
      return INITIAL_EVS;
    }
  });

  // 3. Charging Slots State (5 Visual Slots)
  const [slots, setSlots] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_ev_slots');
      return saved ? JSON.parse(saved) : INITIAL_SLOTS;
    } catch {
      return INITIAL_SLOTS;
    }
  });

  // 4. Bookings State
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_ev_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // 5. Invoices / Bills State
  const [bills, setBills] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_ev_bills');
      return saved ? JSON.parse(saved) : INITIAL_BILLS;
    } catch {
      return INITIAL_BILLS;
    }
  });

  // 6. Active Live Charging Simulation State
  const [activeChargingSession, setActiveChargingSession] = useState(null);

  // 7. Active View Mode ('landing' | 'app')
  const [viewMode, setViewMode] = useState('landing');
  // Sub-view inside 'app': 'dashboard' | 'my-evs' | 'slots' | 'book' | 'billing' | 'admin' | 'profile'
  const [currentAppTab, setCurrentAppTab] = useState('dashboard');

  // 8. Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedBillForModal, setSelectedBillForModal] = useState(null);
  const [preselectedSlotForBooking, setPreselectedSlotForBooking] = useState(null);

  // 9. Toast Notification System
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('smart_ev_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('smart_ev_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('smart_ev_vehicles', JSON.stringify(registeredEVs));
  }, [registeredEVs]);

  useEffect(() => {
    localStorage.setItem('smart_ev_slots', JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    localStorage.setItem('smart_ev_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('smart_ev_bills', JSON.stringify(bills));
  }, [bills]);

  // Auth Handlers
  const login = (username, password) => {
    // Basic verification for demo
    if (username.toLowerCase().includes('admin')) {
      const adminUser = {
        username,
        name: "Station Admin",
        role: "admin",
        email: "admin@silentcoders.tech",
        avatar: "⚡"
      };
      setCurrentUser(adminUser);
      setAuthModalOpen(false);
      setViewMode('app');
      setCurrentAppTab('admin');
      addToast("Admin Access Granted", "Welcome to the Silent Coders Station Admin Console", "info");
      return true;
    }

    const driverUser = {
      username,
      name: username === "rahul" ? "Rahul Sharma" : username,
      role: "driver",
      email: `${username.toLowerCase()}@evmail.com`,
      avatar: "🚗"
    };
    setCurrentUser(driverUser);
    setAuthModalOpen(false);
    setViewMode('app');
    setCurrentAppTab('dashboard');
    addToast("Login Successful", `Welcome back, ${driverUser.name}!`, "success");
    return true;
  };

  const demoLogin = (role = 'driver') => {
    if (role === 'admin') {
      const admin = {
        username: "admin",
        name: "Silent Coders Admin",
        role: "admin",
        email: "admin@silentcoders.tech",
        avatar: "🛡️"
      };
      setCurrentUser(admin);
      setAuthModalOpen(false);
      setViewMode('app');
      setCurrentAppTab('admin');
      addToast("Demo Admin Session", "Logged in as Station Administrator", "info");
    } else {
      const driver = {
        username: "rahul_sharma",
        name: "Rahul Sharma",
        role: "driver",
        email: "rahul.sharma@silentcoders.io",
        avatar: "⚡"
      };
      setCurrentUser(driver);
      setAuthModalOpen(false);
      setViewMode('app');
      setCurrentAppTab('dashboard');
      addToast("Demo Driver Session", "Welcome back, Rahul Sharma!", "success");
    }
  };

  const signup = (username, password, name = "New EV Driver") => {
    const newUser = {
      username,
      name,
      role: "driver",
      email: `${username.toLowerCase()}@smart-ev.io`,
      avatar: "🔋"
    };
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    setViewMode('app');
    setCurrentAppTab('dashboard');
    addToast("Account Created", "Your EV Driver profile is active and ready", "success");
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setViewMode('landing');
    setCurrentAppTab('dashboard');
    addToast("Logged Out", "Your session has been securely ended", "info");
  };

  // EV Registration Handlers
  const registerEV = (evData) => {
    const newEV = {
      id: `ev-${Date.now().toString().slice(-4)}`,
      ownerName: evData.ownerName || (currentUser ? currentUser.name : "Rahul Sharma"),
      vehicleNumber: evData.vehicleNumber.toUpperCase().trim(),
      vehicleType: evData.vehicleType || "Sedan",
      batteryCapacity: Number(evData.batteryCapacity) || 50.0,
      currentBatteryPercent: Number(evData.currentBatteryPercent) || 50,
      connectorType: evData.connectorType || "CCS2",
      status: "Ready",
      registeredAt: new Date().toISOString().split('T')[0],
    };

    setRegisteredEVs((prev) => [newEV, ...prev]);
    addToast("EV Registered Successfully", `${newEV.vehicleNumber} added to your garage`, "success");
    return newEV;
  };

  const deleteEV = (id) => {
    setRegisteredEVs((prev) => prev.filter((ev) => ev.id !== id));
    addToast("EV Removed", "Vehicle record deleted from database", "info");
  };

  // Slot Management
  const updateSlotStatus = (slotId, newStatus, details = null) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, status: newStatus, currentBooking: details } : s))
    );
  };

  // Booking Flow
  const createBooking = ({ evId, slotId, durationMinutes = 45, targetBatteryPercent = 90 }) => {
    const targetEV = registeredEVs.find((e) => e.id === evId) || registeredEVs[0];
    const targetSlot = slots.find((s) => s.id === slotId) || slots[0];

    if (!targetEV || !targetSlot) {
      addToast("Booking Error", "Please select a valid EV and charging slot", "error");
      return null;
    }

    if (targetSlot.status !== 'Available') {
      addToast("Slot Unavailable", `${targetSlot.slotNumber} is currently ${targetSlot.status.toLowerCase()}`, "warning");
      return null;
    }

    const bookingId = `SC-EV-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const startTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Estimate energy based on battery capacity and target SoC
    const neededPercent = Math.max(10, targetBatteryPercent - targetEV.currentBatteryPercent);
    const estimatedKwh = Number(((neededPercent / 100) * targetEV.batteryCapacity).toFixed(1));
    const ratePerKwh = targetSlot.pricePerKwh;
    const estimatedCost = Number((estimatedKwh * ratePerKwh * 1.05).toFixed(2)); // With 5% tax

    const newBooking = {
      bookingId,
      slotId: targetSlot.id,
      slotNumber: targetSlot.slotNumber,
      evId: targetEV.id,
      ownerName: targetEV.ownerName,
      vehicleNumber: targetEV.vehicleNumber,
      vehicleType: targetEV.vehicleType,
      batteryCapacity: targetEV.batteryCapacity,
      bookingDate: now.toISOString().split('T')[0],
      startTime: startTimeStr,
      durationMinutes: Number(durationMinutes),
      targetBatteryPercent,
      estimatedKwh,
      ratePerKwh,
      estimatedCost,
      status: "Active",
    };

    // Update slots
    updateSlotStatus(targetSlot.id, "Booked", {
      bookingId,
      ownerName: targetEV.ownerName,
      vehicleNumber: targetEV.vehicleNumber,
      vehicleType: targetEV.vehicleType,
      startTime: startTimeStr,
      durationMinutes,
      estimatedKwh,
      status: "Confirmed",
    });

    // Add to bookings
    setBookings((prev) => [newBooking, ...prev]);

    addToast(
      "Slot Booked Successfully!",
      `Assigned ${targetSlot.slotNumber} (Booking ID: ${bookingId})`,
      "success"
    );

    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    const booking = bookings.find((b) => b.bookingId === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, status: "Cancelled" } : b))
    );

    updateSlotStatus(booking.slotId, "Available", null);
    addToast("Booking Cancelled", `Slot ${booking.slotNumber} has been released`, "info");
  };

  // Live Charging Simulation
  const startLiveCharging = (booking) => {
    updateSlotStatus(booking.slotId, "Occupied", {
      ...booking,
      status: "In Progress"
    });

    const session = {
      bookingId: booking.bookingId,
      slotId: booking.slotId,
      slotNumber: booking.slotNumber,
      vehicleNumber: booking.vehicleNumber,
      ownerName: booking.ownerName,
      vehicleType: booking.vehicleType,
      batteryCapacity: booking.batteryCapacity,
      startSoc: 40,
      currentSoc: 40,
      targetSoc: booking.targetBatteryPercent || 90,
      energyDelivered: 0.0,
      targetEnergy: booking.estimatedKwh || 30.0,
      chargingSpeedKw: slots.find((s) => s.id === booking.slotId)?.powerKw || 50,
      ratePerKwh: booking.ratePerKwh || 18.0,
      startTime: Date.now(),
      status: "charging" // "charging" | "completed"
    };

    setActiveChargingSession(session);
    addToast("Plugged In & Charging", `Active on ${booking.slotNumber} at ${session.chargingSpeedKw} kW`, "success");
  };

  // Step charging session forward
  const advanceChargingSession = () => {
    if (!activeChargingSession || activeChargingSession.status === "completed") return;

    setActiveChargingSession((prev) => {
      const nextSoc = Math.min(prev.targetSoc, prev.currentSoc + 15);
      const nextEnergy = Number((prev.energyDelivered + 6.5).toFixed(1));
      const isDone = nextSoc >= prev.targetSoc;

      return {
        ...prev,
        currentSoc: nextSoc,
        energyDelivered: nextEnergy,
        status: isDone ? "completed" : "charging"
      };
    });
  };

  // Complete charging and generate bill
  const completeChargingAndBill = () => {
    if (!activeChargingSession) return;

    const session = activeChargingSession;
    const energyConsumed = Math.max(5.0, session.energyDelivered || session.targetEnergy);
    const subtotal = Number((energyConsumed * session.ratePerKwh).toFixed(2));
    const gstPercent = 5.0;
    const taxAmount = Number(((subtotal * gstPercent) / 100).toFixed(2));
    const totalAmount = Number((subtotal + taxAmount).toFixed(2));

    const billId = `INV-SC-2026-${String(bills.length + 1).padStart(3, '0')}`;
    const newBill = {
      billId,
      bookingId: session.bookingId,
      ownerName: session.ownerName,
      vehicleNumber: session.vehicleNumber,
      vehicleType: session.vehicleType,
      batteryCapacity: session.batteryCapacity,
      slotNumber: session.slotNumber,
      chargingDate: new Date().toISOString().split('T')[0],
      durationMinutes: 45,
      energyConsumed,
      ratePerKwh: session.ratePerKwh,
      subtotal,
      gstPercent,
      taxAmount,
      totalAmount,
      paymentStatus: "Paid",
      paymentMethod: "Silent Coders Instant Pay",
      transactionRef: `TXN-${Math.floor(1000000 + Math.random() * 9000000)}`,
    };

    // Update bills
    setBills((prev) => [newBill, ...prev]);

    // Update booking to completed
    setBookings((prev) =>
      prev.map((b) => (b.bookingId === session.bookingId ? { ...b, status: "Completed" } : b))
    );

    // Free the slot
    updateSlotStatus(session.slotId, "Available", null);

    // Update EV battery % in garage
    setRegisteredEVs((prev) =>
      prev.map((ev) =>
        ev.vehicleNumber === session.vehicleNumber
          ? { ...ev, currentBatteryPercent: session.currentSoc, status: "Charged" }
          : ev
      )
    );

    setActiveChargingSession(null);
    setSelectedBillForModal(newBill);
    addToast("Charging Completed", `Bill ${billId} generated. Total: ₹${totalAmount}`, "success");
  };

  // Reset to original demo state
  const resetToDefaultData = () => {
    localStorage.clear();
    setSlots(INITIAL_SLOTS);
    setRegisteredEVs(INITIAL_EVS);
    setBookings(INITIAL_BOOKINGS);
    setBills(INITIAL_BILLS);
    setActiveChargingSession(null);
    addToast("Database Reset", "Default demo data restored successfully", "info");
  };

  // Aggregated Admin Analytics
  const adminMetrics = {
    totalUsers: 142,
    totalEVs: registeredEVs.length + 48,
    totalSlots: slots.length,
    availableSlots: slots.filter((s) => s.status === "Available").length,
    bookedSlots: slots.filter((s) => s.status === "Booked").length,
    occupiedSlots: slots.filter((s) => s.status === "Occupied").length,
    activeBookingsCount: bookings.filter((b) => b.status === "Active").length,
    totalRevenue: bills.reduce((acc, curr) => acc + curr.totalAmount, 0) + 18450.0,
    totalEnergyDeliveredKwh: bills.reduce((acc, curr) => acc + curr.energyConsumed, 0) + 1250.0,
    co2SavedKg: Number(((bills.reduce((acc, curr) => acc + curr.energyConsumed, 0) + 1250.0) * 0.82).toFixed(1)),
    slotUtilizationRate: Math.round(((slots.filter((s) => s.status !== "Available").length) / slots.length) * 100),
  };

  return (
    <EVContext.Provider
      value={{
        BRAND_INFO,
        currentUser,
        login,
        demoLogin,
        signup,
        logout,
        registeredEVs,
        registerEV,
        deleteEV,
        slots,
        updateSlotStatus,
        bookings,
        createBooking,
        cancelBooking,
        bills,
        activeChargingSession,
        startLiveCharging,
        advanceChargingSession,
        completeChargingAndBill,
        viewMode,
        setViewMode,
        currentAppTab,
        setCurrentAppTab,
        authModalOpen,
        setAuthModalOpen,
        selectedBillForModal,
        setSelectedBillForModal,
        preselectedSlotForBooking,
        setPreselectedSlotForBooking,
        adminMetrics,
        resetToDefaultData,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </EVContext.Provider>
  );
}

export function useEV() {
  const context = useContext(EVContext);
  if (!context) {
    throw new Error('useEV must be used within an EVProvider');
  }
  return context;
}
