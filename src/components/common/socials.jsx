import React from "react";

const Socials = () => {
  return (
    <div className="socials-block">
      <div className="social">
        <a
          href="https://github.com/admf301"
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-icon">GH</span>
          <span className="social-text">github.com/admf301</span>
        </a>
      </div>

      <div className="social">
        <a
          href="https://www.linkedin.com/in/adam-filice-8a96852a5/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="social-icon">IN</span>
          <span className="social-text">linkedin.com/in/adam-filice</span>
        </a>
      </div>

      <div className="email-wrapper">
        <a href="mailto:adamf7023@gmail.com">
          <span className="social-icon">@</span>
          <span className="social-text">adamf7023@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default Socials;
