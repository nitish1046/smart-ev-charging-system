# Smart EV Charging Station ⚡

> **Innovative Charging for a Greener Tomorrow**  
> **Team:** Silent Coders  
> **Tagline:** *Code • Build • Create*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/Project-BTech%20Capstone-10B981)](#)

---

## 📌 Project Overview
**Smart EV Charging Station** is an intelligent EV charging station management platform. Originally designed as a high-performance **C++ and Object-Oriented Programming (OOP)** project, this web application transforms the core architectural principles into a modern, startup-grade web interface.

The platform solves core EV charging bottlenecks:
- **Limited Infrastructure Visibility** → Real-time 5-slot visual bay monitoring.
- **Manual Booking & Long Queues** → 4-step automated slot reservation with unique Booking IDs.
- **Opaque Billing** → Instant digital tax invoices calculating kWh, tariff rates, and GST with print/PDF support.

---

## 🚀 Key Features

### 1. Landing Page Experience
- **Interactive Hero Visual**: Animated EV docked at a high-speed charging station with live power cable flow and digital HUD telemetry.
- **Problem & Solution Breakdown**: 3 core industry challenge cards and a 5-step visual workflow (`Register` → `Check Slots` → `Book Slot` → `Charge Vehicle` → `Generate Bill`).
- **C++ & OOP Technology Bridge**: Interactive syntax-highlighted code inspector comparing the original C++ classes (`ElectricVehicle`, `ChargingSlot`, `StationManager`, `BillingModule`) with modern React components.
- **System Architecture**: Interactive full-stack topology diagram with clickable inspection nodes.
- **Real-World Impact**: Environmental metrics tracking CO₂ emissions offset and mature trees saved.

### 2. SaaS Application & User Dashboard
- **My EVs Garage**: Full CRUD vehicle registry with real-time battery SoC indicators and port specifications.
- **5-Slot Visual Station Dashboard**: Physical bay layout with color indicators:
  - `Slot 01` — Available (50 kW DC Fast • CCS2)
  - `Slot 02` — Available (22 kW AC • Type 2)
  - `Slot 03` — Booked (120 kW Supercharger • CCS2)
  - `Slot 04` — Available (22 kW AC • Type 2)
  - `Slot 05` — Available (50 kW DC Fast • CCS2)
- **4-Step Booking Wizard**: Select EV → Select Bay → Select Duration & Target SoC → Instant confirmation with Booking ID.
- **Live Plug-In Charging Simulator**: Advances battery SoC and triggers automatic invoice generation upon completion.
- **Digital Tax Invoice**: Invoice displaying Customer Details, Vehicle Specs, Energy Units (kWh), Tariff, Tax, and printable A4 styling.
- **Admin Analytics Panel**: 6 KPI cards, 4 visual charts (Daily bookings, Charging usage, Revenue trend, Slot occupancy), and manual bay override controls.
- **1-Click Demo Evaluation**: Instant demo login as **Driver** (`Rahul Sharma`) or **Station Administrator**.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Tailwind CSS, Lucide React Icons, Recharts
- **Core OOP Foundations**: C++ Class Architecture, Encapsulation, Parameterized Constructors, Static Methods, `std::vector`, `fstream` Disk Persistence
- **Build Tool**: Vite
- **Storage**: Browser `localStorage` reactive data layer (zero external database setup required for demo evaluation)

---

## 📦 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/smart-ev-charging-system.git
   cd smart-ev-charging-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👥 Team: Silent Coders
*“Code • Build • Create”*  
*Developed for BTech Project Demonstration & Presentation.*
