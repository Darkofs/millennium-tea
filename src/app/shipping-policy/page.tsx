"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Truck, Clock, MapPin, CreditCard, Navigation, AlertTriangle, FileWarning, Package, RotateCcw, Mail } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-luxury-black text-luxury-ivory">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-gold/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-luxury-gold/3 rounded-full blur-[150px]" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-luxury-gold hover:text-luxury-ivory transition-colors mb-8 uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-luxury-gold/10 border border-luxury-gold/20">
              <Truck className="w-8 h-8 text-luxury-gold" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-luxury-ivory mb-4">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-sm text-luxury-ivory/50 tracking-wider">
            Last Updated: June 15, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
        {/* Introduction */}
        <div className="mb-16 p-8 rounded-2xl bg-luxury-charcoal/40 border border-luxury-gold/10">
          <p className="text-sm md:text-base text-luxury-ivory/70 leading-relaxed">
            At Millennium Tea, we are committed to delivering our premium tea products to you in a timely and efficient manner. Please read our Shipping &amp; Delivery Policy carefully to understand our shipping practices.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <PolicySection icon={<MapPin className="w-5 h-5" />} number="01" title="Shipping Coverage">
            <p className="policy-text">
              We currently ship our products across India. For international shipping inquiries, please contact our customer support team before placing an order.
            </p>
          </PolicySection>

          {/* Section 2 */}
          <PolicySection icon={<Clock className="w-5 h-5" />} number="02" title="Order Processing Time">
            <ul className="policy-list mb-4">
              <li>Orders are typically processed within 1–3 business days after confirmation of payment.</li>
              <li>Orders placed on weekends or public holidays will be processed on the next business day.</li>
              <li>During peak seasons, promotional events, or unforeseen circumstances, processing times may be slightly extended.</li>
            </ul>
          </PolicySection>

          {/* Section 3 */}
          <PolicySection icon={<Truck className="w-5 h-5" />} number="03" title="Estimated Delivery Time">
            <p className="policy-text mb-5">
              After dispatch, estimated delivery timelines are as follows:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className="p-4 rounded-xl bg-luxury-gold/5 border border-luxury-gold/15 text-center">
                <p className="font-serif text-2xl font-bold text-luxury-gold mb-1">2–5</p>
                <p className="text-[11px] tracking-wider text-luxury-ivory/50 uppercase">Business Days</p>
                <p className="text-xs text-luxury-ivory/70 mt-2">Metro Cities</p>
              </div>
              <div className="p-4 rounded-xl bg-luxury-gold/5 border border-luxury-gold/15 text-center">
                <p className="font-serif text-2xl font-bold text-luxury-gold mb-1">3–7</p>
                <p className="text-[11px] tracking-wider text-luxury-ivory/50 uppercase">Business Days</p>
                <p className="text-xs text-luxury-ivory/70 mt-2">Other Cities &amp; Towns</p>
              </div>
              <div className="p-4 rounded-xl bg-luxury-gold/5 border border-luxury-gold/15 text-center">
                <p className="font-serif text-2xl font-bold text-luxury-gold mb-1">5–10</p>
                <p className="text-[11px] tracking-wider text-luxury-ivory/50 uppercase">Business Days</p>
                <p className="text-xs text-luxury-ivory/70 mt-2">Remote Locations</p>
              </div>
            </div>
            <p className="policy-text">
              Please note that these are estimated timelines and actual delivery times may vary depending on the courier partner and destination.
            </p>
          </PolicySection>

          {/* Section 4 */}
          <PolicySection icon={<CreditCard className="w-5 h-5" />} number="04" title="Shipping Charges">
            <ul className="policy-list">
              <li>Shipping charges, if applicable, will be displayed during checkout before you complete your purchase.</li>
              <li>We may offer free shipping on orders above a specified order value, which will be communicated on our website from time to time.</li>
            </ul>
          </PolicySection>

          {/* Section 5 */}
          <PolicySection icon={<Navigation className="w-5 h-5" />} number="05" title="Order Tracking">
            <p className="policy-text">
              Once your order has been dispatched, you will receive shipping confirmation details, including tracking information (where available), through email, SMS, or WhatsApp.
            </p>
          </PolicySection>

          {/* Section 6 */}
          <PolicySection icon={<AlertTriangle className="w-5 h-5" />} number="06" title="Delivery Delays">
            <p className="policy-text mb-3">
              While we strive to ensure timely delivery, Millennium Tea shall not be held responsible for delays caused by circumstances beyond our control, including but not limited to:
            </p>
            <ul className="policy-list">
              <li>Natural disasters</li>
              <li>Extreme weather conditions</li>
              <li>Public holidays</li>
              <li>Transportation disruptions</li>
              <li>Government restrictions</li>
              <li>Courier service delays</li>
            </ul>
          </PolicySection>

          {/* Section 7 */}
          <PolicySection icon={<FileWarning className="w-5 h-5" />} number="07" title="Incorrect Shipping Information">
            <p className="policy-text mb-4">
              Customers are responsible for providing accurate shipping details at the time of placing an order.
            </p>
            <p className="policy-text">
              Millennium Tea will not be liable for delays or failed deliveries resulting from incorrect or incomplete address information provided by the customer. Additional shipping charges may apply for re-shipment of returned packages.
            </p>
          </PolicySection>

          {/* Section 8 */}
          <PolicySection icon={<Package className="w-5 h-5" />} number="08" title="Damaged or Tampered Packages">
            <p className="policy-text mb-3">
              If you receive a package that appears damaged or tampered with:
            </p>
            <ul className="policy-list mb-4">
              <li>Please refuse acceptance of the package, if possible.</li>
              <li>Take clear photographs of the package.</li>
              <li>Contact our customer support team within 24 hours of delivery.</li>
            </ul>
            <p className="policy-text">
              We will investigate the matter and provide an appropriate resolution.
            </p>
          </PolicySection>

          {/* Section 9 */}
          <PolicySection icon={<RotateCcw className="w-5 h-5" />} number="09" title="Undelivered Orders">
            <p className="policy-text">
              If an order is returned to us due to unsuccessful delivery attempts or an incorrect address provided by the customer, we will contact you to arrange re-delivery. Additional shipping charges may apply.
            </p>
          </PolicySection>

          {/* Section 10 - Contact */}
          <PolicySection icon={<Mail className="w-5 h-5" />} number="10" title="Contact Us">
            <p className="policy-text mb-6">
              If you have any questions regarding shipping or delivery, please contact us:
            </p>
            <div className="p-6 rounded-xl bg-luxury-gold/5 border border-luxury-gold/15">
              <h4 className="font-serif text-xl font-bold text-luxury-gold mb-4">Millennium Tea</h4>
              <div className="space-y-2 text-sm text-luxury-ivory/70">
                <p>
                  <span className="text-luxury-ivory/40 mr-2">Website:</span>
                  <a href="https://www.millenniumtea.in" className="text-luxury-gold hover:underline" target="_blank" rel="noopener noreferrer">
                    www.millenniumtea.in
                  </a>
                </p>
                <p>
                  <span className="text-luxury-ivory/40 mr-2">Email:</span>
                  <a href="mailto:millenniumpremiumtea@gmail.com" className="text-luxury-gold hover:underline">
                    millenniumpremiumtea@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-luxury-ivory/40 mr-2">Phone:</span>
                  <a href="tel:+918089406346" className="text-luxury-gold hover:underline">
                    +91 80894 06346
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-luxury-ivory/5 border border-luxury-ivory/10">
              <p className="text-xs text-luxury-ivory/50 leading-relaxed">
                <span className="text-luxury-gold font-semibold">Note:</span> By placing an order through our website, you agree to the terms outlined in this Shipping &amp; Delivery Policy.
              </p>
            </div>
          </PolicySection>
        </div>
      </section>
    </main>
  );
}

function PolicySection({
  icon,
  number,
  title,
  children,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative pl-6 md:pl-8 border-l border-luxury-gold/15 hover:border-luxury-gold/40 transition-colors duration-500">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-luxury-gold/10 text-luxury-gold group-hover:bg-luxury-gold/20 transition-colors duration-300">
          {icon}
        </div>
        <span className="text-[11px] font-mono text-luxury-gold/50 tracking-widest">{number}</span>
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-luxury-ivory tracking-wide">
          {title}
        </h3>
      </div>
      <div className="ml-12">{children}</div>

      <style jsx>{`
        :global(.policy-text) {
          font-size: 0.875rem;
          line-height: 1.8;
          color: rgba(248, 245, 240, 0.65);
        }
        :global(.policy-list) {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        :global(.policy-list li) {
          font-size: 0.875rem;
          color: rgba(248, 245, 240, 0.6);
          padding-left: 1.25rem;
          position: relative;
        }
        :global(.policy-list li::before) {
          content: "";
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.4);
        }
        @media (min-width: 768px) {
          :global(.policy-text) {
            font-size: 0.9375rem;
          }
          :global(.policy-list li) {
            font-size: 0.9375rem;
          }
        }
      `}</style>
    </div>
  );
}
