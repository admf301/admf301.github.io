import React from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Adam Filice</title>
        <meta
          name="description"
          content="Get in touch with Adam Filice via email or LinkedIn."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="contact" />

        <div className="content-wrapper">
          <main className="page-main">
            <div className="page-heading">
              <div className="page-heading-eyebrow">Contact</div>
              <div className="page-heading-title">Let&apos;s talk</div>
            </div>

            <section className="page-section">
              <p>
                If you&apos;d like to talk about roles, projects, or how I think
                about data, testing, or access control, I&apos;d be happy to
                chat. I&apos;m especially interested in roles where I can learn
                from more experienced engineers and contribute to systems that
                actually get used.
              </p>
            </section>

            <section className="page-section two-column-grid">
              <div className="contact-block">
                <h2>Email</h2>
                <a href="mailto:adamf7023@gmail.com">adamf7023@gmail.com</a>
                <p style={{ marginTop: "0.5rem", color: "var(--tertiary-color)", fontSize: "0.9rem" }}>
                  Best way to reach me. I&apos;m usually quick to respond.
                </p>
              </div>

              <div className="contact-block">
                <h2>LinkedIn &amp; GitHub</h2>
                <p style={{ marginBottom: "0.5rem" }}>
                  You can also find me here:
                </p>
                <p style={{ margin: 0 }}>
                  <a
                    href="https://www.linkedin.com/in/admf301"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </p>
                <p style={{ margin: 0 }}>
                  <a
                    href="https://github.com/admf301"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </p>
              </div>
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

export default Contact;
