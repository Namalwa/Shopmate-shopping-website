import React from "react";
import testimonies from "../Data/testimonies";

function TestimonyCard({ customerAvatar, customerName, title, text }) {
  return (
    <div className="bg-white shadow-lg w-full max-w-2xl mx-auto p-4 mb-4 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={customerAvatar}
          alt={customerName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <h4 className="capitalize text-lg font-semibold">{customerName}</h4>
      </div>
      <h4 className="capitalize text-xl font-semibold mb-2">{title}</h4>
      <p className="text-base leading-relaxed text-justify">{text}</p>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">TESTIMONIALS</h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonies.map((testimony, i) => (
            <TestimonyCard
              key={i}
              customerAvatar={testimony.customerAvatar}
              customerName={testimony.customerName}
              title={testimony.title}
              text={testimony.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
