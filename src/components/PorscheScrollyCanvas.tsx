"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

const TOTAL_FRAMES = 50;

export default function PorscheScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Authentic Car Rev Sound Audio Element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Framer Motion scroll progress tracking the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Target frame and interpolated current frame for 60fps/120fps smooth lerp
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Initialize authentic car rev sound audio
  useEffect(() => {
    const audio = new Audio("/sounds/porsche-rev.ogg");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.85;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Update target frame and real-time scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);

      targetFrameRef.current = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, latest * (TOTAL_FRAMES - 1))
      );

      // Modulate authentic Porsche car engine rev sound on scroll
      if (audioRef.current && !audioRef.current.paused) {
        // Dynamically accelerate engine rev pitch from 0.85x up to 1.65x
        const targetRate = Math.min(1.65, Math.max(0.85, 0.88 + latest * 0.75));
        audioRef.current.playbackRate = targetRate;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Preload all 50 frames with WebP + JPG fallback
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/porsche-animated/ezgif-frame-${paddedIndex}.webp`;

      img.onload = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        // Fallback to jpg if webp fails
        img.src = `/porsche-animated/ezgif-frame-${paddedIndex}.jpg`;
        img.onload = () => {
          if (isCancelled) return;
          count++;
          setLoadedCount(count);
          if (count === TOTAL_FRAMES) {
            imagesRef.current = loadedImages;
            setIsLoaded(true);
          }
        };
      };

      loadedImages.push(img);
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // Main Canvas Render Function - Full Edge-to-Edge Cover Rendering
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    const targetWidth = Math.floor(width * dpr);
    const targetHeight = Math.floor(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Fill background with exact studio tone #0a0a0c
    ctx.fillStyle = "#0a0a0c";
    ctx.fillRect(0, 0, width, height);

    // FULL WIDTH / COVER CALCULATION:
    // Guarantees zero gaps on left or right on desktop, laptop, ultrawide, tablet, or mobile
    const imgAspect = img.naturalWidth / img.naturalHeight || 16 / 9;

    let drawWidth: number;
    let drawHeight: number;

    if (width >= 768) {
      // Desktop: stretch completely across full width (cover fit)
      drawWidth = width;
      drawHeight = width / imgAspect;
      if (drawHeight < height) {
        drawHeight = height;
        drawWidth = height * imgAspect;
      }
    } else {
      // Mobile: scale car comfortably so it fills nicely without empty side bars
      drawWidth = width * 1.35;
      drawHeight = drawWidth / imgAspect;
      if (drawHeight < height * 0.7) {
        drawHeight = height * 0.75;
        drawWidth = drawHeight * imgAspect;
      }
    }

    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    ctx.restore();
  }, []);

  // Continuous animation loop with lerping for liquid-smooth frame interpolation
  useEffect(() => {
    if (!isLoaded) return;

    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.14;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const activeIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      renderFrame(activeIndex);
      animationFrameIdRef.current = requestAnimationFrame(tick);
    };

    animationFrameIdRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      renderFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, renderFrame]);

  // Audio Toggle using authentic recorded Porsche car engine rev sound
  const toggleSound = () => {
    if (!soundEnabled) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.playbackRate = 0.9;
        audioRef.current
          .play()
          .then(() => {
            setSoundEnabled(true);
          })
          .catch((err) => {
            console.warn("Audio play prevented:", err);
            setSoundEnabled(true);
          });
      } else {
        setSoundEnabled(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setSoundEnabled(false);
    }
  };

  const progressPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  // Discrete, strict visibility thresholds so texts NEVER linger or pollute other sections
  // 1. Hero: strictly only visible at the upper part (0% to 10% scroll). Gone completely by 12%
  const isHeroVisible = scrollProgress < 0.12;
  const heroOpacityVal = isHeroVisible ? Math.max(0, 1 - scrollProgress / 0.09) : 0;

  // 2. Feature 1: only visible between 22% and 42%
  const isFeat1Visible = scrollProgress >= 0.20 && scrollProgress <= 0.44;
  const feat1OpacityVal = isFeat1Visible
    ? scrollProgress < 0.28
      ? (scrollProgress - 0.20) / 0.08
      : scrollProgress > 0.36
      ? (0.44 - scrollProgress) / 0.08
      : 1
    : 0;

  // 3. Feature 2: only visible between 52% and 72%
  const isFeat2Visible = scrollProgress >= 0.50 && scrollProgress <= 0.74;
  const feat2OpacityVal = isFeat2Visible
    ? scrollProgress < 0.58
      ? (scrollProgress - 0.50) / 0.08
      : scrollProgress > 0.66
      ? (0.74 - scrollProgress) / 0.08
      : 1
    : 0;

  // 4. CTA: only visible when the car reassembles (>= 82%)
  const isCtaVisible = scrollProgress >= 0.82;
  const ctaOpacityVal = isCtaVisible ? Math.min(1, (scrollProgress - 0.82) / 0.08) : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#0a0a0c] select-none"
    >
      {/* 1. MINIMAL LUXURY PRELOADER */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0c] px-6 text-center"
          >
            <div className="flex flex-col items-center max-w-sm w-full">
              <span className="text-xs font-mono tracking-[0.35em] text-neutral-400 uppercase mb-2">
                PORSCHE
              </span>
              <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-white uppercase mb-8">
                911 GT3 RS
              </h2>

              <div className="w-48 h-[2px] bg-neutral-800 rounded-none overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-emerald-400"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <span className="text-[11px] font-mono tracking-widest text-neutral-400">
                LOADING EXPERIENCE {progressPercent}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. STICKY FULL-WIDTH CANVAS */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Full Viewport Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />

        {/* Discreet Sound Toggle Button (top-right, moved 20px down) */}
        {isLoaded && (
          <div className="absolute top-[100px] sm:top-[116px] right-4 sm:right-8 z-30 pointer-events-auto">
            <button
              onClick={toggleSound}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-none border border-white/20 bg-black/60 backdrop-blur-md text-[11px] font-mono tracking-wider text-neutral-300 hover:text-white hover:border-emerald-500/60 transition-all duration-200 active:scale-95 shadow-md"
              title="Toggle Real Porsche Engine Rev Sound"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="tracking-widest text-emerald-400">ENGINE SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="tracking-widest text-neutral-400">SOUND</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* 3. CLEAN, NON-OVERLAPPING TEXT OVERLAYS */}

        {/* Section 1: Hero - ONLY rendered at the upper part (0% to 10% scroll). Disappears completely when scrolled down */}
        {isHeroVisible && (
          <div
            style={{
              opacity: heroOpacityVal,
              transform: `translateY(-${scrollProgress * 120}px)`,
            }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-24 sm:pt-32 px-4 text-center z-20 pointer-events-none transition-opacity duration-150"
          >
            <span className="text-xs sm:text-sm font-mono tracking-[0.3em] text-emerald-400 uppercase mb-2 drop-shadow-md">
              Oak Green Metallic Neo
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white uppercase drop-shadow-2xl">
              911 GT3 RS
            </h1>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-white/70 font-light tracking-[0.25em] uppercase drop-shadow-md">
              The Architecture of Velocity
            </p>
          </div>
        )}

        {/* Section 2: Feature 1 - ONLY visible when scrolling between 20% and 44% */}
        {isFeat1Visible && (
          <div
            style={{
              opacity: feat1OpacityVal,
            }}
            className="absolute inset-0 flex flex-col justify-start items-start pt-28 sm:pt-36 px-6 sm:px-12 md:px-20 lg:px-28 z-20 pointer-events-none transition-opacity duration-200"
          >
            <div className="max-w-md text-left">
              <span className="text-[11px] font-mono text-emerald-400 tracking-[0.25em] uppercase block mb-2 drop-shadow-sm">
                01 // AERODYNAMICS
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white uppercase drop-shadow-md">
                Active Downforce
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-light text-white/70 leading-relaxed drop-shadow-sm">
                Swan-neck rear wing and hydraulic front diffusers generating 860 kg of downforce at 285 km/h.
              </p>
            </div>
          </div>
        )}

        {/* Section 3: Feature 2 - ONLY visible when scrolling between 50% and 74% */}
        {isFeat2Visible && (
          <div
            style={{
              opacity: feat2OpacityVal,
            }}
            className="absolute inset-0 flex flex-col justify-start items-end pt-28 sm:pt-36 px-6 sm:px-12 md:px-20 lg:px-28 z-20 pointer-events-none transition-opacity duration-200"
          >
            <div className="max-w-md text-right">
              <span className="text-[11px] font-mono text-emerald-400 tracking-[0.25em] uppercase block mb-2 drop-shadow-sm">
                02 // POWERTRAIN
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white uppercase drop-shadow-md">
                4.0L Flat-Six
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-light text-white/70 leading-relaxed drop-shadow-sm">
                Naturally aspirated high-revving masterpiece screaming to an acoustic 9,000 RPM redline.
              </p>
            </div>
          </div>
        )}

        {/* Section 4: Final CTA - ONLY visible when reassembled at the end (>= 82%) */}
        {isCtaVisible && (
          <div
            style={{
              opacity: ctaOpacityVal,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-20 pointer-events-none transition-opacity duration-200"
          >
            <div className="max-w-xl text-center">
              <span className="text-[11px] font-mono text-emerald-400 tracking-[0.25em] uppercase block mb-2 drop-shadow-sm">
                03 // REASSEMBLY
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white uppercase drop-shadow-lg">
                Born on the Ring
              </h2>
              <p className="mt-3 text-sm sm:text-base font-light text-white/70 max-w-md mx-auto drop-shadow-sm">
                Engineered for the circuit. Reassembled for the connoisseur.
              </p>
              <div className="mt-8 pointer-events-auto">
                <a
                  href="#configurator"
                  className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-none bg-emerald-500 text-black font-medium text-xs font-mono tracking-[0.2em] uppercase hover:bg-emerald-400 transition-all duration-200 shadow-md active:scale-95"
                >
                  <span>Configure Your GT3 RS</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
