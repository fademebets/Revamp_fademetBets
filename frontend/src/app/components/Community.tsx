"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight } from "lucide-react"
import Lottie from "react-lottie-player"
import successAnimation from "../../../public/lottus.json"

export default function JoinCommunitySection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = await fetch("https://formspree.io/f/xdkzrvnp", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    })

    if (res.ok) {
      setSubmitted(true)
      form.reset()
    }
  }

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl bg-[#121212] rounded-xl px-4 py-14 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 relative">

          <div className="hidden md:block absolute -top-14 -bottom-14 left-1/2">
            <Separator orientation="vertical" className="h-full bg-white w-[1px]" />
          </div>

          {/* Left Column */}
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

          {/* Right Column */}
          <div className="flex flex-col justify-center py-8 md:py-16 md:pl-12">

            {/* Success Animation */}
            {submitted ? (
              <div className="flex flex-col items-center text-center">
                <Lottie
                  loop={false}
                  play
                  animationData={successAnimation}
                  style={{ width: 200, height: 200 }}
                />
                <h3 className="text-white text-lg font-semibold mt-6">You're In! 🎉</h3>
                <p className="text-gray-300 text-sm mt-2">Thanks for joining our community!</p>
              </div>
            ) : (
              <>
                <h3 className="text-white text-lg font-medium mb-6">Join Us Today!</h3>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="border-b border-gray-700">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                      className="w-full bg-transparent border-0 text-white placeholder:text-gray-500 py-2 focus:outline-none focus:ring-0"
                    />

                  </div>

                  <div className="border-b border-gray-700">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      className="w-full bg-[#121212]  border-0 focus:bg-[#121212]  text-white placeholder:text-gray-500 py-2 focus:outline-none focus:ring-0"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-primary cursor-pointer text-white px-5 py-2 text-sm rounded-lg font-medium flex items-center"
                    >
                      Submit
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
