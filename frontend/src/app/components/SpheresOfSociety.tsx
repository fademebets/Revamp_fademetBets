import Image from "next/image";
import React from "react";

export default function SpheresOfSociety() {
  const logos = [
    { id: 1, alt: "Logo 1", src: "/sphere1.png", label: "Arts" },
    { id: 2, alt: "Logo 2", src: "/sphere2.png", label: "Business" },
    { id: 3, alt: "Logo 3", src: "/sphere3.png", label: "Religion" },
    { id: 4, alt: "Logo 4", src: "/sphere4.png", label: "Family" },
    { id: 5, alt: "Logo 5", src: "/sphere5.png", label: "Media" },
    { id: 6, alt: "Logo 6", src: "/sphere6.png", label: "Goverment" },
    { id: 7, alt: "Logo 7", src: "/sphere7.png", label: "Education" },
  ];

  return (
    <section className="py-10 px-4 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-8">Spheres of Society</h2>

      <div className="flex space-x-0 overflow-x-auto no-scrollbar justify-center">
        {logos.map((logo, index) => (
          <div
            key={logo.id}
            className={`flex flex-col items-center justify-center flex-shrink-0 w-32 h-32 border border-gray-100
              ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
          >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={40}
            height={64}
            className="object-contain mb-2"
            loading="lazy"
          />
            <span className="text-sm font-medium text-gray-700">{logo.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
