import React from "react";
import { motion } from "framer-motion";

const technologies = [
  "React",
  "Node.js",
  "Python",
  "C++",
  "SQL",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Framer Motion",
  "Vite",
  "Microsoft Office Suite",
  "Computer Aided Design (CAD)",
  "Photoshop",
];

const TechStack = () => {
  return (
    <section id="tech-stack" className="py-24" data-scroll-section>
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12"
          data-scroll
          data-scroll-speed="0.1"
        >
          Tech Stack
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="px-6 py-3 glass rounded-xl hover-scale hover-glow cursor-default font-medium"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
