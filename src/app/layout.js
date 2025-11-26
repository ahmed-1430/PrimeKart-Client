import "./globals.css";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import { CartProvider } from "@/Context/CartContext";
import { AuthProvider } from "@/Context/AuthContext";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "PrimeKart",
  description: "Modern e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastContainer />
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
