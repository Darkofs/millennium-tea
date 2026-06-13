"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Shield, Sparkles, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1834",
    title: "Origins of Indian Tea",
    description: "The first commercial tea plants are cultivated in Kannan Deven Hills, establishing India as a world-class tea grower.",
  },
  {
    year: "1912",
    title: "Millennium Founded",
    description: "Founded in Darjeeling to harvest first-flush orthodox leaves, catering exclusively to royal courts demanding pure, unblended tea.",
  },
  {
    year: "1980s",
    title: "Embracing Organic Sourcing",
    description: "Our gardens transition away from synthetic inputs, pioneering biodynamic farming in Darjeeling and Kannan Deven Hills.",
  },
  {
    year: "Present Day",
    title: "Global Export & Wellness Blends",
    description: "Exporting premium single-estate CTC and Orthodox teas, plus clinical-grade wellness infusions, to connoisseurs across 30+ countries.",
  },
];

export default function OurStory() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = timelineRef.current?.querySelectorAll(".story-card");
    if (!cards || cards.length === 0) return;

    let loopAnim: gsap.core.Tween | null = null;

    const anim = gsap.fromTo(
      cards,
      { opacity: 0, y: 80, rotateY: 0 },
      {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        keyframes: {
          y: [80, -20, 8, -2, 0],
          ease: "none",
          easeEach: "power2.inOut",
        },
        rotateY: 360,
        ease: "elastic.out(1, 0.75)",
        duration: 1.8,
        stagger: 0.15,
        onComplete: () => {
          gsap.set(cards, { clearProps: "transform,y,rotateY" });

          loopAnim = gsap.to(cards, {
            rotateY: "+=360",
            keyframes: {
              y: [0, -15, 5, -2, 0],
              ease: "none",
              easeEach: "power2.inOut",
            },
            ease: "elastic.out(1, 0.75)",
            duration: 1.8,
            stagger: 0.2,
            repeat: -1,
            repeatDelay: 7,
          });
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
      if (loopAnim) loopAnim.kill();
    };
  }, []);

  return (
    <section id="origin" className="relative w-full z-10 py-32 bg-luxury-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
          <div className="lg:col-span-7">
            <span className="text-xs md:text-sm tracking-[0.4em] font-medium text-luxury-gold uppercase block mb-3">
              The Heritage of Leaves
            </span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-luxury-ivory">
              Sourced from Pristine <br />
              <span className="gold-gradient-text">Highlands</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-sm md:text-base text-luxury-ivory/60 leading-relaxed">
              Nestled at elevations of 1,600 meters in Darjeeling, Kannan Deven Hills, and Nilgiri, our partner gardens enjoy unique volcanic soils, clean mountain air, and abundant monsoonal rains, producing teas of unparalleled depth and aroma.
            </p>
          </div>
        </div>

        {/* Plantation Parallax Image Card */}
        <div className="relative w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden glass-gold mb-24 group">
          <Image
            src="/tea-plantation.png"
            alt="Misty Tea Plantation"
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            priority
          />
          {/* Elegant gold mesh dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent"></div>
          
          {/* Card overlay info */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-md">
              <span className="text-[10px] bg-luxury-gold text-luxury-black font-semibold tracking-widest uppercase px-3 py-1 rounded mb-3 inline-block">
                Estate Spotlight
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-luxury-ivory leading-tight">
                Munnar & Darjeeling Slopes
              </h3>
              <p className="text-xs md:text-sm text-luxury-ivory/85 mt-2 leading-relaxed">
                Cool alpine breezes allow the tea leaves to grow slowly, developing higher concentrations of natural EGCG antioxidants, polyphenols, and aromatic essential oils.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="glass-gold-static px-4 py-2 rounded-xl text-center">
                <span className="block text-xs font-sans text-luxury-gold uppercase tracking-widest">Altitude</span>
                <span className="text-sm font-serif font-bold text-luxury-ivory">1,600m+</span>
              </div>
              <div className="glass-gold-static px-4 py-2 rounded-xl text-center">
                <span className="block text-xs font-sans text-luxury-gold uppercase tracking-widest">Rainfall</span>
                <span className="text-sm font-serif font-bold text-luxury-ivory">3,200mm/yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Sustainable Agriculture (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-xs tracking-widest text-luxury-gold font-medium uppercase block mb-2">Sustainable Legacy</span>
              <h4 className="font-serif text-2xl text-luxury-ivory mb-4">Biodiverse Tea Gardens</h4>
              <p className="text-sm text-luxury-ivory/60 leading-relaxed">
                We believe that premium tea requires a thriving ecosystem. Our gardens practice biodiverse agroforestry, shade-grown agriculture, and rainwater harvesting. By avoiding chemical fertilizers, we protect local rivers and native wildlife, ensuring a clean leaf that requires no washing.
              </p>
            </div>

            {/* Icons list */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-xl bg-luxury-gold/10 text-luxury-gold shrink-0 mt-0.5">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-serif text-luxury-ivory font-bold mb-1">Purity Checked</h5>
                  <p className="text-xs text-luxury-ivory/55">Strict zero-chemical policies. Every batch is lab-tested for heavy metals and pesticides.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-xl bg-luxury-gold/10 text-luxury-gold shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-serif text-luxury-ivory font-bold mb-1">Direct Trade Sourcing</h5>
                  <p className="text-xs text-luxury-ivory/55">Fair trade premium prices paid directly to our estate pluckers, supporting local schools.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-xl bg-luxury-gold/10 text-luxury-gold shrink-0 mt-0.5">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-serif text-luxury-ivory font-bold mb-1">Eco-Conscious Processing</h5>
                  <p className="text-xs text-luxury-ivory/55">Solar-assisted drying and traditional hand-rolling techniques preserve leaf integrity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Historical Timeline (7 cols) */}
          <div className="lg:col-span-7">
            <span className="text-xs tracking-widest text-luxury-gold font-medium uppercase block mb-4">Tea History Timeline</span>
            <div
              ref={timelineRef}
              className="relative border-l border-luxury-gold/20 pl-6 md:pl-10 ml-4 flex flex-col gap-10 perspective-container"
            >
              {timelineEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="story-card relative group"
                >
                  {/* Timeline circle point */}
                  <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-luxury-black border border-luxury-gold flex items-center justify-center transition-all duration-300 group-hover:scale-125">
                    <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold"></div>
                  </div>

                  <div className="glass-gold-static p-6 rounded-2xl relative">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-4 h-4 text-luxury-gold" />
                      <span className="text-xs font-sans font-bold text-luxury-gold tracking-widest uppercase">
                        {event.year}
                      </span>
                    </div>
                    <h5 className="font-serif text-base md:text-lg text-luxury-ivory font-bold mb-2">
                      {event.title}
                    </h5>
                    <p className="text-xs md:text-sm text-luxury-ivory/60 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
