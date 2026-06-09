"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Award, Compass, Scale, Box, ArrowUpRight, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Grade {
  name: string;
  size: string;
  desc: string;
  density?: string;
  oil?: string;
  antioxidant?: string;
}

interface TeaProduct {
  id: string;
  name: string;
  botanicalName: string;
  tagline: string;
  origin: string;
  image: string;
  description: string;
  grades: Grade[];
  specs: { label: string; value: string }[];
  packaging: string[];
}

const teaData: TeaProduct[] = [
  {
    id: "masala",
    name: "Special Masala Tea Powder",
    botanicalName: "Camellia sinensis blended with Elettaria & Cinnamomum",
    tagline: "A Harmonious Heritage Blend of Bold Assam Leaves & Fresh Spices",
    origin: "Assam Valley estates (CTC) & Western Ghats spices",
    image: "/images/masalatea/special masala tea.png",
    description: "Millennium's Special Masala Tea is an exquisite blend of high-grade CTC black tea and five freshly-ground organic spices: Cardamom, Cinnamon, Cloves, Ginger, and Black Pepper. Hand-blended in small batches to guarantee an authentic, rich spice profile.",
    grades: [
      { name: "Royal Reserve (Grade A)", size: "Super Fine Dust", desc: "Our highest grade blend. Fine-cut CTC leaves optimized for rapid spice infusion and maximum strength.", oil: "2.8% min spice oil" },
      { name: "Orthodox Special (Grade B)", size: "Brokens (BOP)", desc: "Whole-leaf orthodox black tea blended with coarse spice flakes for slow brewing.", oil: "2.4% min spice oil" }
    ],
    specs: [
      { label: "Moisture Content", value: "8.5% Maximum" },
      { label: "Spice Blend Proportion", value: "15.0% by weight (Fresh Ground)" },
      { label: "CTC Leaf Size", value: "Grade PF/PD (Primary Dust)" },
      { label: "Extraneous Matter", value: "Nil (100% triple stage clean)" },
      { label: "Shelf Life", value: "18 Months in Sealed Canister" }
    ],
    packaging: [
      "Airtight Nitrogen-flushed gold lining pouch (250g)",
      "Premium glassmorphic luxury metal tin (250g)"
    ]
  },
  {
    id: "ginger",
    name: "Ginger Tea Powder",
    botanicalName: "Camellia sinensis blended with Zingiber officinale",
    tagline: "Warm Zesty Radiance Combined with Rich Malabar Black Tea",
    origin: "High-grade Assam estates & Wayanad dried ginger farms",
    image: "/images/ginger tea/ginger tea transparent.png",
    description: "Our Ginger Tea blends rich Orthodox Assam tea with organic, sun-dried ginger root flakes and extract. Developed specifically for wellness and respiratory care, it features a warm, bold flavor profile with a delightful, throat-soothing kick.",
    grades: [
      { name: "Zesty Gold Blend", size: "Fine Leaf Blend", desc: "Aromatic black tea leaves combined with microscopic gingerol-rich powder. Outstanding spice release.", oil: "5.2% gingerol content" },
      { name: "Classic Ginger CTC", size: "Pekoe Dust (PD)", desc: "Quick-brewing premium CTC blended with natural dried ginger granules.", oil: "4.5% gingerol content" }
    ],
    specs: [
      { label: "Moisture Content", value: "9.0% Maximum" },
      { label: "Ginger Flakes Proportion", value: "10.0% by weight" },
      { label: "Tea Infusion Speed", value: "Under 3 minutes at 95°C" },
      { label: "Gingerol Concentration", value: "High-potency (Active wellness)" },
      { label: "Pesticide Residue", value: "Nil (Organic Certified Sourcing)" }
    ],
    packaging: [
      "Signature matte black zip-lock standing pouch (250g)",
      "Luxury double-lid metal canister (250g)"
    ]
  },
  {
    id: "lemon",
    name: "Lemon Tea",
    botanicalName: "Camellia sinensis infused with Citrus limon",
    tagline: "Zesty Citrus Brightness Crafted for Cool Rejuvenation",
    origin: "Nilgiri Highlands (1600m+ altitude) & Nagpur citrus estates",
    image: "/images/lemontea/lemon tea.png",
    description: "Lemon Tea from Millennium is a refreshing blend of cold-pressed lemon oil and premium Nilgiri Pekoe black tea. Sourced from Nilgiri gardens, the low-tannin tea base is exceptionally smooth, offering a bright, crisp taste profile.",
    grades: [
      { name: "Citrus Pekoe Blend", size: "Whole Leaf (OP)", desc: "Orange Pekoe leaves infused with essential lemon oils. Ideal for hot tea without milk.", oil: "Real lemon extract" },
      { name: "Imperial Lemon Soluble", size: "Instant Micro-crystals", desc: "Premium instant black tea extract infused with real lemon juice powder.", oil: "Vitamin C enriched" }
    ],
    specs: [
      { label: "Solubility (Instant)", value: "100% in hot or cold water" },
      { label: "Tannin Level", value: "Very low (Smooth, non-bitter finish)" },
      { label: "pH Range (diluted)", value: "5.2 - 5.6 (Perfect balance)" },
      { label: "Vitamin C Content", value: "Added nutritional support" },
      { label: "Flavoring Agent", value: "100% Natural Cold-pressed Lemon Oil" }
    ],
    packaging: [
      "Eco-conscious biodegradable pyramid tea bags (250g total weight)",
      "Hermetic tin container with gold pull-ring (250g)"
    ]
  },
  {
    id: "green",
    name: "Green Tea",
    botanicalName: "Camellia sinensis (Unfermented Leaf)",
    tagline: "Pristine Whole-Leaf Jade Sourced from Emerald Darjeeling Slopes",
    origin: "Darjeeling First-Flush estates & organic tea gardens",
    image: "/images/green tea/green tea.png",
    description: "Crafted exclusively from early spring handpicked tea leaves in Darjeeling. Steamed immediately to halt oxidation, our Green Tea retains its vivid green color, natural grassy character, and complex floral finish, high in EGCG.",
    grades: [
      { name: "Imperial Jade Tips", size: "Whole Leaf (FTGFOP1)", desc: "Premium First-Flush tips. Sweet floral notes with a clear, straw-yellow liquor. Zero bitterness.", antioxidant: "EGCG: 12.5% dry weight" },
      { name: "Sencha Style Roll", size: "Rolled Needle Leaves", desc: "Traditional pan-fired leaves with a rich, vegetal, toasted rice flavor profile.", antioxidant: "EGCG: 10.8% dry weight" }
    ],
    specs: [
      { label: "Oxidation Level", value: "0% (Strictly pan-fired / steamed)" },
      { label: "Catechin EGCG Level", value: "11.0% - 13.0% (Metabolic booster)" },
      { label: "Caffeine Content", value: "Low (Approx 20mg per cup)" },
      { label: "Color index (liquor)", value: "Pale jade green to straw yellow" },
      { label: "Purity Standard", value: "100% Organic certified (USDA/NOP)" }
    ],
    packaging: [
      "Luxury canister with hand-tied satin ribbon wrapper (250g)",
      "Nitrogen barrier standing bag with zip-lock (250g)"
    ]
  },
  {
    id: "turmeric",
    name: "Turmeric Health Tea",
    botanicalName: "Camellia sinensis blended with Curcuma longa",
    tagline: "An Ayurvedic Golden Elixir of Anti-Inflammatory Wellness",
    origin: "High-curcumin Turmeric from Meghalaya & Organic Green Tea",
    image: "/images/turmeric/image_55e2b90e.png",
    description: "An Ayurvedic powerhouse combining premium organic green tea, turmeric root, ginger, and a dash of black pepper. The piperine in black pepper increases curcumin absorption by up to 2000%, offering a powerful wellness tonic.",
    grades: [
      { name: "Golden Elixir Reserve", size: "Cut-Leaf & Root Flakes", desc: "A blend of coarse-cut green tea leaves, dried turmeric root chunks, and cracked pepper.", antioxidant: "Curcuminoids: 5.5% min" },
      { name: "Instant Turmeric Latte Base", size: "Micro-powder Blend", desc: "A caffeine-free herbal mixture of organic turmeric, ginger, and cardamom powder.", antioxidant: "Curcuminoids: 6.2% min" }
    ],
    specs: [
      { label: "Curcuminoid Content", value: "5.0% - 6.5% (High potency)" },
      { label: "Active Bio-availability", value: "Enhanced with organic piperine (1.5%)" },
      { label: "Flavor Profile", value: "Earthy, Peppery, Warm, Ayurvedic" },
      { label: "Pesticide & Heavy Metals", value: "Zero (Independently certified)" },
      { label: "Brewing Time", value: "4-5 minutes in boiling water" }
    ],
    packaging: [
      "Luxury golden metal canister (250g)",
      "Resealable multi-layered stand-up pouch (250g)"
    ]
  }
];

