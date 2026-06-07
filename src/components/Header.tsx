"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Globe, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-luxury-black/85 backdrop-blur-md border-b border-luxury-gold/15 py-4 shadow-lg shadow-black/40"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full border border-luxury-gold flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <span className="text-luxury-gold font-serif text-lg font-bold">M</span>
            <div className="absolute inset-0.5 rounded-full border border-luxury-gold/30 animate-pulse"></div>
          </div>
          <div className="text-left">
            <span className="block font-serif text-base tracking-[0.2em] font-bold text-luxury-ivory uppercase group-hover:text-luxury-gold transition-colors duration-300">
              Millennium
            </span>
            <span className="block font-sans text-[9px] tracking-[0.45em] font-medium text-luxury-gold uppercase -mt-1">
              Thé Premium
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {[
            { name: "Collection", id: "showcase" },
            { name: "Catalog", id: "catalog" },
            { name: "Our Story", id: "origin" },
            { name: "Wellness", id: "wellness" },
            { name: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-medium tracking-widest text-luxury-ivory/70 hover:text-luxury-gold uppercase relative py-2 group focus:outline-none transition-colors duration-300 cursor-pointer"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Action Button & Language selector */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="flex items-center gap-1.5 text-[10px] text-luxury-ivory/60 hover:text-luxury-gold tracking-widest uppercase transition-colors">
            <Globe className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
          
          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-9 h-9 rounded-full border border-luxury-gold/30 text-luxury-ivory hover:text-luxury-gold hover:border-luxury-gold/60 transition-all cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-luxury-gold text-luxury-black text-[9px] font-bold flex items-center justify-center">
                {totalCount > 9 ? "9+" : totalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="btn-gold-shimmer text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border border-luxury-gold/50 flex items-center gap-2 group cursor-pointer"
          >
            Contact Us
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile: Cart + Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative flex items-center justify-center w-9 h-9 rounded-full border border-luxury-gold/30 text-luxury-ivory hover:text-luxury-gold transition-all cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-luxury-gold text-luxury-black text-[9px] font-bold flex items-center justify-center">
                {totalCount > 9 ? "9+" : totalCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-luxury-ivory hover:text-luxury-gold focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-luxury-black/98 border-l border-luxury-gold/15 backdrop-blur-xl z-40 transform transition-transform duration-500 shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-12 justify-between">
          <div className="flex flex-col gap-5">
            {[
              { name: "The Collection", id: "showcase" },
              { name: "Product Catalog", id: "catalog" },
              { name: "Our Story", id: "origin" },
              { name: "Wellness Benefits", id: "wellness" },
              { name: "Contact Us", id: "contact" },
            ].map((item, idx) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-left font-serif text-xl tracking-wider text-luxury-ivory hover:text-luxury-gold transition-colors py-2 border-b border-luxury-ivory/5 focus:outline-none cursor-pointer"
              >
                <span className="text-[10px] font-sans text-luxury-gold/50 tracking-widest mr-4">0{idx + 1}</span>
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-gold-shimmer w-full text-center text-sm tracking-widest uppercase py-3.5 rounded-full flex items-center justify-center gap-2 group cursor-pointer"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <div className="flex items-center justify-between text-xs text-luxury-ivory/50 mt-4 border-t border-luxury-ivory/5 pt-4">
              <span>Millennium Tea</span>
              <button className="flex items-center gap-1 hover:text-luxury-gold">
                <Globe className="w-3.5 h-3.5" />
                <span>Global Exports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
