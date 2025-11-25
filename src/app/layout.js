import Navbar from "@/Component/Navbar";
import "./globals.css";
import Footer from "@/Component/Footer";
import { CartProvider } from "@/Context/CartContext";
import { AuthProvider } from "@/Context/AuthContext";

export const metadata = {
  title: "PrimeKart",
  description: "Modern e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>


      </body>
    </html>
  );
}
