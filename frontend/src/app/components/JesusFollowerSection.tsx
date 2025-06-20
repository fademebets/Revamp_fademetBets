// components/JesusFollowerSection.jsx

export default function JesusFollowerSection() {
  return (
    <section className="relative text-black py-[7rem] px-6 text-center min-h-[400px] overflow-hidden">
      {/* Background Images */}
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url('/jesusfollower-Photoroom.png'), url('/jesusfollower-Photoroom.png')`,
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: '50% 100%, 50% 100%',
          backgroundPosition: 'left center, right center',
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-20">Jesus-Followers Should Be Culture Makers</h2>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* First Column */}
          <div className="flex-1 text-center md:text-right px-4">
            <h3 className="text-base font-bold mb-4">People Create Culture</h3>
            <p className="text-base leading-relaxed">
              When we talk about people creating impact within their sphere of society, we’re talking about creating cultural transformation, built on  justice, love, shalom, and other biblical principles.
            </p>
          </div>

          {/* Second Column */}
          <div className="flex-1 text-center px-4">
            <h3 className="text-base font-bold mb-4">Communities Are Hubs of Culture</h3>
            <p className="text-base leading-relaxed">
              What begins in a community often radiates to surrounding areas. Nearly every cultural, political, artistic or social movement has its  roots in the community.
            </p>
          </div>

          {/* Third Column */}
          <div className="flex-1 text-center md:text-left px-4">
            <h3 className="text-base font-bold mb-4">Culture Builds Kingdom</h3>
            <p className="text-base leading-relaxed">
              Culture-building is kingdom-building, and we need communities to be centers of influence in order to achieve greater global reach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
