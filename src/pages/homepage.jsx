import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import AllProjects from "../components/projects/allProjects";

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>Adam Filice | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Adam Filice, a computer science graduate focused on data, quality, IAM, and practical software engineering."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="home" />

        <div className="content-wrapper">
          {/* Hero */}
          <header className="home-hero">
            <div className="home-hero-text">
              <div className="page-heading-eyebrow">
                Currently exploring data, quality, and access control
              </div>
              <h1>Hi, I&apos;m Adam.</h1>
              <p>
                I&apos;m a computer science graduate who likes systems that are{" "}
                <strong>predictable</strong>, <strong>testable</strong>, and{" "}
                <strong>easy to reason about</strong>. Recently, I&apos;ve been
                leaning into data, QA, and access-control adjacent work.
              </p>

              <div className="home-hero-actions">
                <Link to="/projects" className="home-button primary">
                  View Projects
                </Link>
                <Link to="/contact" className="home-button secondary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </header>

          {/* What I'm looking for / What I bring */}
          <section className="home-section home-two-column">
            <div className="home-column-card">
              <h2>What I&apos;m looking for</h2>
              <p>
                I&apos;m targeting roles where I can work close to the data or
                system behavior—things like{" "}
                <strong>data analyst / junior data scientist</strong>,{" "}
                <strong>QA / SDET</strong>, or{" "}
                <strong>backend / platform-adjacent engineering</strong>.
              </p>
              <p>
                I like environments where it&apos;s okay to ask questions,
                document decisions, and improve things incrementally instead of
                rewriting everything every sprint.
              </p>
            </div>

            <div className="home-column-card">
              <h2>What I bring</h2>
              <ul className="home-list">
                <li>
                  A computer science degree with a minor in applied math, and a
                  realistic view of what actually ships in production.
                </li>
                <li>
                  Hands-on experience in both <strong>web development</strong>{" "}
                  and <strong>data analysis</strong>, including debugging real
                  systems, not just toy projects.
                </li>
                <li>
                  A bias toward clear structure, maintainability, and catching
                  issues early rather than patching them in a hurry later.
                </li>
              </ul>
            </div>
          </section>

          {/* Focus areas */}
          <section className="home-section">
            <h2>What I&apos;m focusing on</h2>
              <div className="home-focus-grid">
                <div className="home-focus-card">
                  <h3>Data &amp; Analytics</h3>
                  <p>Using Python and SQL to clean, explore, and interpret datasets.</p>
                </div>
                <div className="home-focus-card">
                  <h3>Quality &amp; Testing</h3>
                  <p>
                    Designing workflows that catch issues early and make behavior predictable.
                  </p>
                </div>
                <div className="home-focus-card">
                  <h3>Access &amp; Structure</h3>
                  <p>
                    Thinking through auth flows, permissions, and well-organized system logic.
                  </p>
                </div>
                <div className="home-focus-card">
                  <h3>System Behavior & Debugging</h3>
                  <p>
                    Understanding how systems really behave, not how we assume they do, and
                    fixing issues at the root.
                  </p>
                </div>
              </div>
          </section>

          {/* Skills snapshot */}
          <section className="home-section">
            <h2>Skills snapshot</h2>
            <div className="home-skills-grid">
              <div className="home-skill-card">
                <h3>Languages &amp; Tools</h3>
                <p>Python, SQL, JavaScript, Java</p>
                <p>React, REST APIs, basic Node.js</p>
              </div>
              <div className="home-skill-card">
                <h3>Data &amp; Analysis</h3>
                <p>Pandas, data cleaning, exploratory analysis</p>
                <p>Asking concrete questions of data, not just plotting it</p>
              </div>
              <div className="home-skill-card">
                <h3>Quality &amp; Reliability</h3>
                <p>Debugging, regression checks, test mindset</p>
                <p>Thinking through edge cases and failure modes</p>
              </div>
              <div className="home-skill-card">
                <h3>Backend &amp; Architecture</h3>
                <p>API behavior, validation flows, testable logic</p>
                <p>Understanding how systems operate under the hood</p>
              </div>
            </div>
          </section>

          {/* Projects entry point */}
          <section className="home-section">
            <h2>Projects</h2>
            <p className="home-section-intro">
              I&apos;m actively building out focused projects that represent how
              I think about systems, not just how many technologies I can list.
              You can see what I&apos;ve shipped so far on the Projects page.
            </p>
            <AllProjects />

            <div className="home-section-footer-link">
              <Link to="/projects">View all projects →</Link>
            </div>
          </section>

          <div className="page-footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;