// Initial mock data & configurations for Smart EV Charging Station
// Brand: Team Silent Coders | Tagline: "Code • Build • Create"
// Main Tagline: "Innovative Charging for a Greener Tomorrow"

export const BRAND_INFO = {
  name: "Smart EV Charging Station",
  team: "Silent Coders",
  tagline: "Code • Build • Create",
  mainTagline: "Innovative Charging for a Greener Tomorrow",
  heroHeadline: "Charge Smarter. Drive Greener.",
  heroSubheading: "Smart EV charging management made simple — register your EV, find available slots, book charging and manage your billing from one place.",
  ratePerKwhAC: 15.0, // INR or currency units
  ratePerKwhDC: 18.0,
  ratePerKwhSuper: 22.0,
  taxRatePercent: 5.0,
};

export const INITIAL_SLOTS = [
  {
    id: "slot-01",
    slotNumber: "Slot 01",
    status: "Available", // "Available" | "Booked" | "Occupied"
    type: "Fast DC",
    connector: "CCS2",
    powerKw: 50,
    voltage: "400V DC",
    bay: "Bay A1",
    pricePerKwh: 18.0,
    currentBooking: null,
  },
  {
    id: "slot-02",
    slotNumber: "Slot 02",
    status: "Available",
    type: "Smart AC",
    connector: "Type 2",
    powerKw: 22,
    voltage: "415V 3-Phase",
    bay: "Bay A2",
    pricePerKwh: 15.0,
    currentBooking: null,
  },
  {
    id: "slot-03",
    slotNumber: "Slot 03",
    status: "Booked",
    type: "Ultra-Fast DC",
    connector: "CCS2 Supercharger",
    powerKw: 120,
    voltage: "800V DC",
    bay: "Bay B1",
    pricePerKwh: 22.0,
    currentBooking: {
      bookingId: "SC-EV-84920",
      ownerName: "Rahul Sharma",
      vehicleNumber: "MH-12-AB-1234",
      vehicleType: "Sedan (Tesla Model 3)",
      startTime: "14:15",
      durationMinutes: 45,
      estimatedKwh: 35.0,
      status: "Confirmed",
    },
  },
  {
    id: "slot-04",
    slotNumber: "Slot 04",
    status: "Available",
    type: "Smart AC",
    connector: "Type 2",
    powerKw: 22,
    voltage: "415V 3-Phase",
    bay: "Bay B2",
    pricePerKwh: 15.0,
    currentBooking: null,
  },
  {
    id: "slot-05",
    slotNumber: "Slot 05",
    status: "Available",
    type: "Fast DC",
    connector: "CCS2",
    powerKw: 50,
    voltage: "400V DC",
    bay: "Bay C1",
    pricePerKwh: 18.0,
    currentBooking: null,
  },
];

export const INITIAL_EVS = [
  {
    id: "ev-01",
    ownerName: "Rahul Sharma",
    vehicleNumber: "MH-12-AB-1234",
    vehicleType: "Sedan (Tesla Model 3)",
    batteryCapacity: 75.0, // kWh
    currentBatteryPercent: 48,
    connectorType: "CCS2",
    status: "Ready",
    registeredAt: "2026-08-15",
  },
  {
    id: "ev-02",
    ownerName: "Rahul Sharma",
    vehicleNumber: "MH-14-EV-5678",
    vehicleType: "Compact SUV (Tata Nexon EV Max)",
    batteryCapacity: 40.5,
    currentBatteryPercent: 78,
    connectorType: "CCS2",
    status: "Ready",
    registeredAt: "2026-08-20",
  },
  {
    id: "ev-03",
    ownerName: "Ananya Patel",
    vehicleNumber: "DL-03-CD-9012",
    vehicleType: "SUV (MG ZS EV)",
    batteryCapacity: 50.3,
    currentBatteryPercent: 24,
    connectorType: "CCS2",
    status: "Charging Required",
    registeredAt: "2026-08-25",
  },
  {
    id: "ev-04",
    ownerName: "Vikram Malhotra",
    vehicleNumber: "KA-01-MJ-4321",
    vehicleType: "Crossover (Hyundai Ioniq 5)",
    batteryCapacity: 72.6,
    currentBatteryPercent: 62,
    connectorType: "CCS2",
    status: "Ready",
    registeredAt: "2026-09-02",
  },
];

