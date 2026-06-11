"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Flame, Leaf, Snowflake, Activity, X, Droplet, Clock, Thermometer, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CollectionItem {
  id: string;
  name: string;
  tagline: string;
  type: string;
  ingredients: string;
  brewingTemp: string;
  brewingTime: string;
  caffeine: string;
  strength: number; // 1-5
  flavorNotes: string[];
  description: string;
  colorTheme: string; // for custom gradient highlights
  icon: React.ComponentType<{ className?: string }>;
}

const collectionItems: CollectionItem[] = [
  {
    id: "masala",
    name: "Special Masala Tea Powder",
    tagline: "Assam CTC Blended with Hand-Ground Organic Spices",
    type: "Warming Black Tea",
    ingredients: "Assam CTC Tea, Cardamom, Cinnamon, Cloves, Ginger, Black Pepper",
    brewingTemp: "95°C / 203°F",
    brewingTime: "3-4 Mins",
    caffeine: "Medium-High",
    strength: 5,
    flavorNotes: ["Warm Spices", "Robust Malty", "Sharp Clove", "Sweet Cardamom"],
    description: "Our signature blend crafted from select gardens in the Brahmaputra Valley of Assam. We hand-grind the spices in traditional stone mills just hours before blending to preserve their vital aromatic oils, delivering a robust cup with a pleasant, lingering warmth.",
    colorTheme: "from-amber-600/20 to-red-950/40",
    icon: Flame,
  },
  {
    id: "ginger",
    name: "Ginger Tea Powder",
    tagline: "Strong Black Tea Sourced with Fresh Ginger Granules",
    type: "Invigorating Black Tea",
    ingredients: "Assam Black Tea, Sun-Dried Ginger Root Granules, Ginger Extract",
    brewingTemp: "95°C / 203°F",
    brewingTime: "3 Mins",
    caffeine: "Medium",
    strength: 4,
    flavorNotes: ["Fiery Zest", "Earthiness", "Sharp Spice", "Soothing Sweetness"],
    description: "Perfect for chilly mornings or as a mid-afternoon digestive aid. Sourced from the moist ginger estates of Wayanad, Kerala, the ginger root is dried at controlled temperatures to lock in high levels of natural active gingerol compounds.",
    colorTheme: "from-yellow-600/20 to-amber-950/40",
    icon: Coffee,
  },
  {
    id: "lemon",
    name: "Lemon Tea",
    tagline: "Crisp Citrus Blended with Low-Tannin Nilgiri Leaves",
    type: "Refreshing Citrus Tea",
    ingredients: "Nilgiri Black Tea, Lemon Peel, Natural Cold-Pressed Lemon Oil",
    brewingTemp: "85°C / 185°F",
    brewingTime: "2-3 Mins",
    caffeine: "Low-Medium",
    strength: 2,
    flavorNotes: ["Tangy Citrus", "Clean Vegetal", "Floral Honey", "Crisp Sensation"],
    description: "Sourced from high-altitude Nilgiri gardens in Southern India, this light-bodied tea base possesses very low tannin levels, meaning it never gets bitter. Infused with natural cold-pressed lemon oils, it serves as a wonderful iced summer cooler.",
    colorTheme: "from-yellow-500/25 to-yellow-950/30",
    icon: Snowflake,
  },
  {
    id: "green",
    name: "Green Tea",
    tagline: "Early Spring First-Flush Leaves from Darjeeling gardens",
    type: "Organic Whole Leaf Green",
    ingredients: "100% Organic First-Flush Darjeeling Green Tea leaves",
    brewingTemp: "75°C / 167°F",
    brewingTime: "2 Mins",
    caffeine: "Low",
    strength: 2,
    flavorNotes: ["Sweet Clover", "Fresh Cut Grass", "Floral Lilac", "Vegetal"],
    description: "Darjeeling first-flush tea leaves are steamed immediately after harvest to stop fermentation and preserve their raw emerald green color. This organic crop yields a pale green liquor packed with refreshing catechins (EGCG) and L-theanine.",
    colorTheme: "from-emerald-600/20 to-green-950/40",
    icon: Leaf,
  },
  {
    id: "turmeric",
    name: "Turmeric Health Tea",
    tagline: "Ayurvedic Blend of Meghalaya Turmeric & Green Tea",
    type: "Anti-Inflammatory Herbal Tonic",
    ingredients: "Green Tea, Meghalaya Turmeric Root, Ginger, Organic Black Pepper",
    brewingTemp: "90°C / 194°F",
    brewingTime: "4 Mins",
    caffeine: "Very Low",
    strength: 3,
    flavorNotes: ["Earthy Curcumin", "Peppery Bite", "Zesty Undertones", "Herbaceous"],
    description: "A traditional wellness formulation utilizing high-curcumin Lakadong turmeric from Meghalaya. Combined with a micro-dose of organic black pepper, it elevates the bioavailability of anti-inflammatory curcumin by 20x for ultimate body recovery.",
    colorTheme: "from-yellow-600/30 to-amber-900/40",
    icon: Activity,
  },
];

