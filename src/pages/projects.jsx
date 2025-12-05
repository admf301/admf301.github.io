import React from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import AllProjects from "../components/projects/allProjects";

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Projects | Adam Filice</title>
        <meta
          name="description"
          content="Personal and technical projects by Adam Filice, including 2048 Speed Edition and a portfolio architecture overview."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="projects" />

        <div className="content-wrapper">
          <main className="projects-main">
            <div className="page-heading">
              <div className="page-heading-eyebrow">Projects</div>
              <div className="page-heading-title">Things I&apos;ve built</div>
            </div>

            <p className="projects-intro">
              These projects focus less on stacking as many tools as possible
              and more on how I approach structure, behavior, and iteration.
              I&apos;m actively building out additional{" "}
              <strong>data-focused</strong> and <strong>QA-focused</strong>{" "}
              pieces that tie directly into how I&apos;d work on a team day to
              day.
            </p>

            <AllProjects />
          </main>

          <div className="page-footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
