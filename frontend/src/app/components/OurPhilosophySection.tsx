import Image from "next/image"

export default function OurPhilosophySection() {
  return (
    <section className="py-16 px-4 bg-white">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-20">
        Our Philosophy
      </h2>

      {/* Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Left Image */}
        <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            src="/piechart.png"
            alt="Philosophy image"
            width={600}
            height={400}
            className="object-cover w-full h-auto"
          />
        </div>

        {/* Right Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
           The Entire Workplace Needs to Embrace Their Sacred Roles in Influential Centers of Kingdom Culture
          </h2>
<p className="text-gray-700 text-base mt-5 tracking-tight leading-snug">
            Barna Research shows only 1% of Jesus-followers work in the religion sphere. Many people wrongly believe that only the religion sphere is sacred work. We believe that all spheres are inherently sacred. This means that the other 99% need to be actively engaged in God’s purposes for their work. Each sphere of society has cultural impact.
To shape culture, we must empower people where they work.
          </p>
        </div>
      </div>
    </section>
  )
}
