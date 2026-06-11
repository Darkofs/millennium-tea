"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Calendar helpers ────────────────────────────────────────────────────────
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Column centres in the SVG viewBox (0 0 1440 810):
// Day header Y = 102; columns = Sun, Mon, Tue, Wed, Thu, Fri, Sat
const COL_XS = [913, 970, 1027, 1084, 1140, 1197, 1254];
const ROW_YS = [178, 235, 292, 349, 406, 463];

function buildCalendarData(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

// ── Component ────────────────────────────────────────────────────────────────
export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [svgLoaded, setSvgLoaded] = useState(false);

  // ── Load the optimized SVG ─────────────────────────────────────────────────
  useEffect(() => {
    fetch("/images/herosection/mainfile_labeled.svg")
      .then((r) => r.text())
      .then((text) => {
        setSvgContent(text);
        setSvgLoaded(true);
      })
      .catch(console.error);
  }, []);

  // ── Build dynamic calendar, flame, steam AFTER svg is in DOM ──────────────
  useEffect(() => {
    if (!svgLoaded) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    const { firstDay, daysInMonth } = buildCalendarData(year, month);

    const ns = "http://www.w3.org/2000/svg";

    // ── 1. Gold glow + flame glow filters ─────────────────────────────────
    let defsEl = overlay.querySelector("defs") as SVGDefsElement | null;
    if (!defsEl) {
      defsEl = document.createElementNS(ns, "defs") as unknown as SVGDefsElement;
      overlay.insertBefore(defsEl, overlay.firstChild);
    }
    defsEl.innerHTML += `
      <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="flame-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="10" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    `;

    // ── 2. Dynamic Calendar ────────────────────────────────────────────────
    // Remove any existing calendar overlay
    overlay.querySelector("#dynamic-calendar")?.remove();
    const calGroup = document.createElementNS(ns, "g");
    calGroup.setAttribute("id", "dynamic-calendar");

    // Month name – large script-style text
    const monthText = document.createElementNS(ns, "text");
    monthText.setAttribute("x", "1084");
    monthText.setAttribute("y", "68");
    monthText.setAttribute("text-anchor", "middle");
    // Use the Next.js-loaded Great Vibes font (via CSS variable) or fall back to generic cursive
    const scriptFontFamily = getComputedStyle(document.documentElement)
      .getPropertyValue("--font-script").trim() || "cursive";
    monthText.setAttribute("font-family", `${scriptFontFamily}, 'Great Vibes', cursive`);
    monthText.setAttribute("font-size", "40");
    monthText.setAttribute("fill", "#c5a03a");
    monthText.setAttribute("opacity", "0");
    monthText.setAttribute("filter", "url(#gold-glow)");
    monthText.textContent = MONTH_NAMES[month];
    calGroup.appendChild(monthText);

    // Day number cells
    let dayNum = 1;
    for (let row = 0; row < ROW_YS.length && dayNum <= daysInMonth; row++) {
      const rowY = ROW_YS[row];
      for (let col = 0; col < COL_XS.length && dayNum <= daysInMonth; col++) {
        if (row === 0 && col < firstDay) continue;
        const colX = COL_XS[col];
        const isToday = dayNum === today;

        if (isToday) {
          const circle = document.createElementNS(ns, "circle");
          circle.setAttribute("cx", String(colX + 13));
          circle.setAttribute("cy", String(rowY));
          circle.setAttribute("r", "22");
          circle.setAttribute("fill", "rgba(197,160,58,0.18)");
          circle.setAttribute("stroke", "#c5a03a");
          circle.setAttribute("stroke-width", "1.5");
          circle.setAttribute("class", "today-highlight");
          circle.setAttribute("opacity", "0");
          calGroup.appendChild(circle);
        }

        const dayText = document.createElementNS(ns, "text");
        dayText.setAttribute("x", String(colX + 13));
        dayText.setAttribute("y", String(rowY + 6));
        dayText.setAttribute("text-anchor", "middle");
        dayText.setAttribute("font-family", "'Inter', 'Outfit', sans-serif");
        dayText.setAttribute("font-size", "17");
        dayText.setAttribute("font-weight", isToday ? "700" : "400");
        dayText.setAttribute("fill", isToday ? "#c5a03a" : "rgba(255,248,230,0.82)");
        dayText.setAttribute("opacity", "0");
        dayText.setAttribute("class", isToday ? "cal-day today-day" : "cal-day");
        dayText.textContent = String(dayNum);
        calGroup.appendChild(dayText);

        dayNum++;
      }
    }

    overlay.appendChild(calGroup);

    // ── 3. Candle Flame Overlay ───────────────────────────────────────────
    // Candle is approximately at x≈548, y≈435 in the 1440×810 viewBox
    overlay.querySelector("#candle-flame-overlay")?.remove();
    const flameGroup = document.createElementNS(ns, "g");
    flameGroup.setAttribute("id", "candle-flame-overlay");
    flameGroup.setAttribute("transform", "translate(548, 435)");

    const outerFlame = document.createElementNS(ns, "path");
    outerFlame.setAttribute("d", "M 0 2 C -11 -14 -16 -34 0 -52 C 16 -34 11 -14 0 2 Z");
    outerFlame.setAttribute("fill", "rgba(255,170,50,0.82)");
    outerFlame.setAttribute("class", "candle-flame-outer");
    flameGroup.appendChild(outerFlame);

    const innerFlame = document.createElementNS(ns, "path");
    innerFlame.setAttribute("d", "M 0 0 C -7 -10 -9 -25 0 -36 C 9 -25 7 -10 0 0 Z");
    innerFlame.setAttribute("fill", "rgba(255,245,130,0.96)");
    innerFlame.setAttribute("class", "candle-flame-inner");
    flameGroup.appendChild(innerFlame);

    const glowEl = document.createElementNS(ns, "ellipse");
    glowEl.setAttribute("cx", "0");
    glowEl.setAttribute("cy", "-22");
    glowEl.setAttribute("rx", "30");
    glowEl.setAttribute("ry", "30");
    glowEl.setAttribute("fill", "rgba(255,200,80,0.07)");
    glowEl.setAttribute("filter", "url(#flame-glow)");
    glowEl.setAttribute("class", "candle-glow");
    flameGroup.appendChild(glowEl);

    overlay.appendChild(flameGroup);

    // ── 4. Tea Steam Overlay ─────────────────────────────────────────────
    // Teacup spout approximately at x≈330, y≈560
    overlay.querySelector("#tea-steam-overlay")?.remove();
    const steamGroup = document.createElementNS(ns, "g");
    steamGroup.setAttribute("id", "tea-steam-overlay");

    const steamDefs = [
      { cx: 316, baseY: 558 },
      { cx: 330, baseY: 552 },
      { cx: 344, baseY: 558 },
    ];

    steamDefs.forEach(({ cx, baseY }, i) => {
      const strand = document.createElementNS(ns, "path");
      const ctrl = cx + (i === 1 ? -10 : 10);
      strand.setAttribute(
        "d",
        `M ${cx} ${baseY} C ${ctrl} ${baseY - 16} ${cx + (i % 2 === 0 ? 8 : -8)} ${baseY - 32} ${cx} ${baseY - 50}`
      );
      strand.setAttribute("stroke", "rgba(255,248,230,0.50)");
      strand.setAttribute("stroke-width", "2.2");
      strand.setAttribute("stroke-linecap", "round");
      strand.setAttribute("fill", "none");
      strand.setAttribute("class", `steam-strand steam-strand-${i}`);
      steamGroup.appendChild(strand);
    });

    overlay.appendChild(steamGroup);

    // Cleanup
    return () => {
      overlay.querySelector("#dynamic-calendar")?.remove();
      overlay.querySelector("#candle-flame-overlay")?.remove();
      overlay.querySelector("#tea-steam-overlay")?.remove();
    };
  }, [svgLoaded]);

  // ── GSAP Animations ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!svgLoaded || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wrap = wrapRef.current;
    if (!wrap) return;

    // Small timeout to ensure dangerouslySetInnerHTML has flushed
    const t = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── A. Leaf scroll-driven cascade ──────────────────────────────────
        const leaves = gsap.utils.toArray<SVGPathElement>(".hero-leaf", wrap);
        if (leaves.length) {
          gsap.set(leaves, { opacity: 0, scale: 0.7, transformOrigin: "center center" });

          // Staggered entrance reveal
          gsap.to(leaves, {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            stagger: { each: 0.035, from: "random" },
            ease: "power3.out",
            delay: 0.2,
          });

          // Continuous gentle wobble (ambient, infinite)
          leaves.forEach((leaf, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            gsap.to(leaf, {
              rotation: dir * (8 + (i % 5) * 3),
              duration: 2 + (i % 4) * 0.7,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: (i * 0.12) % 3,
              transformOrigin: "center center",
            });
          });

          // Scroll-driven fall: leaves cascade down as user scrolls
          leaves.forEach((leaf, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            gsap.to(leaf, {
              y: `+=${120 + (i % 7) * 45}`,
              x: `+=${dir * (25 + (i % 6) * 18)}`,
              rotation: `+=${dir * (90 + (i % 5) * 72)}`,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top top",
                end: "+=100%",
                scrub: 1.2 + (i % 3) * 0.5,
              },
            });
          });
        }

        // ── B. Calendar text fade-in ────────────────────────────────────────
        const calTexts = gsap.utils.toArray(".cal-day", wrap);
        if (calTexts.length) {
          gsap.to(calTexts, {
            opacity: 1,
            duration: 0.5,
            stagger: { each: 0.03, from: "start" },
            ease: "power2.out",
            delay: 0.6,
          });
        }

        // Month name text
        const monthTxt = wrap.querySelector("#dynamic-calendar text");
        if (monthTxt) {
          gsap.to(monthTxt, {
            opacity: 0.92,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.4,
          });
        }

        // Today highlight
        const todayCircle = wrap.querySelector(".today-highlight");
        const todayDay = wrap.querySelector(".today-day");
        if (todayCircle) {
          gsap.to(todayCircle, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 1.2,
          });
          gsap.to(todayCircle, {
            scale: 1.1,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2.2,
            transformOrigin: "center center",
          });
        }
        if (todayDay) {
          gsap.to(todayDay, { opacity: 1, duration: 0.5, delay: 1.0 });
        }

      }, wrap);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(t);
  }, [svgLoaded]);

  return (
    <section
      ref={wrapRef}
      className="hero-scene-section relative w-full overflow-hidden bg-luxury-black select-none"
      style={{ aspectRatio: "16 / 9", maxHeight: "100vh" }}
      aria-label="Millennium Tea — Seasonal hero illustration"
    >
      {/* ── Base SVG scene (inlined for GSAP access to .hero-leaf paths) ─── */}
      {svgContent ? (
        <div
          className="absolute inset-0 w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:absolute [&>svg]:inset-0"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        // Loading skeleton
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin" />
        </div>
      )}

      {/* ── Overlay SVG — dynamic calendar, flame, steam ─────────────────── */}
      <svg
        ref={overlayRef}
        viewBox="0 0 1440 810"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* ── CSS-driven animations ─────────────────────────────────────────── */}
      <style>{`
        /* Candle flame flicker */
        .candle-flame-outer {
          animation: flame-outer 1.15s ease-in-out infinite alternate;
          transform-origin: 548px 437px;
        }
        .candle-flame-inner {
          animation: flame-inner 0.78s ease-in-out infinite alternate;
          transform-origin: 548px 437px;
        }
        .candle-glow {
          animation: glow-pulse 2.2s ease-in-out infinite alternate;
        }
        @keyframes flame-outer {
          0%   { transform: scaleX(1)    scaleY(1)    skewX(0deg);   opacity: 0.82; }
          25%  { transform: scaleX(0.90) scaleY(1.10) skewX(-3deg);  opacity: 0.90; }
          60%  { transform: scaleX(1.08) scaleY(0.93) skewX(4deg);   opacity: 0.76; }
          100% { transform: scaleX(0.95) scaleY(1.05) skewX(-2deg);  opacity: 0.88; }
        }
        @keyframes flame-inner {
          0%   { transform: scaleX(0.88) scaleY(1.06); opacity: 0.95; }
          50%  { transform: scaleX(1.10) scaleY(0.90); opacity: 0.86; }
          100% { transform: scaleX(0.94) scaleY(1.04); opacity: 0.97; }
        }
        @keyframes glow-pulse {
          0%   { opacity: 0.05; }
          100% { opacity: 0.18; }
        }

        /* Tea steam rise */
        .steam-strand-0 { animation: steam-rise 3.4s ease-in-out infinite;                    }
        .steam-strand-1 { animation: steam-rise 3.4s ease-in-out infinite; animation-delay: 1.1s; }
        .steam-strand-2 { animation: steam-rise 3.4s ease-in-out infinite; animation-delay: 2.2s; }
        @keyframes steam-rise {
          0%   { opacity: 0;    stroke-dashoffset: 0;   transform: translateY(0px)   scaleX(1);    }
          20%  { opacity: 0.55; transform: translateY(-8px)  scaleX(0.95); }
          55%  { opacity: 0.38; transform: translateY(-24px) scaleX(1.06); }
          100% { opacity: 0;    transform: translateY(-52px) scaleX(0.88); }
        }

        /* Hide static SVG calendar vector number glyphs (replaced by dynamic text) */
        .hero-calendar-path { display: none !important; }

        /* Ensure inlined base SVG fills its container */
        .hero-scene-section > div:first-child > svg {
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          inset: 0 !important;
          display: block !important;
        }
      `}</style>

      {/* ── Bottom fade to black ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, transparent, #0b0b0b 90%)" }}
      />

      {/* ── Scroll nudge indicator ───────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none">
        <span className="text-[9px] tracking-[0.3em] text-luxury-gold/50 font-medium uppercase">
          Scroll to Explore
        </span>
        <div className="w-[18px] h-[28px] rounded-[9px] border border-luxury-gold/40 flex items-start justify-center pt-[5px] animate-bounce">
          <div className="w-[4px] h-[7px] rounded-full bg-luxury-gold/60" />
        </div>
      </div>
    </section>
  );
}
