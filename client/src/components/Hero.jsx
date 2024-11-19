import { useState, useEffect } from "react";
import hero1 from "../assets/Hero/hero1.jpg";
import hero2 from "../assets/Hero/hero2.jpg";
import hero3 from "../assets/Hero/hero3.jpg";
import hero4 from "../assets/Hero/hero4.jpg";
import hero5 from "../assets/Hero/hero5.jpg";
import hero6 from "../assets/Hero/hero6.jpg";

function Hero() {
  const images = [hero1, hero2, hero3, hero4, hero5, hero6];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <div className="overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-96 object-cover transition-all duration-500"
        />
      </div>
    </section>
  );
}

export default Hero;