export const INITIAL_BOOKINGS = [
  {
    bookingId: "SC-EV-84920",
    slotId: "slot-03",
    slotNumber: "Slot 03",
    evId: "ev-01",
    ownerName: "Rahul Sharma",
    vehicleNumber: "MH-12-AB-1234",
    vehicleType: "Sedan (Tesla Model 3)",
    batteryCapacity: 75.0,
    bookingDate: "2026-09-22",
    startTime: "14:15",
    durationMinutes: 45,
    targetBatteryPercent: 90,
    estimatedKwh: 35.0,
    ratePerKwh: 22.0,
    estimatedCost: 808.5,
    status: "Active", // "Active" | "Completed" | "Cancelled"
  },
  {
    bookingId: "SC-EV-71829",
    slotId: "slot-01",
    slotNumber: "Slot 01",
    evId: "ev-02",
    ownerName: "Rahul Sharma",
    vehicleNumber: "MH-14-EV-5678",
    vehicleType: "Compact SUV (Tata Nexon EV Max)",
    batteryCapacity: 40.5,
    bookingDate: "2026-09-20",
    startTime: "10:00",
    durationMinutes: 60,
    targetBatteryPercent: 95,
    estimatedKwh: 28.5,
    ratePerKwh: 18.0,
    estimatedCost: 538.65,
    status: "Completed",
  },
];

export const INITIAL_BILLS = [
  {
    billId: "INV-SC-2026-001",
    bookingId: "SC-EV-71829",
    ownerName: "Rahul Sharma",
    vehicleNumber: "MH-12-AB-1234",
    vehicleType: "Sedan (Tesla Model 3)",
    batteryCapacity: 75.0,
    slotNumber: "Slot 01",
    chargingDate: "2026-09-20",
    durationMinutes: 52,
    energyConsumed: 42.5, // kWh
    ratePerKwh: 18.0,
    subtotal: 765.0,
    gstPercent: 5.0,
    taxAmount: 38.25,
    totalAmount: 803.25,
    paymentStatus: "Paid",
    paymentMethod: "UPI / Digital Wallet",
    transactionRef: "TXN-8829104",
  },
  {
    billId: "INV-SC-2026-002",
    bookingId: "SC-EV-62819",
    ownerName: "Ananya Patel",
    vehicleNumber: "DL-03-CD-9012",
    vehicleType: "SUV (MG ZS EV)",
    batteryCapacity: 50.3,
    slotNumber: "Slot 02",
    chargingDate: "2026-09-19",
    durationMinutes: 75,
    energyConsumed: 28.0,
    ratePerKwh: 15.0,
    subtotal: 420.0,
    gstPercent: 5.0,
    taxAmount: 21.0,
    totalAmount: 441.0,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    transactionRef: "TXN-7731902",
  },
  {
    billId: "INV-SC-2026-003",
    bookingId: "SC-EV-51928",
    ownerName: "Vikram Malhotra",
    vehicleNumber: "KA-01-MJ-4321",
    vehicleType: "Crossover (Hyundai Ioniq 5)",
    batteryCapacity: 72.6,
    slotNumber: "Slot 05",
    chargingDate: "2026-09-18",
    durationMinutes: 65,
    energyConsumed: 54.2,
    ratePerKwh: 18.0,
    subtotal: 975.6,
    gstPercent: 5.0,
    taxAmount: 48.78,
    totalAmount: 1024.38,
    paymentStatus: "Paid",
    paymentMethod: "Net Banking",
    transactionRef: "TXN-6619082",
  },
];

