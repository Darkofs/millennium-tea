"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Cookie, Users, CreditCard, Database, UserCheck, ExternalLink, Baby, RefreshCw, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-8 h-8 text-luxury-gold" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-luxury-ivory mb-4">
            Privacy Policy
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
            Welcome to Millennium Tea. We respect your privacy and are committed to protecting the personal information you share with us through our website,{" "}
            <a href="https://www.millenniumtea.in" className="text-luxury-gold hover:underline" target="_blank" rel="noopener noreferrer">
              www.millenniumtea.in
            </a>.
          </p>
          <p className="text-sm md:text-base text-luxury-ivory/70 leading-relaxed mt-4">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our products.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <PolicySection icon={<Database className="w-5 h-5" />} number="01" title="Information We Collect">
            <p className="policy-text mb-4">
              We may collect the following types of information:
            </p>
            <h4 className="text-sm font-bold text-luxury-gold tracking-wider uppercase mb-3">Personal Information</h4>
            <p className="policy-text mb-3">
              When you place an order, contact us, or subscribe to our communications, we may collect:
            </p>
            <ul className="policy-list mb-6">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping and billing address</li>
              <li>Payment-related information (processed securely through third-party payment providers)</li>
            </ul>
            <h4 className="text-sm font-bold text-luxury-gold tracking-wider uppercase mb-3">Non-Personal Information</h4>
            <p className="policy-text mb-3">We may automatically collect:</p>
            <ul className="policy-list">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Pages visited on our website</li>
              <li>Date and time of access</li>
              <li>Cookies and usage data</li>
            </ul>
          </PolicySection>

          {/* Section 2 */}
          <PolicySection icon={<Users className="w-5 h-5" />} number="02" title="How We Use Your Information">
            <p className="policy-text mb-3">We use the information collected to:</p>
            <ul className="policy-list">
              <li>Process and fulfill your orders</li>
              <li>Deliver products and services</li>
              <li>Respond to customer inquiries and support requests</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Improve our website and customer experience</li>
              <li>Prevent fraud and enhance website security</li>
              <li>Send promotional communications (only if you have opted in)</li>
            </ul>
          </PolicySection>

          {/* Section 3 */}
          <PolicySection icon={<Cookie className="w-5 h-5" />} number="03" title="Cookies">
            <p className="policy-text mb-3">
              Our website may use cookies and similar technologies to enhance your browsing experience.
            </p>
            <p className="policy-text mb-3">Cookies help us:</p>
            <ul className="policy-list mb-4">
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve website functionality</li>
            </ul>
            <p className="policy-text">
              You can disable cookies through your browser settings; however, some features of the website may not function properly.
            </p>
          </PolicySection>

          {/* Section 4 */}
          <PolicySection icon={<Users className="w-5 h-5" />} number="04" title="Sharing of Information">
            <p className="policy-text mb-3">
              We do not sell, rent, or trade your personal information to third parties.
            </p>
            <p className="policy-text mb-3">
              We may share information with trusted service providers who assist us in operating our business, including:
            </p>
            <ul className="policy-list mb-4">
              <li>Payment gateway providers</li>
              <li>Shipping and logistics partners</li>
              <li>Website hosting providers</li>
              <li>Analytics service providers</li>
            </ul>
            <p className="policy-text">
              These parties are required to maintain the confidentiality of your information.
            </p>
          </PolicySection>

          {/* Section 5 */}
          <PolicySection icon={<CreditCard className="w-5 h-5" />} number="05" title="Payment Security">
            <p className="policy-text">
              All online payments are processed through secure third-party payment gateways. We do not store your complete debit card, credit card, or banking details on our servers.
            </p>
          </PolicySection>

          {/* Section 6 */}
          <PolicySection icon={<Lock className="w-5 h-5" />} number="06" title="Data Security">
            <p className="policy-text mb-4">
              We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, misuse, alteration, or disclosure.
            </p>
            <p className="policy-text">
              While we strive to use commercially acceptable means to protect your information, no method of electronic transmission or storage is 100% secure.
            </p>
          </PolicySection>

          {/* Section 7 */}
          <PolicySection icon={<UserCheck className="w-5 h-5" />} number="07" title="Your Rights">
            <p className="policy-text mb-3">You may have the right to:</p>
            <ul className="policy-list mb-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information, subject to legal obligations</li>
              <li>Withdraw consent for marketing communications at any time</li>
            </ul>
            <p className="policy-text">
              To exercise these rights, please contact us using the details provided below.
            </p>
          </PolicySection>

          {/* Section 8 */}
          <PolicySection icon={<ExternalLink className="w-5 h-5" />} number="08" title="Third-Party Links">
            <p className="policy-text">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review their respective privacy policies.
            </p>
          </PolicySection>

          {/* Section 9 */}
          <PolicySection icon={<Baby className="w-5 h-5" />} number="09" title="Children's Privacy">
            <p className="policy-text">
              Our website is not intended for individuals under the age of 18 years. We do not knowingly collect personal information from children.
            </p>
          </PolicySection>

          {/* Section 10 */}
          <PolicySection icon={<RefreshCw className="w-5 h-5" />} number="10" title="Changes to This Privacy Policy">
            <p className="policy-text">
              We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with the revised &quot;Last Updated&quot; date.
            </p>
          </PolicySection>

          {/* Section 11 - Contact */}
          <PolicySection icon={<Mail className="w-5 h-5" />} number="11" title="Contact Us">
            <p className="policy-text mb-6">
              If you have any questions regarding this Privacy Policy or the handling of your personal information, please contact us:
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
                <p>
                  <span className="text-luxury-ivory/40 mr-2">Address:</span>
                  Millennium Premium Tea Munnar, Meencut PO, Munnar, Idukki, Kerala — 685565
                </p>
              </div>
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
