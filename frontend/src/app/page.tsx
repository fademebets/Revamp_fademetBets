import HeroSection from "./components/hero-section"
import Navbar from "./components/navbar"
import HowWeWorks from "./components/How-we-works"
import Benefits from "./components/KeyBenefits"
import Testimonial from "./components/testimonials-section"
import SubscriptionPlan from "./components/subscription-plans"
import FooterSection from "./components/footer-section"
import JoinCommunitySection from "./components/Community"
import HomeBlogSection from "./components/HomeBlogSection"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
     <Navbar />
      <HeroSection />
      <HowWeWorks />
    <Benefits />
    <HomeBlogSection />
     <Testimonial />
         <SubscriptionPlan />
      <JoinCommunitySection/>
       <FooterSection/>
    </div>
  )
}
