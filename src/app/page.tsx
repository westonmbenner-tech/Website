import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FocusExperienceSection from "@/components/FocusExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AwardsSection from "@/components/AwardsSection";
import WritingSection from "@/components/WritingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import FieldNoteScrap from "@/components/FieldNoteScrap";
import { getFieldNote, type FieldNote } from "@/data/personalSections";

function FieldNoteBetween({
  note,
  rotationDeg,
  align,
  placement = "between-sections",
}: {
  note: FieldNote;
  rotationDeg: number;
  align: "start" | "center" | "end";
  /** Last strip before footer: no negative bottom margin so it cannot sit over the footer. */
  placement?: "between-sections" | "above-footer";
}) {
  const justify =
    align === "start"
      ? "justify-start"
      : align === "center"
        ? "justify-center"
        : "justify-end";
  const verticalSpacing =
    placement === "above-footer"
      ? "-mt-6 mb-10 pb-2 sm:-mt-10 sm:mb-14 sm:pb-4"
      : "-my-6 sm:-my-10";
  return (
    <div
      className={`relative z-50 isolate mx-auto flex w-full max-w-6xl min-h-0 items-start px-6 py-0 ${verticalSpacing} ${justify}`}
    >
      <FieldNoteScrap note={note} rotationDeg={rotationDeg} align={align} />
    </div>
  );
}

const noteAi = getFieldNote("fn-ai");
const noteTravel = getFieldNote("fn-travel");
const noteEms = getFieldNote("fn-ems");
const noteSystems = getFieldNote("fn-systems");
const noteMarkets = getFieldNote("fn-markets");
const noteAwards = getFieldNote("fn-awards");
const noteWriting = getFieldNote("fn-writing");
const noteContact = getFieldNote("fn-contact");

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        {noteAi ? (
          <FieldNoteBetween note={noteAi} rotationDeg={4} align="start" />
        ) : null}
        <AboutSection />
        {noteTravel ? (
          <FieldNoteBetween note={noteTravel} rotationDeg={-5} align="end" />
        ) : null}
        {noteEms ? (
          <FieldNoteBetween note={noteEms} rotationDeg={3} align="start" />
        ) : null}
        <FocusExperienceSection />
        {noteSystems ? (
          <FieldNoteBetween note={noteSystems} rotationDeg={-6} align="end" />
        ) : null}
        <ProjectsSection />
        {noteMarkets ? (
          <FieldNoteBetween note={noteMarkets} rotationDeg={-4} align="end" />
        ) : null}
        <AwardsSection />
        {noteAwards ? (
          <FieldNoteBetween note={noteAwards} rotationDeg={5} align="start" />
        ) : null}
        <WritingSection />
        {noteWriting ? (
          <FieldNoteBetween note={noteWriting} rotationDeg={6} align="end" />
        ) : null}
        <ContactSection />
        {noteContact ? (
          <FieldNoteBetween
            note={noteContact}
            rotationDeg={-3}
            align="center"
            placement="above-footer"
          />
        ) : null}
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
