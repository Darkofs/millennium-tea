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

  return (
    <>
      {/* Luxury Navigation */}
      <Header />

      {/* Scrollable Storytelling Experience */}
      <main className="relative z-10 w-full">
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
