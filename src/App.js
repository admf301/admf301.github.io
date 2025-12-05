// src/App.js
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Homepage from "./pages/homepage";
import About from "./pages/about";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import Notfound from "./pages/404";

// Project detail pages (now in /pages/projects)
import Project2048 from "./pages/projects/project2048";
import ProjectSummary from "./pages/projects/projectSummary";

import "./app.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        {/* Core pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />

        {/* Personal project detail pages */}
        <Route path="/project-2048" element={<Project2048 />} />
        <Route
          path="/project-portfolio-overview"
          element={<ProjectSummary />}
        />

        {/* 404 */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
