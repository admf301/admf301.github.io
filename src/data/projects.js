// src/data/projects.js

// Single source of truth for projects shown on the Projects page.
// We can add more (Data / QA / IAM) here later.

export const PROJECTS = [
    {
    id: "stock-explorer",
    title: "Stock Market Explorer",
    description:
      "An interactive data dashboard exploring historical stock prices, daily returns, and volatility using a Python data pipeline and a React frontend.",
    linkText: "View Stock Explorer",
    link: "/projects/stock-explorer",
    tech: ["Python", "Pandas", "Jupyter", "React", "Data Analysis"],
  },
  {
    id: "2048",
    title: "2048 Speed Edition",
    description:
      "A fast-paced twist on the classic 2048 puzzle game with a countdown timer and responsive controls.",
    linkText: "View 2048 Project",
    link: "/projects/2048",
    tech: ["JavaScript", "React", "Game Logic"],
  },
  {
    id: "portfolio-overview",
    title: "Portfolio Architecture Overview",
    description:
      "A walkthrough of how this portfolio is structured, including routing, components, and data-driven sections.",
    linkText: "View Portfolio Overview",
    link: "/projects/portfolio-overview",
    tech: ["React", "Routing", "Component Architecture"],
  },
];
