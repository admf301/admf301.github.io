// src/components/projects/allProjects.jsx
import React from "react";

import Project from "./project";
import { PROJECTS } from "../../data/projects";

const AllProjects = () => {
  return (
    <div className="all-projects-container">
      {PROJECTS.map((project) => (
        <div className="all-projects-project" key={project.id}>
          <Project
            title={project.title}
            description={project.description}
            linkText={project.linkText}
            link={project.link}
          />
        </div>
      ))}
    </div>
  );
};

export default AllProjects;
