'use client';

import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

export default function SocialSection() {
  return (
    <section className="py-20 px-6 bg-white text-center">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4">See What’s Happening in Social Media</h2>

      {/* Description */}
      <p className="text-base text-gray-600 mb-10 max-w-2xl mx-auto">
        Stay connected with us through all major social media
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 flex-wrap">
        {/* Instagram */}
        <div className="bg-black p-4 rounded-lg">
          <Instagram className="text-white w-7 h-7" />
        </div>

        {/* Facebook */}
        <div className="bg-black p-4 rounded-lg">
          <Facebook className="text-white w-7 h-7" />
        </div>

        {/* YouTube */}
        <div className="bg-black p-4 rounded-lg">
          <Youtube className="text-white w-7 h-7" />
        </div>

        {/* LinkedIn */}
        <div className="bg-black p-4 rounded-lg">
          <Linkedin className="text-white w-7 h-7" />
        </div>
      </div>
    </section>
  );
}
