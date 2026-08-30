import IntroLoader from "./components/IntroLoader";
import HeroSection from "./components/HeroSection";
import AchievementsSection from "./components/AchievementsSection";
import AboutSection from "./components/AboutSection";
import ProcessSection from "./components/ProcessSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";

export default function Home() {
  // NOTE: this must NOT be a flex container — GSAP's pinned sections
  // (ScrollTrigger pin spacing) break inside display:flex parents.
  return (
    <main className="relative min-h-screen">
      <IntroLoader />
      <HeroSection />
      <AchievementsSection />
      <AboutSection />
      <ProcessSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
