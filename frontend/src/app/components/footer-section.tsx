import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink } from "lucide-react"

export default function Component() {
  const navigationLinks = [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Success Stories", href: "/testimonials" },
  ]

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Responsible Gambling", href: "/responsible-gambling" },
    { name: "Cookie Policy", href: "/cookies" },
  ]

  const supportLinks = [
    { name: "Contact Support", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Getting Started", href: "/getting-started" },
    { name: "API Documentation", href: "/api-docs" },
  ]

  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/fademebets",
      hoverColor: "hover:bg-blue-500",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/fademebets",
      hoverColor: "hover:bg-pink-500",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      href: "https://facebook.com/fademebets",
      hoverColor: "hover:bg-blue-600",
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
            <span>support@fademebets.com</span>
          </div>
          <div className="flex items-center gap-3 text-red-100 text-sm">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span>+1 (555) 123-BETS</span>
          </div>
          <div className="flex items-center gap-3 text-red-100 text-sm">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>Las Vegas, NV</span>
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

    {/* Newsletter Signup */}
    <div className="mt-10 pt-8 border-t border-red-500/30 space-y-5">
      <div className="max-w-xl mx-auto text-center lg:text-left space-y-4">
        <h4 className="font-semibold text-white text-lg">Stay Updated</h4>
        <p className="text-red-100 text-sm">Get the latest picks and betting insights delivered to your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
          />
          <Button className="bg-white text-red-600 hover:bg-red-50 font-semibold px-6">Subscribe</Button>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-red-500/30 bg-red-800/50 rounded-b-3xl mt-10">
    <div className="container mx-auto px-4 py-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-red-100 text-sm text-center md:text-left">© 2024 FadeMeBets. All rights reserved.</div>
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-red-100 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live Support Available</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-red-500/30"></div>
          <div className="flex items-center gap-1">
            <span>Powered by Advanced Analytics</span>
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
