import { NavLink } from "react-router-dom";
import explore1 from "../assets/Explore/explore1.jpg";
import explore2 from "../assets/Explore/explore2.jpg";
import explore3 from "../assets/Explore/explore3.jpeg";
import explore4 from "../assets/Explore/explore4.jpg";

const clothingItems = [
  {
    id: 1,
    imageUrl: explore1,
    link: "/shop/t-shirt",
  },
  {
    id: 2,
    imageUrl: explore2,
    link: "/shop/dress",
  },
  {
    id: 3,
    imageUrl: explore3,
    link: "/shop/hoodie",
  },
  {
    id: 4,
    imageUrl: explore4,
    link: "/shop/hoodie",
  },
];

function Explore() {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Collection
        </h2>
        <div className="grid grid-cols-4 gap-10">
          {clothingItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md overflow-hidden h-96 relative transform transition-transform duration-300 hover:scale-105"
              style={{ width: "100%" }}
            >
              <img
                src={item.imageUrl}
                alt="Clothing Item"
                className="w-full h-full object-cover"
              />
              <NavLink to={item.link}>
                <button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 py-1 px-4 text-sm bg-white text-black font-bold border border-black rounded-md transition-all duration-300">
                  Shop Now
                </button>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Explore;