// C++ OOP Project Source Comparison Data
export const CPP_OOP_SNIPPETS = {
  evClass: {
    title: "1. EV Class & Encapsulation",
    description: "Encapsulates vehicle properties with private member variables, public getters/setters, and parameterized constructors.",
    cppCode: `// EV.h - C++ Object-Oriented Implementation
#include <iostream>
#include <string>

class ElectricVehicle {
private:
    std::string ownerName;
    std::string vehicleNumber;
    std::string vehicleType;
    double batteryCapacity; // in kWh
    double currentBatteryPercent;

public:
    // Parameterized Constructor
    ElectricVehicle(std::string owner, std::string vNum, 
                    std::string vType, double capacity, double currPercent)
        : ownerName(owner), vehicleNumber(vNum), vehicleType(vType),
          batteryCapacity(capacity), currentBatteryPercent(currPercent) {}

    // Encapsulated Getters
    std::string getVehicleNumber() const { return vehicleNumber; }
    std::string getOwnerName() const { return ownerName; }
    double getBatteryCapacity() const { return batteryCapacity; }
    double getCurrentBattery() const { return currentBatteryPercent; }

    // Display Vehicle Details
    void displayEV() const {
        std::cout << "Owner: " << ownerName << " | Plate: " << vehicleNumber
                  << " | Type: " << vehicleType << " | Battery: " 
                  << batteryCapacity << " kWh (" << currentBatteryPercent << "%)\\n";
    }
};`,
    webMapping: "Mapped to TypeScript/JavaScript data model with reactive state in React Context + LocalStorage persistence."
  },
  slotClass: {
    title: "2. ChargingSlot Class & State Management",
    description: "Models individual station bays, power ratings, and availability status (Available, Booked, Occupied).",
    cppCode: `// ChargingSlot.h - Slot State & Operations
#include <iostream>
#include <string>

enum SlotStatus { AVAILABLE, BOOKED, OCCUPIED };

class ChargingSlot {
private:
    int slotId;
    std::string slotName;
    double powerRatingKw;
    SlotStatus status;
    std::string bookedVehicleNo;

public:
    ChargingSlot(int id, std::string name, double kw)
        : slotId(id), slotName(name), powerRatingKw(kw), 
          status(AVAILABLE), bookedVehicleNo("") {}

    bool bookSlot(const std::string& vehicleNo) {
        if (status == AVAILABLE) {
            status = BOOKED;
            bookedVehicleNo = vehicleNo;
            return true;
        }
        return false;
    }

    void releaseSlot() {
        status = AVAILABLE;
        bookedVehicleNo = "";
    }

    SlotStatus getStatus() const { return status; }
    int getId() const { return slotId; }
};`,
    webMapping: "Mapped to visual interactive 5-slot SVG/CSS grid with real-time color indicators and booking modals."
  },
  fileHandling: {
    title: "3. File Handling & STL Vectors",
    description: "Persistence using C++ fstream for read/write operations and std::vector for dynamic collection management.",
    cppCode: `// StationManager.cpp - File Handling & STL Vectors
#include <vector>
#include <fstream>
#include <sstream>
#include "EV.h"

class StationManager {
private:
    std::vector<ElectricVehicle> registeredEVs;
    const std::string filename = "ev_database.txt";

public:
    void saveToFile() {
        std::ofstream outFile(filename);
        for (const auto& ev : registeredEVs) {
            outFile << ev.getOwnerName() << ","
                    << ev.getVehicleNumber() << ","
                    << ev.getBatteryCapacity() << "\\n";
        }
        outFile.close();
    }

    void loadFromFile() {
        std::ifstream inFile(filename);
        std::string line;
        while (std::getline(inFile, line)) {
            std::stringstream ss(line);
            std::string owner, plate, capStr;
            std::getline(ss, owner, ',');
            std::getline(ss, plate, ',');
            std::getline(ss, capStr, ',');
            registeredEVs.emplace_back(owner, plate, "EV", std::stod(capStr), 50.0);
        }
    }
};`,
    webMapping: "Upgraded from flat text file handling to robust LocalStorage JSON serialization with auto-sync."
  },
  billingModule: {
    title: "4. Billing Module & Static Functions",
    description: "Calculates energy tariffs, tax computations, and produces structured digital receipts.",
    cppCode: `// BillingModule.cpp - Tariff Calculation
#include <iostream>
#include <iomanip>

class BillingModule {
private:
    static constexpr double TARIFF_PER_KWH = 18.00;
    static constexpr double GST_PERCENT = 5.0;

public:
    static double calculateBill(double kwhConsumed, double& tax, double& grandTotal) {
        double baseCost = kwhConsumed * TARIFF_PER_KWH;
        tax = baseCost * (GST_PERCENT / 100.0);
        grandTotal = baseCost + tax;
        return baseCost;
    }

    static void printInvoice(std::string billId, std::string owner, 
                             std::string vehicleNo, double kwh) {
        double tax = 0.0, grandTotal = 0.0;
        double base = calculateBill(kwh, tax, grandTotal);
        
        std::cout << "=======================================\\n";
        std::cout << "      SMART EV CHARGING STATION        \\n";
        std::cout << "            Silent Coders              \\n";
        std::cout << "=======================================\\n";
        std::cout << "Bill ID    : " << billId << "\\n";
        std::cout << "Owner      : " << owner << "\\n";
        std::cout << "Vehicle    : " << vehicleNo << "\\n";
        std::cout << "Units (kWh): " << kwh << " kWh\\n";
        std::cout << "Total      : Rs. " << std::fixed << std::setprecision(2) << grandTotal << "\\n";
        std::cout << "=======================================\\n";
    }
};`,
    webMapping: "Upgraded to an interactive PDF-ready digital invoice modal with live calculation and download functionality."
  }
};
