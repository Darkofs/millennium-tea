"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Sun, Layers, ArrowUpRight, Flame, Leaf, Coffee, Activity, Snowflake } from "lucide-react";

export default function ProductShowcase() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="showcase" className="relative w-full z-10 bg-luxury-black">
      
      {/* 1. Special Masala Tea Powder (Image on Left, Text on Right) */}
      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-20 relative gap-12">
        {/* Left Column: Product Image with Transparent Background */}
        <div className="w-full md:w-1/2 flex justify-center items-center z-20 order-1 md:order-none">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-80 h-96 md:w-[500px] md:h-[600px]"
          >
            <img
              src="/images/masalatea/special masala tea.png"
              alt="Special Masala Tea Powder"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_40px_rgba(212,175,55,0.25)]"
            />
          </motion.div>
        </div>

        {/* Right Column: Text */}
        <div className="w-full md:w-1/2 lg:w-5/12 text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[1px] bg-luxury-gold/50"></span>
            <span className="text-xs md:text-sm tracking-[0.3em] font-medium text-luxury-gold uppercase">
              The Royal Heritage Blend
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-luxury-ivory mb-6"
          >
            Special Masala <br />
            <span className="gold-gradient-text">Tea Powder</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-luxury-ivory/70 leading-relaxed mb-8"
          >
            Handcrafted from select high-altitude Assam CTC tea, blended with fresh ground cardamom, cloves, cinnamon, and black pepper. Rich, warming, and deeply aromatic, designed for an authentic royal spice experience in every sip.
          </motion.p>

          {/* Specs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { title: "Spice Blend Ratio", value: "15% Fresh Ground", icon: Flame },
              { title: "Tea Base Variety", value: "Assam CTC Grade A", icon: Coffee },
              { title: "Aroma Sensation", value: "Intense Spicy & Warm", icon: Sun },
              { title: "Purity Guarantee", value: "100% Organic Spices", icon: ShieldCheck },
            ].map((spec, idx) => (
              <div key={idx} className="glass-gold-static p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5 text-luxury-gold">
                  <spec.icon className="w-4 h-4" />
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-luxury-ivory/50">
                    {spec.title}
                  </span>
                </div>
                <div className="font-serif text-sm md:text-base text-luxury-ivory tracking-wide">
                  {spec.value}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <button
              onClick={() => scrollToSection("catalog")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              Packaging Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-luxury-gold text-luxury-black font-medium hover:bg-luxury-gold/90 flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              Inquire
            </button>
          </motion.div>
        </div>
      </div>

      {/* 2. Ginger Tea Powder (Text on Left, Image on Right) */}
      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-20 relative gap-12">
        {/* Left Column: Text */}
        <div className="w-full md:w-1/2 lg:w-5/12 text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[1px] bg-luxury-gold/50"></span>
            <span className="text-xs md:text-sm tracking-[0.3em] font-medium text-luxury-gold uppercase">
              Zesty & Invigorating
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-luxury-ivory mb-6"
          >
            Ginger Tea <br />
            <span className="gold-gradient-text">Powder Blend</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-luxury-ivory/70 leading-relaxed mb-8"
          >
            A comforting blend of hand-sorted dry ginger root extract and strong black tea. Perfect for a cozy morning or as a soothing afternoon refresher that improves circulation and relieves throat discomfort.
          </motion.p>

          {/* Specs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { title: "Ginger Infusion", value: "10% Dried Root", icon: Activity },
              { title: "Tea Base", value: "Assam Orthodox Leaf", icon: Coffee },
              { title: "Flavor Profile", value: "Zesty, Warm, Pungent", icon: Sun },
              { title: "Wellness Support", value: "Digestive Care", icon: ShieldCheck },
            ].map((spec, idx) => (
              <div key={idx} className="glass-gold-static p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5 text-luxury-gold">
                  <spec.icon className="w-4 h-4" />
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-luxury-ivory/50">
                    {spec.title}
                  </span>
                </div>
                <div className="font-serif text-sm md:text-base text-luxury-ivory tracking-wide">
                  {spec.value}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <button
              onClick={() => scrollToSection("catalog")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              Product Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-luxury-gold text-luxury-black font-medium hover:bg-luxury-gold/90 flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              Inquire
            </button>
          </motion.div>
        </div>

        {/* Right Column: Product Image with Transparent Background */}
        <div className="w-full md:w-1/2 flex justify-center items-center z-20">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-80 h-96 md:w-[500px] md:h-[600px]"
          >
            <img
              src="/images/ginger tea/ginger tea transparent.png"
              alt="Ginger Tea Powder Blend"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_40px_rgba(212,175,55,0.25)]"
            />
          </motion.div>
        </div>
      </div>

      {/* 3. Lemon Tea (Image on Left, Text on Right) */}
      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-20 relative gap-12">
        {/* Left Column: Product Image with Transparent Background */}
        <div className="w-full md:w-1/2 flex justify-center items-center z-20 order-1 md:order-none">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-80 h-96 md:w-[500px] md:h-[600px]"
          >
            <img
              src="/images/lemontea/lemon tea.png"
              alt="Lemon Tea Infusion"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_40px_rgba(212,175,55,0.25)]"
            />
          </motion.div>
        </div>

        {/* Right Column: Text */}
        <div className="w-full md:w-1/2 lg:w-5/12 text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[1px] bg-luxury-gold/50"></span>
            <span className="text-xs md:text-sm tracking-[0.3em] font-medium text-luxury-gold uppercase">
              Citrus Brightness
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-luxury-ivory mb-6"
          >
            Lemon Tea <br />
            <span className="gold-gradient-text">Infusion</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-luxury-ivory/70 leading-relaxed mb-8"
          >
            A delicate blend of citrusy lemon extract and smooth Nilgiri black tea. Offers a refreshing, tangy taste that can be enjoyed hot to soothe or iced to revitalize. Packed with vitamin C for active detoxification.
          </motion.p>

          {/* Specs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { title: "Lemon Essence", value: "Natural Cold-Pressed", icon: Layers },
              { title: "Tea Base", value: "Nilgiri Orange Pekoe", icon: Leaf },
              { title: "Tasting Profile", value: "Crisp, Tangy, Fruity", icon: Snowflake },
              { title: "Detox Factor", value: "High Vitamin C", icon: Activity },
            ].map((spec, idx) => (
              <div key={idx} className="glass-gold-static p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5 text-luxury-gold">
                  <spec.icon className="w-4 h-4" />
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-luxury-ivory/50">
                    {spec.title}
                  </span>
                </div>
                <div className="font-serif text-sm md:text-base text-luxury-ivory tracking-wide">
                  {spec.value}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <button
              onClick={() => scrollToSection("catalog")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              View Catalog
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-luxury-gold text-luxury-black font-medium hover:bg-luxury-gold/90 flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              Inquire
            </button>
          </motion.div>
        </div>
      </div>

      {/* 4. Green Tea (Text on Left, Image on Right) */}
      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-20 relative gap-12">
        {/* Left Column: Text */}
        <div className="w-full md:w-1/2 lg:w-5/12 text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[1px] bg-luxury-gold/50"></span>
            <span className="text-xs md:text-sm tracking-[0.3em] font-medium text-luxury-gold uppercase">
              Pristine Darjeeling Origin
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-luxury-ivory mb-6"
          >
            Organic Premium <br />
            <span className="gold-gradient-text">Green Tea</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-luxury-ivory/70 leading-relaxed mb-8"
          >
            Carefully steamed and rolled whole leaves sourced from pristine Darjeeling gardens. Exposes clean, grassy notes with a sweet, floral finish. Extremely rich in epigallocatechin gallate (EGCG) antioxidants to support metabolism.
          </motion.p>

          {/* Specs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { title: "Leaf Grade", value: "FTGFOP Whole Leaf", icon: Leaf },
              { title: "Estate Origin", value: "Darjeeling High Altitude", icon: Coffee },
              { title: "Antioxidant Index", value: "Ultra High EGCG", icon: Activity },
              { title: "Taste Profile", value: "Sweet Grass & Lilac", icon: Sun },
            ].map((spec, idx) => (
              <div key={idx} className="glass-gold-static p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5 text-luxury-gold">
                  <spec.icon className="w-4 h-4" />
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-luxury-ivory/50">
                    {spec.title}
                  </span>
                </div>
                <div className="font-serif text-sm md:text-base text-luxury-ivory tracking-wide">
                  {spec.value}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <button
              onClick={() => scrollToSection("catalog")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              Explore Grades
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-luxury-gold text-luxury-black font-medium hover:bg-luxury-gold/90 flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              Inquire
            </button>
          </motion.div>
        </div>

        {/* Right Column: Product Image with Transparent Background */}
        <div className="w-full md:w-1/2 flex justify-center items-center z-20">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-80 h-96 md:w-[500px] md:h-[600px]"
          >
            <img
              src="/images/green tea/green tea.png"
              alt="Organic Premium Green Tea"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_40px_rgba(212,175,55,0.25)]"
            />
          </motion.div>
        </div>
      </div>

      {/* 5. Turmeric Health Tea (Image on Left, Text on Right) */}
      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-20 relative gap-12">
        {/* Left Column: Product Image with Transparent Background */}
        <div className="w-full md:w-1/2 flex justify-center items-center z-20 order-1 md:order-none">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-80 h-96 md:w-[500px] md:h-[600px]"
          >
            <img
              src="/images/turmeric/turmeric health.png"
              alt="Turmeric Health Wellness Tea"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_40px_rgba(212,175,55,0.25)]"
            />
          </motion.div>
        </div>

        {/* Right Column: Text */}
        <div className="w-full md:w-1/2 lg:w-5/12 text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-8 h-[1px] bg-luxury-gold/50"></span>
            <span className="text-xs md:text-sm tracking-[0.3em] font-medium text-luxury-gold uppercase">
              Ayurvedic Gold
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-luxury-ivory mb-6"
          >
            Turmeric Health <br />
            <span className="gold-gradient-text">Wellness Tea</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-luxury-ivory/70 leading-relaxed mb-8"
          >
            An exquisite wellness infusion blending organic turmeric root, ginger, black pepper (essential to multiply curcumin bio-absorption), and light green tea. A powerful anti-inflammatory and immunity-boosting tonic.
          </motion.p>

          {/* Specs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { title: "Curcumin Content", value: "Min 5.2% Certified", icon: Layers },
              { title: "Bio-Absorption Partner", value: "Organic Black Pepper", icon: Activity },
              { title: "Caffeine Level", value: "Extremely Low", icon: Coffee },
              { title: "Wellness Property", value: "Strong Anti-Inflam", icon: ShieldCheck },
            ].map((spec, idx) => (
              <div key={idx} className="glass-gold-static p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5 text-luxury-gold">
                  <spec.icon className="w-4 h-4" />
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-luxury-ivory/50">
                    {spec.title}
                  </span>
                </div>
                <div className="font-serif text-sm md:text-base text-luxury-ivory tracking-wide">
                  {spec.value}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <button
              onClick={() => scrollToSection("catalog")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              Product Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-luxury-gold text-luxury-black font-medium hover:bg-luxury-gold/90 flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              Inquire
            </button>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
