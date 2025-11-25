export default function HeroSection() {
    return (
        <section className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-24">
            <div className="w-11/12 mx-auto px-6 grid md:grid-cols-2 items-center gap-16">

                {/* LEFT CONTENT */}
                <div className="animate-fadeIn">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        Premium Products Delivered Fast
                    </h1>

                    <p className="mt-5 text-lg md:text-xl text-gray-200">
                        Shop trending gadgets, accessories and more — with secure payment & lightning-fast delivery.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="bg-white text-purple-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition shadow-lg">
                            Shop Now
                        </button>

                        <button className="bg-purple-600 px-8 py-3 rounded-xl font-semibold border border-white/30 hover:bg-purple-700 transition">
                            Explore Products
                        </button>
                    </div>
                </div>

                {/* HERO IMAGE */}
                <div className="animate-fadeInUp">
                    <img
                        src="https://i.ibb.co/hRRyNctq/prime-Kart-hero.webp"
                        alt="Hero Banner"
                        className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/20"
                    />
                </div>
            </div>
        </section>
    );
}
