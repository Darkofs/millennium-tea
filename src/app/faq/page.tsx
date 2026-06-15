"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, ChevronDown, ShoppingCart, CreditCard, Truck, Package, Leaf, Globe, Users, Mail } from "lucide-react";

const faqData = [
  {
    category: "Products",
    icon: <Leaf className="w-5 h-5" />,
    questions: [
      {
        q: "What products does Millennium Tea offer?",
        a: "Millennium Tea offers a carefully curated range of premium tea blends, including:",
        list: ["Special Masala Tea", "Ginger Tea", "Lemon Tea", "Green Tea", "Turmeric Health Tea"],
        extra: "Each blend is crafted using quality ingredients to deliver authentic taste and wellness benefits.",
      },
      {
        q: "Are your tea products made with natural ingredients?",
        a: "Yes. We strive to use high-quality ingredients and natural spices in our tea blends to ensure freshness, flavor, and quality.",
      },
      {
        q: "How should I store the tea products?",
        a: "For the best flavor and freshness:",
        list: [
          "Store in a cool and dry place.",
          "Keep away from direct sunlight and moisture.",
          "Ensure the package is tightly sealed after each use.",
        ],
      },
      {
        q: "Are your teas suitable for daily consumption?",
        a: "Most of our tea blends are suitable for regular consumption when enjoyed as part of a balanced lifestyle. However, individuals with specific health conditions, allergies, or dietary concerns should consult a healthcare professional before use.",
      },
      {
        q: "Do your teas contain artificial colors or preservatives?",
        a: "We aim to maintain the highest quality standards in our products. Please refer to the ingredient list on the product packaging for detailed information regarding each blend.",
      },
    ],
  },
  {
    category: "Orders & Payment",
    icon: <ShoppingCart className="w-5 h-5" />,
    questions: [
      {
        q: "How do I place an order?",
        a: "You can place an order directly through our website by:",
        list: [
          "Selecting your preferred tea products.",
          "Adding them to your cart.",
          "Proceeding to checkout.",
          "Entering your shipping details and completing the payment.",
        ],
        extra: "You will receive an order confirmation once your purchase is successful.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept secure online payments through trusted payment partners. Available payment methods may include:",
        list: ["UPI", "Credit Cards", "Debit Cards", "Net Banking", "Wallet Payments"],
        extra: "The payment options available will be displayed during checkout.",
      },
      {
        q: "Do you offer Cash on Delivery (COD)?",
        a: "Cash on Delivery availability depends on your delivery location and our logistics partners. If COD is available for your area, it will appear as a payment option during checkout.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "If your order has not yet been processed or dispatched, please contact our customer support team as soon as possible. We will do our best to accommodate your request.",
        extra: "Once an order has been shipped, cancellation may not be possible.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    icon: <Truck className="w-5 h-5" />,
    questions: [
      {
        q: "How long will it take to receive my order?",
        a: "Estimated delivery timelines are:",
        list: [
          "Metro Cities: 2–5 business days",
          "Other Locations: 3–7 business days",
          "Remote Areas: 5–10 business days",
        ],
        extra: "Delivery times may vary depending on your location and courier services.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is shipped, you will receive tracking details through email, SMS, or WhatsApp, allowing you to monitor your shipment status.",
      },
      {
        q: "What should I do if I receive a damaged product?",
        a: "If your order arrives damaged or tampered with, please contact us within 24 hours of delivery with photographs of the package and product. Our team will review the issue and assist you with an appropriate resolution.",
      },
    ],
  },
  {
    category: "Wholesale & International",
    icon: <Globe className="w-5 h-5" />,
    questions: [
      {
        q: "Can I order your products from outside India?",
        a: "Currently, Millennium Tea primarily serves customers within India. For international orders or bulk export inquiries, please contact our support team.",
      },
      {
        q: "Do you offer wholesale or bulk orders?",
        a: "Yes. For wholesale purchases, corporate gifting, retail partnerships, or bulk orders, please reach out to us through our contact details.",
      },
    ],
  },
];

export default function FAQPage() {
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
              <HelpCircle className="w-8 h-8 text-luxury-gold" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-luxury-ivory mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-luxury-ivory/50 max-w-xl mx-auto leading-relaxed">
            Millennium Tea — Premium Tea Collection
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
        <div className="space-y-12">
          {faqData.map((section, sIdx) => (
            <FAQCategory key={sIdx} category={section.category} icon={section.icon} questions={section.questions} />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 mb-6">
            <Mail className="w-6 h-6 text-luxury-gold" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-luxury-ivory mb-3">
            Still have questions?
          </h2>
          <p className="text-sm text-luxury-ivory/55 mb-8 max-w-md mx-auto">
            We&apos;re always happy to help. Please contact our customer support team, and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="inline-block p-6 md:p-8 rounded-2xl bg-luxury-charcoal/40 border border-luxury-gold/10 text-left">
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
          <p className="mt-10 text-sm text-luxury-ivory/40 italic">
            Thank you for choosing Millennium Tea — Brewing Tradition, One Cup at a Time. ☕🍃
          </p>
        </div>
      </section>
    </main>
  );
}

function FAQCategory({
  category,
  icon,
  questions,
}: {
  category: string;
  icon: React.ReactNode;
  questions: { q: string; a: string; list?: string[]; extra?: string }[];
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-luxury-gold/10 text-luxury-gold">
          {icon}
        </div>
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-luxury-ivory tracking-wide">
          {category}
        </h2>
      </div>
      <div className="space-y-3 ml-0 md:ml-12">
        {questions.map((item, idx) => (
          <FAQItem key={idx} question={item.q} answer={item.a} list={item.list} extra={item.extra} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({
  question,
  answer,
  list,
  extra,
}: {
  question: string;
  answer: string;
  list?: string[];
  extra?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isOpen
          ? "bg-luxury-charcoal/50 border-luxury-gold/25 shadow-lg shadow-luxury-gold/5"
          : "bg-luxury-charcoal/20 border-luxury-gold/8 hover:border-luxury-gold/15"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left cursor-pointer focus:outline-none group"
      >
        <span
          className={`text-sm md:text-[15px] font-medium pr-4 transition-colors duration-300 ${
            isOpen ? "text-luxury-gold" : "text-luxury-ivory/80 group-hover:text-luxury-ivory"
          }`}
        >
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 text-luxury-gold/60 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <div className="border-t border-luxury-gold/10 pt-4">
            <p className="text-sm text-luxury-ivory/60 leading-relaxed">{answer}</p>
            {list && (
              <ul className="mt-3 space-y-2">
                {list.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-luxury-ivory/55">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-luxury-gold/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {extra && <p className="text-sm text-luxury-ivory/55 leading-relaxed mt-3">{extra}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
