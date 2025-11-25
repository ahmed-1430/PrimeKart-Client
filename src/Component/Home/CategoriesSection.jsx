export default function CategoriesSection() {
  const categories = [
    { name: "Electronics", img: "https://dummyimage.com/300x200/ccc/000&text=Electronics" },
    { name: "Fashion", img: "https://dummyimage.com/300x200/ccc/000&text=Fashion" },
    { name: "Home Decor", img: "https://dummyimage.com/300x200/ccc/000&text=Home+Decor" },
  ];

  return (
    <section className="py-16">
      <div className="w-11/12 mx-auto px-6">

        <h2 className="text-3xl font-bold mb-6">Browse Categories</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white shadow rounded-xl overflow-hidden cursor-pointer">
              <img src={cat.img} className="w-full h-48 object-cover" />
              <h3 className="text-xl font-semibold px-6 py-4">{cat.name}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
