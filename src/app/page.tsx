"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import FeaturedCollection from "@/components/FeaturedCollection";
import Catalog from "@/components/Catalog";
import OurStory from "@/components/OurStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TrustBanner from "@/components/TrustBanner";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function Home() {
  const { openCart } = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("cart") === "open") {
        openCart();
        // Clean up URL query parameters cleanly
        const url = new URL(window.location.href);
        url.searchParams.delete("cart");
        window.history.replaceState({}, document.title, url.pathname + url.search);
      }
    }
  }, [openCart]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);

    gsap.ticker.lagSmoothing(0);

    // 2. Global Scroll Reveals (h2 clips and image parallax)
    const mm = gsap.matchMedia();

    mm.add({
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      const { reduceMotion } = context.conditions as { reduceMotion: boolean };

      if (!reduceMotion) {
        // Section headings clip-path reveal (emerges out of an invisible mask)
        const headings = gsap.utils.toArray("section h2, main h2");
        headings.forEach((heading: any) => {
          gsap.fromTo(heading,
            { 
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", 
              y: 50 
            },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
              y: 0,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 88%",
                toggleActions: "play none none none"
              }
            }
          );
        });

        // Cover photo image parallax scroll trigger
        const parallaxImages = gsap.utils.toArray(".parallax-img-wrap img");
        parallaxImages.forEach((img: any) => {
          const trigger = img.closest(".parallax-img-wrap");
          gsap.fromTo(img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: trigger,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });

        // Showcase package floating/drift parallax scroll trigger
        const showcaseImages = gsap.utils.toArray(".showcase-img-wrap img");
        showcaseImages.forEach((img: any) => {
          const trigger = img.closest(".showcase-img-wrap");
          gsap.fromTo(img,
            { y: 35 },
            {
              y: -35,
              ease: "none",
              scrollTrigger: {
                trigger: trigger,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });

        // 3. Generic data-speed ScrollTrigger handler
        const speedElements = gsap.utils.toArray("[data-speed]");
        speedElements.forEach((el: any) => {
          const speed = parseFloat(el.getAttribute("data-speed") || "1.0");
          if (isNaN(speed) || speed === 1.0) return;

          const targetHeight = el.offsetHeight || 100;
          const yVal = (1 - speed) * (window.innerHeight + targetHeight) * 0.15;

          gsap.fromTo(el,
            { y: yVal },
            {
              y: -yVal,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              }
            }
          );
        });
      }
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      mm.revert();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register mathematical custom wiggle ease to match user's ease parameter
    gsap.registerEase("wiggle({wiggles:8, type:easeOut})", (progress: number) => {
      // 8 wiggles (oscillations) with easeOut amplitude decay: sin(8 * 2pi * progress) * (1 - progress)
      return Math.sin(progress * Math.PI * 2 * 8) * (1 - progress);
    });

    const CTA_KEYWORDS = ["inquire", "buy", "cart", "grades", "message", "subscribe", "reset", "details", "explore"];

    const applyEffect = (btn: HTMLElement) => {
      if (btn.dataset.magneticApplied === "true") return;
      btn.dataset.magneticApplied = "true";

      // Programmatically override transitionProperty to prevent CSS transition clashing with GSAP transforms
      btn.style.transitionProperty = "background-color, border-color, color, box-shadow, opacity";

      // 1. Continuous wiggle loop (uses the registered custom ease)
      gsap.to(btn, {
        rotation: 12,
        duration: 1.5,
        repeat: -1,
        ease: "wiggle({wiggles:8, type:easeOut})"
      });

      // 2. Magnetic pull (adjust translation on mousemove relative to button center)
      const zone = btn;
      const strength = 0.35;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = zone.getBoundingClientRect();
        const x = gsap.utils.mapRange(rect.left, rect.right, -rect.width / 2, rect.width / 2, e.clientX);
        const y = gsap.utils.mapRange(rect.top, rect.bottom, -rect.height / 2, rect.height / 2, e.clientY);

        gsap.to(btn, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto"
        });
      };

      zone.addEventListener("mousemove", handleMouseMove);
      zone.addEventListener("mouseleave", handleMouseLeave);

      // Store cleanup handler
      (btn as any)._cleanupMagnetic = () => {
        zone.removeEventListener("mousemove", handleMouseMove);
        zone.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    // Scan the DOM and apply the effect to all buttons matching the keywords or data-wiggle attribute
    const scanAndApply = () => {
      const buttons = Array.from(document.querySelectorAll("button"));
      buttons.forEach(btn => {
        const text = (btn.textContent || "").toLowerCase().trim();
        if (btn.dataset.wiggle === "true" || CTA_KEYWORDS.some(keyword => text.includes(keyword))) {
          applyEffect(btn);
        }
      });
    };

    scanAndApply();

    // Use MutationObserver to dynamically apply the effect to newly added buttons (e.g., in modals)
    const observer = new MutationObserver(() => {
      scanAndApply();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      const buttons = Array.from(document.querySelectorAll("button"));
      buttons.forEach(btn => {
        if ((btn as any)._cleanupMagnetic) {
          (btn as any)._cleanupMagnetic();
        }
      });
    };
  }, []);

  // 3. GSAP-style Custom Cursor mouse tracking & squash-and-stretch
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Suppress custom cursor on touch devices (pointer: coarse)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const dot = document.querySelector(".custom-cursor-dot") as HTMLElement;
    const ring = document.querySelector(".custom-cursor-ring") as HTMLElement;
    if (!dot || !ring) return;

    // Place initial cursor offscreen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    // QuickTo position setters for ultra high-performance rendering
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3.out" });
    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power3.out" });

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Update positions
      xDotTo(x);
      yDotTo(y);
      xRingTo(x);
      yRingTo(y);

      // Squash and stretch based on mouse sweep velocity
      const velX = x - lastX;
      const velY = y - lastY;
      lastX = x;
      lastY = y;

      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX) * (180 / Math.PI);

      if (speed > 2) {
        const stretch = Math.min(1 + speed * 0.007, 1.45);
        const squeeze = Math.max(1 - speed * 0.004, 0.75);

        gsap.to(ring, {
          scaleX: stretch,
          scaleY: squeeze,
          rotation: angle,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(ring, {
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const INTERACTIVE_SELECTOR = "a, button, [role='button'], .glass-gold, .clickable-card, h1, h2, h3, h4, h5, h6";

    // Hover states for interactive items (morphing the cursor)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable = target.closest(INTERACTIVE_SELECTOR);
      if (clickable) {
        dot.classList.add("cursor-active");
        ring.classList.add("cursor-active");
        gsap.to(ring, {
          scale: 1.5,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable = target.closest(INTERACTIVE_SELECTOR);
      if (clickable) {
        const related = e.relatedTarget as HTMLElement;
        if (!related || !related.closest(INTERACTIVE_SELECTOR)) {
          dot.classList.remove("cursor-active");
          ring.classList.remove("cursor-active");
          gsap.to(ring, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor Elements */}
      <div className="custom-cursor-dot pointer-events-none fixed z-[9999] hidden md:block" />
      <div className="custom-cursor-ring pointer-events-none fixed z-[9998] hidden md:block" />

      {/* Luxury Navigation */}
      <Header />

      {/* Scrollable Storytelling Experience */}
      <main className="relative z-10 w-full">
        {/* Floating Background Parallax Leaves & Spices */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Leaf 1: Near Featured Collection, slower parallax */}
          <div
            data-speed="0.6"
            className="absolute left-[6%] top-[190vh] w-24 h-24 text-luxury-gold/15 rotate-[45deg]"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              <path d="M50 10 C65 30 75 45 70 70 C65 90 40 90 30 70 C25 45 35 30 50 10 Z M50 10 C50 35 48 60 52 80 M52 40 C42 45 35 52 35 52 M52 55 C60 58 65 65 65 65" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Leaf 2: Near transition to Catalog, faster parallax */}
          <div
            data-speed="1.8"
            className="absolute right-[8%] top-[230vh] w-28 h-28 text-luxury-gold/10 rotate-[-30deg]"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              <path d="M50 10 C65 30 75 45 70 70 C65 90 40 90 30 70 C25 45 35 30 50 10 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M50 10 C50 30 50 70 50 85 M50 35 Q40 40 33 46 M50 50 Q62 55 67 62" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Leaf 3: Inside Catalog area, slightly slower */}
          <div
            data-speed="1.2"
            className="absolute left-[10%] top-[270vh] w-20 h-20 text-luxury-gold/12 rotate-[85deg]"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              <path d="M50 10 C65 30 75 45 70 70 C65 90 40 90 30 70 C25 45 35 30 50 10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50 10 C49 32 51 68 50 82 M50 30 C42 36 36 42 36 42 M50 48 C58 54 62 60 62 60" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>

          {/* Star Anise Spice: Catalog area, very fast parallax with continuous rotation */}
          <div
            data-speed="2.2"
            className="absolute right-[5%] top-[310vh] w-16 h-16 text-luxury-gold/8 rotate-[15deg] animate-spin-slow"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none" strokeWidth="1.5">
              <g transform="translate(50,50)">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                  <path
                    key={index}
                    d="M 0 0 C 10 -25 5 -40 0 -45 C -5 -40 -10 -25 0 0"
                    transform={`rotate(${angle})`}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* Cinematic Landing */}
        <Hero />

        {/* Trust & Credibility Strip */}
        <TrustBanner />

        {/* 3D Coordinated Showcases */}
        <ProductShowcase />

        {/* Featured Collection Grid & Modals */}
        <FeaturedCollection />

        {/* Dynamic Product Catalog */}
        <Catalog />

        {/* Origin Story & Parallax */}
        <OurStory />

        {/* Holistic Wellness Benefits */}
        <WhyChooseUs />

        {/* Corporate Inquiry Desk */}
        <Contact />
      </main>

      {/* Footer Info */}
      <Footer />
    </>
  );
}
