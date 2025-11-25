export default function CategoriesSection() {
  const categories = [
    {
      name: "Electronics",
      img: "https://dummyimage.com/300x200/ccc/000&text=Electronics",
    },
    {
      name: "Fashion",
      img: "https://dummyimage.com/300x200/ccc/000&text=Fashion",
    },
    {
      name: "Home Decor",
      img: "https://dummyimage.com/300x200/ccc/000&text=Home+Decor",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-11/12 mx-auto px-6">

        <h2 className="text-3xl font-bold mb-10 text-center">
          Browse <span className="text-purple-600">Categories</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition hover:-translate-y-1"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={cat.img}
                  className="w-full h-full object-cover hover:scale-105 transition"
                  alt={cat.name}
                />
              </div>

              <h3 className="text-xl font-semibold px-6 py-4 text-center">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
