import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const handleScroll = (e) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold vibrant-text">
          My Portfolio
        </a>
        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <a
                href="#projects"
                onClick={handleScroll}
                className="nav-link transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#experience"
                onClick={handleScroll}
                className="nav-link transition-colors"
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={handleScroll}
                className="nav-link transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
