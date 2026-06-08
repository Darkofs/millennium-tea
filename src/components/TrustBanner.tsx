"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Leaf, Award, Truck, Users } from "lucide-react";

const trustItems = [
  {
    icon: Star,
    value: "4.9★",
    label: "Customer Rating",
    sub: "Based on 2,400+ reviews",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Natural & Pure",
    sub: "No artificial additives",
  },
  {
    icon: Leaf,
    value: "Organic",
    label: "Farm Certified",
    sub: "Direct from high-altitude estates",
  },
  {
    icon: Award,
    value: "Award",
    label: "Heritage Blend",
    sub: "Premium luxury tea brand",
  },
  {
    icon: Truck,
    value: "Fast",
    label: "Pan-India Delivery",
    sub: "Dispatched within 24 hours",
  },
  {
    icon: Users,
    value: "50,000+",
    label: "Happy Customers",
    sub: "Across India & worldwide",
  },
];

export default function TrustBanner() {
  return (
    <section className="relative z-10 w-full overflow-hidden border-y border-luxury-gold/10 bg-luxury-black">
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />
      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-[1px] w-12 bg-luxury-gold/40" />
          <span className="text-[10px] tracking-[0.4em] font-medium text-luxury-gold uppercase">
            Why Millennium
          </span>
          <span className="h-[1px] w-12 bg-luxury-gold/40" />
        </motion.div>

        {/* Trust Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.09 }}
                className="group flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-luxury-gold/10 bg-black/25 hover:border-luxury-gold/30 hover:bg-luxury-gold/5 transition-all duration-400"
              >
                {/* Icon badge */}
                <div className="w-11 h-11 rounded-full border border-luxury-gold/25 flex items-center justify-center bg-luxury-gold/5 group-hover:bg-luxury-gold/10 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-luxury-gold" strokeWidth={1.5} />
                </div>

                {/* Value */}
                <div className="font-serif text-lg md:text-xl text-luxury-gold font-bold leading-none tracking-tight">
                  {item.value}
                </div>

                {/* Label */}
                <div className="font-sans text-[11px] md:text-xs font-semibold text-luxury-ivory uppercase tracking-widest leading-tight">
                  {item.label}
                </div>

                {/* Sub-label */}
                <div className="font-sans text-[10px] text-luxury-ivory/45 leading-snug">
                  {item.sub}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 border-t border-luxury-gold/10 pt-6 overflow-hidden"
        >
          <div className="flex gap-8 whitespace-nowrap animate-marquee">
            {[
              "✦ Premium Handcrafted Tea",
              "✦ High-Altitude Sourcing",
              "✦ Airtight Gold Tin Packaging",
              "✦ No Artificial Preservatives",
              "✦ Artisanal Micro-Blends",
              "✦ Same-Day Dispatch",
              "✦ Luxury Gift Ready",
              "✦ Premium Handcrafted Tea",
              "✦ High-Altitude Sourcing",
              "✦ Airtight Gold Tin Packaging",
              "✦ No Artificial Preservatives",
              "✦ Artisanal Micro-Blends",
              "✦ Same-Day Dispatch",
              "✦ Luxury Gift Ready",
            ].map((text, i) => (
              <span
                key={i}
                className="text-[10px] tracking-[0.3em] text-luxury-gold/50 uppercase font-medium flex-shrink-0"
              >
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
