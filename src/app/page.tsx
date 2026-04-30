import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import Timeline from "@/components/Timeline";
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
        <ProjectsSection />
        <Timeline />
        <InterestsSection />
        <WritingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
