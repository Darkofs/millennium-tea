"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Calendar helpers ──────────────────────────────────────────────────────────
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["S","M","T","W","T","F","S"];

// ── Leaf path shapes (8 distinct botanical shapes) ────────────────────────────
const LEAF_SHAPES = [
  // Elongated oval leaf
  "M 0 -28 C 9 -22 14 -8 12 0 C 14 8 9 22 0 28 C -9 22 -14 8 -12 0 C -14 -8 -9 -22 0 -28 Z M 0 -28 L 0 28 M 0 -8 L 8 -4 M 0 4 L -8 10",
  // Wide maple-style leaf
  "M 0 -22 C 6 -18 16 -14 18 -8 C 22 -4 18 0 14 0 C 18 4 16 10 10 14 C 6 16 2 14 0 14 C -2 14 -6 16 -10 14 C -16 10 -18 4 -14 0 C -18 0 -22 -4 -18 -8 C -16 -14 -6 -18 0 -22 Z M 0 -22 L 0 14",
  // Ginkgo fan leaf
  "M 0 0 C -8 -6 -18 -8 -20 -16 C -18 -22 -10 -24 -4 -20 C -6 -24 -2 -28 0 -28 C 2 -28 6 -24 4 -20 C 10 -24 18 -22 20 -16 C 18 -8 8 -6 0 0 Z M 0 0 L 0 14 M -8 -4 L -6 4 M 8 -4 L 6 4",
  // Slim lance leaf
  "M 0 -32 C 5 -20 7 -8 6 0 C 7 8 5 20 0 32 C -5 20 -7 8 -6 0 C -7 -8 -5 -20 0 -32 Z M 0 -32 L 0 32 M 0 -12 L 5 -6 M 0 6 L -5 12",
  // Rounded bay leaf
  "M 0 -24 C 12 -20 16 -10 14 0 C 16 10 12 20 0 26 C -12 20 -16 10 -14 0 C -16 -10 -12 -20 0 -24 Z M 0 -24 L 0 26 M 0 -10 L 8 -4 M 0 4 L -8 10 M 0 14 L 6 18",
  // Serrated edge leaf
  "M 0 -26 C 4 -22 10 -20 12 -14 C 14 -10 10 -6 12 -2 C 14 2 10 6 8 10 C 6 16 2 20 0 24 C -2 20 -6 16 -8 10 C -10 6 -14 2 -12 -2 C -10 -6 -14 -10 -12 -14 C -10 -20 -4 -22 0 -26 Z M 0 -26 L 0 24",
  // Tea leaf (elongated with tip)
  "M 0 -30 C 7 -24 11 -14 10 -4 C 11 6 8 16 4 24 C 2 28 0 30 0 30 C 0 30 -2 28 -4 24 C -8 16 -11 6 -10 -4 C -11 -14 -7 -24 0 -30 Z M 0 -30 L 0 30 M 0 -14 L 7 -6 M 0 2 L -7 10",
  // Clover-style round leaf
  "M 0 -18 C 6 -18 10 -14 10 -8 C 10 -4 8 0 0 0 C 8 0 14 4 14 10 C 14 16 8 18 0 18 C -8 18 -14 16 -14 10 C -14 4 -8 0 0 0 C -8 0 -10 -4 -10 -8 C -10 -14 -6 -18 0 -18 Z",
];

