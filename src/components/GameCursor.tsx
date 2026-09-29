"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function GameCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Mouse coordinate motion values with zero-lag direct values for dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth buttery springs for outer tactical reticle (game feel)
  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle ambient spotlight coordinates
  const spotlightX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const spotlightY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  useEffect(() => {
    // Only enable on desktop/devices with a fine pointer (mouse)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, select, textarea, [role="button"], [data-cursor], .interactive-target'
      );

      if (interactive) {
        setIsHovered(true);
        const label = interactive.getAttribute("data-cursor-label");
        setHoverLabel(label || null);
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't render anything if not visible or running on touch
  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* 1. Tactical Mouse Spotlight Aura (Soft Night-Race Pitlane illumination) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: spotlightX,
          top: spotlightY,
          x: "-50%",
          y: "-50%",
          width: isHovered ? 480 : 360,
          height: isHovered ? 480 : 360,
          background: isHovered
            ? "radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.015) 50%, transparent 75%)"
            : "radial-gradient(circle, rgba(16,185,129,0.05) 0%, rgba(255,255,255,0.015) 45%, transparent 70%)",
          transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease",
        }}
      />

      {/* 2. Outer Tactical Reticle / Precision Gaming HUD Ring */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 32 : isHovered ? 52 : 36,
            height: isClicking ? 32 : isHovered ? 52 : 36,
            borderColor: isHovered ? "#10b981" : "rgba(255, 255, 255, 0.45)",
            rotate: isHovered ? 45 : 0,
            scale: isClicking ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 26 }}
          className="relative border border-dashed rounded-none transition-colors duration-150"
        >
          {/* Tactical Corner Tick Marks */}
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-emerald-400" />
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-emerald-400" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-emerald-400" />
          <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-emerald-400" />

          {/* Crosshair Accent Vanes on Hover */}
          {isHovered && (
            <>
              <div className="absolute top-1/2 -left-2 w-1.5 h-px bg-emerald-400" />
              <div className="absolute top-1/2 -right-2 w-1.5 h-px bg-emerald-400" />
              <div className="absolute -top-2 left-1/2 w-px h-1.5 bg-emerald-400" />
              <div className="absolute -bottom-2 left-1/2 w-px h-1.5 bg-emerald-400" />
            </>
          )}
        </motion.div>

        {/* Minimal Game Telemetry Tag next to cursor */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.4,
            x: isHovered ? 38 : 26,
            y: isHovered ? -16 : -12,
          }}
          transition={{ duration: 0.15 }}
          className="absolute left-0 top-0 whitespace-nowrap font-mono text-[9px] tracking-widest text-emerald-400/90 bg-black/80 px-1.5 py-0.5 border border-emerald-500/30 backdrop-blur-sm pointer-events-none select-none"
        >
          {hoverLabel ? (
            <span className="text-white font-semibold">{hoverLabel}</span>
          ) : isHovered ? (
            <span>TARGET // LOCK</span>
          ) : (
            <span className="text-neutral-400">
              {coords.x},{coords.y}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* 3. High-Precision Center Laser Dot (Zero-lag hardware tracking) */}
      <motion.div
        className="absolute rounded-none pointer-events-none"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 1.6 : isHovered ? 1.2 : 1,
            backgroundColor: isHovered ? "#34d399" : "#ffffff",
          }}
          transition={{ duration: 0.1 }}
          className="w-1.5 h-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
        />
      </motion.div>
    </div>
  );
}
