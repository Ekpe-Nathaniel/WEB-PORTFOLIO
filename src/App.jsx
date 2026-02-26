import React, { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Layout from "./components/Layout";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

function App() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <Layout>
      <Hero />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
    </Layout>
  );
}

export default App;