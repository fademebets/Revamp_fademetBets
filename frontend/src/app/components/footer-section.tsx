import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FooterSection() {
  return (
    <div className="w-full bg-white">
      {/* Navigation Bar */}
      <div className="border-b border-t px-4 sm:px-10 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-16 py-4 md:py-0">
            {/* Left Navigation */}
            <nav className="flex flex-wrap justify-center md:justify-start space-x-0 md:space-x-8 gap-4 md:gap-0">
              <Link href="#" className="text-sm font-medium text-gray-900 hover:text-gray-700">
                Home
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-900 hover:text-gray-700">
                About
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-900 hover:text-gray-700">
                What We Do
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-900 hover:text-gray-700">
                Stories
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-900 hover:text-gray-700">
                Articles
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-900 hover:text-gray-700">
                Contact
              </Link>
            </nav>

            {/* Right Buttons */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button size="sm" className="text-sm text-black bg-transparent border-0 shadow-none hover:bg-transparent">
                Book
              </Button>
              <Button size="sm" className="text-sm text-black bg-transparent border-0 shadow-none hover:bg-transparent">
                Donate Now!
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          {/* Programs Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Programs</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-sm text-black hover:text-blue-800 underline">
                Global Leadership Circle
              </Link>
              <Link href="#" className="block text-sm text-black hover:text-blue-800 underline">
                VantagePoint+
              </Link>
            </div>
          </div>

          {/* About the Book Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Book</h3>
            <div className="space-y-3 mb-4">
              <Link href="#" className="block text-sm text-black hover:text-blue-800 underline">
                Read a Sample Chapter
              </Link>
              <Link href="#" className="block text-sm text-black hover:text-blue-800 underline">
                Buy Book
              </Link>
            </div>
          </div>

          {/* Book Image - hidden on mobile */}
          <div className="hidden md:flex items-start justify-center absolute right-[40rem] top-0">
            <Image
              src="/book3d.png"
              alt="Book Cover"
              width={150}
              height={80}
              className="object-cover"
              priority={true}
            />
          </div>

          {/* Stay Connected Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Connected</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-sm text-black hover:text-blue-800 underline">
                Facebook
              </Link>
              <Link href="#" className="block text-sm text-black hover:text-blue-800 underline">
                LinkedIn
              </Link>
              <Link href="#" className="block text-sm text-black hover:text-blue-800 underline">
                Instagram
              </Link>
            </div>
          </div>

          {/* Terms of Use Column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms of Use</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-sm text-black hover:text-blue-800 underline">
                Privacy Statement
              </Link>
              <Link href="#" className="block text-sm text-black hover:text-blue-800 underline">
                © Copyright 2024
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
