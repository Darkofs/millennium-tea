"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, ShoppingBag, Receipt, HelpCircle, Package, Calendar, User, MessageCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  grade: string;
  size: string;
  image: string;
}

interface Order {
  id: string;
  orderId: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

function OrdersContent() {
  const searchParams = useSearchParams();
  const successParam = searchParams.get("success") === "true";
  const newPaymentId = searchParams.get("id");

  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load user specific orders from LocalStorage
    if (user) {
      const saved = localStorage.getItem(`millennium_orders_${user.email}`);
      if (saved) {
        try {
          const parsedOrders = JSON.parse(saved);
          setOrders(parsedOrders);
        } catch (e) {
          console.error("Failed to parse orders:", e);
        }
      }
    }

    if (successParam && newPaymentId) {
      setShowConfirmation(true);
    }
  }, [successParam, newPaymentId, user]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#060606] text-luxury-ivory flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-luxury-gold/30 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#060606] text-luxury-ivory font-sans relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-radial-gradient from-luxury-gold/5 via-transparent to-transparent pointer-events-none blur-[120px]" />
        
        <header className="fixed top-0 left-0 w-full z-50 bg-[#060606]/80 backdrop-blur-md border-b border-luxury-gold/10 py-5">
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative w-9 h-9 rounded-full border border-luxury-gold flex items-center justify-center">
                <span className="text-luxury-gold font-serif text-base font-bold">M</span>
              </div>
              <span className="font-serif text-sm tracking-[0.2em] font-bold text-luxury-ivory uppercase">Millennium</span>
            </Link>
          </div>
        </header>

        <main className="flex-grow max-w-md w-full mx-auto px-6 flex flex-col items-center justify-center pt-28 pb-16 relative z-10">
          <div className="w-full text-center border border-luxury-gold/10 rounded-3xl p-8 bg-black/40 space-y-6">
            <div className="w-16 h-16 rounded-full border border-luxury-gold/25 flex items-center justify-center mx-auto bg-luxury-gold/[0.02]">
              <User className="w-6 h-6 text-luxury-gold/80" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-luxury-ivory font-bold">Access Denied</h2>
              <p className="text-xs text-luxury-ivory/50 leading-relaxed">
                Please sign in to your Millennium account to view your order history and dispatch statuses.
              </p>
            </div>
            <Link
              href="/auth?redirect=/orders"
              className="btn-gold-shimmer w-full py-3.5 rounded-xl border border-luxury-gold/50 cursor-pointer text-xs font-bold tracking-widest uppercase flex items-center justify-center"
            >
              Sign In to View Orders
            </Link>
          </div>
        </main>

        <footer className="border-t border-luxury-gold/10 py-6 bg-[#060606]">
          <div className="max-w-5xl mx-auto px-6 text-center text-[10px] tracking-widest text-luxury-ivory/30 uppercase">
            &copy; {new Date().getFullYear()} Millennium Tea.
          </div>
        </footer>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#060606] text-luxury-ivory font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-radial-gradient from-luxury-gold/5 via-transparent to-transparent pointer-events-none blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-radial-gradient from-luxury-gold/5 via-transparent to-transparent pointer-events-none blur-[120px]" />

