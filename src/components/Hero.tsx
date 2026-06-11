"use client";

import React, { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Large text words slide up out of mask
      gsap.fromTo(
        ".title-word",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        }
      );

      // Spinning leaf inside title
      gsap.fromTo(
        ".title-leaf",
        { scale: 0, rotate: -90 },
        {
          scale: 1,
          rotate: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          delay: 0.4,
        }
      );

      // Continuous slow rotation on title leaf
      gsap.to(".title-leaf", {
        rotate: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      // Ambient background shapes load animation
      gsap.fromTo(
        ".bg-shape",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.35,
          duration: 1.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // ScrollTrigger for the text copy section lines
      const copyLines = gsap.utils.toArray(".copy-text-line");
      copyLines.forEach((line: any) => {
        gsap.fromTo(
          line,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover animations for inline keywords
  const handleMouseEnterWord = (wordType: string, event: React.MouseEvent) => {
    const target = event.currentTarget;
    if (wordType === "effortlessly") {
      const leaf = target.querySelector(".word-leaf-svg");
      const loop = target.querySelector(".word-loop-path");
      if (leaf) {
        gsap.to(leaf, { rotate: "+=180", scale: 1.25, duration: 0.45, ease: "power2.out", overwrite: "auto" });
      }
      if (loop) {
        gsap.to(loop, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      }
    } else if (wordType === "handpicked") {
      const circle = target.querySelector(".word-circle-path");
      if (circle) {
        gsap.to(circle, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      }
    } else if (wordType === "wellness") {
      const oval = target.querySelector(".word-oval-path");
      if (oval) {
        gsap.to(oval, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      }
    } else if (wordType === "sensory") {
      const block = target.querySelector(".word-highlight-block");
      const text = target.querySelector(".word-text");
      if (block) {
        gsap.to(block, { yPercent: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      }
      if (text) {
        gsap.to(text, { color: "#0b0b0b", duration: 0.2, overwrite: "auto" });
      }
    }
  };

  const handleMouseLeaveWord = (wordType: string, event: React.MouseEvent) => {
    const target = event.currentTarget;
    if (wordType === "effortlessly") {
      const leaf = target.querySelector(".word-leaf-svg");
      const loop = target.querySelector(".word-loop-path");
      if (leaf) {
        gsap.to(leaf, { scale: 0, rotate: -90, duration: 0.45, ease: "power2.out", overwrite: "auto" });
      }
      if (loop) {
        gsap.to(loop, { strokeDashoffset: 150, duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
      }
    } else if (wordType === "handpicked") {
      const circle = target.querySelector(".word-circle-path");
      if (circle) {
        gsap.to(circle, { strokeDashoffset: 300, duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
      }
    } else if (wordType === "wellness") {
      const oval = target.querySelector(".word-oval-path");
      if (oval) {
        gsap.to(oval, { strokeDashoffset: 350, duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
      }
    } else if (wordType === "sensory") {
      const block = target.querySelector(".word-highlight-block");
      const text = target.querySelector(".word-text");
      if (block) {
        gsap.to(block, { yPercent: 100, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      }
      if (text) {
        gsap.to(text, { color: "#d4af37", duration: 0.2, overwrite: "auto" });
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-luxury-black overflow-hidden select-none">
      
      {/* Ambient background glows / vector shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="bg-shape absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-luxury-gold/5 rounded-full blur-[100px]" />
        <div className="bg-shape absolute bottom-[15%] right-[15%] w-[450px] h-[450px] bg-luxury-gold/5 rounded-full blur-[130px]" />
        
        {/* Floating background outline shape */}
        <div className="bg-shape absolute top-[45%] right-[20%] w-36 h-36 text-luxury-gold/10">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1">
            <polygon points="50,15 80,75 20,75" />
          </svg>
        </div>
      </div>

      {/* 1. Cinematic Typography Hero Landing */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 md:px-12 z-10 border-b border-luxury-gold/10">
        <div className="text-center">
          <span className="text-xs md:text-sm tracking-[0.4em] font-medium text-luxury-gold uppercase block mb-6 animate-pulse">
            Millennium Tea Reserves
          </span>
          
          <h1 ref={titleRef} className="font-serif text-[11vw] font-bold uppercase tracking-tight text-luxury-ivory leading-none flex flex-col items-center">
            {/* Word 1: BREW */}
            <span className="overflow-hidden h-[13vw] flex items-center justify-center">
              <span className="title-word inline-block flex items-center gap-4">
                BREW
                {/* Floating/rotating gold leaf inside the text spacing */}
                <span className="title-leaf inline-block w-[9vw] h-[9vw] text-luxury-gold relative align-middle -mt-1 select-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <path d="M50 10 C65 30 75 45 70 70 C65 90 40 90 30 70 C25 45 35 30 50 10 Z M50 10 C50 35 48 60 52 80 M52 40 C42 45 35 52 35 52 M52 55 C60 58 65 65 65 65" stroke="currentColor" strokeWidth="2.5" fill="none" />
                  </svg>
                </span>
              </span>
            </span>

            {/* Word 2: LUXURY */}
            <span className="overflow-hidden h-[13vw] mt-2 flex items-center justify-center">
              <span className="title-word gold-gradient-text inline-block">
                LUXURY
              </span>
            </span>
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-luxury-ivory/40 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] tracking-[0.22em] font-medium uppercase animate-pulse">Explore Brand</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-luxury-gold/70" />
        </div>
      </section>

      {/* 2. Interactive Brand Copy Section ({ Why Millennium }) */}
      <section className="brand-copy-section relative py-40 px-6 md:px-12 z-10 max-w-7xl mx-auto flex flex-col items-center justify-center border-b border-luxury-gold/10">
        
        <div className="mb-14 text-center">
          <span className="text-xs md:text-sm tracking-[0.3em] font-medium text-luxury-gold/75 uppercase block mb-3">
            {"{ Why Millennium? }"}
          </span>
        </div>

        <div ref={copyRef} className="font-serif text-2xl md:text-4xl lg:text-5xl text-luxury-ivory/80 leading-snug md:leading-relaxed text-center max-w-6xl mx-auto px-2">
          
          <div className="copy-text-line mb-4">
            Millennium allows you to{" "}
            {/* Word A: effortlessly */}
            <span
              onMouseEnter={(e) => handleMouseEnterWord("effortlessly", e)}
              onMouseLeave={(e) => handleMouseLeaveWord("effortlessly", e)}
              onTouchStart={(e) => {
                handleMouseEnterWord("effortlessly", e as any);
              }}
              onTouchEnd={(e) => {
                const target = e.currentTarget;
                setTimeout(() => {
                  handleMouseLeaveWord("effortlessly", { currentTarget: target } as any);
                }, 1500);
              }}
              className="clickable-card relative inline-block text-luxury-gold font-bold mx-1 pb-1 cursor-pointer transition-colors duration-300"
            >
              effortlessly
              {/* Spinning leaf icon popping up */}
              <span className="word-leaf-svg absolute -top-8 left-1/2 -translate-x-1/2 w-7 h-7 text-luxury-gold/90 transition-transform duration-300 scale-0 origin-center pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                  <path d="M50 10 C65 30 75 45 70 70 C65 90 40 90 30 70 C25 45 35 30 50 10 Z" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
              {/* Loop SVG line drawing */}
              <svg className="absolute left-0 bottom-[-5px] w-full h-[12px] pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path
                  className="word-loop-path stroke-current text-luxury-gold fill-none"
                  strokeWidth="2.5"
                  d="M5,15 Q50,0 95,15"
                  strokeDasharray="150"
                  strokeDashoffset="150"
                />
              </svg>
            </span>{" "}
            brew the rarest single-origin teas.
          </div>

          <div className="copy-text-line mb-4">
            Delivering{" "}
            {/* Word B: handpicked */}
            <span
              onMouseEnter={(e) => handleMouseEnterWord("handpicked", e)}
              onMouseLeave={(e) => handleMouseLeaveWord("handpicked", e)}
              onTouchStart={(e) => {
                handleMouseEnterWord("handpicked", e as any);
              }}
              onTouchEnd={(e) => {
                const target = e.currentTarget;
                setTimeout(() => {
                  handleMouseLeaveWord("handpicked", { currentTarget: target } as any);
                }, 1500);
              }}
              className="clickable-card relative inline-block text-luxury-gold font-bold mx-1 px-1.5 cursor-pointer transition-colors duration-300"
            >
              handpicked
              {/* Circle sketch loop */}
              <svg className="absolute inset-x-[-12px] inset-y-[-6px] w-[calc(100%+24px)] h-[calc(100%+12px)] pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path
                  className="word-circle-path stroke-current text-luxury-gold/80 fill-none"
                  strokeWidth="2"
                  d="M10,20 C10,5 90,5 90,20 C90,35 10,35 10,20"
                  strokeDasharray="300"
                  strokeDashoffset="300"
                />
              </svg>
            </span>{" "}
            organic flushes and clean
          </div>

          <div className="copy-text-line mb-4">
            botanical{" "}
            {/* Word C: wellness */}
            <span
              onMouseEnter={(e) => handleMouseEnterWord("wellness", e)}
              onMouseLeave={(e) => handleMouseLeaveWord("wellness", e)}
              onTouchStart={(e) => {
                handleMouseEnterWord("wellness", e as any);
              }}
              onTouchEnd={(e) => {
                const target = e.currentTarget;
                setTimeout(() => {
                  handleMouseLeaveWord("wellness", { currentTarget: target } as any);
                }, 1500);
              }}
              className="clickable-card relative inline-block text-luxury-gold font-bold mx-1 px-2.5 py-0.5 cursor-pointer transition-colors duration-300"
            >
              wellness
              {/* Oval outline */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 120 50" preserveAspectRatio="none">
                <ellipse
                  className="word-oval-path stroke-current text-luxury-gold/90 fill-none"
                  strokeWidth="2.5"
                  cx="60"
                  cy="25"
                  rx="56"
                  ry="21"
                  strokeDasharray="350"
                  strokeDashoffset="350"
                />
              </svg>
            </span>{" "}
            direct to your cup so you can
          </div>

          <div className="copy-text-line">
            focus on the ultimate{" "}
            {/* Word D: sensory */}
            <span
              onMouseEnter={(e) => handleMouseEnterWord("sensory", e)}
              onMouseLeave={(e) => handleMouseLeaveWord("sensory", e)}
              onTouchStart={(e) => {
                handleMouseEnterWord("sensory", e as any);
              }}
              onTouchEnd={(e) => {
                const target = e.currentTarget;
                setTimeout(() => {
                  handleMouseLeaveWord("sensory", { currentTarget: target } as any);
                }, 1500);
              }}
              className="clickable-card relative inline-block text-luxury-gold border border-luxury-gold/35 rounded-lg px-4.5 overflow-hidden cursor-pointer transition-all duration-300"
            >
              {/* Highlight background pill block */}
              <span className="word-highlight-block absolute inset-0 bg-luxury-gold translate-y-full z-0 pointer-events-none"></span>
              
              <span className="word-text relative z-10 font-bold transition-colors duration-300">
                sensory
              </span>
            </span>{" "}
            perfection of taste.
          </div>

        </div>

      </section>

    </div>
  );
}
