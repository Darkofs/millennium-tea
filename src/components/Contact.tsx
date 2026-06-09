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
      `Hello Millennium Tea! I am interested in ordering tea.\n\nName: ${formData.name || "Visitor"}\nCompany: ${formData.company || "N/A"}\nTea: ${formData.tea}\nQuantity: ${formData.volume}${formData.message ? `\n\nMessage: ${formData.message}` : ""}`
    );
    window.open(`https://wa.me/message/WXU5NCOSMGVRE1?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="relative w-full z-10 py-32 bg-luxury-black overflow-hidden">
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
                Our Office
              </h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-luxury-ivory/50 font-semibold tracking-wider uppercase mb-1">
                      Address
                    </h4>
                    <p className="text-sm text-luxury-ivory/80 leading-relaxed">
                      Millennium Premium Tea Munnar<br />
                      Anachal PO, Munnar,<br />
                      Idukki, Kerala — 685565
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-luxury-ivory/50 font-semibold tracking-wider uppercase mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:millenniumpremiumtea@gmail.com"
                      className="text-sm text-luxury-gold hover:underline font-mono"
                    >
                      millenniumpremiumtea@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs text-luxury-ivory/50 font-semibold tracking-wider uppercase mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+918089406346"
                      className="text-sm text-luxury-ivory/80 hover:text-luxury-gold font-mono"
                    >
                      +91 80894 06346
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="glass-gold-static p-4 rounded-2xl flex flex-col items-center">
              <h4 className="text-[10px] tracking-widest text-luxury-gold uppercase font-bold mb-3 self-start">
                Find Us — Anachal, Munnar
              </h4>
              <div className="w-full rounded-xl overflow-hidden border border-luxury-gold/15">
                <iframe
                  title="Millennium Premium Tea — Anachal, Munnar"
                  src="https://maps.google.com/maps?q=Anachal+PO+Munnar+Idukki+Kerala+685565&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-[10px] text-luxury-ivory/40 mt-3 leading-relaxed text-center">
                Anachal PO, Munnar, Idukki, Kerala — 685565
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
