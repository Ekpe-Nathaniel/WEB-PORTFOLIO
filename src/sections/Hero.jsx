import React from "react";
import { motion } from "framer-motion";
import useDecrypt from "../hooks/useDecrypt";
import profilePic from "../assets/ENE.jpeg";

const Hero = () => {
  const name = useDecrypt("Ekpe Nathaniel");

  return (
    <section className="pt-12 pb-24" data-scroll-section>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
          data-scroll
          data-scroll-speed="-0.1"
        >
          <img
            src={profilePic}
            alt="Profile"
            className="rounded-full mx-auto w-48 h-48 object-cover object-center"
          />
        </motion.div>
        <div className="text-center md:text-left" data-scroll data-scroll-speed="0.1">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold mb-6 vibrant-text"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto md:mx-0 text-xl leading-relaxed mb-8"
          >
            I am a Computer Science and Engineering student dedicated to
            bridging the gap between complex backend logic and intuitive
            frontend experiences. I thrive on solving algorithmic challenges
            and building full-stack applications that make a tangible impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <a
              href="#projects"
              className="inline-block px-8 py-3 rounded-full glass hover-scale hover-glow font-semibold transition-all"
            >
              View My Work
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-block px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 hover-scale hover-glow font-semibold transition-all"
            >
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
