"use client";

import React, { useState, useEffect } from "react";
import PorscheScrollyCanvas from "@/components/PorscheScrollyCanvas";
import {
  Shield,
  Zap,
  Gauge,
  Wind,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  ExternalLink,
  Compass,
  Layers,
  ArrowUpRight,
  Flame,
  Award,
  Menu,
  X,
  ShieldAlert,
  Info,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeColor, setActiveColor] = useState({
    name: "Oak Green Metallic Neo",
    hex: "#1b382b",
    accent: "text-emerald-400",
    bgClass: "bg-[#1b382b]",
    tag: "Heritage Historic Palette",
  });

  const [activeTab, setActiveTab] = useState<"powertrain" | "aero" | "chassis">("powertrain");

  const colors = [
    {
      name: "Oak Green Metallic Neo",
      hex: "#1b382b",
      accent: "text-emerald-400",
      bgClass: "bg-[#1b382b]",
      tag: "Heritage Historic Palette",
    },
    {
      name: "GT Silver Metallic",
      hex: "#8E918F",
      accent: "text-neutral-300",
      bgClass: "bg-[#8E918F]",
      tag: "Pure Metallic",
    },
    {
      name: "Guards Red",
      hex: "#D61A22",
      accent: "text-red-500",
      bgClass: "bg-[#D61A22]",
      tag: "Motorsport Classic",
    },
    {
      name: "Shark Blue",
      hex: "#0064A8",
      accent: "text-sky-500",
      bgClass: "bg-[#0064A8]",
      tag: "High Contrast",
    },
    {
      name: "Racing Yellow",
      hex: "#E8C822",
      accent: "text-yellow-400",
      bgClass: "bg-[#E8C822]",
      tag: "Track Visible",
    },
    {
      name: "Jet Black Metallic",
      hex: "#121214",
      accent: "text-neutral-400",
      bgClass: "bg-[#121214]",
      tag: "Stealth Monolith",
    },
  ];

  const specs = [
    { label: "0 - 100 KM/H", val: "3.2 s", desc: "Launch Control via 7-Speed PDK" },
    { label: "TOP SPEED", val: "296 KM/H", desc: "Downforce-tuned circuit velocity" },
    { label: "MAX OUTPUT", val: "518 HP", desc: "4.0L Naturally Aspirated Boxer-6" },
    { label: "MAX REV RANGE", val: "9,000 RPM", desc: "Acoustically tuned valve train" },
    { label: "MAX DOWNFORCE", val: "860 KG", desc: "At 285 km/h in race mode" },
    { label: "CURB WEIGHT", val: "1,450 KG", desc: "Carbon fiber doors, fenders & wing" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#ededed] selection:bg-emerald-600/30 selection:text-white">
      {/* FULLY RESPONSIVE LUXURY NAVBAR (Always flush at top-0 with ZERO gap) */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.08] bg-[#0a0a0c]/90 backdrop-blur-xl transition-all duration-300">
        {/* Top Demo Notice: Only visible when at the very top; collapses completely when scrolled down with zero gap */}
        <div
          className={`transition-all duration-300 overflow-hidden bg-neutral-950/95 text-neutral-400 text-[10px] sm:text-[11px] font-mono px-4 text-center ${
            scrolled
              ? "max-h-0 opacity-0 py-0 border-b-0 pointer-events-none"
              : "max-h-12 opacity-100 py-1.5 border-b border-white/[0.06]"
          }`}
        >
          <span>NON-COMMERCIAL CONCEPT // BUILT EXCLUSIVELY FOR WEBSITE DESIGN DEMONSTRATION • </span>
          <a href="#disclaimer" className="text-emerald-400 hover:underline ml-1">
            LEGAL & FAIR USE NOTICE
          </a>
        </div>

        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* Brand Wordmark */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-sm sm:text-base font-light tracking-[0.3em] text-white uppercase font-mono">
              P O R S C H E
            </span>
            <span className="hidden xs:inline-block h-3 w-px bg-white/20" />
            <span className="hidden xs:inline-block text-[11px] sm:text-xs font-mono tracking-widest text-emerald-400 uppercase">
              911 GT3 RS
            </span>
          </div>

          {/* Desktop Navigation Links (Visible on large screens) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-mono tracking-widest text-neutral-400">
            <a href="#scrolly" className="hover:text-emerald-400 transition-colors">
              DECONSTRUCTION
            </a>
            <a href="#specs" className="hover:text-emerald-400 transition-colors">
              SPECIFICATIONS
            </a>
            <a href="#engineering" className="hover:text-emerald-400 transition-colors">
              AERODYNAMICS
            </a>
            <a href="#configurator" className="hover:text-emerald-400 transition-colors">
              CONFIGURATOR
            </a>
            <a href="#disclaimer" className="hover:text-emerald-400 transition-colors text-neutral-500">
              DISCLAIMER
            </a>
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center space-x-3">
            <a
              href="#configurator"
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2 rounded-none border border-emerald-500/60 bg-emerald-950/40 text-xs font-mono tracking-[0.2em] text-emerald-300 hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span>INQUIRE ATELIER</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile / Tablet / iPad Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-none border border-white/20 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-emerald-500/50 transition-all duration-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile / Tablet / iPad Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0a0a0c]/98 backdrop-blur-2xl px-6 py-8 transition-all animate-fadeIn">
            <nav className="flex flex-col space-y-5 text-sm font-mono tracking-widest text-neutral-300">
              <a
                href="#scrolly"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-white/[0.05] hover:text-emerald-400 transition-colors"
              >
                <span>01 // DECONSTRUCTION</span>
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </a>
              <a
                href="#specs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-white/[0.05] hover:text-emerald-400 transition-colors"
              >
                <span>02 // SPECIFICATIONS</span>
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </a>
              <a
                href="#engineering"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-white/[0.05] hover:text-emerald-400 transition-colors"
              >
                <span>03 // AERODYNAMICS</span>
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </a>
              <a
                href="#configurator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-white/[0.05] hover:text-emerald-400 transition-colors"
              >
                <span>04 // CONFIGURATOR</span>
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </a>
              <a
                href="#disclaimer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 border-b border-white/[0.05] text-amber-400/80 hover:text-amber-300 transition-colors"
              >
                <span>05 // LEGAL DISCLAIMER</span>
                <ShieldAlert className="w-4 h-4 text-amber-400/80" />
              </a>
            </nav>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#configurator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-none bg-emerald-500 text-black font-medium text-xs font-mono tracking-[0.2em] uppercase hover:bg-emerald-400 transition-all duration-200 shadow-md"
              >
                REQUEST ALLOCATION
              </a>
              <div className="text-[11px] text-center font-mono text-neutral-400 mt-2 space-y-1">
                <p>Non-commercial educational demonstration</p>
                <p className="text-neutral-400">
                  Designed and developed by{" "}
                  <a
                    href="https://ashimsilwal.com.np"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-medium hover:underline"
                  >
                    Ashim Silwal
                  </a>
                  , under{" "}
                  <a
                    href="https://fivizo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-medium hover:underline"
                  >
                    Fivizo Tech and Marketing
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. CORE SCROLLYTELLING CANVAS SECTION */}
      <section id="scrolly" className="relative w-full">
        <PorscheScrollyCanvas />
      </section>

      {/* 4. PERFORMANCE STATS MATRIX */}
      <section id="specs" className="relative z-30 py-20 sm:py-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 mb-3 text-xs font-mono tracking-[0.25em] text-emerald-400 uppercase">
            <Gauge className="w-3.5 h-3.5 text-emerald-400" />
            <span>NÜRBURGRING BENCHMARK: 6:49.328 MIN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase">
            Engineering Telemetry
          </h2>
          <p className="mt-4 text-sm sm:text-base font-light text-neutral-400 leading-relaxed">
            Every millimeter shaped by the airflow at Weissach. Every gram calibrated to yield peak
            lateral acceleration on circuit asphalt.
          </p>
        </div>

        {/* 6-Grid Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-none border border-white/[0.1] bg-neutral-950/60 backdrop-blur-md hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/50 transition-all duration-500" />
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-3">
                {item.label}
              </span>
              <div className="font-mono text-3xl sm:text-4xl font-light text-white group-hover:text-emerald-400 transition-colors font-mono-num">
                {item.val}
              </div>
              <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MOTORSPORT AERODYNAMICS & CHASSIS DEEP DIVE */}
      <section id="engineering" className="relative z-30 py-20 sm:py-32 border-t border-white/[0.08] bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 uppercase">
                MOTORSPORT ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase mt-2">
                Weissach Dynamics
              </h2>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="mt-6 md:mt-0 flex items-center p-1 rounded-none border border-white/15 bg-neutral-900/70 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("powertrain")}
                className={`px-5 py-2 rounded-none text-xs font-mono tracking-[0.15em] uppercase transition-all ${
                  activeTab === "powertrain"
                    ? "bg-emerald-500 text-black font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Powertrain
              </button>
              <button
                onClick={() => setActiveTab("aero")}
                className={`px-5 py-2 rounded-none text-xs font-mono tracking-[0.15em] uppercase transition-all ${
                  activeTab === "aero"
                    ? "bg-emerald-500 text-black font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Aerodynamics
              </button>
              <button
                onClick={() => setActiveTab("chassis")}
                className={`px-5 py-2 rounded-none text-xs font-mono tracking-[0.15em] uppercase transition-all ${
                  activeTab === "chassis"
                    ? "bg-emerald-500 text-black font-medium"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Chassis Lab
              </button>
            </div>
          </div>

          {/* Tab Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual Spec Breakdown */}
            <div className="relative p-8 sm:p-12 rounded-none border border-white/[0.1] bg-neutral-950/80 backdrop-blur-xl">
              {activeTab === "powertrain" && (
                <div>
                  <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-4">
                    <Flame className="w-4 h-4" />
                    <span>NATURALLY ASPIRATED 4.0-LITER</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">
                    Pure High-Revving Acoustic Artistry
                  </h3>
                  <p className="mt-4 text-sm text-neutral-400 font-light leading-relaxed">
                    Unlike turbocharged competitors, the GT3 RS maintains razor-sharp throttle
                    response through six individual throttle valves. The rigid valvetrain with
                    DLC-coated rocker arms enables continuous 9,000 RPM operation on track days.
                  </p>
                  <ul className="mt-6 space-y-3 font-mono text-xs text-neutral-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Dry-sump lubrication with 7 suction stages</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Single central radiator concept inspired by 911 RSR</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Lightweight stainless steel sports exhaust system</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "aero" && (
                <div>
                  <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-4">
                    <Wind className="w-4 h-4" />
                    <span>ACTIVE DRAG REDUCTION SYSTEM (DRS)</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">
                    Continuous Downforce Synthesis
                  </h3>
                  <p className="mt-4 text-sm text-neutral-400 font-light leading-relaxed">
                    The two-piece swan-neck rear wing towers above the roofline. Hydraulic actuators
                    flatten the upper wing element at the press of a steering wheel button for high-speed
                    bursts, reverting to high downforce mode for braking.
                  </p>
                  <ul className="mt-6 space-y-3 font-mono text-xs text-neutral-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Continuous front diffuser winglets under chassis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Roof-mounted vortex generators for engine intake cooling</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Wheel arch louver ventilation relieving front lift</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "chassis" && (
                <div>
                  <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-4">
                    <Compass className="w-4 h-4" />
                    <span>DOUBLE-WISHBONE FRONT AXLE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight">
                    Teardrop Aerodynamic Suspension Arms
                  </h3>
                  <p className="mt-4 text-sm text-neutral-400 font-light leading-relaxed">
                    Even the suspension linkages contribute to downforce. Teardrop-shaped wishbone profiles
                    increase front axle downforce by 40 kg at maximum speed while resisting brake dive under
                    hard deceleration.
                  </p>
                  <ul className="mt-6 space-y-3 font-mono text-xs text-neutral-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Rotary steering-wheel dials for rebound & compression damping</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Electronically variable rear differential lock (PTV+)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Forged magnesium lightweight wheel option (-8 kg)</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Engineering Diagram Card */}
            <div className="p-8 sm:p-12 rounded-none border border-white/[0.1] bg-black/70 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-transparent pointer-events-none" />

              <div>
                <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase">
                  ACTIVE TELEMETRY MONITORS
                </span>
                <h4 className="text-xl sm:text-2xl font-light text-white mt-1 uppercase">
                  Track Telemetry Recorder
                </h4>
                <p className="text-xs text-neutral-400 mt-2">
                  Synchronized with the Porsche Track Precision App for GPS lap sector analysis.
                </p>
              </div>

              {/* Graphical Rev / G-Force Simulation */}
              <div className="my-6 p-4 rounded-none border border-white/15 bg-neutral-900/70 font-mono text-xs space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">LATERAL ACCELERATION</span>
                  <span className="text-emerald-400 font-mono-num font-semibold">1.45 G</span>
                </div>
                <div className="w-full h-1 bg-neutral-800 rounded-none overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[78%]" />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-neutral-400">BRAKING FORCE (PCCB)</span>
                  <span className="text-white font-mono-num font-semibold">1.62 G</span>
                </div>
                <div className="w-full h-1 bg-neutral-800 rounded-none overflow-hidden">
                  <div className="h-full bg-teal-400 w-[92%]" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>WEISSACH R&D TEST MATRIX</span>
                <span className="text-emerald-400">STATUS: CALIBRATED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE COLOR CONFIGURATOR ATELIER */}
      <section id="configurator" className="relative z-30 py-20 sm:py-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 uppercase">
            BESPOKE COMMISSION
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase mt-2">
            Porsche Atelier Configurator
          </h2>
          <p className="mt-4 text-sm sm:text-base font-light text-neutral-400 leading-relaxed">
            Select your signature livery. The scrollytelling deconstruction experience renders with
            the iconic Oak Green Metallic Neo as standard.
          </p>
        </div>

        {/* Color Palette Selector */}
        <div className="p-8 sm:p-12 rounded-none border border-white/[0.1] bg-neutral-950/70 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Color Swatch Tiles */}
            <div className="flex flex-col space-y-4 w-full lg:w-auto">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                EXTERIOR FINISH:
              </span>
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveColor(c)}
                    className={`group relative flex items-center justify-center w-11 h-11 rounded-none border-2 transition-all duration-200 ${
                      activeColor.name === c.name
                        ? "border-emerald-400 scale-105 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : "border-white/20 hover:border-white/60"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {activeColor.name === c.name && (
                      <span className="w-2 h-2 rounded-none bg-white shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Color Info Card */}
            <div className="flex items-center space-x-6 p-6 rounded-none border border-white/15 bg-neutral-900/70 w-full lg:w-96">
              <div
                className="w-14 h-14 rounded-none border border-white/25 shadow-inner flex-shrink-0"
                style={{ backgroundColor: activeColor.hex }}
              />
              <div>
                <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase block">
                  {activeColor.tag}
                </span>
                <h4 className="text-base font-medium text-white">{activeColor.name}</h4>
                <span className="text-xs font-mono text-neutral-400">{activeColor.hex}</span>
              </div>
            </div>

            {/* Commission CTA Button */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => alert(`Configured ${activeColor.name}. Note: This is an educational demonstration project. No commercial orders are processed.`)}
                className="px-8 py-3.5 rounded-none bg-emerald-500 text-black font-medium text-xs font-mono tracking-[0.2em] uppercase hover:bg-emerald-400 transition-all duration-200 shadow-md active:scale-95"
              >
                REQUEST PRODUCTION ALLOCATION
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEGAL DISCLAIMER & FAIR USE NOTICE (PROTECTION & COPYRIGHT SAFEGUARD) */}
      <section id="disclaimer" className="relative z-30 py-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="p-6 sm:p-10 rounded-none border border-amber-500/30 bg-amber-950/[0.14] backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5">
            <div className="p-3 rounded-none bg-amber-500/15 border border-amber-500/30 text-amber-400 flex-shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
                  FAIR USE & LEGAL NOTICE
                </span>
                <span className="text-neutral-500">•</span>
                <span className="text-[11px] font-mono text-neutral-400">
                  PORTFOLIO DEMONSTRATION ONLY
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-medium text-white font-mono tracking-wide">
                Notice of Non-Commercial Demonstration & Intellectual Property Protection
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                <p>
                  <strong>Project Purpose:</strong> This website was designed and built exclusively as an educational, non-commercial portfolio project to demonstrate creative front-end engineering, Next.js framework capabilities, Framer Motion animations, and high-performance HTML5 Canvas scrollytelling mechanics. It is <strong>NOT</strong> an official website of Dr. Ing. h.c. F. Porsche AG.
                </p>
                <p>
                  <strong>Ownership of Intellectual Property:</strong> All visuals, vehicle designs, animations, trademarks, service marks, emblems, wordmarks, sound clips, and brand designations (including &quot;Porsche&quot;, &quot;911 GT3 RS&quot;, and &quot;Manthey Racing&quot;) are the registered property of their respective owners—specifically Dr. Ing. h.c. F. Porsche AG and associated partners. No ownership or commercial rights over these assets are claimed by this project.
                </p>
                <p>
                  <strong>Immediate Takedown Commitment:</strong> We respect intellectual property rights. If you are a copyright or trademark owner or an authorized representative and have any objection or concern regarding any content or imagery shown here, please contact us and we will promptly and gladly remove it immediately without dispute.
                </p>
              </div>

              <div className="pt-2 text-[11px] font-mono text-neutral-400 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-none bg-amber-400" />
                <span>
                  Contact for copyright queries:{" "}
                  <a
                    href="mailto:ashim@fivizo.com"
                    className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
                  >
                    ashim@fivizo.com
                  </a>{" "}
                  (Prompt 24h Removal)
                </span>
              </div>

              {/* Attribution in Disclaimer */}
              <div className="pt-3 border-t border-white/10 text-xs font-mono text-neutral-400 flex flex-wrap items-center gap-1.5">
                <span>Designed and developed by</span>
                <a
                  href="https://ashimsilwal.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-medium hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/40 transition-colors"
                >
                  Ashim Silwal
                </a>
                <span>, under</span>
                <a
                  href="https://fivizo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-medium hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/40 transition-colors"
                >
                  Fivizo Tech and Marketing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LUXURY FOOTER */}
      <footer className="relative z-30 border-t border-white/[0.08] bg-black/90 py-16 px-4 sm:px-8 lg:px-12 text-neutral-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-base font-light tracking-[0.3em] text-white uppercase block mb-2">
              P O R S C H E
            </span>
            <p className="max-w-md text-[11px] text-neutral-400 leading-relaxed font-sans">
              Non-commercial web development demonstration. Official manufacturer figures referenced for technical realism. All trademarks belong to Dr. Ing. h.c. F. Porsche AG.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-8 text-neutral-400 text-xs">
            <a href="#scrolly" className="hover:text-emerald-400 transition-colors">
              DECONSTRUCTION
            </a>
            <a href="#specs" className="hover:text-emerald-400 transition-colors">
              SPECIFICATIONS
            </a>
            <a href="#engineering" className="hover:text-emerald-400 transition-colors">
              AERODYNAMICS
            </a>
            <a href="#configurator" className="hover:text-emerald-400 transition-colors">
              CONFIGURATOR
            </a>
            <a href="#disclaimer" className="text-amber-400/90 hover:text-amber-300 transition-colors">
              LEGAL NOTICE
            </a>
          </div>
        </div>

        {/* Creator Attribution Credits Bar */}
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-neutral-300">
            <span className="text-neutral-400">Designed and developed by</span>
            <a
              href="https://ashimsilwal.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-medium hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/40 transition-colors"
            >
              Ashim Silwal
            </a>
            <span className="text-neutral-500">, under</span>
            <a
              href="https://fivizo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-medium hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/40 transition-colors"
            >
              Fivizo Tech and Marketing
            </a>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-neutral-400">
            <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-none animate-pulse" />
            <span>PORTFOLIO DEMO EXPERIENCE</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
          <span>© {new Date().getFullYear()} Non-Commercial Web Project Demonstration. Visuals & Trademarks belong to Dr. Ing. h.c. F. Porsche AG.</span>
          <span className="text-emerald-400 font-mono">
            WEISSACH AERO SHOWCASE // 50-FRAME LOSSLESS PIPELINE
          </span>
        </div>
      </footer>
    </div>
  );
}
