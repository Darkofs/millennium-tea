"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LEAF_SHAPES = [
  "M 0 -22 C 6 -18 16 -14 18 -8 C 22 -4 18 0 14 0 C 18 4 16 10 10 14 C 6 16 2 14 0 14 C -2 14 -6 16 -10 14 C -16 10 -18 4 -14 0 C -18 0 -22 -4 -18 -8 C -16 -14 -6 -18 0 -22 Z M 0 -22 L 0 14", // Maple
  "M 0 -30 C 7 -24 11 -14 10 -4 C 11 6 8 16 4 24 C 2 28 0 30 0 30 C 0 30 -2 28 -4 24 C -8 16 -11 6 -10 -4 C -11 -14 -7 -24 0 -30 Z M 0 -30 L 0 30 M 0 -14 L 7 -6 M 0 2 L -7 10", // Tea leaf
  "M 0 -24 C 12 -20 16 -10 14 0 C 16 10 12 20 0 26 C -12 20 -16 10 -14 0 C -16 -10 -12 -20 0 -24 Z M 0 -24 L 0 26 M 0 -10 L 8 -4 M 0 4 L -8 10 M 0 14 L 6 18", // Rounded
  "M 0 -26 C 4 -22 10 -20 12 -14 C 14 -10 10 -6 12 -2 C 14 2 10 6 8 10 C 6 16 2 20 0 24 C -2 20 -6 16 -8 10 C -10 6 -14 2 -12 -2 C -10 -6 -14 -10 -12 -14 C -10 -20 -4 -22 0 -26 Z M 0 -26 L 0 24", // Serrated
];

// Rich palette of seasonal leaf colors:
// Red, gold, orange, sienna, forest green, warm yellow, copper brown
const LEAF_COLORS = [
  "#B22222", // Firebrick Red
  "#CD5C5C", // Indian Red
  "#FF8C00", // Dark Orange
  "#DAA520", // Goldenrod Yellow
  "#8B5A2B", // Bronze Brown
  "#556B2F", // Dark Olive Green
  "#8FBC8F", // Dark Sea Green
  "#D4AF37", // Luxury Gold
  "#A0522D", // Sienna Brown
  "#FF4500", // Orange Red
];

export default function FallingLeaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    const leafCount = 30;
    const leaves: HTMLDivElement[] = [];

    // Create leaf DOM elements dynamically
    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("div");
      leaf.className = "absolute pointer-events-none select-none";
      
      const size = gsap.utils.random(14, 26);
      const color = gsap.utils.random(LEAF_COLORS);
      const shape = gsap.utils.random(LEAF_SHAPES);
      const opacity = gsap.utils.random(0.2, 0.6);

      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;

      // Inline SVG for the leaf vector path
      leaf.innerHTML = `
        <svg viewBox="-20 -35 40 70" width="100%" height="100%">
          <path d="${shape}" fill="${color}" opacity="${opacity}" />
        </svg>
      `;

      container.appendChild(leaf);
      leaves.push(leaf);
    }

    const startAnimation = (leaf: HTMLDivElement, initialDelay = 0) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Random starting coordinates
      const startX = gsap.utils.random(0, windowWidth);
      const startY = -40;

      gsap.set(leaf, {
        x: startX,
        y: startY,
        rotation: gsap.utils.random(0, 360),
        scale: gsap.utils.random(0.6, 1.2),
      });

      // Linear fall downwards
      gsap.to(leaf, {
        y: windowHeight + 40,
        x: `+=${gsap.utils.random(-120, 120)}`,
        rotation: `+=${gsap.utils.random(120, 360)}`,
        duration: gsap.utils.random(10, 18),
        ease: "none",
        delay: initialDelay,
        onComplete: () => startAnimation(leaf, 0),
      });

      // Ambient horizontal drift/sway (sine loop)
      gsap.to(leaf, {
        x: `+=${gsap.utils.random(-40, 40)}`,
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: initialDelay,
      });
    };

    // Staggered initialization of all leaves
    leaves.forEach((leaf, idx) => {
      startAnimation(leaf, gsap.utils.random(0, 14));
    });

    // Handle viewport resize: update fall animations to end at the new viewport bottom
    const handleResize = () => {
      leaves.forEach((leaf) => {
        gsap.killTweensOf(leaf);
        startAnimation(leaf, 0);
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      leaves.forEach((leaf) => {
        gsap.killTweensOf(leaf);
        if (leaf.parentNode) {
          leaf.parentNode.removeChild(leaf);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    />
  );
}
