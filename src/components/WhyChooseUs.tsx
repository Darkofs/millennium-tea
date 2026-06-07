"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sprout, ShieldCheck, Activity, Sparkles, Leaf, Gem } from "lucide-react";

interface BenefitCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const benefits: BenefitCard[] = [
  {
    title: "Natural Ingredients",
    description: "100% pure organic tea leaves and whole spices. Free from artificial colors, synthetic flavorings, or preservatives.",
    icon: Sprout,
  },
  {
    title: "Immunity Support",
    description: "Rich in active curcuminoids, gingerols, and vitamins that naturally reinforce your biological immune defenses.",
    icon: ShieldCheck,
  },
  {
    title: "Digestive Wellness",
    description: "Cardamom, ginger, and black pepper naturally stimulate digestive enzymes, soothe bloating, and enhance gut comfort.",
    icon: Activity,
  },
  {
    title: "Antioxidant Rich",
    description: "Abundant in EGCG catechins and polyphenols that neutralize free radicals, supporting cellular health and longevity.",
    icon: Sparkles,
  },
  {
    title: "Refreshing Taste",
    description: "An elegant, sensory harmony of zesty citrus, warm spices, and clean, smooth finishes that delight the palate.",
    icon: Leaf,
  },
  {
    title: "Premium Quality",
    description: "Estate-harvested, optical-sorted, and vacuum-sealed at the source in our nitrogen-flushed luxury canisters.",
    icon: Gem,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="wellness" className="relative w-full z-10 py-32 bg-luxury-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs md:text-sm tracking-[0.4em] font-medium text-luxury-gold uppercase block mb-3">
            Holistic Wellness
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-luxury-ivory mb-6">
            Wellness in <span className="gold-gradient-text">Every Steep</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-luxury-ivory/60 max-w-xl mx-auto leading-relaxed">
            Our traditional blends combine ancient Ayurvedic wisdom with high-altitude teas to promote vitality, focus, and natural balance.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-gold p-8 rounded-2xl flex flex-col items-start relative group overflow-hidden"
            >
              {/* Decorative top gold gradient accent */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
              
              {/* Subtle background glow on hover */}
              <div className="absolute -right-20 -bottom-20 w-44 h-44 bg-luxury-gold/5 rounded-full blur-2xl group-hover:bg-luxury-gold/10 transition-colors duration-500"></div>

              {/* Icon Container with animation */}
              <div className="p-4 rounded-xl bg-luxury-charcoal border border-luxury-gold/15 text-luxury-gold mb-6 group-hover:border-luxury-gold group-hover:bg-luxury-gold/15 transition-all duration-500 relative">
                <benefit.icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-xl border border-luxury-gold/0 scale-90 group-hover:scale-105 group-hover:border-luxury-gold/30 transition-all duration-500"></div>
              </div>

              {/* Content */}
              <h3 className="font-serif text-lg md:text-xl text-luxury-ivory font-bold mb-3 tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-xs md:text-sm text-luxury-ivory/60 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
