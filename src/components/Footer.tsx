"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full z-10 bg-luxury-black border-t border-luxury-gold/10 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 mb-6 focus:outline-none text-left cursor-pointer group"
            >
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src="/logo/gold.svg"
                  alt="Millennium Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block font-serif text-lg tracking-[0.2em] font-bold text-luxury-ivory uppercase group-hover:text-luxury-gold transition-colors duration-300">
                  Millennium
                </span>
                <span className="block font-sans text-[10px] tracking-[0.4em] font-medium text-luxury-gold uppercase -mt-1">
                  Thé Premium
                </span>
              </div>
            </button>
            <p className="text-xs md:text-sm text-luxury-ivory/55 leading-relaxed max-w-sm">
              Millennium Premium Tea is an artisanal tea brand based in Anachal, Munnar, Kerala. We craft and supply premium handcrafted tea blends — Masala, Ginger, Lemon, Green, and Turmeric — from the lush highlands of Idukki.
            </p>
          </div>

          {/* Col 2: Site Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.3em] font-bold text-luxury-gold uppercase mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3 text-xs md:text-sm">
              {[
                { name: "The Collection", id: "showcase" },
                { name: "Product Catalog", id: "catalog" },
                { name: "Sourcing Estates", id: "origin" },
                { name: "Wellness Benefits", id: "wellness" },
                { name: "Contact Desk", id: "contact" },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-luxury-ivory/60 hover:text-luxury-gold transition-colors focus:outline-none cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal & Compliance */}
          <div>
            <h4 className="text-xs tracking-[0.3em] font-bold text-luxury-gold uppercase mb-6">
              Legal & Compliance
            </h4>
            <ul className="flex flex-col gap-3 text-xs md:text-sm text-luxury-ivory/60">
              <li>
                <a href="#" className="hover:text-luxury-gold transition-colors">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-luxury-gold transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-luxury-gold transition-colors">
                  Social Impact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care */}
          <div>
            <h4 className="text-xs tracking-[0.3em] font-bold text-luxury-gold uppercase mb-6">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-3 text-xs md:text-sm text-luxury-ivory/60">
              <li>
                <Link href="/privacy-policy" className="hover:text-luxury-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-luxury-gold transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-luxury-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-luxury-gold transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-luxury-gold transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-luxury-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[11px] md:text-xs text-luxury-ivory/40 tracking-wider">
            © {new Date().getFullYear()} Millennium Premium Tea, Munnar. All rights reserved.
          </span>

          {/* Socials & Scroll to Top */}
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <a
                href="mailto:millenniumpremiumtea@gmail.com"
                className="p-2 rounded-full bg-luxury-charcoal hover:bg-luxury-gold/15 text-luxury-ivory/60 hover:text-luxury-gold transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/message/WXU5NCOSMGVRE1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-luxury-charcoal hover:bg-[#25D366]/20 text-luxury-ivory/60 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-luxury-charcoal hover:bg-luxury-gold/15 text-luxury-ivory/60 hover:text-luxury-gold transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-luxury-charcoal hover:bg-luxury-gold/15 text-luxury-ivory/60 hover:text-luxury-gold transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-luxury-charcoal border border-luxury-gold/25 hover:border-luxury-gold text-luxury-gold transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
