// components/HowThenShallWeLiveSection.jsx

import Image from "next/image";

export default function HowThenShallWeLiveSection() {
  return (
    <section className="py-24 px-6 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl leading-relaxed font-bold mb-6">
            God cares not only about redeeming souls but also about restoring his creation . . .
          </h1>
          <p className="text-base leading-relaxed mb-8">
            We are called to help sustain and renew his creation, to uphold the created institutions of family and society, to pursue science and scholarship, to create works of art and beauty, and to heal and help those suffering from the results of the Fall.
          </p>
          <div className="text-lg font-bold text-gray-900 mb-2">
            — Charles Colson &amp; Nancy Pearcey
          </div>
          <div className="text-base ml-0 md:ml-6 text-gray-800">
            How then shall we live?
          </div>
        </div>

        {/* Image */}
        <div className="flex-1">
          <Image
          height={100}
          width={240}
            src="/walk.jpg"
            alt="How Then Shall We Live?"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
