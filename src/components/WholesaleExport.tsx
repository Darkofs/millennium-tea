"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, Settings, Ship, Users, Gift, CheckCircle, ArrowUpRight } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const wholesaleServices: ServiceItem[] = [
  {
    id: "bulk-orders",
    name: "Flexible Bulk Orders",
    subtitle: "Direct Estate Volume Supply",
    description: "Sourced directly from our partner estates during primary harvest flushes, ensuring peak leaf freshness and consistency.",
    features: [
      "Low Minimum Order Quantities (from 50kg)",
      "Strict vacuum bulk packing under inert gas",
      "Consistent flavor profile year-round"
    ],
    icon: Container,
  },
  {
    id: "private-label",
    name: "Private Label Manufacturing",
    subtitle: "Custom Blends & Branding",
    description: "Formulate custom tea and wellness blends with our master sommeliers. Choose from custom canisters, boxes, or pyramid tea bags.",
    features: [
      "Custom flavor & wellness blending services",
      "Luxury canister, bag, and box templates",
      "Full regulatory and ingredient label design"
    ],
    icon: Settings,
  },
  {
    id: "global-shipping",
    name: "Temperature-Controlled Shipping",
    subtitle: "Secure International Logistics",
    description: "Exporting smoothly to Europe, North America, Middle East, and Asia. We handle all certificates of origin and customs clearance.",
    features: [
      "SGS quality inspections at dispatch",
      "Moisture-proof container linings",
      "Door-to-port or door-to-door delivery"
    ],
    icon: Ship,
  },
  {
    id: "partnerships",
    name: "Distributor Partnerships",
    subtitle: "Exclusive Territory Agreements",
    description: "Join our global network of luxury hospitality suppliers. We provide marketing collateral, sales support, and wholesale exclusivity.",
    features: [
      "Exclusive territory opportunities",
      "Premium marketing kits & tasting samples",
      "Dedicated commercial support executive"
    ],
    icon: Users,
  },
  {
    id: "premium-pkg",
    name: "Premium Packaging Solutions",
    subtitle: "Luxury Preservation Standards",
    description: "Protect the volatile essential oils in tea leaves. We package in double-lid canisters, gold-foils, and wooden chests.",
    features: [
      "Double-lid metal canisters (airtight)",
      "Biodegradable pyramid nylon tea bags",
      "Custom engraved solid mahogany chests"
    ],
    icon: Gift,
  },
];

export default function WholesaleExport() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="wholesale" className="relative w-full z-10 py-32 bg-luxury-charcoal/20">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-xs md:text-sm tracking-[0.4em] font-medium text-luxury-gold uppercase block mb-3">
            Global Supply Desk
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-luxury-ivory mb-6">
            Wholesale & <span className="gold-gradient-text">Export Operations</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-luxury-ivory/60 max-w-2xl mx-auto leading-relaxed">
            Supplying premium hotels, high-end department stores, and tea brands globally. Discover our complete manufacturing and logistics capabilities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {wholesaleServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-gold p-8 rounded-3xl flex flex-col relative group h-full justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 rounded-2xl bg-luxury-charcoal border border-luxury-gold/15 text-luxury-gold group-hover:border-luxury-gold group-hover:bg-luxury-gold/15 transition-all duration-500">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-semibold text-luxury-gold/40 tracking-widest uppercase">
                    0{idx + 1}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="font-serif text-xl text-luxury-ivory font-bold mb-1 group-hover:text-luxury-gold transition-colors duration-300">
                  {service.name}
                </h3>
                <span className="text-[10px] tracking-widest text-luxury-gold uppercase font-semibold mb-4 block">
                  {service.subtitle}
                </span>

                {/* Description */}
                <p className="text-xs md:text-sm text-luxury-ivory/60 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Feature Points */}
              <div className="border-t border-luxury-gold/10 pt-4 mt-auto">
                <ul className="flex flex-col gap-2">
                  {service.features.map((feat, fidx) => (
                    <li key={fidx} className="flex gap-2 text-xs items-center text-luxury-ivory/80">
                      <CheckCircle className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Special CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 5 * 0.08 }}
            className="border border-luxury-gold/30 bg-gradient-to-br from-luxury-charcoal/80 to-luxury-black/90 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group min-h-[300px]"
          >
            {/* Ambient Background glow */}
            <div className="absolute inset-0 bg-radial-gradient from-luxury-gold/10 to-transparent opacity-50 pointer-events-none"></div>
            
            <div>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-luxury-gold uppercase block mb-3">
                Establish Direct Partnership
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-luxury-ivory font-bold leading-tight mb-4">
                Ready to <br />
                <span className="gold-gradient-text">Partner with Us?</span>
              </h3>
              <p className="text-xs md:text-sm text-luxury-ivory/60 leading-relaxed">
                Connect with our Global Trade team. Receive physical samples, certificate packets, and custom bulk pricing schedules within 24 hours.
              </p>
            </div>

            <button
              onClick={scrollToContact}
              className="btn-gold-shimmer w-full text-center py-4 rounded-xl text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 group cursor-pointer mt-6"
            >
              Initiate Partnership
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
