import React from "react";
import Navbar from "../components/ui/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4">{children}</main>
    </div>
  );
};

export default Layout;
