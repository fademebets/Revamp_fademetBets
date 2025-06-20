import Image from "next/image"

export default function HowWeServeSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">How We Serve You</h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Awaken Card */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-[20rem] md:w-56 md:h-[20.5rem] mb-6">
              <div className="absolute inset-0 rounded-full bg-[#A1CF5F] p-1">
                <div className="w-full h-[20rem] rounded-full overflow-hidden bg-white ">
                  <Image
                    src="/hereweserve1.png"
                    alt="People collaborating in workplace and community setting"
                    width={224}
                    height={324}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Awaken</h3>
            <p className="text-gray-600 text-sm px-20 leading-relaxed max-w-xs">
              you to your sacred role in God&apos;s story
            </p>
          </div>

          {/* Equip Card */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-[20rem] md:w-56  md:h-[20.5rem] mb-6">
              <div className="absolute inset-0 rounded-full bg-[#A1CF5F] p-1">
                <div className="w-full h-[20rem] rounded-full overflow-hidden bg-white ">
                  <Image
                    src="/hereweserve2.jpg"
                    alt="People collaborating in workplace and community setting"
                    width={265}
                    height={358}
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Equip</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">you to live purposefully</p>
          </div>

          {/* Unleash Card */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-[20rem] md:w-56  md:h-[20.5rem] mb-6">
              <div className="absolute inset-0 rounded-full bg-[#A1CF5F] p-1">
                <div className="w-full h-[20rem] rounded-full overflow-hidden bg-white ">
                  <Image
                    src="/hereweserve3.png"
                    alt="People collaborating in workplace and community setting"
                    width={224}
                    height={324}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unleash</h3>
            <p className="text-gray-600 text-sm px-10  leading-relaxed max-w-xs">
              you to transform your workplace and communities
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
