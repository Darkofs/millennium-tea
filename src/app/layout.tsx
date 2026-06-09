import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { AuthProvider } from "@/context/AuthContext";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sansFont = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Millennium | Premium Handcrafted Luxury Tea",
  description: "Exquisite artisanal tea blends designed for wellness, flavor, and everyday luxury. Special Masala Tea, Ginger Tea, Lemon Tea, Green Tea, and Turmeric Health Tea.",
  metadataBase: new URL("https://millenniumtea.com"),
  openGraph: {
    title: "Millennium | Premium Handcrafted Luxury Tea",
    description: "Exquisite artisanal tea blends designed for wellness, flavor, and everyday luxury. Sourced from pristine estates in Darjeeling, Assam, and Munnar.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} scroll-smooth antialiased`}
      style={{ backgroundColor: "#0B0B0B" }}
    >
      <body className="min-h-screen bg-[#0B0B0B] text-[#F8F5F0] font-sans selection:bg-[#D4AF37] selection:text-[#0B0B0B]">
        <AuthProvider>
          <CartProvider>
            <CartDrawer />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
