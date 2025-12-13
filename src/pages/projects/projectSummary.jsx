import React from "react";
import { Helmet } from "react-helmet";

import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";

const ProjectSummary = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio Overview | Adam Filice</title>
        <meta
          name="description"
          content="High-level overview of how this portfolio is structured, designed, and built — including routing, layout, styling architecture, and deployment."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="projects" />

        <div className="content-wrapper">
          <main className="page-main project-page-main">
            {/* Intro */}
            <header className="project-page-header">
              <p className="project-page-kicker">Personal Project</p>
              <h1>How This Portfolio Is Designed & Built</h1>
              <p className="project-page-intro">
                This page provides a clear overview of how this portfolio works:
                the structure of the codebase, the routing system, the styling
                architecture, and how everything is deployed and maintained.
                The site is intentionally lightweight, easy to extend, and focused
                on communicating the kind of work I'm aiming to do next.
              </p>

              <div className="project-page-meta">
                <div className="project-page-meta-item">
                  <span className="project-page-meta-label">Tech stack</span>
                  <span>React, React Router, CSS Modules, GitHub Pages</span>
                </div>
                <div className="project-page-meta-item">
                  <span className="project-page-meta-label">Core features</span>
                  <span>Routing, shared layout, unified styling, responsive UI</span>
                </div>
                <div className="project-page-meta-item">
                  <span className="project-page-meta-label">Purpose</span>
                  <span>Showcase work, skills, and learning progress</span>
                </div>
              </div>
            </header>

            {/* Structure */}
            <section className="project-section">
              <h2>Site Structure</h2>
              <p>
                The portfolio is organized to be intuitive to maintain and easy
                to navigate. The file tree follows a predictable React
                structure, with all pages, shared components, and styling grouped
                cleanly.
              </p>

              <ul className="project-list">
                <li>
                  <strong>Pages:</strong> Home, About, Projects, Contact, and
                  individual project pages.
                </li>
                <li>
                  <strong>Components:</strong> Reusable navigation bar, footer,
                  project cards, and layout wrappers.
                </li>
                <li>
                  <strong>Data folder:</strong> Contains project definitions and
                  reusable metadata.
                </li>
              </ul>

              <p>
                The goal is for the site to be easy to work on when adding new
                content, new projects, or new sections — without needing to
                restructure anything major.
              </p>
            </section>

            {/* Routing */}
            <section className="project-section">
              <h2>Routing & Navigation</h2>
              <p>
                The site uses React Router with <code>BrowserRouter</code> so
                URLs stay clean and readable. GitHub Pages hosting is configured
                to support client-side routing seamlessly.
              </p>

              <ul className="project-list">
                <li>Shared navigation bar with active link highlighting.</li>
                <li>Consistent route structure for all top-level pages.</li>
                <li>
                  Individual project pages dynamically rendered through the
                  Projects collection.
                </li>
              </ul>
            </section>

            {/* Layout */}
            <section className="project-section">
              <h2>Layout System</h2>
              <p>
                All pages use the same layout shell so the site feels cohesive.
                This includes a top navigation bar, a content wrapper with
                standardized padding, and a footer section.
              </p>

              <ul className="project-list">
                <li>
                  <code>.page-container</code> handles vertical layout and page
                  background.
                </li>
                <li>
                  <code>.content-wrapper</code> centers content with consistent
                  max-width and responsive spacing.
                </li>
                <li>
                  <code>.page-main</code> wraps individual page content in a
                  subtle card-like container for clarity and visual separation.
                </li>
              </ul>
            </section>

            {/* Styling */}
            <section className="project-section">
              <h2>Styling Architecture</h2>
              <p>
                The site uses a unified styling system that keeps things simple
                and consistent. Most of the UI is powered by two stylesheets:
                <code>global.css</code> and <code>components.css</code>.
              </p>

              <h3 className="project-subheading">Design tokens</h3>
              <ul className="project-list">
                <li>Color palette defined through CSS variables.</li>
                <li>Spacing, border radius, and shadow tokens for consistency.</li>
                <li>Typography system based on modern sans-serif families.</li>
              </ul>

              <h3 className="project-subheading">Reusable elements</h3>
              <ul className="project-list">
                <li>Card components for projects and section content.</li>
                <li>A unified navigation bar shared across all pages.</li>
                <li>A responsive grid system for projects and skill tiles.</li>
              </ul>
            </section>

            {/* Deployment */}
            <section className="project-section">
              <h2>Deployment & Hosting</h2>
              <p>
                The portfolio is automatically deployed using the
                <code>gh-pages</code> workflow, which publishes the compiled
                build to the <code>gh-pages</code> branch. A single deployment
                script handles:
              </p>

              <ul className="project-list">
                <li>Building the production React app.</li>
                <li>Publishing the build directory to GitHub Pages.</li>
                <li>Committing and pushing source code updates to main.</li>
              </ul>

              <p>
                This setup ensures the site stays fast, stable, and easy to
                update with new projects or improvements.
              </p>
            </section>

            {/* Closing */}
            <section className="project-section">
              <h2>Summary</h2>
              <p>
                Overall, the portfolio is built to be clean, maintainable, and
                aligned with the type of work I want to showcase. The structure
                makes it simple to add new projects, update existing content,
                and continue improving the visual design over time.
              </p>
            </section>
          </main>

          <div className="page-footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSummary;
