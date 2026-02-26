import React, { useState } from "react";
import { motion } from "framer-motion";
import GitHubIcon from "./GitHubIcon";

const SpotlightCard = ({ title, description, demoLink, githubLink }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative p-6 bg-gray-800 rounded-lg overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex space-x-4">
        <a href={demoLink} className="text-blue-500 hover:underline">
          Demo
        </a>
        <a
          href={githubLink}
          className="text-blue-500 hover:text-white"
        >
          <GitHubIcon />
        </a>
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
