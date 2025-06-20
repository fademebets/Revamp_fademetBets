import Image from "next/image"

export default function WhyWeServeSection() {
  return (
<section className="relative py-16 px-4 overflow-hidden">

  <div className="absolute inset-0 bg-[url('/bgserve.png')] bg-cover bg-center bg-no-repeat opacity-10"></div>

      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">Why We Serve You</h2>

        {/* Description Text */}
        <div className="text-center mb-8 space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            We see a world where Jesus-followers in every sphere of society live out their calling, transforming their
            workplaces and communities into flourishing centers for the common good of all people.
          </p>
          <p className="text-[#A1CF5F] text-lg font-bold">Just as God Intended</p>
        </div>

        {/* Main Image Card */}
      <div className="relative w-full max-w-3xl mx-auto">
          <div className="relative w-full rounded-lg overflow-hidden">
            {/* Background Image */}
            <Image
              src="/whyweserve.png"
              alt="Hands holding a small plant seedling representing purposeful living"
              width={1200}
              height={800}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