      {/* Luxury Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#060606]/80 backdrop-blur-md border-b border-luxury-gold/10 py-5">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-9 h-9 rounded-full border border-luxury-gold flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
              <span className="text-luxury-gold font-serif text-base font-bold">M</span>
              <div className="absolute inset-0.5 rounded-full border border-luxury-gold/30 animate-pulse"></div>
            </div>
            <div className="text-left">
              <span className="block font-serif text-sm tracking-[0.2em] font-bold text-luxury-ivory uppercase group-hover:text-luxury-gold transition-colors duration-300">
                Millennium
              </span>
              <span className="block font-sans text-[8px] tracking-[0.45em] font-medium text-luxury-gold uppercase -mt-1">
                Thé Premium
              </span>
            </div>
          </Link>

          <Link
            href="/#catalog"
            className="text-[10px] font-medium tracking-widest text-luxury-ivory/60 hover:text-luxury-gold uppercase py-2 group focus:outline-none transition-colors duration-300 flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Catalog</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-6 pt-28 pb-16 relative z-10">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs text-luxury-ivory/50 hover:text-luxury-gold transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        {/* Confirmation Banner */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-10 p-6 rounded-2xl border border-luxury-gold/30 bg-luxury-gold/[0.03] backdrop-blur-md flex flex-col md:flex-row gap-5 items-start relative overflow-hidden"
            >
              {/* Highlight background lines */}
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold/[0.02] via-transparent to-transparent pointer-events-none" />

              <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-luxury-gold" />
              </div>
              <div className="space-y-2 flex-grow">
                <h2 className="font-serif text-xl md:text-2xl text-luxury-ivory font-bold">Order Confirmed!</h2>
                <p className="text-sm text-luxury-ivory/70 leading-relaxed">
                  Thank you for your luxury purchase. Your payment was successfully processed. Our dispatch desk will prepare your custom tea blend and contact you with shipment tracking details.
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-2 text-xs font-mono">
                  <span className="text-luxury-ivory/50">
                    Payment ID: <span className="text-luxury-gold font-bold">{newPaymentId}</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowConfirmation(false)}
                className="text-xs text-luxury-ivory/40 hover:text-luxury-ivory/70 border border-luxury-ivory/10 hover:border-luxury-ivory/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Title */}
        <div className="flex items-end justify-between border-b border-luxury-gold/10 pb-5 mb-8">
          <div>
            <span className="text-[10px] tracking-widest font-semibold text-luxury-gold uppercase block mb-1">
              Customer Account
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-luxury-ivory font-bold">
              My Orders
            </h1>
          </div>
          <span className="text-xs text-luxury-ivory/40 font-medium">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"} Placed
          </span>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-luxury-gold/20 rounded-2xl p-8 bg-black/20">
            <div className="w-16 h-16 rounded-full border border-luxury-gold/15 flex items-center justify-center mb-5 bg-luxury-gold/[0.01]">
              <Package className="w-7 h-7 text-luxury-gold/40" />
            </div>
            <h3 className="font-serif text-xl text-luxury-ivory font-medium mb-2">No orders found</h3>
            <p className="text-xs text-luxury-ivory/40 leading-relaxed max-w-xs mb-6">
              You haven't placed any handcrafted tea orders yet. Explore our high-altitude single-estate selections.
            </p>
            <Link
              href="/#catalog"
              className="btn-gold-shimmer text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-luxury-gold/50 cursor-pointer"
            >
              Shop Collection
            </Link>
          </div>
        ) : (
          /* List of Orders */
          <div className="space-y-8">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="border border-luxury-gold/10 rounded-2xl bg-black/40 hover:border-luxury-gold/20 transition-all overflow-hidden"
              >
                {/* Order Header Card */}
                <div className="bg-luxury-gold/[0.02] border-b border-luxury-gold/10 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 md:flex items-center gap-x-8 gap-y-2">
                    <div>
                      <span className="block text-[10px] text-luxury-ivory/40 uppercase tracking-wider mb-0.5">Date Placed</span>
                      <span className="text-xs text-luxury-ivory/80 font-medium flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-luxury-gold/55" />
                        {formatDate(order.date)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-luxury-ivory/40 uppercase tracking-wider mb-0.5">Total Value</span>
                      <span className="text-sm text-luxury-gold font-serif font-bold">₹{order.total.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-luxury-ivory/40 uppercase tracking-wider mb-0.5">Reference ID</span>
                      <span className="text-xs text-luxury-ivory/60 font-mono tracking-tight">{order.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center">
                    <span className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                      <CheckCircle className="w-3 h-3" />
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-luxury-gold/5 px-6">
                  {order.items.map((item) => (
                    <div key={`${item.id}-${item.grade}`} className="py-4 flex gap-4 items-center">
                      {/* Thumbnail */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-luxury-charcoal/30 border border-luxury-gold/10 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </div>

                      {/* Details */}
                      <div className="flex-grow min-w-0">
                        <h4 className="font-serif text-sm text-luxury-ivory font-bold truncate mb-0.5">{item.name}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-luxury-ivory/55">
                          <span className="text-luxury-gold/75 uppercase tracking-wide font-medium">{item.grade}</span>
                          <span className="w-1 h-1 rounded-full bg-luxury-gold/30" />
                          <span>{item.size}</span>
                          <span className="w-1 h-1 rounded-full bg-luxury-gold/30" />
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>

                      {/* Item Total Price */}
                      <span className="text-sm font-medium text-luxury-ivory/80 shrink-0 font-serif">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Card Footer info */}
                <div className="bg-black/20 border-t border-luxury-gold/5 px-6 py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[11px] text-luxury-ivory/40">
                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-luxury-gold/40" />
                      Estimated Delivery: 3-5 business days
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-luxury-gold/40" />
                      Razorpay Order ID: <span className="font-mono text-luxury-ivory/60">{order.orderId}</span>
                    </span>
                  </div>
                  {/* WhatsApp Enquiry Button */}
                  <a
                    href={`https://wa.me/message/WXU5NCOSMGVRE1?text=${encodeURIComponent(`Hi Millennium Tea! I have an enquiry about my order.%0AOrder ID: ${order.id}%0ARazorpay Ref: ${order.orderId}%0ADate: ${formatDate(order.date)}%0ATotal: ₹${order.total.toLocaleString()}%0A%0APlease assist me. Thank you!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 text-[#25D366] text-[11px] font-semibold px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Luxury Minimal Footer */}
      <footer className="border-t border-luxury-gold/10 py-6 bg-[#060606]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-widest text-luxury-ivory/30 uppercase">
          <span>&copy; {new Date().getFullYear()} Millennium Tea. All Rights Reserved.</span>
          <div className="flex gap-6 items-center">
            <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
            <Link href="/#catalog" className="hover:text-luxury-gold transition-colors">Catalog</Link>
            <a
              href="https://wa.me/message/WXU5NCOSMGVRE1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366]/60 hover:text-[#25D366] transition-colors duration-300"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#060606] text-luxury-ivory flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-luxury-gold/30 border-t-transparent animate-spin"></div>
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