export default function FeaturedCollection() {
  const [selectedProduct, setSelectedProduct] = useState<CollectionItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".collection-card");
    cards.forEach((card: any) => {
      // Dynamically add a glare element
      if (!card.querySelector(".card-glare")) {
        const glare = document.createElement("div");
        glare.className = "card-glare absolute inset-0 pointer-events-none opacity-0 z-20 rounded-2xl";
        card.appendChild(glare);
      }

      const glareEl = card.querySelector(".card-glare");

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotX = -(y / (rect.height / 2)) * 12;
        const rotY = (x / (rect.width / 2)) * 12;

        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        gsap.to(card, {
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1200,
          scale: 1.03,
          boxShadow: "0 22px 45px rgba(0, 0, 0, 0.65), 0 0 30px rgba(212, 175, 55, 0.18)",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (glareEl) {
          gsap.to(glareEl, {
            opacity: 1,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(212, 175, 55, 0.15) 0%, transparent 65%)`,
            duration: 0.2,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          duration: 0.6,
          ease: "elastic.out(1, 0.6)",
          overwrite: "auto",
        });

        if (glareEl) {
          gsap.to(glareEl, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const rect = card.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;

        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          const rotX = -(y / (rect.height / 2)) * 12;
          const rotY = (x / (rect.width / 2)) * 12;

          const glareX = ((touch.clientX - rect.left) / rect.width) * 100;
          const glareY = ((touch.clientY - rect.top) / rect.height) * 100;

          gsap.to(card, {
            rotateX: rotX,
            rotateY: rotY,
            transformPerspective: 1200,
            scale: 1.03,
            boxShadow: "0 22px 45px rgba(0, 0, 0, 0.65), 0 0 30px rgba(212, 175, 55, 0.18)",
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (glareEl) {
            gsap.to(glareEl, {
              opacity: 1,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(212, 175, 55, 0.15) 0%, transparent 65%)`,
              duration: 0.2,
              ease: "power1.out",
              overwrite: "auto",
            });
          }
        } else {
          handleMouseLeave();
        }
      };

      const handleTouchEnd = () => {
        handleMouseLeave();
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
      card.addEventListener("touchmove", handleTouchMove, { passive: true });
      card.addEventListener("touchend", handleTouchEnd, { passive: true });

      card._cleanupTilt = () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
        card.removeEventListener("touchmove", handleTouchMove);
        card.removeEventListener("touchend", handleTouchEnd);
      };
    });

    // ScrollTrigger entrance animation
    let entryAnim: gsap.core.Tween | null = null;
    let loopAnim: gsap.core.Tween | null = null;
    if (cards.length > 0) {
      entryAnim = gsap.fromTo(
        cards,
        { opacity: 0, y: 100, rotateY: 0 },
        {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          keyframes: {
            y: [100, -25, 10, -3, 0],
            ease: "none",
            easeEach: "power2.inOut",
          },
          rotateY: 360,
          ease: "elastic.out(1, 0.75)",
          duration: 2.2,
          stagger: 0.12,
          onComplete: () => {
            cards.forEach((card: any) => {
              gsap.set(card, { clearProps: "transform,y,rotateY" });
            });

            // Start a constant rotating loop
            loopAnim = gsap.to(cards, {
              rotateY: "+=360",
              keyframes: {
                y: [0, -15, 5, -2, 0],
                ease: "none",
                easeEach: "power2.inOut",
              },
              ease: "elastic.out(1, 0.75)",
              duration: 1.8,
              stagger: 0.15,
              repeat: -1,
              repeatDelay: 8,
            });
          },
        }
      );
    }

    return () => {
      cards.forEach((card: any) => {
        if (card._cleanupTilt) card._cleanupTilt();
      });
      if (entryAnim) {
        if (entryAnim.scrollTrigger) entryAnim.scrollTrigger.kill();
        entryAnim.kill();
      }
      if (loopAnim) loopAnim.kill();
    };
  }, []);

  const scrollToContact = () => {
    setSelectedProduct(null);
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="collection" className="relative w-full z-10 py-32 bg-luxury-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs md:text-sm tracking-[0.4em] font-medium text-luxury-gold uppercase block mb-3">
            Millennium Signature
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-luxury-ivory mb-6">
            Featured <span className="gold-gradient-text">Collection</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-luxury-ivory/60 max-w-xl mx-auto leading-relaxed">
            Five signature formulations crafted exclusively for discerning tea lovers seeking wellness, deep flavor, and everyday luxury.
          </p>
        </div>

        {/* Products Grid with 3D perspective wrapper */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 perspective-container"
        >
          {collectionItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="collection-card glass-gold p-6 rounded-2xl flex flex-col justify-between cursor-pointer relative group overflow-hidden h-[340px]"
            >
              {/* Custom background gradient highlight */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.colorTheme} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              <div className="relative z-10">
                {/* Icon top */}
                <div className="w-10 h-10 rounded-xl bg-luxury-charcoal border border-luxury-gold/15 flex items-center justify-center text-luxury-gold mb-6 group-hover:border-luxury-gold group-hover:bg-luxury-gold/20 transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>

                <span className="text-[10px] tracking-widest text-luxury-gold uppercase font-semibold block mb-2">
                  {item.type}
                </span>

                <h3 className="font-serif text-lg text-luxury-ivory font-bold mb-3 tracking-wide leading-tight group-hover:text-luxury-gold transition-colors duration-300">
                  {item.name.replace(" Powder", "")}
                </h3>

                <p className="text-[11px] text-luxury-ivory/60 leading-relaxed line-clamp-3">
                  {item.tagline}
                </p>
              </div>

              {/* Card Footer: Quick Details Link */}
              <div className="relative z-10 border-t border-luxury-gold/10 pt-4 flex justify-between items-center text-[10px] tracking-wider uppercase text-luxury-gold font-semibold mt-6">
                <span>Brew: {item.brewingTime}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
                  Details <X className="w-3 h-3 rotate-45" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-2xl bg-luxury-black border border-luxury-gold/20 rounded-3xl p-8 md:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-luxury-gold/10 text-luxury-ivory/60 hover:text-luxury-gold transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag & Title */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                  <selectedProduct.icon className="w-4 h-4" />
                </div>
                <span className="text-xs tracking-widest text-luxury-gold uppercase font-bold">
                  {selectedProduct.type}
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl text-luxury-ivory font-bold mb-3 tracking-wide">
                {selectedProduct.name}
              </h3>
              
              <p className="text-sm italic text-luxury-gold mb-6">
                "{selectedProduct.tagline}"
              </p>

              <p className="text-sm text-luxury-ivory/70 leading-relaxed mb-8 border-b border-luxury-gold/10 pb-6">
                {selectedProduct.description}
              </p>

              {/* Brewing Criteria & Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="glass-gold-static p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <Thermometer className="w-4.5 h-4.5 text-luxury-gold mb-2" />
                  <span className="text-[10px] text-luxury-ivory/50 uppercase mb-1">Temperature</span>
                  <span className="text-xs font-semibold text-luxury-ivory">{selectedProduct.brewingTemp}</span>
                </div>
                <div className="glass-gold-static p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <Clock className="w-4.5 h-4.5 text-luxury-gold mb-2" />
                  <span className="text-[10px] text-luxury-ivory/50 uppercase mb-1">Steep Time</span>
                  <span className="text-xs font-semibold text-luxury-ivory">{selectedProduct.brewingTime}</span>
                </div>
                <div className="glass-gold-static p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <Droplet className="w-4.5 h-4.5 text-luxury-gold mb-2" />
                  <span className="text-[10px] text-luxury-ivory/50 uppercase mb-1">Caffeine</span>
                  <span className="text-xs font-semibold text-luxury-ivory">{selectedProduct.caffeine}</span>
                </div>
                <div className="glass-gold-static p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <div className="flex gap-0.5 text-luxury-gold mb-2.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`w-1.5 h-3 rounded-full ${s <= selectedProduct.strength ? "bg-luxury-gold" : "bg-luxury-gold/20"}`}
                      ></span>
                    ))}
                  </div>
                  <span className="text-[10px] text-luxury-ivory/50 uppercase mb-1">Tea Strength</span>
                  <span className="text-xs font-semibold text-luxury-ivory">{selectedProduct.strength} / 5</span>
                </div>
              </div>

              {/* Ingredients & Tasting Notes */}
              <div className="flex flex-col gap-4 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-widest mb-2">Ingredients</h4>
                  <p className="text-xs text-luxury-ivory/70 leading-relaxed bg-black/20 border border-luxury-gold/10 p-3.5 rounded-xl">
                    {selectedProduct.ingredients}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-widest mb-2.5">Flavor Profile Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.flavorNotes.map((note) => (
                      <span key={note} className="text-xs bg-luxury-gold/10 border border-luxury-gold/25 text-luxury-gold px-3.5 py-1.5 rounded-full font-medium">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA button inside Modal */}
              <button
                onClick={scrollToContact}
                className="btn-gold-shimmer w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                Inquire For Product Details
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
