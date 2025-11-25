export default function HeroSection() {
  return (
    <section className="bg-linear-to-r from-purple-600 to-purple-900 text-white py-24">
      <div className="w-11/12 mx-auto px-6 grid md:grid-cols-2 items-center gap-10">

        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome to PrimeKart
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Discover high-quality products with fast delivery and secure payment.
          </p>

          <button className="mt-6 bg-white text-purple-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>

        <div>
          <img
            src="https://i.ibb.co.com/hRRyNctq/prime-Kart-hero.webp"
            alt="Hero Banner"
            className="w-full rounded-xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}
