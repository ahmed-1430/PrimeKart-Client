import Navbar from "@/Component/Navbar";
import "./globals.css";
import Footer from "@/Component/Footer";

export const metadata = {
  title: "PrimeKart",
  description: "E-Commerce App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <div className="max-w-11/12 h-screen mx-auto py-6">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
