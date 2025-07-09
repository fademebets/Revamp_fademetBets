import { ArrowLeft, Scale, FileText } from "lucide-react"
import Link from "next/link"

export default function TermsAndConditionsComponent() {
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
              <div className="bg-red-500  p-3 rounded-lg mr-4">
                <Scale className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms & Conditions</h1>
                <p className="text-xl text-white">Legal terms governing your use of FadeMeBets</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-white">
              <FileText className="w-4 h-4 mr-2" />
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

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                  1
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Acceptance of Terms</h2>
              </div>
              <div className="ml-12">
                <p className="text-slate-700 leading-relaxed text-lg">
                  By accessing and using FadeMeBets ("the Service"), you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                  2
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Description of Service</h2>
              </div>
              <div className="ml-12">
                <p className="text-slate-700 leading-relaxed text-lg mb-6">
                  FadeMeBets is a platform that provides betting and gaming services. The Service may include various
                  features such as:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">Sports Betting</h4>
                    <p className="text-slate-600 text-sm">Comprehensive wagering services across multiple sports</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">Account Management</h4>
                    <p className="text-slate-600 text-sm">User profiles and personalized betting experience</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">Payment Processing</h4>
                    <p className="text-slate-600 text-sm">Secure deposit and withdrawal services</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">Customer Support</h4>
                    <p className="text-slate-600 text-sm">24/7 assistance and communication tools</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                  3
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">User Accounts and Responsibilities</h2>
              </div>
              <div className="ml-12 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">3.1 Account Registration</h3>
                  <p className="text-slate-700 leading-relaxed">
                    You must be at least 18 years old (or the legal gambling age in your jurisdiction) to create an
                    account. You agree to provide accurate, current, and complete information during registration.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">3.2 Account Security</h3>
                  <p className="text-slate-700 leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials and for all
                    activities that occur under your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">3.3 Account Verification</h3>
                  <p className="text-slate-700 leading-relaxed">
                    We reserve the right to verify your identity and may request documentation to confirm your age,
                    identity, and payment methods.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                  4
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Prohibited Uses</h2>
              </div>
              <div className="ml-12">
                <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                  <p className="text-red-800 font-medium mb-4">You may not use our Service for:</p>
                </div>
                <div className="grid gap-4">
                  {[
                    "Any unlawful purpose or to solicit others to perform unlawful acts",
                    "Violating international, federal, provincial, state regulations, rules, laws, or local ordinances",
                    "Infringing upon intellectual property rights of FadeMeBets or others",
                    "Harassment, abuse, defamation, or discrimination of any kind",
                    "Submitting false or misleading information",
                    "Money laundering or other illegal financial activities",
                    "Using automated systems or software to extract data from the Service",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                        ×
                      </div>
                      <p className="text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Continue with remaining sections using similar modern styling... */}
            {/* Section 5 */}
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                  5
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Betting Rules and Regulations</h2>
              </div>
              <div className="ml-12 space-y-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">5.1 Betting Limits</h3>
                  <p className="text-slate-700 leading-relaxed">
                    We reserve the right to set minimum and maximum betting limits. These limits may vary based on the
                    type of bet, sport, or event.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">5.2 Bet Acceptance</h3>
                  <p className="text-slate-700 leading-relaxed">
                    All bets are subject to acceptance by FadeMeBets. We reserve the right to refuse any bet at our
                    discretion.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">5.3 Results and Settlements</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Bet settlements are based on official results. In case of disputes, our decision is final.
                  </p>
                </div>
              </div>
            </section>

            {/* Remaining sections with consistent styling */}
            {[
              {
                num: 6,
                title: "Intellectual Property Rights",
                content:
                  "The Service and its original content, features, and functionality are and will remain the exclusive property of FadeMeBets and its licensors. The Service is protected by copyright, trademark, and other laws.",
              },
              {
                num: 7,
                title: "Disclaimers",
                content:
                  'The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions, and terms whether express or implied.',
              },
              {
                num: 8,
                title: "Limitation of Liability",
                content:
                  "In no event shall FadeMeBets, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
              },
              {
                num: 9,
                title: "Termination",
                content:
                  "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.",
              },
              {
                num: 10,
                title: "Governing Law",
                content:
                  "These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.",
              },
              {
                num: 11,
                title: "Changes to Terms",
                content:
                  "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.",
              },
            ].map((section) => (
              <section key={section.num} className="mb-16">
                <div className="flex items-center mb-6">
                  <div className="bg-slate-100 text-slate-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                    {section.num}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{section.title}</h2>
                </div>
                <div className="ml-12">
                  <p className="text-slate-700 leading-relaxed text-lg">{section.content}</p>
                </div>
              </section>
            ))}

            {/* Contact Section */}
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                  12
                </div>
                <h2 className="text-2xl font-bold text-slate-900 m-0">Contact Information</h2>
              </div>
              <div className="ml-12">
                <p className="text-slate-700 leading-relaxed text-lg mb-6">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-lg mb-4">FadeMeBets Legal Department</h4>
                 <div className="space-y-2 text-slate-700">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      <a
                        href="mailto:team@fademebets.com"
                        className="text-primary hover:underline"
                      >
                        team@fademebets.com
                      </a>
                    </p>
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
