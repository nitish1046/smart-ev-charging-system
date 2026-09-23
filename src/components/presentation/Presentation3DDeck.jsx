import React, { useState, useEffect, useRef } from 'react';
import { useEV } from '../../context/EVContext';
import { SLIDES_DATA, PRESENTATION_METADATA } from '../../data/presentationData';
import { ThreePresentationScene } from './ThreePresentationScene';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Compass,
  FileText,
  LayoutGrid,
  Zap,
  Scan,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sun,
  Moon,
  X,
  Sparkles,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Radio,
  CheckCircle2,
} from 'lucide-react';

export default function Presentation3DDeck() {
  const { setViewMode } = useEV();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFreeOrbit, setIsFreeOrbit] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showSlideDrawer, setShowSlideDrawer] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lightingTheme, setLightingTheme] = useState('cyber');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [v2gActive, setV2gActive] = useState(false);

  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const audioCtxRef = useRef(null);

  const currentSlide = SLIDES_DATA[currentSlideIndex];

  // ==========================================
  // AUDIO SYNTHESIS (Web Audio API)
  // ==========================================
  const playSound = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'slide') {
        // High-tech whoosh sweep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.18);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'scan') {
        // Laser sweep sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.linearRampToValueAtTime(440, now + 0.25);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'v2g') {
        // Electric power hum
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.3);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        // Crisp click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio playback silently falls back
    }
  };

  // ==========================================
  // INITIALIZE 3D SCENE
  // ==========================================
  useEffect(() => {
    if (!containerRef.current) return;

    const sceneInstance = new ThreePresentationScene(containerRef.current);
    sceneRef.current = sceneInstance;

    // Apply first slide
    sceneInstance.setSlide(SLIDES_DATA[0]);

    return () => {
      sceneInstance.dispose();
      sceneRef.current = null;
    };
  }, []);

  // Update scene when slide changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setSlide(currentSlide);
      setIsFreeOrbit(false);
      setV2gActive(currentSlide.animationMode === 'v2g_reverse');
    }
  }, [currentSlideIndex, currentSlide]);

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'o' || e.key === 'O') {
        toggleFreeOrbit();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (showNotes) setShowNotes(false);
        if (showSlideDrawer) setShowSlideDrawer(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, showNotes, showSlideDrawer, isFreeOrbit]);

  // ==========================================
  // AUTO-PLAY TIMER
  // ==========================================
  useEffect(() => {
    let timer = null;
    if (isAutoPlay) {
      timer = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % SLIDES_DATA.length);
        playSound('slide');
      }, 12000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPlay]);

  // ==========================================
  // HANDLERS
  // ==========================================
  const goToNextSlide = () => {
    if (currentSlideIndex < SLIDES_DATA.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      playSound('slide');
    } else {
      setCurrentSlideIndex(0); // loop back
      playSound('slide');
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      playSound('slide');
    } else {
      setCurrentSlideIndex(SLIDES_DATA.length - 1);
      playSound('slide');
    }
  };

  const jumpToSlide = (idx) => {
    setCurrentSlideIndex(idx);
    setShowSlideDrawer(false);
    playSound('slide');
  };

  const toggleFreeOrbit = () => {
    const nextState = !isFreeOrbit;
    setIsFreeOrbit(nextState);
    if (sceneRef.current) {
      sceneRef.current.enableOrbit(nextState);
    }
    playSound('click');
  };

  const handleTriggerScan = () => {
    if (sceneRef.current) {
      sceneRef.current.triggerDiagnosticScan();
    }
    playSound('scan');
  };

  const handleToggleV2G = () => {
    if (sceneRef.current) {
      const active = sceneRef.current.toggleV2GFlow();
      setV2gActive(active);
    }
    playSound('v2g');
  };

  const handleThemeToggle = () => {
    const next = lightingTheme === 'cyber' ? 'golden' : 'cyber';
    setLightingTheme(next);
    if (sceneRef.current) {
      sceneRef.current.setLightingTheme(next);
    }
    playSound('click');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
    playSound('click');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070c14] select-none text-slate-100 font-sans">
      {/* 1. 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

      {/* Top Gradient Vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />

      {/* Bottom Gradient Vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

      {/* ==========================================
          2. TOP HEADER NAVIGATION BAR
         ========================================== */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 py-4">
        {/* Brand & Presentation Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-lg shadow-cyan-500/20 text-white font-black">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                3D Interactive Deck
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {PRESENTATION_METADATA.date}
              </span>
            </div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              {PRESENTATION_METADATA.title}
            </h1>
          </div>
        </div>

        {/* Center: Slide Indicators / Progress Counter */}
        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-700/60 shadow-lg">
          <button
            onClick={() => setShowSlideDrawer(true)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            title="Open Slide Grid (All 11 Slides)"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-cyan-300">{currentSlide.slideNum}</span>
            <span className="text-slate-500">/</span>
            <span className="font-mono text-slate-400">{SLIDES_DATA.length}</span>
          </button>

          {/* Mini Progress Bar */}
          <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
              style={{ width: `${((currentSlideIndex + 1) / SLIDES_DATA.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Right Tools / Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-slate-800/80 border-slate-700 text-cyan-400 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-500'
            }`}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 text-amber-300 transition-all shadow-sm"
            title={`Toggle Theme (Current: ${lightingTheme})`}
          >
            {lightingTheme === 'cyber' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all shadow-sm"
            title="Fullscreen Mode (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Exit / Return to Web App */}
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-all shadow-sm"
            title="Exit 3D Presentation and return to Smart EV App"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit PPT</span>
          </button>
        </div>
      </header>

      {/* ==========================================
          3. MAIN SLIDE CONTENT CARD (Glassmorphism Overlay)
         ========================================== */}
      <main className="absolute left-6 md:left-12 top-24 bottom-28 w-full max-w-xl md:max-w-2xl pointer-events-none z-20 flex flex-col justify-end">
        <div className="pointer-events-auto bg-slate-950/80 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/80 transition-all duration-500 animate-fadeIn">
          {/* Slide Tag & Category */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              SLIDE {currentSlide.slideNum}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {currentSlide.category}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {currentSlide.badge}
            </span>

            {/* Live Mode Badge */}
            {v2gActive && (
              <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> V2G Discharge Active
              </span>
            )}
            {currentSlide.animationMode === 'scanner_diagnostic' && (
              <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse flex items-center gap-1">
                <Scan className="w-3 h-3" /> Diagnostic Scan
              </span>
            )}
          </div>

          {/* Slide Heading & Subtitle */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-1">
            {currentSlide.title}
          </h2>
          <p className="text-sm md:text-base font-medium text-cyan-400/90 mb-4">
            {currentSlide.subtitle}
          </p>

          {/* Executive Summary */}
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-5 border-l-2 border-cyan-500/60 pl-3">
            {currentSlide.summary}
          </p>

          {/* 3 Key Points / Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            {currentSlide.keyPoints.map((pt, i) => (
              <div
                key={i}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-3 flex flex-col justify-between transition-all"
              >
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 mb-1.5">
                    {pt.tag}
                  </span>
                  <h4 className="text-xs font-bold text-white mb-1">{pt.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Quantitative Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-3 border-t border-slate-800/80">
            {currentSlide.metrics.map((m, i) => (
              <div key={i} className="bg-slate-900/60 rounded-lg p-2 text-center">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                  {m.label}
                </span>
                <span className="text-base font-extrabold text-emerald-400 font-mono block">
                  {m.value}
                </span>
                <span className="text-[10px] text-cyan-400 font-medium block truncate">
                  {m.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ==========================================
          4. 3D INTERACTIVE CONTROLS HUD (Top Right)
         ========================================== */}
      <div className="absolute right-6 top-24 z-20 flex flex-col gap-2.5">
        {/* Free 3D Orbit Toggle */}
        <button
          onClick={toggleFreeOrbit}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border backdrop-blur-md text-xs font-semibold transition-all shadow-xl ${
            isFreeOrbit
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 ring-2 ring-cyan-400/40 font-bold'
              : 'bg-slate-900/80 text-slate-200 border-slate-700/80 hover:bg-slate-800 hover:text-white'
          }`}
          title="Enable Free 3D Orbit (Rotate and Inspect anywhere with Mouse/Touch) - Press 'O'"
        >
          <Compass className={`w-4 h-4 ${isFreeOrbit ? 'animate-spin' : 'text-cyan-400'}`} />
          <span>{isFreeOrbit ? 'Free Orbit (Active)' : 'Free 3D Orbit [O]'}</span>
        </button>

        {/* Diagnostic Scan Sweep Button */}
        <button
          onClick={handleTriggerScan}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 hover:border-cyan-500/60 text-slate-200 hover:text-white text-xs font-semibold transition-all shadow-xl"
          title="Trigger Holographic Laser Scanner Sweep on the Dispenser"
        >
          <Scan className="w-4 h-4 text-emerald-400" />
          <span>Scan Hardware</span>
        </button>

        {/* V2G Bi-Directional Flow Toggle */}
        <button
          onClick={handleToggleV2G}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border backdrop-blur-md text-xs font-semibold transition-all shadow-xl ${
            v2gActive
              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold ring-2 ring-amber-400/30'
              : 'bg-slate-900/80 text-slate-200 border-slate-700/80 hover:bg-slate-800 hover:text-white'
          }`}
          title="Toggle Vehicle-to-Grid reverse energy flow"
        >
          <Zap className={`w-4 h-4 ${v2gActive ? 'fill-current' : 'text-amber-400'}`} />
          <span>{v2gActive ? 'V2G Discharging' : 'Reverse V2G Flow'}</span>
        </button>

        {/* Speaker Notes Toggle */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border backdrop-blur-md text-xs font-semibold transition-all shadow-xl ${
            showNotes
              ? 'bg-indigo-600 text-white border-indigo-400'
              : 'bg-slate-900/80 text-slate-200 border-slate-700/80 hover:bg-slate-800 hover:text-white'
          }`}
          title="Open Presenter Script & Talking Points - Press 'N'"
        >
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Speaker Notes [N]</span>
        </button>
      </div>

      {/* ==========================================
          5. BOTTOM PRESENTER CONTROL BAR
         ========================================== */}
      <footer className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between px-6 py-4">
        {/* Left: Quick Instructions & Shortcuts */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300">
              ← / →
            </kbd>
            <span>Navigate</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300">
              O
            </kbd>
            <span>Orbit</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300">
              N
            </kbd>
            <span>Notes</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300">
              F
            </kbd>
            <span>Fullscreen</span>
          </span>
        </div>

        {/* Center: Slide Controls (Prev / Play / Next) */}
        <div className="flex items-center gap-3 mx-auto lg:mx-0 bg-slate-950/80 backdrop-blur-xl border border-slate-800 px-4 py-2 rounded-2xl shadow-2xl">
          {/* Previous Slide */}
          <button
            onClick={goToPrevSlide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Auto-Play Toggle */}
          <button
            onClick={() => {
              setIsAutoPlay(!isAutoPlay);
              playSound('click');
            }}
            className={`p-2 rounded-xl border transition-all ${
              isAutoPlay
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title={isAutoPlay ? 'Pause Auto-Play' : 'Start Auto-Play (12s per slide)'}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1.5 px-2">
            {SLIDES_DATA.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpToSlide(idx)}
                className={`transition-all rounded-full ${
                  idx === currentSlideIndex
                    ? 'w-6 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-sm shadow-cyan-400/50'
                    : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Go to slide ${s.slideNum}: ${s.title}`}
              />
            ))}
          </div>

          {/* Next Slide */}
          <button
            onClick={goToNextSlide}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
            title="Next Slide (Right Arrow / Space)"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Slide Overview Grid Button */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setShowSlideDrawer(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 hover:border-slate-600 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-md"
          >
            <LayoutGrid className="w-4 h-4 text-cyan-400" />
            <span>Slide Deck Grid</span>
          </button>
        </div>
      </footer>

      {/* ==========================================
          6. SPEAKER NOTES DRAWER (Slide In Panel)
         ========================================== */}
      {showNotes && (
        <aside className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 z-40 p-6 flex flex-col shadow-2xl animate-slideLeft">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-white text-base">Speaker Notes & Teleprompter</h3>
            </div>
            <button
              onClick={() => setShowNotes(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold block mb-1">
                Slide {currentSlide.slideNum} Target
              </span>
              <h4 className="text-sm font-bold text-white">{currentSlide.title}</h4>
            </div>

            {/* Speaking Script */}
            <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-xl p-4">
              <span className="text-xs uppercase font-mono text-indigo-400 font-bold block mb-2">
                Presenter Script (Verbatim Talking Points)
              </span>
              <p className="text-sm text-slate-200 leading-relaxed italic">
                "{currentSlide.speakerNotes}"
              </p>
            </div>

            {/* Architecture breakdown for deep-dive questions */}
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 space-y-2">
              <span className="text-xs uppercase font-mono text-slate-400 font-bold block">
                Technical Layer Reference
              </span>
              <div className="text-xs text-slate-300 space-y-1.5">
                <p>
                  <strong className="text-cyan-400">1. Edge:</strong> {currentSlide.architecture.layer1}
                </p>
                <p>
                  <strong className="text-emerald-400">2. Ingest:</strong> {currentSlide.architecture.layer2}
                </p>
                <p>
                  <strong className="text-amber-400">3. Services:</strong> {currentSlide.architecture.layer3}
                </p>
              </div>
            </div>

            {/* Presentation Tips */}
            <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-800/80 text-[11px] text-slate-400">
              <span className="text-cyan-400 font-bold">Presentation Tip:</span> Toggle Free 3D
              Orbit (key 'O') to show internal components to the audience when discussing edge
              hardware and battery packs.
            </div>
          </div>
        </aside>
      )}

      {/* ==========================================
          7. SLIDE DECK GRID DRAWER (Modal Jump)
         ========================================== */}
      {showSlideDrawer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col p-6 sm:p-12 overflow-y-auto animate-fadeIn">
          <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                Interactive Deck Index
              </span>
              <h2 className="text-2xl font-black text-white">All 11 Presentation Slides</h2>
            </div>
            <button
              onClick={() => setShowSlideDrawer(false)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SLIDES_DATA.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => jumpToSlide(idx)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 group flex flex-col justify-between ${
                  idx === currentSlideIndex
                    ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-500/20'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {slide.slideNum}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {slide.category}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                    {slide.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">{slide.summary}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">{slide.badge}</span>
                  <span className="flex items-center gap-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                    Jump <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
