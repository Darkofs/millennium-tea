"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, XCircle, AlertCircle, ClipboardList, Banknote, Repeat, Ban, Mail } from "lucide-react";

export default function RefundPolicyPage() {
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
              <RefreshCw className="w-8 h-8 text-luxury-gold" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-luxury-ivory mb-4">
            Cancellation &amp; Refund Policy
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
            At Millennium Tea, we are committed to providing high-quality tea products and ensuring customer satisfaction. Please read our Cancellation &amp; Refund Policy carefully before placing an order on our website.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <PolicySection icon={<XCircle className="w-5 h-5" />} number="01" title="Order Cancellation">
            <div className="mb-6">
              <h4 className="text-sm font-bold text-luxury-gold tracking-wider uppercase mb-3">Before Dispatch</h4>
              <ul className="policy-list">
                <li>Orders can be cancelled only if they have not been processed or dispatched from our warehouse.</li>
                <li>To request a cancellation, please contact our customer support team as soon as possible with your order details.</li>
                <li>If the cancellation request is approved, the refund will be processed to the original payment method.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-luxury-gold tracking-wider uppercase mb-3">After Dispatch</h4>
              <ul className="policy-list">
                <li>Once an order has been shipped, it cannot be cancelled.</li>
              </ul>
            </div>
          </PolicySection>

          {/* Section 2 */}
          <PolicySection icon={<AlertCircle className="w-5 h-5" />} number="02" title="Refund Eligibility">
            <p className="policy-text mb-4">
              Due to the perishable and consumable nature of tea products, we generally do not accept returns or provide refunds once the product has been delivered.
            </p>
            <p className="policy-text mb-3">
              However, refunds or replacements may be considered in the following situations:
            </p>
            <ul className="policy-list">
              <li>You received a damaged product.</li>
              <li>You received an incorrect product different from what you ordered.</li>
              <li>The product package was tampered with before delivery.</li>
              <li>The product received is expired at the time of delivery.</li>
            </ul>
          </PolicySection>

          {/* Section 3 */}
          <PolicySection icon={<ClipboardList className="w-5 h-5" />} number="03" title="Reporting an Issue">
            <p className="policy-text mb-4">
              If you experience any of the situations mentioned above, please notify us within <strong className="text-luxury-gold">24 hours</strong> of receiving your order by contacting our customer support team.
            </p>
            <p className="policy-text mb-3">To process your request, please provide:</p>
            <ul className="policy-list mb-4">
              <li>Order number</li>
              <li>Clear photographs of the product and packaging</li>
              <li>A brief description of the issue</li>
            </ul>
            <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/15">
              <p className="text-xs text-amber-400/80 leading-relaxed">
                ⚠️ Failure to report the issue within the specified timeframe may result in the request being declined.
              </p>
            </div>
          </PolicySection>

          {/* Section 4 */}
          <PolicySection icon={<Banknote className="w-5 h-5" />} number="04" title="Refund Process">
            <p className="policy-text mb-4">
              Once we receive your request, our team will review the information provided.
            </p>
            <p className="policy-text mb-3">If the refund request is approved:</p>
            <ul className="policy-list">
              <li>The refund will be initiated to the original mode of payment used during the purchase.</li>
              <li>Refunds are generally processed within <strong className="text-luxury-gold">5–10 business days</strong>, depending on your bank or payment service provider.</li>
            </ul>
          </PolicySection>

          {/* Section 5 */}
          <PolicySection icon={<Repeat className="w-5 h-5" />} number="05" title="Replacement Policy">
            <p className="policy-text">
              In eligible cases, Millennium Tea may choose to provide a replacement product instead of a refund, depending on product availability and the nature of the issue reported.
            </p>
          </PolicySection>

          {/* Section 6 */}
          <PolicySection icon={<Ban className="w-5 h-5" />} number="06" title="Non-Refundable Situations">
            <p className="policy-text mb-3">
              Refunds or replacements will not be provided in the following circumstances:
            </p>
            <ul className="policy-list">
              <li>Change of mind after the order has been delivered.</li>
              <li>Personal taste preferences or dissatisfaction with flavor.</li>
              <li>Incorrect shipping information provided by the customer.</li>
              <li>Failure to receive the package due to multiple unsuccessful delivery attempts.</li>
              <li>Requests made after the reporting period specified above.</li>
              <li>Minor variations in taste, aroma, or appearance that naturally occur in tea products.</li>
            </ul>
          </PolicySection>

          {/* Section 7 - Contact */}
          <PolicySection icon={<Mail className="w-5 h-5" />} number="07" title="Contact Us">
            <p className="policy-text mb-6">
              For cancellation, refund, or replacement requests, please contact us:
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
              <p className="text-xs text-luxury-ivory/40 mt-4 italic">
                Please include your Order ID in all communications for faster assistance.
              </p>
            </div>
          </PolicySection>
        </div>

        {/* Important Notice */}
        <div className="mt-16 p-6 md:p-8 rounded-2xl bg-luxury-charcoal/30 border border-luxury-gold/10">
          <h3 className="font-serif text-lg font-bold text-luxury-gold mb-3">Important Notice</h3>
          <p className="text-sm text-luxury-ivory/60 leading-relaxed mb-3">
            By placing an order on our website, you acknowledge that you have read, understood, and agreed to this Cancellation &amp; Refund Policy.
          </p>
          <p className="text-sm text-luxury-ivory/60 leading-relaxed">
            Millennium Tea reserves the right to modify this policy at any time without prior notice. Any updates will be published on this page with the revised effective date.
          </p>
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
