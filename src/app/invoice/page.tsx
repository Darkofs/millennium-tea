"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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

interface CustomerInfo {
  name: string;
  email: string;
}

function InvoiceContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [mounted, setMounted] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!paymentId) { setNotFound(true); return; }

    // Load active session
    try {
      const session = localStorage.getItem("millennium_active_session");
      if (session) setCustomer(JSON.parse(session));
    } catch { /* ignore */ }

    // Search all user order keys for the matching payment
    try {
      const keys = Object.keys(localStorage).filter((k) =>
        k.startsWith("millennium_orders_")
      );

      let found: Order | null = null;
      for (const key of keys) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const orders: Order[] = JSON.parse(raw);
        const match = orders.find((o) => o.id === paymentId);
        if (match) { found = match; break; }
      }

      if (found) {
        setOrder(found);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  }, [paymentId]);

  if (!mounted) return null;

  if (notFound || !order) {
    return (
      <div style={{ minHeight: "100vh", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", color: "#F8F5F0" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.5rem", color: "#D4AF37" }}>Invoice Not Found</p>
          <p style={{ color: "#888", marginTop: "8px" }}>No order found with the provided reference.</p>
          <button onClick={() => window.close()} style={{ marginTop: "24px", padding: "10px 24px", background: "#D4AF37", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "#0B0B0B" }}>Close Tab</button>
        </div>
      </div>
    );
  }

  const invoiceDate = new Date(order.date).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric"
  });
  const invoiceTime = new Date(order.date).toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", hour12: true
  });

  const invoiceNumber = `MLTEA-${order.id.slice(-8).toUpperCase()}`;
  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const gstRate = 0.05; // 5% GST on tea
  const gstAmount = Math.round(subtotal * gstRate);
  const grandTotal = subtotal + gstAmount;

  return (
    <>
      {/* Print-only global styles + screen preview styles */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0d0d0d; }

        .invoice-wrapper {
          min-height: 100vh;
          background: #0d0d0d;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px 80px;
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        .invoice-actions {
          width: 100%;
          max-width: 860px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-back {
          background: transparent;
          border: 1px solid rgba(212,175,55,0.3);
          color: rgba(248,245,240,0.6);
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-family: sans-serif;
          transition: all 0.2s;
          letter-spacing: 0.05em;
        }
        .btn-back:hover { border-color: #D4AF37; color: #D4AF37; }

        .btn-print {
          background: #D4AF37;
          border: none;
          color: #0B0B0B;
          padding: 12px 32px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 700;
          font-family: sans-serif;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: background 0.2s;
        }
        .btn-print:hover { background: #f0c84d; }

        .invoice-card {
          width: 100%;
          max-width: 860px;
          background: #ffffff;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 20px 80px rgba(0,0,0,0.6);
        }

        /* ──── INVOICE HEADER ──── */
        .inv-header {
          background: #0B0B0B;
          padding: 40px 48px 36px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #D4AF37;
        }
        .inv-brand-logo {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .inv-logo-circle {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 1.5px solid #D4AF37;
          display: flex; align-items: center; justify-content: center;
          background: transparent;
        }
        .inv-logo-m {
          color: #D4AF37;
          font-size: 22px;
          font-family: Georgia, serif;
          font-weight: 700;
        }
        .inv-brand-name {
          color: #F8F5F0;
          font-size: 20px;
          font-family: Georgia, serif;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .inv-brand-tag {
          color: #D4AF37;
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-family: 'Arial', sans-serif;
          margin-top: 2px;
        }
        .inv-title-block { text-align: right; }
        .inv-title {
          color: #D4AF37;
          font-size: 36px;
          font-family: Georgia, serif;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .inv-number {
          color: rgba(248,245,240,0.5);
          font-size: 12px;
          font-family: monospace;
          letter-spacing: 0.08em;
          margin-top: 4px;
        }

        /* ──── GOLD STRIP ──── */
        .inv-gold-strip {
          background: linear-gradient(90deg, #D4AF37 0%, #f0c84d 50%, #D4AF37 100%);
          height: 3px;
        }

        /* ──── BODY ──── */
        .inv-body { padding: 40px 48px; background: #fff; }

        /* Meta row */
        .inv-meta {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 32px;
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid #f0ece4;
        }
        .inv-meta-label {
          font-family: sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4AF37;
          margin-bottom: 6px;
        }
        .inv-meta-value {
          font-size: 13px;
          color: #1a1a1a;
          font-family: sans-serif;
          line-height: 1.6;
        }
        .inv-meta-value strong { font-weight: 700; }

        /* Customer + Company info */
        .inv-parties {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 36px;
          padding-bottom: 32px;
          border-bottom: 1px solid #f0ece4;
        }
        .inv-party-label {
          font-family: sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #D4AF37;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(212,175,55,0.25);
        }
        .inv-party-name {
          font-family: Georgia, serif;
          font-size: 17px;
          font-weight: 700;
          color: #0B0B0B;
          margin-bottom: 4px;
        }
        .inv-party-line {
          font-family: sans-serif;
          font-size: 12px;
          color: #555;
          line-height: 1.7;
        }

        /* Items Table */
        .inv-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 32px;
          font-family: sans-serif;
        }
        .inv-table th {
          background: #0B0B0B;
          color: #D4AF37;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 16px;
          text-align: left;
        }
        .inv-table th:last-child { text-align: right; }
        .inv-table td {
          padding: 14px 16px;
          font-size: 13px;
          color: #1a1a1a;
          border-bottom: 1px solid #f5f0e8;
          vertical-align: top;
        }
        .inv-table td:last-child { text-align: right; font-weight: 600; }
        .inv-table tr:nth-child(even) td { background: #faf7f2; }
        .inv-table tr:last-child td { border-bottom: none; }
        .inv-item-name { font-weight: 700; color: #0B0B0B; margin-bottom: 2px; }
        .inv-item-meta { font-size: 11px; color: #999; margin-top: 2px; }

        /* Totals */
        .inv-totals {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 32px;
        }
        .inv-totals-table {
          min-width: 300px;
          font-family: sans-serif;
        }
        .inv-totals-row {
          display: flex;
          justify-content: space-between;
          padding: 7px 0;
          font-size: 13px;
          color: #555;
          border-bottom: 1px solid #f5f0e8;
        }
        .inv-totals-row:last-child { border-bottom: none; }
        .inv-totals-row.grand {
          background: #0B0B0B;
          color: #D4AF37;
          font-size: 15px;
          font-weight: 700;
          padding: 12px 16px;
          border-radius: 4px;
          margin-top: 8px;
          letter-spacing: 0.05em;
        }

        /* Payment */
        .inv-payment {
          background: #faf7f2;
          border: 1px solid #f0ece4;
          border-left: 3px solid #D4AF37;
          border-radius: 4px;
          padding: 18px 20px;
          margin-bottom: 32px;
          font-family: sans-serif;
        }
        .inv-payment-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #D4AF37;
          margin-bottom: 10px;
        }
        .inv-payment-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #444;
          padding: 4px 0;
        }
        .inv-payment-row span:first-child { color: #888; }
        .inv-payment-row span:last-child { font-family: monospace; color: #0B0B0B; font-weight: 600; }

        /* Footer strip */
        .inv-footer {
          background: #0B0B0B;
          padding: 24px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .inv-footer-note {
          font-family: sans-serif;
          font-size: 10px;
          color: rgba(248,245,240,0.4);
          letter-spacing: 0.05em;
          line-height: 1.6;
        }
        .inv-footer-reg {
          font-family: monospace;
          font-size: 10px;
          color: rgba(212,175,55,0.5);
          text-align: right;
          line-height: 1.7;
        }

        /* PRINT STYLES */
        @media print {
          body { background: #fff !important; }
          .invoice-wrapper { background: #fff !important; padding: 0 !important; }
          .invoice-actions { display: none !important; }
          .invoice-card {
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          @page { margin: 0; size: A4; }
        }

        /* MOBILE RESPONSIVE OVERRIDES */
        @media (max-width: 768px) {
          .invoice-wrapper {
            padding: 0 0 40px 0;
          }
          .invoice-actions {
            max-width: 100%;
            padding: 16px 20px;
            margin-bottom: 0;
            background: #0B0B0B;
            border-bottom: 1px solid rgba(212,175,55,0.15);
          }
          .invoice-card {
            border-radius: 0;
            box-shadow: none;
            max-width: 100%;
          }
          .inv-header {
            padding: 28px 20px;
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }
          .inv-title-block {
            text-align: left;
            width: 100%;
            border-top: 1px solid rgba(212,175,55,0.15);
            padding-top: 20px;
          }
          .inv-title {
            font-size: 28px;
          }
          .inv-body {
            padding: 28px 20px;
          }
          .inv-meta {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 28px;
            padding-bottom: 24px;
          }
          .inv-parties {
            grid-template-columns: 1fr;
            gap: 28px;
            margin-bottom: 28px;
            padding-bottom: 24px;
          }
          .inv-table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
            margin-bottom: 24px;
            -webkit-overflow-scrolling: touch;
          }
          .inv-table th, .inv-table td {
            padding: 10px 8px;
            font-size: 12px;
          }
          .inv-totals-table {
            width: 100%;
            min-width: 0;
          }
          .inv-payment {
            padding: 14px 16px;
            margin-bottom: 24px;
          }
          .inv-footer {
            padding: 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .inv-footer-reg {
            text-align: left;
          }
        }
      `}</style>

      <div className="invoice-wrapper">
        {/* Action bar — hidden on print */}
        <div className="invoice-actions">
          <button className="btn-back" onClick={() => window.close()}>
            ← Close Invoice
          </button>
          <button className="btn-print" onClick={() => window.print()}>
            🖨️ &nbsp;Save / Print as PDF
          </button>
        </div>

        {/* Invoice Card */}
        <div className="invoice-card">

          {/* Header */}
          <div className="inv-header">
            <div className="inv-brand-logo">
              <div className="inv-logo-circle">
                <span className="inv-logo-m">M</span>
              </div>
              <div>
                <div className="inv-brand-name">Millennium</div>
                <div className="inv-brand-tag">Thé Premium</div>
              </div>
            </div>
            <div className="inv-title-block">
              <div className="inv-title">Invoice</div>
              <div className="inv-number">{invoiceNumber}</div>
            </div>
          </div>
          <div className="inv-gold-strip" />

          {/* Body */}
          <div className="inv-body">

            {/* Meta Info */}
            <div className="inv-meta">
              <div>
                <div className="inv-meta-label">Invoice Date</div>
                <div className="inv-meta-value">
                  <strong>{invoiceDate}</strong><br />
                  <span style={{ color: "#888", fontSize: "11px" }}>{invoiceTime}</span>
                </div>
              </div>
              <div>
                <div className="inv-meta-label">Invoice No.</div>
                <div className="inv-meta-value"><strong>{invoiceNumber}</strong></div>
              </div>
              <div>
                <div className="inv-meta-label">Payment Status</div>
                <div className="inv-meta-value">
                  <span style={{ display: "inline-block", background: "#d1fae5", color: "#065f46", fontSize: "11px", fontWeight: 700, padding: "2px 10px", borderRadius: "20px", letterSpacing: "0.08em" }}>
                    ✓ {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Parties */}
            <div className="inv-parties">
              {/* Customer */}
              <div>
                <div className="inv-party-label">Bill To — Customer</div>
                <div className="inv-party-name">{customer?.name ?? "Valued Customer"}</div>
                <div className="inv-party-line">{customer?.email ?? "—"}</div>
                <div className="inv-party-line" style={{ marginTop: "8px", color: "#aaa", fontSize: "11px" }}>
                  Payment via Razorpay (Online)
                </div>
              </div>
              {/* Seller */}
              <div>
                <div className="inv-party-label">Sold By — Millennium Tea</div>
                <div className="inv-party-name">Millennium Premium Tea</div>
                <div className="inv-party-line">Anachal PO, Munnar,</div>
                <div className="inv-party-line">Idukki, Kerala — 685565, India</div>
                <div className="inv-party-line">millenniumpremiumtea@gmail.com</div>
                <div className="inv-party-line">+91 80894 06346</div>
                <div className="inv-party-line" style={{ marginTop: "8px", fontSize: "11px", color: "#aaa" }}>
                  GSTIN: 32AAECB5910K1ZB<br />
                  Tea Board Reg: TB-A9821
                </div>
              </div>
            </div>

            {/* Items Table */}
            <table className="inv-table">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Product</th>
                  <th>Grade / Variant</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={`${item.id}-${item.grade}-${idx}`}>
                    <td>
                      <div className="inv-item-name">{item.name}</div>
                      <div className="inv-item-meta">Premium Artisanal Blend</div>
                    </td>
                    <td style={{ fontSize: "12px" }}>{item.grade || "Standard"}</td>
                    <td style={{ fontSize: "12px" }}>{item.size}</td>
                    <td style={{ fontSize: "13px", fontWeight: 600 }}>{item.quantity}</td>
                    <td style={{ fontSize: "13px" }}>₹{item.price.toLocaleString("en-IN")}</td>
                    <td>₹{(item.price * item.quantity).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="inv-totals">
              <div className="inv-totals-table">
                <div className="inv-totals-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="inv-totals-row">
                  <span>GST @ 5% (Tea)</span>
                  <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="inv-totals-row">
                  <span>Shipping</span>
                  <span style={{ color: "#16a34a", fontWeight: 700 }}>Included</span>
                </div>
                <div className="inv-totals-row grand">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="inv-payment">
              <div className="inv-payment-label">Payment Information</div>
              <div className="inv-payment-row">
                <span>Payment Method</span>
                <span>Razorpay (Online Payment Gateway)</span>
              </div>
              <div className="inv-payment-row">
                <span>Payment ID</span>
                <span>{order.id}</span>
              </div>
              <div className="inv-payment-row">
                <span>Razorpay Order ID</span>
                <span>{order.orderId}</span>
              </div>
              <div className="inv-payment-row">
                <span>Transaction Date</span>
                <span>{invoiceDate} at {invoiceTime}</span>
              </div>
              <div className="inv-payment-row">
                <span>Currency</span>
                <span>INR (Indian Rupee ₹)</span>
              </div>
            </div>

            {/* Thank you note */}
            <div style={{ textAlign: "center", padding: "8px 0 4px", borderTop: "1px solid #f0ece4" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#0B0B0B", fontStyle: "italic", letterSpacing: "0.02em" }}>
                "Thank you for choosing Millennium Tea — Every cup, a journey."
              </p>
              <p style={{ fontFamily: "sans-serif", fontSize: "11px", color: "#aaa", marginTop: "8px" }}>
                For queries, reach us at{" "}
                                <a href="https://wa.me/message/WXU5NCOSMGVRE1" style={{ color: "#D4AF37" }}>WhatsApp</a>
                {" "}or{" "}
                <a href="mailto:millenniumpremiumtea@gmail.com" style={{ color: "#D4AF37" }}>millenniumpremiumtea@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="inv-footer">
            <div className="inv-footer-note">
              This is a computer-generated invoice.<br />
              No signature required. Valid for accounting and tax purposes.
            </div>
            <div className="inv-footer-reg">
              Millennium Tea Exports<br />
              GSTIN: 32AAECB5910K1ZB | TB-A9821
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default function InvoicePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "#0B0B0B", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #D4AF37", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
      </div>
    }>
      <InvoiceContent />
    </Suspense>
  );
}
