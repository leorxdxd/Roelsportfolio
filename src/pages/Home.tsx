import { useEffect } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";
import { setPageMeta } from "../lib/meta";

export default function Home() {
  useEffect(() => setPageMeta(), []);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
