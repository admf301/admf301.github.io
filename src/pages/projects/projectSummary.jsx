import React from "react";
import { Helmet } from "react-helmet";

import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";

const ProjectSummary = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio Architecture Overview | Adam Filice</title>
        <meta
          name="description"
          content="Overview of how this portfolio is structured in React, including routing, data-driven sections, and layout."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="projects" />

        <div className="content-wrapper">
          <main className="projects-main">
            <h1>Portfolio Architecture Overview</h1>
            <p className="projects-intro">
              A walkthrough of how this portfolio is structured after a full
              refactor: cleaner routing, fewer files, and data-driven sections
              that make it easier to maintain.
            </p>

            <section className="about-section">
              <h2>High-level structure</h2>
              <p>
                The site is a React single-page application using{" "}
                <strong>HashRouter</strong> for GitHub Pages. Core routes are
                limited to Home, About, Projects, Contact, and a couple of
                focused project pages.
              </p>
            </section>

            <section className="about-section">
              <h2>Data-driven projects</h2>
              <p>
                Projects shown on the Projects page are defined in a single{" "}
                <code>projects.js</code> file. This makes it easy to add or edit
                projects without touching the layout or routing logic.
              </p>
            </section>

            <section className="about-section">
              <h2>Styling</h2>
              <p>
                Instead of one CSS file per page, styles are consolidated into{" "}
                <code>global.css</code> for layout &amp; pages and{" "}
                <code>components.css</code> for shared components like the
                navigation bar, footer, and cards.
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