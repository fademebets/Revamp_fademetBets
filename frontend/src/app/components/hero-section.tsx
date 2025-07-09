"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Link } from "react-scroll"
import NextLink from "next/link"
import { BlurIn } from "@/components/ui/BlurIn"
import { TextFade } from "@/components/ui/TextFade"

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/herobg.jpg" alt="Hero Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Blur-in Hero Title */}
          <BlurIn>
            Smarter Bets. Bigger Wins.
          </BlurIn>

          {/* Animated paragraph */}
          <TextFade direction="up">
            <p className="text-gray-300 text-lg max-w-xl leading-tight">
              At <span className="font-bold">FadeMeBets</span>, we deliver carefully curated, data-backed betting signals designed to help you beat the odds and grow your bankroll. Join a community of sharp bettors turning insights into income — one winning pick at a time.
            </p>
          </TextFade>

          {/* Animated buttons */}
          <TextFade direction="up" staggerChildren={0.15}>
            <div className="flex space-x-4">
              <Link
                to="subscription"
                smooth={true}
                duration={500}
                offset={-50}
                className="bg-primary rounded-2xl text-white px-6 py-3 font-semibold bg-primary-hover transition cursor-pointer inline-block"
              >
                Get Started
              </Link>
              <NextLink
                href="/about"
                className="flex items-center cursor-pointer rounded-2xl space-x-2 border border-white text-white px-6 py-3 hover:bg-white hover:text-black transition"
              >
                <span>Learn More</span>
                <ArrowRight size={18} />
              </NextLink>
            </div>
          </TextFade>
        </div>

        {/* Right Image */}
        <div className="absolute left-[25rem] top-[-3rem] h-[800px] w-full flex items-end">
          <Image
            src="/playernew.png"
            alt="Inspiring person"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  )
}
