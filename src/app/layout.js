import Navbar from "@/Component/Navbar";
import "./globals.css";
import Footer from "@/Component/Footer";

export const metadata = {
  title: "PrimeKart",
  description: "Modern e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
