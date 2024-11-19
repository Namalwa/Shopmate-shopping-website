import { NavLink } from "react-router-dom";
import spotlight1 from "../assets/Spotlight/spotlight1.jpg";
import spotlight2 from "../assets/Spotlight/spotlight2.jpg";
import spotlight3 from "../assets/Spotlight/spotlight3.jpg";
import spotlight4 from "../assets/Spotlight/spotlight4.jpg";
import spotlight5 from "../assets/Spotlight/spotlight5.jpg";
import spotlight6 from "../assets/Spotlight/spotlight6.jpg";
import spotlight7 from "../assets/Spotlight/spotlight7.jpg";
import spotlight8 from "../assets/Spotlight/spotlight8.jpg";

const spotlightItems = [
  { id: 1, imageUrl: spotlight1, link: "/shop/item1" },
  { id: 2, imageUrl: spotlight2, link: "/shop/item2" },
  { id: 3, imageUrl: spotlight3, link: "/shop/item3" },
  { id: 4, imageUrl: spotlight4, link: "/shop/item4" },
  { id: 5, imageUrl: spotlight5, link: "/shop/item5" },
  { id: 6, imageUrl: spotlight6, link: "/shop/item6" },
  { id: 7, imageUrl: spotlight7, link: "/shop/item7" },
  { id: 8, imageUrl: spotlight8, link: "/shop/item8" },
];

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
              <NavLink to={item.link}>
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 py-2 px-4 bg-white text-black font-semibold border border-black rounded-md hover:bg-black hover:text-white">
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

export default Spotlight;
