import spotlightItems from "../Data/spotlight";

function Spotlight() {
  return (
    <section className="py-8 bg-gray-100 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8">
        Spotlight Collection
      </h2>
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee space-x-8">
          {[...spotlightItems, ...spotlightItems].map((item, index) => (
            <div
              key={index}
              className="min-w-[250px] h-96 flex-shrink-0 relative overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt="Clothing Item"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Spotlight;
