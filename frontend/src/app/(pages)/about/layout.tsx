import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer-section"
import JoinCommunitySection from "@/app/components/Community"
import SubscriptionPlan from "@/app/components/subscription-plans"
export default function EVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>
    <Navbar />
    {children}
     <SubscriptionPlan />
     <JoinCommunitySection/>
    <Footer />
    </section>
}
