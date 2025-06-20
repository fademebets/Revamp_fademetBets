import HeroSection from "./components/hero-section"
import Navbar from "./components/navbar"
import HowWeServeSection from "./components/how-we-serve-section"
import WhyWeServeSection from "./components/why-we-serve-section"
import OurPhilosophySection from "./components/OurPhilosophySection"
import SpheresOfSociety from "./components/SpheresOfSociety"
import JesusFollowerSection from "./components/JesusFollowerSection"
import HowThenShallWeLiveSection from "./components/HowThenShallWeLiveSection"
import SocialSection from "./components/SocialSection"
import JoinCommunitySection from "./components/Community"
import FooterSection from "./components/footer-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      {/* <HowWeServeSection/>
      <WhyWeServeSection/>
      <OurPhilosophySection/>
      <SpheresOfSociety/>
      <JesusFollowerSection />
      <HowThenShallWeLiveSection/>
      <SocialSection/>
      <JoinCommunitySection/>
      <FooterSection/> */}
    </div>
  )
}
