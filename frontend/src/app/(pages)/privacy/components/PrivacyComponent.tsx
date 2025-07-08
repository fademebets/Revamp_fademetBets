import { ArrowLeft, Shield, Lock, Eye, Database, Users } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyComponent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
     <div className="bg-gradient-to-br from-red-800 via-red-600 to-red-900 text-white">

        <div className="container mx-auto px-6 py-16">
          <Link href="/" className="inline-flex bg-white rounded-2xl items-center px-5 py-4 text-black  transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <div className="bg-red-500 p-3 rounded-lg mr-4">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-xl text-white">How we protect and handle your personal information</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-white">
                <Eye className="w-4 h-4 mr-2" />
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              "Information Collection",
              "Data Usage",
              "Information Sharing",
              "Data Security",
              "Your Rights",
              "Contact Us",
            ].map((item, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-16 text-center">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Privacy Matters</h2>
              <p className="text-slate-700 text-lg leading-relaxed max-w-3xl mx-auto">
                FadeMeBets is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our betting platform and services.
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Section 1 - Information Collection */}
            <section id="section-1" className="mb-16">
              <div className="flex items-center mb-8">
                <div className="bg-blue-600 p-3 rounded-lg mr-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 m-0">Information We Collect</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Personal Information
                  </h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Name, email address, phone number, and date of birth
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Government-issued identification documents
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Payment information and financial details
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Betting history and account preferences
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-slate-600" />
                    Automatically Collected
                  </h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      IP address, browser type, and device information
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Usage data, including pages visited and time spent
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Location data (with your consent)
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Cookies and similar tracking technologies
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 - Data Usage */}
            <section id="section-2" className="mb-16">
              <div className="flex items-center mb-8">
                <div className="bg-green-600 p-3 rounded-lg mr-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 m-0">How We Use Your Information</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Service Provision",
                    desc: "Providing and maintaining our betting services",
                    color: "green",
                  },
                  {
                    title: "Account Management",
                    desc: "Processing transactions and managing your account",
                    color: "blue",
                  },
                  {
                    title: "Legal Compliance",
                    desc: "Verifying identity and age for legal compliance",
                    color: "purple",
                  },
                  {
                    title: "Fraud Prevention",
                    desc: "Detecting and preventing fraud and illegal activities",
                    color: "red",
                  },
                  {
                    title: "Personalization",
                    desc: "Personalizing your experience and improving services",
                    color: "orange",
                  },
                  { title: "Communication", desc: "Sending updates, promotions, and customer support", color: "teal" },
                ].map((item, index) => (
                  <div key={index} className={`bg-${item.color}-50 p-6 rounded-xl border border-${item.color}-100`}>
                    <h4 className={`font-semibold text-${item.color}-900 mb-2`}>{item.title}</h4>
                    <p className={`text-${item.color}-700 text-sm`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Security Section */}
            <section id="section-4" className="mb-16">
              <div className="flex items-center mb-8">
                <div className="bg-red-600 p-3 rounded-lg mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 m-0">Data Security</h2>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100">
                <p className="text-slate-700 text-lg mb-6">
                  We implement comprehensive security measures to protect your personal information:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "SSL encryption for all data transmission",
                    "Secure data storage with access controls",
                    "Regular security audits and monitoring",
                    "Employee training on data protection",
                    "Multi-factor authentication systems",
                    "Advanced fraud detection algorithms",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                        ✓
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Your Rights Section */}
            <section id="section-5" className="mb-16">
              <div className="flex items-center mb-8">
                <div className="bg-purple-600 p-3 rounded-lg mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 m-0">Your Rights and Choices</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { right: "Access", desc: "Request access to your personal information", icon: "👁️" },
                  { right: "Rectification", desc: "Request correction of inaccurate data", icon: "✏️" },
                  { right: "Erasure", desc: "Request deletion of your personal information", icon: "🗑️" },
                  { right: "Portability", desc: "Request transfer of your data", icon: "📦" },
                  { right: "Restriction", desc: "Request limitation of data processing", icon: "⏸️" },
                  { right: "Objection", desc: "Object to processing of your information", icon: "🚫" },
                ].map((item, index) => (
                  <div key={index} className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <h4 className="font-semibold text-purple-900">{item.right}</h4>
                    </div>
                    <p className="text-purple-700 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section id="section-6" className="mb-16">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-12 rounded-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
                  <p className="text-slate-300 text-lg">
                    Our Data Protection Officer is here to help with any privacy-related inquiries.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-800 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4">Contact Information</h4>
                    <div className="space-y-3 text-slate-300">
                      <p>
                        <span className="font-medium text-white">Email:</span> privacy@fademebets.com
                      </p>
                      <p>
                        <span className="font-medium text-white">Phone:</span> [Your Phone Number]
                      </p>
                      <p>
                        <span className="font-medium text-white">Address:</span> [Your Business Address]
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4">Response Time</h4>
                    <div className="space-y-3 text-slate-300">
                      <p>• General inquiries: Within 48 hours</p>
                      <p>• Data requests: Within 30 days</p>
                      <p>• Urgent matters: Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
