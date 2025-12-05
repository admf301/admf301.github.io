import React from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Adam Filice</title>
        <meta
          name="description"
          content="Learn more about Adam Filice, his background, and what he enjoys working on."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="about" />

        <div className="content-wrapper">
          <main className="about-main">
            <div className="page-heading">
              <div className="page-heading-eyebrow">About</div>
              <div className="page-heading-title">A bit more about me</div>
            </div>

            <section className="about-section">
              <h2>Background</h2>
              <p>
                I&apos;m a software engineer and data-minded developer with a{" "}
                <strong>B.S. in Computer Science</strong> and a{" "}
                <strong>minor in Applied Mathematics</strong> from Northern
                Illinois University. During and after school, I&apos;ve worked
                in both <strong>web development</strong> and{" "}
                <strong>data analysis</strong>, which gave me a good mix of
                building things and understanding how they actually behave in
                the wild.
              </p>
              <p>
                I like taking vague ideas and turning them into something
                concrete: a small tool, a cleaned dataset, a well-structured
                feature, or a clearer explanation of how a system works.
              </p>
            </section>

            <section className="about-section">
              <h2>How I like to work</h2>
              <ul className="about-list">
                <li>
                  <strong>Start simple, then refine.</strong> I&apos;d rather
                  ship a clear, reliable v1 and iterate than over-engineer
                  something that&apos;s hard to change.
                </li>
                <li>
                  <strong>Make behavior visible.</strong> Logs, small tests, and
                  quick checks help reveal what&apos;s really happening, not
                  just what we think is happening.
                </li>
                <li>
                  <strong>Write things down.</strong> A short note or diagram
                  can save hours of guessing later, especially when it comes to
                  data flows and access rules.
                </li>
              </ul>
            </section>

            <section className="about-section">
              <h2>What I&apos;m exploring next</h2>
              <p>
                Right now I&apos;m investing more time into:
              </p>
              <ul className="about-list">
                <li>End-to-end data projects in Python and SQL.</li>
                <li>
                  Stronger testing and automation around the way systems handle
                  user input and permissions.
                </li>
                <li>
                  Identity and access patterns: auth flows, roles, and making
                  sure the right people have the right access at the right time.
                </li>
              </ul>
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

export default About;
