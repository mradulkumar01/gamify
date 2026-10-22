"use client";

import React, { useEffect, useState } from "react";

export function HorrorCursor() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Check if device supports fine hover (desktop mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      setIsEnabled(false);
      return;
    }

    const savedPreference = localStorage.getItem("afterdark_custom_cursor");
    if (savedPreference === "false") {
      setIsEnabled(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          target.getAttribute("role") === "button";
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      {/* Dynamic Cursor Torchlight / Spotlight revealing the abyss */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 28, 47, 0.05), rgba(12, 10, 18, 0.02) 40%, transparent 80%)`,
        }}
      />

      {/* Main Reticle Outer Ring */}
      <div
        className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-blood/60 transition-transform duration-75 ease-out ${
          isPointer ? "scale-150 border-toxic/80 bg-blood/10" : "scale-100"
        }`}
        style={{
          width: "28px",
          height: "28px",
          transform: `translate(${position.x - 14}px, ${position.y - 14}px) ${isPointer ? "scale(1.4)" : "scale(1)"}`,
        }}
      >
        {/* Subtle crosshair notches */}
        <div className="absolute top-0 left-1/2 h-1 w-[1px] -translate-x-1/2 bg-blood" />
        <div className="absolute bottom-0 left-1/2 h-1 w-[1px] -translate-x-1/2 bg-blood" />
        <div className="absolute top-1/2 left-0 h-[1px] w-1 -translate-y-1/2 bg-blood" />
        <div className="absolute top-1/2 right-0 h-[1px] w-1 -translate-y-1/2 bg-blood" />
      </div>

      {/* Center Blood Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-full bg-blood shadow-[0_0_8px_#ff1c2f]"
        style={{
          transform: `translate(${position.x - 3}px, ${position.y - 3}px)`,
        }}
      />
    </>
  );
}