const LEAF_COLORS = [
  "#8B4513","#A0522D","#CD853F","#D2691E","#6B4226",
  "#8B6914","#A67C52","#7B3F00","#9C5A1D","#B8860B",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<SVGGElement>(null);
  const candleFlameRef = useRef<SVGGElement>(null);
  const calendarRef = useRef<SVGGElement>(null);

  // ── Build calendar SVG group dynamically ──────────────────────────────────
  useEffect(() => {
    const calGroup = calendarRef.current;
    if (!calGroup) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Clear and rebuild
    while (calGroup.firstChild) calGroup.removeChild(calGroup.firstChild);

    const ns = "http://www.w3.org/2000/svg";

    // Month name
    const monthEl = document.createElementNS(ns, "text");
    monthEl.setAttribute("x", "0");
    monthEl.setAttribute("y", "-8");
    monthEl.setAttribute("text-anchor", "middle");
    const sf = getComputedStyle(document.documentElement).getPropertyValue("--font-script").trim();
    monthEl.setAttribute("font-family", `${sf}, 'Great Vibes', cursive`);
    monthEl.setAttribute("font-size", "26");
    monthEl.setAttribute("fill", "#D4AF37");
    monthEl.setAttribute("opacity", "0.95");
    monthEl.setAttribute("class", "cal-month");
    monthEl.textContent = MONTH_NAMES[month];
    calGroup.appendChild(monthEl);

    // Year
    const yearEl = document.createElementNS(ns, "text");
    yearEl.setAttribute("x", "0");
    yearEl.setAttribute("y", "6");
    yearEl.setAttribute("text-anchor", "middle");
    yearEl.setAttribute("font-family", "'Outfit', 'Inter', sans-serif");
    yearEl.setAttribute("font-size", "9");
    yearEl.setAttribute("fill", "rgba(212,175,55,0.55)");
    yearEl.setAttribute("letter-spacing", "4");
    yearEl.textContent = String(year);
    calGroup.appendChild(yearEl);

    // Divider line
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", "-85"); line.setAttribute("x2", "85");
    line.setAttribute("y1", "14"); line.setAttribute("y2", "14");
    line.setAttribute("stroke", "rgba(212,175,55,0.25)"); line.setAttribute("stroke-width", "0.5");
    calGroup.appendChild(line);

    // Day headers
    const COL_W = 24, HEADER_Y = 28;
    DAYS.forEach((d, i) => {
      const el = document.createElementNS(ns, "text");
      el.setAttribute("x", String(-84 + i * COL_W + COL_W / 2));
      el.setAttribute("y", String(HEADER_Y));
      el.setAttribute("text-anchor", "middle");
      el.setAttribute("font-family", "'Outfit','Inter',sans-serif");
      el.setAttribute("font-size", "8.5");
      el.setAttribute("fill", i === 0 || i === 6 ? "rgba(212,175,55,0.7)" : "rgba(248,245,240,0.45)");
      el.setAttribute("font-weight", "600");
      el.textContent = d;
      calGroup.appendChild(el);
    });

    // Day numbers
    let dayNum = 1;
    let row = 0;
    const NUM_Y_START = 42;
    const ROW_H = 18;

    while (dayNum <= daysInMonth) {
      for (let col = 0; col < 7 && dayNum <= daysInMonth; col++) {
        if (row === 0 && col < firstDay) continue;
        const cx = -84 + col * COL_W + COL_W / 2;
        const cy = NUM_Y_START + row * ROW_H;
        const isToday = dayNum === today;
        const isWeekend = col === 0 || col === 6;

        if (isToday) {
          const circ = document.createElementNS(ns, "circle");
          circ.setAttribute("cx", String(cx)); circ.setAttribute("cy", String(cy - 5));
          circ.setAttribute("r", "10");
          circ.setAttribute("fill", "rgba(212,175,55,0.2)");
          circ.setAttribute("stroke", "#D4AF37"); circ.setAttribute("stroke-width", "0.8");
          circ.setAttribute("class", "today-ring");
          calGroup.appendChild(circ);
        }

        const el = document.createElementNS(ns, "text");
        el.setAttribute("x", String(cx)); el.setAttribute("y", String(cy));
        el.setAttribute("text-anchor", "middle");
        el.setAttribute("font-family", "'Outfit','Inter',sans-serif");
        el.setAttribute("font-size", "10");
        el.setAttribute("font-weight", isToday ? "700" : "400");
        el.setAttribute("fill",
          isToday ? "#D4AF37" : isWeekend ? "rgba(212,175,55,0.55)" : "rgba(248,245,240,0.75)"
        );
        el.setAttribute("class", isToday ? "cal-day today" : "cal-day");
        el.textContent = String(dayNum);
        calGroup.appendChild(el);
        dayNum++;
      }
      row++;
    }
  }, []);

  // ── GSAP animations ───────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const scene = sceneRef.current;
    if (!scene) return;

    const ctx = gsap.context(() => {

      // ── 1. Leaves — entrance stagger ─────────────────────────────────────
      const leaves = gsap.utils.toArray<SVGElement>(".scene-leaf", scene);
      if (leaves.length) {
        gsap.set(leaves, { opacity: 0, scale: 0, transformOrigin: "center center" });
        gsap.to(leaves, {
          opacity: 1, scale: 1,
          duration: 1.6,
          stagger: { each: 0.06, from: "random" },
          ease: "elastic.out(1, 0.5)",
          delay: 0.4,
        });

        // Continuous ambient sway
        leaves.forEach((leaf, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          gsap.to(leaf, {
            rotation: dir * (6 + (i % 4) * 4),
            duration: 1.8 + (i % 5) * 0.6,
            repeat: -1, yoyo: true, ease: "sine.inOut",
            delay: (i * 0.15) % 2.5,
            transformOrigin: "center 80%",
          });
          // Gentle float
          gsap.to(leaf, {
            y: `+=${3 + (i % 4) * 2}`,
            duration: 2.2 + (i % 3) * 0.8,
            repeat: -1, yoyo: true, ease: "sine.inOut",
            delay: (i * 0.2) % 3,
          });
        });

        // Scroll-driven cascade fall
        leaves.forEach((leaf, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          gsap.to(leaf, {
            y: `+=${180 + (i % 8) * 50}`,
            x: `+=${dir * (40 + (i % 6) * 25)}`,
            rotation: `+=${dir * (120 + (i % 5) * 80)}`,
            opacity: 0, ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "+=120%",
              scrub: 1.5 + (i % 3) * 0.6,
            },
          });
        });
      }

      // ── 2. Bokeh particles float ─────────────────────────────────────────
      const bokeh = gsap.utils.toArray<SVGElement>(".bokeh-dot", scene);
      bokeh.forEach((dot, i) => {
        gsap.to(dot, {
          y: `-=${15 + (i % 4) * 8}`,
          opacity: 0,
          duration: 3 + (i % 5),
          repeat: -1, ease: "power1.in",
          delay: (i * 0.4) % 4,
        });
      });

      // ── 3. Calendar fade in ──────────────────────────────────────────────
      const calDays = gsap.utils.toArray(".cal-day", scene);
      if (calDays.length) {
        gsap.set(calDays, { opacity: 0 });
        gsap.to(calDays, {
          opacity: 1, duration: 0.4,
          stagger: { each: 0.025, from: "start" },
          ease: "power2.out", delay: 1.0,
        });
      }
      const calMonth = scene.querySelector(".cal-month");
      if (calMonth) {
        gsap.fromTo(calMonth, { opacity: 0, y: -8 }, { opacity: 0.95, y: 0, duration: 1.2, ease: "power3.out", delay: 0.7 });
      }
      const todayRing = scene.querySelector(".today-ring");
      if (todayRing) {
        gsap.fromTo(todayRing, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)", delay: 1.8 });
        gsap.to(todayRing, { scale: 1.08, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.8 });
      }

      // ── 4. Teacup entrance ───────────────────────────────────────────────
      gsap.fromTo(".hero-teacup-trigger",
        { opacity: 0, y: 30, scale: 0.92, transformOrigin: "480px 760px" },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out", delay: 0.2 }
      );

      // ── 5. Brand text stagger ────────────────────────────────────────────
      gsap.fromTo(".hero-brand-line",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out", delay: 0.6 }
      );

    }, scene);

    return () => ctx.revert();
  }, []);

  // Generate leaves data
  const leafData = Array.from({ length: 38 }, (_, i) => ({
    id: i,
    x: 80 + (i * 37.3) % 1280,
    y: 60 + (i * 53.7) % 720,
    scale: 0.55 + (i % 6) * 0.15,
    rotation: (i * 47) % 360,
    shape: LEAF_SHAPES[i % LEAF_SHAPES.length],
    color: LEAF_COLORS[i % LEAF_COLORS.length],
    opacity: 0.55 + (i % 5) * 0.1,
  }));

  // Bokeh particles data
  const bokehData = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: 40 + (i * 61.8) % 1360,
    y: 80 + (i * 97.3) % 680,
    r: 1.5 + (i % 4),
    opacity: 0.06 + (i % 5) * 0.05,
  }));

  // Calendar position
  const CAL_X = 1160, CAL_Y = 480;

  return (
    <section
      ref={sceneRef}
      className="relative w-full overflow-hidden select-none"
      style={{ height: "100dvh", minHeight: "600px", background: "#0b0b0b" }}
      aria-label="Millennium Tea — Premium Luxury Tea Brand Hero"
    >
      {/* ── Master SVG Canvas ─────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 1440 810"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          {/* Deep atmospheric background gradient */}
          <radialGradient id="bg-center" cx="42%" cy="52%" r="55%">
            <stop offset="0%" stopColor="#1a1208" stopOpacity="1" />
            <stop offset="100%" stopColor="#0b0b0b" stopOpacity="1" />
          </radialGradient>

          {/* Gold warm glow at teacup */}
          <radialGradient id="cup-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>


          {/* Right side warm vignette for calendar */}
          <radialGradient id="cal-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1510" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0b0b0b" stopOpacity="0" />
          </radialGradient>

          {/* Gold shimmer for text */}
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E27A" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>

          {/* Ivory gradient */}
          <linearGradient id="ivory-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8F5F0" />
            <stop offset="100%" stopColor="#D4CEC4" />
          </linearGradient>

          {/* Soft blur filter for glows */}
          <filter id="glow-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="soft-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="flame-blur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="subtle-blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* ── 1. Background ─────────────────────────────────────────────────── */}
        <rect width="1440" height="810" fill="url(#bg-center)" />

        {/* Subtle texture pattern overlay */}
        <rect width="1440" height="810" fill="none"
          stroke="rgba(212,175,55,0.015)" strokeWidth="0"
          style={{ backgroundImage: "none" }}
        />

        {/* ── 2. Atmospheric glow zones ──────────────────────────────────────── */}
        {/* Warm center-left glow (teacup warmth) */}
        <ellipse cx="430" cy="500" rx="320" ry="260" fill="url(#cup-glow)" filter="url(#soft-blur)" />
        {/* Calendar area subtle warm panel */}
        <rect x="1000" y="220" width="380" height="400" rx="8" fill="url(#cal-bg)" />

        {/* ── 3. Decorative border elements ─────────────────────────────────── */}
        {/* Top left ornate corner */}
        <g opacity="0.35" transform="translate(30, 30)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#D4AF37" strokeWidth="0.7" />
          <line x1="0" y1="0" x2="0" y2="80" stroke="#D4AF37" strokeWidth="0.7" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="#D4AF37" strokeWidth="0.7" />
          <path d="M 12 0 Q 6 6 0 12" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
        </g>
        {/* Top right corner */}
        <g opacity="0.35" transform="translate(1410, 30) scale(-1,1)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#D4AF37" strokeWidth="0.7" />
          <line x1="0" y1="0" x2="0" y2="80" stroke="#D4AF37" strokeWidth="0.7" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="#D4AF37" strokeWidth="0.7" />
        </g>
        {/* Bottom left corner */}
        <g opacity="0.35" transform="translate(30, 780) scale(1,-1)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#D4AF37" strokeWidth="0.7" />
          <line x1="0" y1="0" x2="0" y2="80" stroke="#D4AF37" strokeWidth="0.7" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="#D4AF37" strokeWidth="0.7" />
        </g>
        {/* Bottom right corner */}
        <g opacity="0.35" transform="translate(1410, 780) scale(-1,-1)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#D4AF37" strokeWidth="0.7" />
          <line x1="0" y1="0" x2="0" y2="80" stroke="#D4AF37" strokeWidth="0.7" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="#D4AF37" strokeWidth="0.7" />
        </g>

        {/* Subtle horizontal rule accent */}
        <line x1="60" y1="55" x2="680" y2="55" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />
        <line x1="760" y1="55" x2="1380" y2="55" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />
        <circle cx="720" cy="55" r="3" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="0.7" />

        {/* ── 4. Floating bokeh particles ───────────────────────────────────── */}
        {bokehData.map(b => (
          <circle
            key={b.id}
            className="bokeh-dot"
            cx={b.x} cy={b.y} r={b.r}
            fill="#D4AF37"
            opacity={b.opacity}
          />
        ))}

        {/* ── 5. Autumn Leaves ──────────────────────────────────────────────── */}
        {leafData.map(leaf => (
          <g
            key={leaf.id}
            className="scene-leaf"
            transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotation}) scale(${leaf.scale})`}
            opacity={leaf.opacity}
          >
            <path d={leaf.shape} fill={leaf.color} stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
          </g>
        ))}


        {/* 7. Teacup & Saucer */}
        {/* 7. Teacup & Saucer */}
        <g className="hero-teacup-trigger">
          <g className="hero-teacup" transform="translate(480, 690)">
            {/* Saucer */}
            <ellipse cx="0" cy="70" rx="80" ry="14" fill="#1e1810" stroke="#D4AF37" strokeWidth="0.8" opacity="0.9" />
            <ellipse cx="0" cy="68" rx="65" ry="10" fill="#2a2010" stroke="rgba(212,175,55,0.3)" strokeWidth="0.4" />

            {/* Cup body - elegant shape */}
            <path d="M -55 0 Q -58 35 -50 55 Q -30 72 0 72 Q 30 72 50 55 Q 58 35 55 0 Z"
              fill="#1e1810" stroke="#D4AF37" strokeWidth="0.9" />

            {/* Cup inner - tea liquid surface */}
            <ellipse cx="0" cy="2" rx="52" ry="12" fill="#6B3A2A" opacity="0.85" />
            {/* Tea surface highlight */}
            <ellipse cx="-12" cy="0" rx="22" ry="5" fill="rgba(180,120,60,0.4)" opacity="0.6" />

            {/* Cup decorative band */}
            <path d="M -55 18 Q 0 22 55 18" stroke="rgba(212,175,55,0.35)" strokeWidth="0.7" fill="none" />
            <path d="M -54 26 Q 0 30 54 26" stroke="rgba(212,175,55,0.2)" strokeWidth="0.4" fill="none" />

            {/* Subtle leaf motif on cup */}
            <g transform="translate(-18, 40)" opacity="0.3">
              <path d="M 0 -8 C 4 -5 5 0 3 4 C 1 8 -3 8 -5 4 C -5 0 -3 -5 0 -8 Z" fill="#D4AF37" />
              <line x1="0" y1="-8" x2="-1" y2="6" stroke="#D4AF37" strokeWidth="0.5" />
            </g>
            <g transform="translate(12, 42)" opacity="0.25">
              <path d="M 0 -6 C 3 -4 4 0 2 3 C 0 6 -3 5 -4 2 C -4 -1 -2 -4 0 -6 Z" fill="#D4AF37" />
            </g>

            {/* Handle */}
            <path d="M 55 10 Q 80 15 78 38 Q 76 58 55 52"
              fill="none" stroke="#D4AF37" strokeWidth="5.5" strokeLinecap="round" opacity="0.9" />
            <path d="M 55 10 Q 80 15 78 38 Q 76 58 55 52"
              fill="none" stroke="#2a2010" strokeWidth="3" strokeLinecap="round" />

            {/* Cup glow at base */}
            <ellipse cx="0" cy="70" rx="75" ry="12" fill="rgba(212,175,55,0.05)" filter="url(#soft-blur)" />
          </g>
        </g>

        {/* ── 8. Tea Steam ──────────────────────────────────────────────────── */}
        {/* 3 steam strands rising from the cup */}
        <g transform="translate(0, 210)">
          <path className="steam-0"
            d="M 456 478 C 448 464 452 446 444 432 C 436 418 440 402 432 388"
            stroke="rgba(255,248,230,0.5)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path className="steam-1"
            d="M 480 476 C 484 460 478 442 484 428 C 490 414 484 398 490 384"
            stroke="rgba(255,248,230,0.4)" strokeWidth="2.0" strokeLinecap="round" fill="none" />
          <path className="steam-2"
            d="M 504 478 C 514 462 508 444 518 430 C 528 416 522 400 532 386"
            stroke="rgba(255,248,230,0.45)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>

        {/* ── 9. Scattered tea leaves / herb decoration ─────────────────────── */}
        {/* Small botanical sprigs near the cup */}
        <g transform="translate(360, 520)" opacity="0.4">
          <path d="M 0 0 L 20 -15 M 20 -15 C 22 -22 18 -25 16 -22 C 18 -25 15 -28 12 -25 C 15 -28 10 -28 10 -24" stroke="#6B8E23" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 0 0 L -5 -18 M -5 -18 C -8 -24 -12 -24 -10 -20 C -12 -24 -15 -22 -12 -18" stroke="#6B8E23" strokeWidth="1.0" fill="none" strokeLinecap="round" />
        </g>
        <g transform="translate(620, 530)" opacity="0.35">
          <path d="M 0 0 L -18 -12 M -18 -12 C -22 -18 -18 -22 -15 -18 C -18 -22 -14 -26 -12 -22" stroke="#5F7A2A" strokeWidth="1.0" fill="none" strokeLinecap="round" />
        </g>
        <g transform="translate(340, 580)" opacity="0.3">
          <circle cx="0" cy="0" r="5" fill="#4A6B1A" />
          <circle cx="12" cy="-4" r="4" fill="#4A6B1A" />
          <circle cx="6" cy="-12" r="3.5" fill="#4A6B1A" />
        </g>

        {/* ── 10. Wooden surface / table edge ──────────────────────────────── */}
        {/* Subtle tabletop surface */}
        <path d="M 0 765 Q 720 753 1440 763 L 1440 810 L 0 810 Z" fill="#1a1208" />
        <path d="M 0 765 Q 720 753 1440 763" stroke="rgba(212,175,55,0.15)" strokeWidth="1" fill="none" />
        {/* Wood grain hints */}
        <path d="M 60 640 Q 400 635 700 642" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
        <path d="M 100 660 Q 500 655 800 663" stroke="rgba(255,255,255,0.02)" strokeWidth="1.5" fill="none" />


        {/* 12. Calendar Widget */}
        <g transform={`translate(${CAL_X}, ${CAL_Y})`}>
          {/* Calendar card background */}
          <rect x="-98" y="-52" width="196" height="192" rx="6"
            fill="rgba(15,12,6,0.88)"
            stroke="rgba(212,175,55,0.3)" strokeWidth="0.8" />
          {/* Header band */}
          <rect x="-98" y="-52" width="196" height="38" rx="6"
            fill="rgba(212,175,55,0.08)"
            stroke="none" />
          <rect x="-98" y="-14" width="196" height="2" fill="rgba(212,175,55,0.12)" />

          {/* Dynamic calendar content (injected via JS) */}
          <g ref={calendarRef} transform="translate(0, -28)" />

          {/* Card bottom accent */}
          <line x1="-80" y1="136" x2="80" y2="136" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />
        </g>

        {/* ── 13. Decorative right-side vertical text / brand mark ──────────── */}
        <g transform="translate(1400, 405) rotate(90)" opacity="0.2">
          <text
            fontFamily="'Outfit','Inter',sans-serif"
            fontSize="9"
            fill="#D4AF37"
            letterSpacing="5"
            textAnchor="middle"
          >
            SINCE 1993 · ANACHAL · MUNNAR
          </text>
        </g>

        <defs>
        </defs>

      </svg>

      {/* ── Brand Text Overlay (HTML for better typography) ────────────────── */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-10"
        style={{ paddingLeft: "clamp(40px, 5vw, 80px)", paddingRight: "clamp(40px, 5vw, 80px)" }}>

        {/* Left column — brand story */}
        <div className="max-w-[520px]">
          {/* Eyebrow */}
          <div className="hero-brand-line flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-luxury-gold/60" />
            <span
              className="text-[10px] tracking-[0.45em] font-medium uppercase"
              style={{ color: "#D4AF37", opacity: 0.8 }}
            >
              Anachal · Munnar · Est. 1993
            </span>
          </div>

          {/* Main headline */}
          <h1 className="hero-brand-line font-serif leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(42px, 5.5vw, 82px)",
              background: "linear-gradient(135deg, #F5E27A 0%, #D4AF37 45%, #8B6914 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            Millennium<br />
            <span style={{
              fontStyle: "italic",
              fontSize: "0.78em",
              background: "linear-gradient(135deg, #F8F5F0 0%, #D4CEC4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Tea Reserves</span>
          </h1>

          {/* Subline */}
          <p className="hero-brand-line font-sans mb-8"
            style={{
              fontSize: "clamp(13px, 1.3vw, 16px)",
              color: "rgba(248,245,240,0.60)",
              lineHeight: 1.75,
              letterSpacing: "0.02em",
              maxWidth: "380px",
            }}
          >
            Handpicked single-origin teas from pristine high-altitude gardens.
            Aged with craft. Delivered with purpose.
          </p>


        </div>
      </div>

      {/* ── CSS animations ─────────────────────────────────────────────────── */}
      <style>{`
        /* ── Candle flame ── */
        .flame-outer {
          animation: flicker-outer 1.05s ease-in-out infinite alternate;
          transform-origin: 267px 356px;
        }
        .flame-mid {
          animation: flicker-mid 0.72s ease-in-out infinite alternate;
          transform-origin: 267px 358px;
        }
        .flame-inner {
          animation: flicker-inner 0.55s ease-in-out infinite alternate;
          transform-origin: 267px 360px;
        }
        @keyframes flicker-outer {
          0%   { transform: scaleX(1)    scaleY(1)    skewX(0);    opacity: 0.88; }
          20%  { transform: scaleX(0.88) scaleY(1.12) skewX(-4deg);opacity: 0.95; }
          50%  { transform: scaleX(1.10) scaleY(0.92) skewX(5deg); opacity: 0.78; }
          75%  { transform: scaleX(0.92) scaleY(1.06) skewX(-2deg);opacity: 0.90; }
          100% { transform: scaleX(1.04) scaleY(0.97) skewX(2deg); opacity: 0.85; }
        }
        @keyframes flicker-mid {
          0%   { transform: scaleX(0.92) scaleY(1.05); opacity: 0.92; }
          40%  { transform: scaleX(1.08) scaleY(0.94); opacity: 0.85; }
          100% { transform: scaleX(0.96) scaleY(1.03); opacity: 0.94; }
        }
        @keyframes flicker-inner {
          0%   { transform: scaleX(0.94) scaleY(1.04); opacity: 0.98; }
          50%  { transform: scaleX(1.06) scaleY(0.95); opacity: 0.92; }
          100% { transform: scaleX(0.97) scaleY(1.02); opacity: 0.98; }
        }

        /* ── Tea steam ── */
        .steam-0 { animation: steam-rise 3.2s ease-in-out infinite; }
        .steam-1 { animation: steam-rise 3.2s ease-in-out infinite; animation-delay: 1.05s; }
        .steam-2 { animation: steam-rise 3.2s ease-in-out infinite; animation-delay: 2.10s; }
        @keyframes steam-rise {
          0%   { opacity: 0;    stroke-dasharray: 120; stroke-dashoffset: 120; transform: translateY(0); }
          15%  { opacity: 0.55; }
          60%  { opacity: 0.32; transform: translateY(-22px); }
          100% { opacity: 0;    stroke-dashoffset: -120; transform: translateY(-48px); }
        }

        /* ── Bokeh float ── */
        .bokeh-dot {
          animation: bokeh-float 6s ease-in-out infinite;
        }
      `}</style>

      {/* ── Bottom gradient fade ──────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-20 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, transparent, #0b0b0b 90%)" }}
      />


    </section>
  );
}
