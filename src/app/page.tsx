import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FocusAreasSection from "@/components/FocusAreasSection";
import NetworkGraph from "@/components/NetworkGraph";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AwardsSection from "@/components/AwardsSection";
import InterestsSection from "@/components/InterestsSection";
import WritingSection from "@/components/WritingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <FocusAreasSection />
        <NetworkGraph />
        <ProjectsSection />
        <ExperienceSection />
        <AwardsSection />
        <InterestsSection />
        <WritingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
