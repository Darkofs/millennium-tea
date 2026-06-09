"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Loader, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const { user, login, register, loading, error, clearError } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    // Clear any errors when switching forms
    clearError();
  }, [isLogin, clearError]);

  useEffect(() => {
    // If user is already logged in, redirect immediately
    if (user) {
      if (redirect === "checkout") {
        router.push("/?cart=open");
      } else {
        router.push(redirect);
      }
    }
  }, [user, redirect, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        if (redirect === "checkout") {
          router.push("/?cart=open");
        } else {
          router.push(redirect);
        }
      }
    } else {
      const success = await register(formData.name, formData.email, formData.password);
      if (success) {
        setSuccessMsg("Account created successfully! Logging you in...");
        setTimeout(() => {
          if (redirect === "checkout") {
            router.push("/?cart=open");
          } else {
            router.push(redirect);
          }
        }, 1500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] text-luxury-ivory font-sans relative flex items-center justify-center overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-radial-gradient from-luxury-gold/5 via-transparent to-transparent pointer-events-none blur-[140px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-radial-gradient from-luxury-gold/5 via-transparent to-transparent pointer-events-none blur-[140px]" />

      {/* Grid Layout (Desktop split, Mobile full form) */}
      <div className="w-full max-w-5xl min-h-[600px] grid md:grid-cols-2 bg-black/40 border border-luxury-gold/10 rounded-3xl overflow-hidden shadow-2xl relative z-10 mx-6">
        
        {/* Left Side: Luxury Branding Panel (Hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-black via-[#0d0d0d] to-[#121212] border-r border-luxury-gold/10 relative overflow-hidden">
          {/* Faint gold lines overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-luxury-gold/[0.02] via-transparent to-transparent pointer-events-none" />

          {/* Logo link */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none self-start relative z-10">
            <div className="relative w-10 h-10 rounded-full border border-luxury-gold flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
              <span className="text-luxury-gold font-serif text-lg font-bold">M</span>
              <div className="absolute inset-0.5 rounded-full border border-luxury-gold/30"></div>
            </div>
            <div className="text-left">
              <span className="block font-serif text-base tracking-[0.2em] font-bold text-luxury-ivory uppercase group-hover:text-luxury-gold transition-colors duration-300">
                Millennium
              </span>
              <span className="block font-sans text-[9px] tracking-[0.45em] font-medium text-luxury-gold uppercase -mt-1">
                Thé Premium
              </span>
            </div>
          </Link>

          {/* Brand Quote */}
          <div className="my-auto space-y-4 max-w-xs relative z-10">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-luxury-gold uppercase block">
              High-Altitude Harvests
            </span>
            <h2 className="font-serif text-3xl text-luxury-ivory leading-tight font-bold">
              Artisanal Blends for Refined Palates
            </h2>
            <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light">
              Create an account to track your orders, preserve your tea preferences, and enjoy expedited checkout.
            </p>
          </div>

          {/* Footer branding */}
          <span className="text-[9px] tracking-widest text-luxury-ivory/30 uppercase relative z-10">
            &copy; {new Date().getFullYear()} Millennium Tea.
          </span>
        </div>

        {/* Right Side: Authentication Forms */}
        <div className="flex flex-col justify-center px-8 py-12 md:p-16 bg-[#0a0a0a]/90 backdrop-blur-lg">
          <Link 
            href="/" 
            className="flex md:hidden items-center gap-2 text-xs text-luxury-ivory/40 hover:text-luxury-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <div className="max-w-md w-full mx-auto space-y-8">
            {/* Form Header */}
            <div>
              <h2 className="font-serif text-3xl text-luxury-ivory font-bold mb-2">
                {isLogin ? "Welcome Back" : "Begin the Journey"}
              </h2>
              <p className="text-xs text-luxury-ivory/50">
                {isLogin 
                  ? "Enter your credentials to access your orders." 
                  : "Sign up to begin your luxury tea experiences."
                }
              </p>
            </div>

            {/* Error / Success Alerts */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="text-xs">{error}</span>
                </motion.div>
              )}
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-xs">{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-ivory/30" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/30 border border-luxury-gold/15 focus:border-luxury-gold text-sm text-luxury-ivory placeholder-luxury-ivory/25 outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-ivory/30" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/30 border border-luxury-gold/15 focus:border-luxury-gold text-sm text-luxury-ivory placeholder-luxury-ivory/25 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-ivory/30" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/30 border border-luxury-gold/15 focus:border-luxury-gold text-sm text-luxury-ivory placeholder-luxury-ivory/25 outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold-shimmer text-xs tracking-widest uppercase font-bold py-4 rounded-xl border border-luxury-gold/50 cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin text-luxury-black" />
                    Processing…
                  </>
                ) : (
                  isLogin ? "Sign In" : "Register Account"
                )}
              </button>
            </form>

            {/* Form Toggle Footer */}
            <div className="text-center pt-2">
              <span className="text-xs text-luxury-ivory/40">
                {isLogin ? "New to Millennium Tea? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-luxury-gold font-medium hover:underline cursor-pointer focus:outline-none"
              >
                {isLogin ? "Register here" : "Sign in here"}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs text-luxury-ivory/30 hover:text-luxury-gold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#060606] text-luxury-ivory flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-luxury-gold/30 border-t-transparent animate-spin"></div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
