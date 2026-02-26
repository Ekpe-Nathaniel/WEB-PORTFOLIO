import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    date: "Sep - Dec 2025",
    title: "Web Development Intern",
    company: "Qliq Integrations",
    description: "Developing modern web solutions and collaborating with the team.",
  },
  {
    date: "2023 - Present",
    title: "B.Tech in Computer Science and Engineering",
    company: "University",
    description: "Relevant coursework and projects.",
  },
  {
    date: "Sep - Dec 2023",
    title: "IT Administrator Intern",
    company: "Ofosuhene Hour Of Grace International School",
    description: "Managed IT infrastructure and supported educational technology.",
  },
  {
    date: "Ongoing",
    title: "Virtual Assistant",
    company: "SimpliLearn.com",
    description: "Assisting the online coding community and supporting learners.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24" data-scroll-section>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
          data-scroll
          data-scroll-speed="0.1"
        >
          Experience & Education
        </motion.h2>
        <div className="relative">
          <div className="absolute h-full border-l-2 border-blue-500 left-1/2 -translate-x-1/2 opacity-20"></div>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex items-center w-full mb-12 ${
                index % 2 === 0 ? "justify-start text-right" : "justify-end text-left"
              }`}
            >
              <div
                className={`w-[45%] p-6 rounded-2xl glass hover-scale ${
                  index % 2 === 0 ? "mr-auto" : "ml-auto"
                }`}
              >
                <p className="text-blue-500 font-semibold mb-1">{exp.date}</p>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <p className="text-lg opacity-80">{exp.company}</p>
                <p className="opacity-60 mt-2">{exp.description}</p>
              </div>
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full left-1/2 -translate-x-1/2 border-4 border-white dark:border-black"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
