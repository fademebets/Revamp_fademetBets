import { Separator } from "@/components/ui/separator";
import { ArrowUpRight } from "lucide-react";

export default function JoinCommunitySection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl bg-[#121212] px-4 py-14 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 relative">

       <div className="hidden md:block absolute -top-14 -bottom-14 left-1/2">
  <Separator orientation="vertical" className="h-full bg-white w-[1px]" />
</div>


         <div className="flex flex-col justify-center items-center text-center py-10 md:py-20 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase mb-6">
              JOIN OUR GLOBAL
              <br />
              COMMUNITY
            </h1>
            <p className="text-gray-300 text-base">
              Be the first to know about our news,
              <br className="hidden md:block" /> programs, and impact
            </p>
          </div>


          {/* Right Column - Form */}
          <div className="flex flex-col justify-center py-8 md:py-16 md:pl-12">
            <h3 className="text-white text-lg font-medium mb-6">Join Us Today!</h3>

            <form className="space-y-6">
              {/* Name Input */}
              <div className="border-b border-gray-700">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent border-0 text-white placeholder:text-gray-500 py-2 focus:outline-none focus:ring-0"
                />
              </div>

              {/* Email Input */}
              <div className="border-b border-gray-700">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-0 text-white placeholder:text-gray-500 py-2 focus:outline-none focus:ring-0"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-primary  text-white px-5 py-2 text-sm rounded-lg font-medium flex items-center"
                >
                  Submit
                  <ArrowUpRight className="h-4 w-4 ml-2"/>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
