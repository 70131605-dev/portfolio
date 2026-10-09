import { Hero } from "@/sections/Hero";
import { QuickOverview } from "@/sections/QuickOverview";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { CaseStudy } from "@/sections/CaseStudy";
import { Process } from "@/sections/Process";
import { Strengths } from "@/sections/Strengths";
import { Activity } from "@/sections/Activity";
import { Highlights } from "@/sections/Highlights";
import { Contact } from "@/sections/Contact";

const Divider = () => <div aria-hidden className="divider-glow container-x !px-0 opacity-70" />;

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickOverview />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Experience />
      <Projects />
      <CaseStudy />
      <Divider />
      <Process />
      <Strengths />
      <Divider />
      <Activity />
      <Highlights />
      <Contact />
    </>
  );
}
