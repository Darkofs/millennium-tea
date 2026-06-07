"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 240;
const frameUrl = (index: number) => `/images/herosection/ezgif-frame-${String(index).padStart(3, "0")}.png`;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedImages = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const currentFrameRef = useRef<number>(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [heroComplete, setHeroComplete] = useState(false);

  // Monitor scroll progress of the entire 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create a super smooth spring-dampened motion value from raw scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 120,
    mass: 0.5,
    restDelta: 0.001
  });

  // Slide 1: Top-Left Corner (Opacity, X, Y)
  const opacityTL = useTransform(smoothProgress, [0.02, 0.06, 0.16, 0.20], [0, 1, 1, 0]);
  const xTL = useTransform(smoothProgress, [0.02, 0.06, 0.16, 0.20], [-60, 0, 0, -60]);
  const yTL = useTransform(smoothProgress, [0.02, 0.06, 0.16, 0.20], [-30, 0, 0, -30]);

  // Slide 2: Top-Right Corner (Opacity, X, Y)
  const opacityTR = useTransform(smoothProgress, [0.20, 0.24, 0.34, 0.38], [0, 1, 1, 0]);
  const xTR = useTransform(smoothProgress, [0.20, 0.24, 0.34, 0.38], [60, 0, 0, 60]);
  const yTR = useTransform(smoothProgress, [0.20, 0.24, 0.34, 0.38], [-30, 0, 0, -30]);

  // Slide 3: Bottom-Left Corner (Opacity, X, Y)
  const opacityBL = useTransform(smoothProgress, [0.38, 0.42, 0.52, 0.56], [0, 1, 1, 0]);
  const xBL = useTransform(smoothProgress, [0.38, 0.42, 0.52, 0.56], [-60, 0, 0, -60]);
  const yBL = useTransform(smoothProgress, [0.38, 0.42, 0.52, 0.56], [30, 0, 0, 30]);

  // Slide 4: Bottom-Right Corner (Opacity, X, Y)
  const opacityBR = useTransform(smoothProgress, [0.56, 0.60, 0.70, 0.74], [0, 1, 1, 0]);
  const xBR = useTransform(smoothProgress, [0.56, 0.60, 0.70, 0.74], [60, 0, 0, 60]);
  const yBR = useTransform(smoothProgress, [0.56, 0.60, 0.70, 0.74], [30, 0, 0, 30]);



  // Smooth transition from Hero pre-rendered sequence to ThreeScene WebGL canvas
  const canvasOpacity = useTransform(smoothProgress, [0.70, 0.75], [1, 0]);
  const heroBg = useTransform(
    smoothProgress,
    [0.70, 0.75],
    ["rgba(11, 11, 11, 1)", "rgba(11, 11, 11, 0)"]
  );

  // Function to draw an image on the canvas matching object-fit: cover
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High performance O(1) lookup with fast outward scan fallback
    let closestIndex = -1;
    if (loadedImages.current[frameIndex]) {
      closestIndex = frameIndex;
    } else {
      // Scan outwards from the frameIndex to find the nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = frameIndex - offset;
        const right = frameIndex + offset;
        if (left >= 1 && loadedImages.current[left]) {
          closestIndex = left;
          break;
        }
        if (right <= TOTAL_FRAMES && loadedImages.current[right]) {
          closestIndex = right;
          break;
        }
      }
    }

    const img = closestIndex !== -1 ? loadedImages.current[closestIndex] : null;
    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    currentFrameRef.current = frameIndex;
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Load Frame 1 immediately
    const img1 = new Image();
    img1.src = frameUrl(1);
    img1.onload = () => {
      loadedImages.current[1] = img1;
      drawFrame(1);
    };

    // Preload key sparse frames first (every 5th)
    const sparseFrames = [];
    for (let i = 5; i <= TOTAL_FRAMES; i += 5) {
      sparseFrames.push(i);
    }

    let loadedCount = 1;
    const updateProgress = () => {
      loadedCount++;
      setLoadingProgress(Math.min(Math.round((loadedCount / TOTAL_FRAMES) * 100), 100));
    };

    sparseFrames.forEach((frameIdx) => {
      const img = new Image();
      img.src = frameUrl(frameIdx);
      img.onload = () => {
        loadedImages.current[frameIdx] = img;
        updateProgress();
        if (Math.abs(currentFrameRef.current - frameIdx) < 3) {
          drawFrame(currentFrameRef.current);
        }
      };
    });

    // Progressive staggered loading of remaining frames after 600ms to prevent main thread lockup
    const timer = setTimeout(() => {
      const remainingFrames: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (i % 5 !== 0) {
          remainingFrames.push(i);
        }
      }

      let batchIndex = 0;
      const batchSize = 6; // Load 6 frames per tick to keep scroll interactions butter smooth
      
      const loadBatch = () => {
        if (batchIndex >= remainingFrames.length) return;
        const start = batchIndex;
        const end = Math.min(start + batchSize, remainingFrames.length);
        
        for (let j = start; j < end; j++) {
          const frameIdx = remainingFrames[j];
          const img = new Image();
          img.src = frameUrl(frameIdx);
          img.onload = () => {
            loadedImages.current[frameIdx] = img;
            updateProgress();
            // Draw immediately if close to the active frame
            if (Math.abs(currentFrameRef.current - frameIdx) < 2) {
              drawFrame(currentFrameRef.current);
            }
          };
        }
        
        batchIndex += batchSize;
        requestAnimationFrame(loadBatch);
      };
      
      requestAnimationFrame(loadBatch);
    }, 600);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor((latest / 0.70) * (TOTAL_FRAMES - 1)) + 1));
    drawFrame(frameIndex);
    // Mark hero as complete when scroll animation finishes
    if (latest >= 0.98 && !heroComplete) {
      setHeroComplete(true);
    }
  });

  // Mobile scroll-lock: on touch devices, prevent swiping PAST the hero section
  // until the full scroll animation is complete. Scrolling within the hero works normally.
  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isMobile || heroComplete) return;

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (heroComplete) return;
      const container = containerRef.current;
      if (!container) return;

      const heroBottom = container.getBoundingClientRect().bottom;
      const swipingDown = e.touches[0].clientY < touchStartY; // finger moving up = scrolling down

      // Block only if: animation not done AND user is trying to scroll past the hero
      if (swipingDown && heroBottom <= window.innerHeight + 10) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [heroComplete]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] z-10">
      
      {/* Sticky Frame Container - fades background to transparent to reveal ThreeScene */}
      <motion.div 
        style={{ backgroundColor: heroBg }}
        className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center"
      >
        
        {/* Canvas & Overlays wrapper - dissolves to reveal WebGL background underneath */}
        <motion.div style={{ opacity: canvasOpacity }} className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Canvas for rendering frames */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-auto" />

          {/* Ambient very light overlay so the animation remains in the "front side" */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

          {/* Vignette gradients to aid readability at corners */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/45 pointer-events-none"></div>
        </motion.div>

        {/* ---------------- CORNER 1: TOP-LEFT (0.05 - 0.20) ---------------- */}
        <motion.div
          style={{ opacity: opacityTL, x: xTL, y: yTL }}
          className="absolute top-24 left-6 md:top-28 md:left-16 max-w-[280px] md:max-w-[340px] pointer-events-none"
        >
          <div className="border border-luxury-gold/25 bg-black/75 backdrop-blur-md p-6 rounded-2xl flex flex-col gap-2 shadow-xl">
            <span className="text-[10px] tracking-widest font-semibold text-luxury-gold uppercase">
              Millennium Heritage
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-luxury-ivory font-bold leading-tight">
              A Legacy of Grand Luxury
            </h3>
            <p className="font-sans text-[11px] md:text-xs text-luxury-ivory/70 leading-relaxed">
              Born from high-altitude fields at 6,000 feet, Millennium crafts rare tea reserves for the refined palate.
            </p>
          </div>
        </motion.div>

        {/* ---------------- CORNER 2: TOP-RIGHT (0.26 - 0.44) ---------------- */}
        <motion.div
          style={{ opacity: opacityTR, x: xTR, y: yTR }}
          className="absolute top-24 right-6 md:top-28 md:right-16 max-w-[280px] md:max-w-[340px] pointer-events-none"
        >
          <div className="border border-luxury-gold/25 bg-black/75 backdrop-blur-md p-6 rounded-2xl flex flex-col gap-2 shadow-xl">
            <span className="text-[10px] tracking-widest font-semibold text-luxury-gold uppercase">
              Pristine Sourcing
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-luxury-ivory font-bold leading-tight">
              High-Altitude Harvests
            </h3>
            <p className="font-sans text-[11px] md:text-xs text-luxury-ivory/70 leading-relaxed">
              Our leaves are handpicked strictly during primary flushes, locking active antioxidants and clean vegetal tones.
            </p>
          </div>
        </motion.div>

        {/* ---------------- CORNER 3: BOTTOM-LEFT (0.50 - 0.68) ---------------- */}
        <motion.div
          style={{ opacity: opacityBL, x: xBL, y: yBL }}
          className="absolute bottom-24 left-6 md:bottom-28 md:left-16 max-w-[280px] md:max-w-[340px] pointer-events-none"
        >
          <div className="border border-luxury-gold/25 bg-black/75 backdrop-blur-md p-6 rounded-2xl flex flex-col gap-2 shadow-xl">
            <span className="text-[10px] tracking-widest font-semibold text-luxury-gold uppercase">
              Micro Blending
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-luxury-ivory font-bold leading-tight">
              Traditional Stone Mills
            </h3>
            <p className="font-sans text-[11px] md:text-xs text-luxury-ivory/70 leading-relaxed">
              Spices are ground in micro-batches and blended with black tea varieties within hours of primary harvest.
            </p>
          </div>
        </motion.div>

        {/* ---------------- CORNER 4: BOTTOM-RIGHT (0.74 - 0.90) ---------------- */}
        <motion.div
          style={{ opacity: opacityBR, x: xBR, y: yBR }}
          className="absolute bottom-24 right-6 md:bottom-28 md:right-16 max-w-[280px] md:max-w-[340px] pointer-events-none"
        >
          <div className="border border-luxury-gold/25 bg-black/75 backdrop-blur-md p-6 rounded-2xl flex flex-col gap-2 shadow-xl">
            <span className="text-[10px] tracking-widest font-semibold text-luxury-gold uppercase">
              Preservation
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-luxury-ivory font-bold leading-tight">
              Signature Gold Tin Canister
            </h3>
            <p className="font-sans text-[11px] md:text-xs text-luxury-ivory/70 leading-relaxed">
              Each formulation is packed in airtight double-lid canisters to shield delicate essential oils from light and moisture.
            </p>
          </div>
        </motion.div>



        {/* Small Progressive Image Loading Indicator at bottom center */}
        {loadingProgress < 100 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 border border-luxury-gold/25 px-4 py-2 rounded-full z-20">
            <div className="w-3 h-3 rounded-full border-2 border-luxury-gold border-t-transparent animate-spin"></div>
            <span className="text-[9px] font-mono text-luxury-gold font-bold tracking-widest uppercase">
              Caching Video: {loadingProgress}%
            </span>
          </div>
        )}

        {/* Floating Scroll Down Indicator (visible mostly in initial half) */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-luxury-ivory/40 hover:text-luxury-gold transition-colors duration-300 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[9px] tracking-[0.22em] font-medium uppercase animate-pulse">Scroll Down</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </motion.div>
      </motion.div>
    </div>
  );
}
