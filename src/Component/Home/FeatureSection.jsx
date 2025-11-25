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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {list.map((item, i) => (
          <div
            key={i}
            className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="text-4xl">{item.icon}</div>
            <h3 className="text-xl font-bold mt-3">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