const sizes = ["250g"];

export default function Catalog() {
  const [activeTab, setActiveTab] = useState<string>("masala");
  const [selectedGrade, setSelectedGrade] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("250g");
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addItem } = useCart();

  const activeProduct = teaData.find((item) => item.id === activeTab)!;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedGrade(0);
    setSelectedSize("250g");
  };

  // Price map (in INR) — TEMP: all set to ₹1 for payment testing
  const priceMap: Record<string, number> = {
    masala: 1,
    ginger: 1,
    lemon: 1,
    green: 1,
    turmeric: 1,
  };

  const handleAddToCart = () => {
    addItem({
      id: activeProduct.id,
      name: activeProduct.name,
      image: activeProduct.image,
      size: selectedSize,
      grade: activeProduct.grades[selectedGrade]?.name ?? "Standard",
      price: priceMap[activeProduct.id] ?? 349,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const handleBuyAction = () => {
    const text = encodeURIComponent(
      `Hello Millennium, I am interested in purchasing ${activeProduct.name} (250g pack). Please provide the payment and shipping details.`
    );
    window.open(`https://wa.me/919446056672?text=${text}`, "_blank");
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="catalog" className="relative w-full z-10 py-32 bg-luxury-black overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm tracking-[0.4em] font-medium text-luxury-gold uppercase block mb-3">
            Exquisite Offerings
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-luxury-ivory mb-6">
            Product <span className="gold-gradient-text">Catalog</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-luxury-ivory/60 max-w-xl mx-auto leading-relaxed">
            Discover our reserve collection, strictly sorted and packed under inert atmosphere according to the highest luxury standards.
          </p>

          {/* Catalog Tab Toggle - Horizontal Scrollable on Mobile */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 max-w-4xl mx-auto">
            {teaData.map((tea) => (
              <button
                key={tea.id}
                onClick={() => handleTabChange(tea.id)}
                className={`px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-500 cursor-pointer ${
                  activeTab === tea.id
                    ? "bg-luxury-gold text-luxury-black shadow-lg shadow-luxury-gold/25"
                    : "border border-luxury-gold/20 text-luxury-ivory/60 hover:border-luxury-gold hover:text-luxury-gold bg-black/20"
                }`}
              >
                {tea.name.replace(" Powder", "").replace(" Tea", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Left Col: Image & Description (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden glass-gold mb-8 group">
                <Image
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Decorative border */}
                <div className="absolute inset-4 rounded-xl border border-luxury-gold/10 pointer-events-none"></div>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-luxury-ivory mb-2">
                {activeProduct.name}
              </h3>
              <p className="text-xs text-luxury-gold tracking-widest uppercase mb-4 font-semibold">
                {activeProduct.botanicalName}
              </p>
              <p className="text-sm text-luxury-ivory/60 leading-relaxed mb-6">
                {activeProduct.description}
              </p>
              
              <div className="flex items-center gap-3 text-xs text-luxury-gold font-medium tracking-wider uppercase border-t border-luxury-gold/10 pt-4 w-full justify-center lg:justify-start mb-6">
                <Compass className="w-4 h-4" />
                <span>Origin: {activeProduct.origin}</span>
              </div>

              {/* Pack Size & Buy Now Action */}
              <div className="w-full glass-gold-static p-6 rounded-2xl border border-luxury-gold/10 bg-black/40">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-luxury-gold">
                    Pack Size
                  </h4>
                  <span className="text-sm font-semibold text-luxury-ivory uppercase tracking-wider bg-luxury-gold/10 px-3 py-1 rounded-lg border border-luxury-gold/20">
                    250g
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-luxury-gold/10 pt-4">
                  <div>
                    <span className="text-[10px] text-luxury-ivory/50 uppercase tracking-widest block mb-0.5">Price</span>
                    <span className="text-xs font-sans text-luxury-gold/90 font-bold tracking-wide">
                      Disclosed on Chat
                    </span>
                  </div>
                  <button
                    onClick={handleBuyAction}
                    className="btn-gold-shimmer py-3.5 px-6 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                  >
                    Buy Now
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Col: Grades, Specs, Packaging (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Grades Tabs */}
              <div className="glass-gold-static p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4 text-luxury-gold">
                  <Award className="w-5 h-5" />
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-luxury-ivory">
                    Available Handpicked Grades
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeProduct.grades.map((grade, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGrade(idx)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        selectedGrade === idx
                          ? "bg-luxury-gold/10 border-luxury-gold"
                          : "border-luxury-gold/10 hover:border-luxury-gold/30 bg-black/25"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-sm md:text-base text-luxury-ivory font-bold">
                          {grade.name}
                        </span>
                        <span className="text-[10px] bg-luxury-gold text-luxury-black font-semibold px-2 py-0.5 rounded">
                          {grade.size}
                        </span>
                      </div>
                      <p className="text-xs text-luxury-ivory/55 leading-normal mb-2">
                        {grade.desc}
                      </p>
                      <div className="flex gap-4 text-[10px] text-luxury-gold font-semibold uppercase">
                        {grade.oil && <span>Spice Oils: {grade.oil}</span>}
                        {grade.antioxidant && <span>{grade.antioxidant}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Specifications */}
              <div className="glass-gold-static p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4 text-luxury-gold">
                  <Scale className="w-5 h-5" />
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-luxury-ivory">
                    Sourcing & Chemical Specifications
                  </h4>
                </div>
                <div className="flex flex-col divide-y divide-luxury-gold/10">
                  {activeProduct.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 text-xs md:text-sm">
                      <span className="text-luxury-ivory/60 font-medium">{spec.label}</span>
                      <span className="text-luxury-ivory font-serif tracking-wide text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packaging Solutions */}
              <div className="glass-gold-static p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4 text-luxury-gold">
                  <Box className="w-5 h-5" />
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-luxury-ivory">
                    Signature Preservation Packaging
                  </h4>
                </div>
                <ul className="flex flex-col gap-2">
                  {activeProduct.packaging.map((pack, idx) => (
                    <li key={idx} className="flex gap-3 text-xs md:text-sm items-start text-luxury-ivory/70">
                      <ChevronRight className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                      <span>{pack}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-xl text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 group cursor-pointer transition-all duration-300 border ${
                    addedFeedback
                      ? "bg-luxury-gold text-luxury-black border-luxury-gold"
                      : "border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/10"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedFeedback ? "Added ✓" : "Add to Cart"}
                </button>

                {/* Buy via WhatsApp */}
                <button
                  onClick={handleBuyAction}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Buy on WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
