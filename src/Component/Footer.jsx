export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 py-10 mt-16">
      <div className="w-11/12 mx-auto px-4 grid md:grid-cols-3 gap-8">

        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-bold text-white">PrimeKart</h2>
          <p className="text-sm mt-2 text-gray-400">Shop smarter with modern UI.</p>
        </div>

        {/* Column 2 */}
        <div>
          <p className="font-semibold text-white mb-3">Quick Links</p>
          <a href="#" className="block py-1 hover:text-white">Home</a>
          <a href="/products" className="block py-1 hover:text-white">Products</a>
          <a href="/contact" className="block py-1 hover:text-white">Contact</a>
        </div>

        {/* Column 3 */}
        <div>
          <p className="font-semibold text-white mb-3">Follow Us</p>
          <p className="text-sm text-gray-400">Facebook • Instagram • Twitter</p>
        </div>

      </div>

      <div className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} PrimeKart. All Rights Reserved.
      </div>
    </footer>
  );
}
