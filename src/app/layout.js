import Navbar from "@/Component/Navbar";
import "./globals.css";
import Footer from "@/Component/Footer";
import { CartProvider } from "@/Context/CartContext";

export const metadata = {
  title: "PrimeKart",
  description: "Modern e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>

      </body>
    </html>
  );
}
