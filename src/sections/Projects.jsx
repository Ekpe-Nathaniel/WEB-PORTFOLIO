import React from "react";
import { motion } from "framer-motion";
import SpotlightCard from "../components/ui/SpotlightCard";

const projects = [
  {
    title: "Project 1",
    description: "A brief description of your project.",
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "Project 2",
    description: "A brief description of your project.",
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "Project 3",
    description: "A brief description of your project.",
    demoLink: "#",
    githubLink: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Projects
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SpotlightCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
