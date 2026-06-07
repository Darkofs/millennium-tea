"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Globe } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    tea: "Special Masala Tea Powder",
    volume: "Single Pack (250g)",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email inquiry
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        tea: "Special Masala Tea Powder",
        volume: "Single Pack (250g)",
        message: "",
      });
    }, 4000);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Hello Millennium, I am interested in ordering tea. Name: ${formData.name || "Visitor"}, Company: ${formData.company || "N/A"}. Tea: ${formData.tea}, Quantity: ${formData.volume}.`
    );
    window.open(`https://wa.me/919446056672?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="relative w-full z-10 py-32 bg-luxury-black">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm tracking-[0.4em] font-medium text-luxury-gold uppercase block mb-3">
            Global Trade Desk
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-luxury-ivory mb-6">
            Product <span className="gold-gradient-text">Inquiries</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-luxury-ivory/60 max-w-xl mx-auto leading-relaxed">
            Inquire about our premium tea blends, custom canisters, corporate gifting solutions, or domestic and international delivery options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact details & Stylized Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="glass-gold-static p-8 rounded-2xl">
              <h3 className="font-serif text-xl text-luxury-ivory font-bold mb-6">
                Corporate Sourcing Office
              </h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-luxury-ivory/50 font-semibold tracking-wider uppercase mb-1">
                      HQ & Processing Unit
                    </h4>
                    <p className="text-sm text-luxury-ivory/80 leading-relaxed">
                      Millennium, Estates Road, Munnar, Idukki District, Kerala, 685612, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Globe className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-luxury-ivory/50 font-semibold tracking-wider uppercase mb-1">
                      Export Logistics Hub
                    </h4>
                    <p className="text-sm text-luxury-ivory/80 leading-relaxed">
                      Ernakulam Wharf, Willingdon Island, Port Kochi, Kerala, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-luxury-ivory/50 font-semibold tracking-wider uppercase mb-1">
                      Direct Email
                    </h4>
                    <a
                      href="mailto:sales@millenniumtea.com"
                      className="text-sm text-luxury-gold hover:underline font-mono"
                    >
                      sales@millenniumtea.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-luxury-ivory/50 font-semibold tracking-wider uppercase mb-1">
                      Customer Helpline
                    </h4>
                    <a
                      href="tel:+919446056672"
                      className="text-sm text-luxury-ivory/80 hover:text-luxury-gold font-mono"
                    >
                      +91 94460 56672 (GMT+5:30)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Dark / Gold Vector Map */}
            <div className="glass-gold-static p-6 rounded-2xl flex flex-col items-center">
              <h4 className="text-[10px] tracking-widest text-luxury-gold uppercase font-bold mb-4 self-start">
                Munnar Sourcing & Kochi Port Terminal
              </h4>
              <div className="w-full h-44 relative bg-black/40 rounded-xl border border-luxury-gold/5 overflow-hidden flex items-center justify-center">
                {/* Minimalist Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30"></div>
                
                {/* Coastal Line (Diagonal gold line) */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 60,0 C 90,80 120,120 180,176"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="opacity-40"
                  />
                </svg>

                {/* Port Kochi Pin */}
                <div className="absolute left-[90px] top-[80px] flex flex-col items-center">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-luxury-gold"></span>
                  </div>
                  <span className="text-[9px] font-sans text-luxury-ivory/80 tracking-widest uppercase mt-1 bg-luxury-black/75 px-1 py-0.5 rounded border border-luxury-gold/20">
                    Kochi Export Terminal
                  </span>
                </div>

                {/* HQ Idukki Pin */}
                <div className="absolute left-[180px] top-[120px] flex flex-col items-center">
                  <div className="relative flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-luxury-gold"></span>
                  </div>
                  <span className="text-[9px] font-sans text-luxury-gold tracking-widest uppercase mt-1 bg-luxury-black/75 px-1 py-0.5 rounded border border-luxury-gold/20 font-bold">
                    Munnar Sourcing HQ
                  </span>
                </div>

                {/* Connection line between Port and HQ */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line
                    x1="96"
                    y1="86"
                    x2="186"
                    y2="126"
                    stroke="#d4af37"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    className="opacity-60"
                  />
                </svg>
              </div>
              <p className="text-[10px] text-luxury-ivory/40 mt-3 leading-relaxed text-center">
                Munnar highlands packaging facility located 110km east of Kochi Container Terminal, ensuring express ocean/air exports.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-gold p-8 md:p-10 rounded-2xl relative">
              <h3 className="font-serif text-2xl text-luxury-ivory font-bold mb-8">
                Inquire Now
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 rounded-full border border-luxury-gold flex items-center justify-center text-luxury-gold mb-6 animate-pulse">
                    <Send className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl text-luxury-gold font-bold mb-2">
                    Inquiry Submitted Successfully
                  </h4>
                  <p className="text-sm text-luxury-ivory/60 max-w-sm">
                    Thank you. Our sales division will evaluate your request and respond within 12 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-sans text-luxury-gold tracking-widest uppercase font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-black/35 border border-luxury-gold/15 focus:border-luxury-gold rounded-xl px-4 py-3 text-sm text-luxury-ivory placeholder-luxury-ivory/30 outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-sans text-luxury-gold tracking-widest uppercase font-semibold">
                        Corporate / Personal Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-black/35 border border-luxury-gold/15 focus:border-luxury-gold rounded-xl px-4 py-3 text-sm text-luxury-ivory placeholder-luxury-ivory/30 outline-none transition-colors"
                        placeholder="j.doe@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-sans text-luxury-gold tracking-widest uppercase font-semibold">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-black/35 border border-luxury-gold/15 focus:border-luxury-gold rounded-xl px-4 py-3 text-sm text-luxury-ivory placeholder-luxury-ivory/30 outline-none transition-colors"
                        placeholder="Grand Importers, London (optional)"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-sans text-luxury-gold tracking-widest uppercase font-semibold">
                        Tea Blend of Interest
                      </label>
                      <select
                        value={formData.tea}
                        onChange={(e) => setFormData({ ...formData, tea: e.target.value })}
                        className="bg-black/35 border border-luxury-gold/15 focus:border-luxury-gold rounded-xl px-4 py-3 text-sm text-luxury-ivory outline-none transition-colors cursor-pointer"
                      >
                        <option value="Special Masala Tea Powder">Special Masala Tea Powder</option>
                        <option value="Ginger Tea Powder">Ginger Tea Powder</option>
                        <option value="Lemon Tea">Lemon Tea</option>
                        <option value="Green Tea">Green Tea</option>
                        <option value="Turmeric Health Tea">Turmeric Health Tea</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans text-luxury-gold tracking-widest uppercase font-semibold">
                      Pack Quantity / Volume
                    </label>
                    <select
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      className="bg-black/35 border border-luxury-gold/15 focus:border-luxury-gold rounded-xl px-4 py-3 text-sm text-luxury-ivory outline-none transition-colors cursor-pointer"
                    >
                      <option value="Single Pack (250g)">Single Pack (250g)</option>
                      <option value="3-Pack Bundle (750g)">3-Pack Bundle (750g)</option>
                      <option value="5-Pack Bundle (1.25kg)">5-Pack Bundle (1.25kg)</option>
                      <option value="10-Pack Carton (2.5kg)">10-Pack Carton (2.5kg)</option>
                      <option value="Custom Quantity">Custom Quantity</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans text-luxury-gold tracking-widest uppercase font-semibold">
                      Specifications & Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="bg-black/35 border border-luxury-gold/15 focus:border-luxury-gold rounded-xl px-4 py-3 text-sm text-luxury-ivory placeholder-luxury-ivory/30 outline-none transition-colors resize-none"
                      placeholder="Please detail any custom inquiries, delivery address, or gifting requirements here..."
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <button
                      type="submit"
                      className="btn-gold-shimmer flex-1 py-4 rounded-xl text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Submit Inquiry
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppChat}
                      className="border border-[#25d366]/40 hover:border-[#25d366] text-[#25d366] hover:bg-[#25d366]/10 py-4 px-6 rounded-xl text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                    >
                      Quick WhatsApp Chat
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
