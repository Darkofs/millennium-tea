"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Undo2, CheckCircle, XOctagon, MessageSquare, ClipboardCheck, Truck, RefreshCw, Mail, FileText } from "lucide-react";

export default function ReturnPolicyPage() {
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
              <Undo2 className="w-8 h-8 text-luxury-gold" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-luxury-ivory mb-4">
            Return Policy
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
            At Millennium Tea, we take pride in delivering premium-quality tea products to our customers. Due to the consumable nature of our products, we maintain a limited return policy to ensure product safety and quality.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <PolicySection icon={<CheckCircle className="w-5 h-5" />} number="01" title="Eligibility for Returns">
            <p className="policy-text mb-3">
              Returns will only be accepted under the following circumstances:
            </p>
            <ul className="policy-list mb-6">
              <li>You received a wrong product different from the item ordered.</li>
              <li>The product was damaged during transit.</li>
              <li>The package was tampered with before delivery.</li>
              <li>The product received was expired at the time of delivery.</li>
            </ul>
            <p className="policy-text mb-3">To be eligible for a return, the item must:</p>
            <ul className="policy-list">
              <li>Be unused and in its original condition.</li>
              <li>Be returned in its original packaging.</li>
              <li>Be reported within <strong className="text-luxury-gold">24 hours</strong> of delivery.</li>
            </ul>
          </PolicySection>

          {/* Section 2 */}
          <PolicySection icon={<XOctagon className="w-5 h-5" />} number="02" title="Non-Returnable Items">
            <p className="policy-text mb-3">
              The following items are not eligible for return:
            </p>
            <ul className="policy-list">
              <li>Opened tea packages.</li>
              <li>Products that have been partially or fully consumed.</li>
              <li>Products returned due to personal taste preferences.</li>
              <li>Products damaged due to improper storage after delivery.</li>
              <li>Requests made beyond the specified reporting period.</li>
              <li>Orders where an incorrect delivery address was provided by the customer.</li>
            </ul>
          </PolicySection>

          {/* Section 3 */}
          <PolicySection icon={<MessageSquare className="w-5 h-5" />} number="03" title="How to Request a Return">
            <p className="policy-text mb-4">
              To initiate a return request, please contact our customer support team within <strong className="text-luxury-gold">24 hours</strong> of receiving your order and provide the following details:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Order Number", "Customer Name", "Photographs of the product and packaging", "Description of the issue"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-luxury-gold/5 border border-luxury-gold/10">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-luxury-gold/15 text-luxury-gold text-[11px] font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-luxury-ivory/65">{item}</span>
                </div>
              ))}
            </div>
            <p className="policy-text mt-4">
              Our team will review your request and guide you through the next steps.
            </p>
          </PolicySection>

          {/* Section 4 */}
          <PolicySection icon={<ClipboardCheck className="w-5 h-5" />} number="04" title="Return Approval">
            <p className="policy-text mb-3">
              Once your request has been reviewed and approved:
            </p>
            <ul className="policy-list mb-4">
              <li>We may arrange a pickup through our logistics partner, where service is available, or</li>
              <li>You may be requested to ship the product back to us using a reliable courier service.</li>
            </ul>
            <p className="policy-text">
              Instructions for the return process will be shared by our customer support team.
            </p>
          </PolicySection>

          {/* Section 5 */}
          <PolicySection icon={<Truck className="w-5 h-5" />} number="05" title="Return Shipping Costs">
            <ul className="policy-list">
              <li>If the return is due to an error on our part (wrong, damaged, tampered, or expired product), Millennium Tea will bear the return shipping cost.</li>
              <li>In all other situations where returns are not covered under this policy, return requests may not be accepted.</li>
            </ul>
          </PolicySection>

          {/* Section 6 */}
          <PolicySection icon={<RefreshCw className="w-5 h-5" />} number="06" title="Replacement or Refund">
            <p className="policy-text mb-3">
              After receiving and inspecting the returned product, we will notify you regarding the approval of your replacement or refund request.
            </p>
            <p className="policy-text mb-3">If approved, we may offer:</p>
            <ul className="policy-list mb-4">
              <li>A replacement product, subject to availability, or</li>
              <li>A refund to the original payment method, in accordance with our <Link href="/refund-policy" className="text-luxury-gold hover:underline">Refund Policy</Link>.</li>
            </ul>
            <div className="p-4 rounded-lg bg-luxury-gold/5 border border-luxury-gold/15">
              <p className="text-sm text-luxury-ivory/60">
                Refunds, if applicable, are generally processed within <strong className="text-luxury-gold">5–10 business days</strong>.
              </p>
            </div>
          </PolicySection>

          {/* Section 7 - Contact */}
          <PolicySection icon={<Mail className="w-5 h-5" />} number="07" title="Contact Us">
            <p className="policy-text mb-6">
              For any return-related queries, please contact us:
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
                Please mention your Order ID in all communications to help us assist you promptly.
              </p>
            </div>
          </PolicySection>

          {/* Section 8 */}
          <PolicySection icon={<FileText className="w-5 h-5" />} number="08" title="Policy Updates">
            <p className="policy-text">
              Millennium Tea reserves the right to modify or update this Return Policy at any time without prior notice. Any changes will be reflected on this page along with the updated effective date.
            </p>
          </PolicySection>
        </div>

        {/* Acknowledgement */}
        <div className="mt-16 p-6 md:p-8 rounded-2xl bg-luxury-charcoal/30 border border-luxury-gold/10">
          <p className="text-sm text-luxury-ivory/60 leading-relaxed">
            By placing an order through Millennium Tea, you acknowledge that you have read, understood, and agreed to this Return Policy.
          </p>
        </div>

        {/* Thank You */}
        <p className="mt-10 text-center text-sm text-luxury-ivory/40 italic">
          Thank you for choosing Millennium Tea. We appreciate your trust and strive to deliver the finest tea experience with every cup. ☕🍃
        </p>
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
