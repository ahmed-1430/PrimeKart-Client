export default function FeaturesSection() {
  const list = [
    {
      title: "Fast Delivery",
      desc: "Get your products delivered within 48 hours.",
      icon: "🚚",
    },
    {
      title: "Best Quality",
      desc: "We provide premium quality items at the best prices.",
      icon: "⭐",
    },
    {
      title: "Secure Payments",
      desc: "Your transactions are safe and encrypted.",
      icon: "🔒",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Shop With <span className="text-purple-600">PrimeKart?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {list.map((item, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition relative border border-gray-200"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
