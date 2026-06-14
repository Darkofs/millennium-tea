"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, ChevronRight, CreditCard, CheckCircle, AlertCircle, Loader, User, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Razorpay types
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: () => void) => void;
}

type PaymentStatus = "idle" | "loading" | "success" | "error";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalCount, totalPrice, clearCart } = useCart();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentError, setPaymentError] = useState<string>("");
  const [successId, setSuccessId] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState<"cart" | "shipping">("cart");
  const [shippingDetails, setShippingDetails] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    address_2: "",
    pincode: "",
    city: "",
    state: "",
  });

  React.useEffect(() => {
    if (user) {
      setShippingDetails((prev) => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const lines = items.map(
      (item) =>
        `• ${item.name} (${item.grade}, ${item.size}) × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
    );
    const total = `\n*Total: ₹${totalPrice.toLocaleString()}*`;
    const message = encodeURIComponent(
      `Hello Millennium Tea! I'd like to place an order:\n\n${lines.join("\n")}${total}\n\nPlease confirm availability and share payment details. Thank you!`
    );
    window.open(`https://wa.me/message/WXU5NCOSMGVRE1?text=${message}`, "_blank");
  };

  const handleRazorpayPayment = async () => {
    if (items.length === 0) return;
    setPaymentStatus("loading");
    setPaymentError("");

    // Validate shipping fields
    const phoneRegex = /^[0-9]{10}$/;
    const pinRegex = /^[0-9]{6}$/;

    if (!shippingDetails.name.trim()) {
      setPaymentError("Please enter your name.");
      setPaymentStatus("error");
      return;
    }
    if (!phoneRegex.test(shippingDetails.phone.trim())) {
      setPaymentError("Please enter a valid 10-digit phone number.");
      setPaymentStatus("error");
      return;
    }
    if (!shippingDetails.address.trim()) {
      setPaymentError("Please enter your street address.");
      setPaymentStatus("error");
      return;
    }
    if (!pinRegex.test(shippingDetails.pincode.trim())) {
      setPaymentError("Please enter a valid 6-digit pin code.");
      setPaymentStatus("error");
      return;
    }
    if (!shippingDetails.city.trim() || !shippingDetails.state.trim()) {
      setPaymentError("Please enter both city and state.");
      setPaymentStatus("error");
      return;
    }

    try {
      // 1. Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Could not load payment gateway. Please check your connection.");

      // 2. Create order on server
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error ?? "Order creation failed");

      const { orderId, amount, currency } = orderData;

      // 3. Open Razorpay checkout
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency,
        name: "Millennium Tea",
        description: `Order: ${items.map((i) => i.name).join(", ")}`,
        order_id: orderId,
        image: "/images/logo.png",
        prefill: {
          name: shippingDetails.name,
          email: shippingDetails.email,
          contact: shippingDetails.phone,
        },
        theme: {
          color: "#D4AF37",
        },
        handler: async (response: RazorpayResponse) => {
          // 4. Verify payment on server
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                shipping_address: shippingDetails,
                items: items,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              // Save order details to local storage
              const newOrder = {
                id: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                date: new Date().toISOString(),
                items: [...items],
                total: totalPrice,
                status: "Paid",
                shiprocketOrderId: verifyData.shiprocket?.data?.order_id || null,
                shiprocketShipmentId: verifyData.shiprocket?.data?.shipment_id || null,
              };

              try {
                const storageKey = user ? `millennium_orders_${user.email}` : "millennium_orders";
                const existingOrders = JSON.parse(localStorage.getItem(storageKey) || "[]");
                existingOrders.unshift(newOrder);
                localStorage.setItem(storageKey, JSON.stringify(existingOrders));
              } catch (e) {
                console.error("Failed to save order to local storage:", e);
              }

              setSuccessId(response.razorpay_payment_id);
              setPaymentStatus("success");
              clearCart();

              // Wait 1.5s to let the drawer success state render, then redirect to My Orders page
              setTimeout(() => {
                closeCart();
                router.push(`/orders?success=true&id=${response.razorpay_payment_id}`);
              }, 1500);
            } else {
              throw new Error(verifyData.error ?? "Payment verification failed");
            }
          } catch (err) {
            const msg = err instanceof Error ? err.message : "Verification error";
            setPaymentError(msg);
            setPaymentStatus("error");
          }
        },
        modal: {
          ondismiss: () => {
            if (paymentStatus === "loading") setPaymentStatus("idle");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setPaymentError("Payment failed. Please try again.");
        setPaymentStatus("error");
      });
      setPaymentStatus("idle");
      rzp.open();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Payment error";
      setPaymentError(msg);
      setPaymentStatus("error");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 38 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] z-[70] flex flex-col bg-[#0d0d0d] border-l border-luxury-gold/15 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-luxury-gold/10">
              <div className="flex items-center gap-3">
                {step === "shipping" && (
                  <button
                    onClick={() => { setStep("cart"); setPaymentError(""); }}
                    className="mr-2 text-luxury-gold hover:text-luxury-ivory transition-colors cursor-pointer"
                    aria-label="Back to cart"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <ShoppingBag className="w-5 h-5 text-luxury-gold" />
                <span className="font-serif text-lg text-luxury-ivory tracking-wide">
                  {step === "cart" ? "Your Cart" : "Shipping Details"}
                </span>
                {step === "cart" && totalCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-luxury-gold text-luxury-black text-[10px] font-bold flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-ivory/60 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success State */}
            <AnimatePresence>
              {paymentStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 bg-[#0d0d0d] flex flex-col items-center justify-center gap-5 px-8 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-luxury-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-luxury-ivory">Payment Successful!</h3>
                  <p className="text-sm text-luxury-ivory/50 leading-relaxed">
                    Your Millennium Tea order has been placed.<br />
                    We'll contact you shortly with shipping details.
                  </p>
                  <p className="text-[10px] text-luxury-gold/60 font-mono bg-luxury-gold/5 px-3 py-1.5 rounded-full border border-luxury-gold/10">
                    Payment ID: {successId}
                  </p>
                  <button
                    onClick={() => { setPaymentStatus("idle"); closeCart(); }}
                    className="mt-2 btn-gold-shimmer text-xs tracking-widest uppercase px-8 py-3 rounded-full border border-luxury-gold/50 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 && paymentStatus !== "success" ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <div className="w-16 h-16 rounded-full border border-luxury-gold/20 flex items-center justify-center">
                    <ShoppingBag className="w-7 h-7 text-luxury-gold/40" />
                  </div>
                  <p className="font-serif text-xl text-luxury-ivory/50">Your cart is empty</p>
                  <p className="text-xs text-luxury-ivory/30 leading-relaxed max-w-[200px]">
                    Browse our catalog and add premium blends to your order.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-xs tracking-widest uppercase text-luxury-gold border border-luxury-gold/30 px-6 py-2.5 rounded-full hover:bg-luxury-gold/10 transition-all cursor-pointer"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : step === "cart" ? (
                <>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.grade}`}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 p-4 rounded-2xl border border-luxury-gold/10 bg-black/30 hover:border-luxury-gold/20 transition-all"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-luxury-charcoal/40 shrink-0 border border-luxury-gold/10">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm text-luxury-ivory font-medium leading-tight mb-0.5 truncate">{item.name}</p>
                        <p className="text-[10px] text-luxury-gold/70 uppercase tracking-wider mb-0.5">{item.grade}</p>
                        <p className="text-[10px] text-luxury-ivory/40 mb-2">{item.size}</p>
                        <p className="font-serif text-base text-luxury-gold font-bold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                        <button
                          onClick={() => removeItem(item.id, item.grade)}
                          className="text-luxury-ivory/30 hover:text-red-400 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-2 border border-luxury-gold/20 rounded-full px-2 py-1">
                          <button onClick={() => updateQty(item.id, item.grade, -1)} className="text-luxury-ivory/60 hover:text-luxury-gold transition-colors cursor-pointer">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs text-luxury-ivory w-4 text-center font-medium">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.grade, 1)} className="text-luxury-ivory/60 hover:text-luxury-gold transition-colors cursor-pointer">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                /* Step 2: Shipping Form */
                <div className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={shippingDetails.name}
                      onChange={handleShippingChange}
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-luxury-gold/15 focus:border-luxury-gold text-xs text-luxury-ivory outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">Phone Number (10 digits)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingDetails.phone}
                      onChange={handleShippingChange}
                      required
                      maxLength={10}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-luxury-gold/15 focus:border-luxury-gold text-xs text-luxury-ivory outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleShippingChange}
                      required
                      placeholder="e.g. House No., Street Name, Area"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-luxury-gold/15 focus:border-luxury-gold text-xs text-luxury-ivory outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">Landmark / Suite / Apt (Optional)</label>
                    <input
                      type="text"
                      name="address_2"
                      value={shippingDetails.address_2}
                      onChange={handleShippingChange}
                      placeholder="e.g. Near Main Market, Apt 3B"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-luxury-gold/15 focus:border-luxury-gold text-xs text-luxury-ivory outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">Pin Code (6 digits)</label>
                      <input
                        type="text"
                        name="pincode"
                        value={shippingDetails.pincode}
                        onChange={handleShippingChange}
                        required
                        maxLength={6}
                        placeholder="e.g. 685612"
                        className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-luxury-gold/15 focus:border-luxury-gold text-xs text-luxury-ivory outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleShippingChange}
                        required
                        placeholder="e.g. Munnar"
                        className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-luxury-gold/15 focus:border-luxury-gold text-xs text-luxury-ivory outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-luxury-ivory/40 block">State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingDetails.state}
                      onChange={handleShippingChange}
                      required
                      placeholder="e.g. Kerala"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-luxury-gold/15 focus:border-luxury-gold text-xs text-luxury-ivory outline-none transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-luxury-gold/10 px-6 pt-4 pb-6 space-y-3 bg-[#0d0d0d]">
                {/* Order Total */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-luxury-ivory/50 uppercase tracking-widest">Order Total</span>
                  <span className="font-serif text-2xl text-luxury-gold font-bold">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-luxury-ivory/30 -mt-1">Inclusive of all taxes. Shipping calculated at checkout.</p>

                {/* Error Message */}
                {paymentStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-xs text-red-300 leading-snug">{paymentError}</p>
                  </motion.div>
                )}

                 {/* Checkout Button gated by Auth */}
                 {!user ? (
                   <button
                     onClick={() => {
                       closeCart();
                       router.push("/auth?redirect=checkout");
                     }}
                     className="w-full flex items-center justify-center gap-2.5 bg-luxury-gold hover:bg-yellow-400 text-luxury-black font-bold text-sm tracking-wide py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-luxury-gold/20 cursor-pointer"
                   >
                     <User className="w-4 h-4 text-luxury-black" />
                     Sign In to Checkout
                     <ChevronRight className="w-4 h-4" />
                   </button>
                 ) : step === "cart" ? (
                   <button
                     onClick={() => setStep("shipping")}
                     className="w-full flex items-center justify-center gap-2.5 bg-luxury-gold hover:bg-yellow-400 text-luxury-black font-bold text-sm tracking-wide py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-luxury-gold/20 cursor-pointer"
                   >
                     Proceed to Shipping
                     <ChevronRight className="w-4 h-4" />
                   </button>
                 ) : (
                   /* Razorpay Pay Now */
                   <button
                     onClick={handleRazorpayPayment}
                     disabled={paymentStatus === "loading"}
                     className="w-full flex items-center justify-center gap-2.5 bg-luxury-gold hover:bg-yellow-400 text-luxury-black font-bold text-sm tracking-wide py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-luxury-gold/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                   >
                     {paymentStatus === "loading" ? (
                       <>
                         <Loader className="w-4 h-4 animate-spin" />
                         Processing…
                       </>
                     ) : (
                       <>
                         <CreditCard className="w-4 h-4" />
                         Pay ₹{totalPrice.toLocaleString()} Now
                         <ChevronRight className="w-4 h-4" />
                       </>
                     )}
                   </button>
                 )}

                {/* WhatsApp Alternate */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 py-3 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Or Order via WhatsApp
                </button>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-luxury-ivory/25 hover:text-luxury-ivory/50 tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
