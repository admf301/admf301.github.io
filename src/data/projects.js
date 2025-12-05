// src/data/projects.js

// Single source of truth for projects shown on the Projects page.
// We can add more (Data / QA / IAM) here later.

export const PROJECTS = [
  {
    id: "2048",
    title: "2048 Speed Edition",
    description:
      "A fast-paced twist on the classic 2048 puzzle game with a countdown timer and responsive controls.",
    linkText: "View 2048 Project",
    link: "/project-2048",
    tech: ["JavaScript", "React", "Game Logic"],
  },
  {
    id: "portfolio-overview",
    title: "Portfolio Architecture Overview",
    description:
      "A walkthrough of how this portfolio is structured, including routing, components, and data-driven sections.",
    linkText: "View Portfolio Overview",
    link: "/project-portfolio-overview",
    tech: ["React", "Routing", "Component Architecture"],
  },
  // Future:
  // {
  //   id: "data-eda",
  //   title: "Exploratory Data Analysis Project",
  //   description: "End-to-end data cleaning, analysis, and visualization in Python.",
  //   linkText: "View Data Project",
  //   link: "/project-data-eda",
  //   tech: ["Python", "Pandas", "Jupyter"],
  // },
];
