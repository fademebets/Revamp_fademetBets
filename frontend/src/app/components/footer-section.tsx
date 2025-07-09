import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink, Youtube } from "lucide-react"

export default function Footer() {
 const navigationLinks = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Parley Calculator", href: "/parley-calc" },
  { name: "EV Calculator", href: "/ev-calc" },
  { name: "Blogs", href: "/blog" },
]

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ]

  const supportLinks = [
    { name: "Contact Support", href: "/about" },
    { name: "FAQ", href: "/about" },
  ]

  const socialLinks = [

    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/fademebets/",
      hoverColor: "hover:bg-red-600",
    },
       {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      href: "https://x.com/FadeMeBets",
      hoverColor: "hover:bg-red-600",
    },
    {
      name: "Youtube",
      icon: <Youtube className="w-5 h-5" />,
      href: "https://www.youtube.com/@fademebets",
      hoverColor: "hover:bg-red-600",
    },
  ]

  return (
   <footer className="bg-gradient-to-br from-[#c8102e] to-red-700 text-white mx-4 sm:mx-6 md:mx-10 my-8 rounded-3xl">
  {/* Main Footer Content */}
  <div className="container mx-auto px-4 py-10 lg:py-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Brand Section */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold text-xl">F</span>
            </div>
            <h3 className="text-2xl font-bold">FadeMeBets</h3>
          </div>
          <p className="text-red-100 leading-relaxed text-sm">
            Your edge in sports betting. Join thousands of successful bettors turning insights into income with our
            data-driven approach.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
         <div className="flex items-center gap-3 text-red-100 text-sm">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <a
              href="mailto:team@fademebets.com"
              className="hover:underline"
            >
              team@fademebets.com
            </a>
          </div>


          <div className="flex items-center gap-3 text-red-100 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>United States</span>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-base">Follow Us</h4>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                className={`w-9 h-9 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-300 ${social.hoverColor}`}
                asChild
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="space-y-6">
        <h4 className="font-semibold text-white text-base">Company</h4>
        <nav className="space-y-3">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-red-100 hover:text-white duration-200 text-sm"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="space-y-6">
        <h4 className="font-semibold text-white text-base">Support</h4>
        <nav className="space-y-3">
          {supportLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-red-100 hover:text-white duration-200 text-sm"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="space-y-6">
        <h4 className="font-semibold text-white text-base">Legal</h4>
        <nav className="space-y-3">
          {legalLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-red-100 hover:text-white duration-200 text-sm"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </div>


  </div>

  {/* Bottom Bar */}
  <div className="border-t border-red-500/30 bg-red-800/50 rounded-b-3xl mt-10">
    <div className="container mx-auto px-4 py-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-red-100 text-sm text-center md:text-left">© 2025 FadeMeBets. All rights reserved.</div>
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-red-100 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live Support Available</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-red-500/30"></div>
         <div className="flex items-center gap-1 text-sm text-red-100">
          <span>Built by</span>
          <a
            href="https://buildwithstella.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Stella Agency
          </a>
          <ExternalLink className="w-3 h-3" />
        </div>

        </div>
      </div>

      <div className="border-t border-red-500/20 pt-4">
        <p className="text-red-200 text-xs text-center leading-relaxed">
          <strong>Disclaimer:</strong> Sports betting involves risk. Please bet responsibly and only with money you
          can afford to lose. FadeMeBets provides analysis and recommendations but does not guarantee winnings. Must be
          21+ to participate. If you have a gambling problem, call 1-800-GAMBLER.
        </p>
      </div>
    </div>
  </div>
</footer>

  )
}
