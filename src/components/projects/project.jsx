// src/components/projects/project.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Project = (props) => {
  const { title, description, linkText, link } = props;

  return (
    <div className="project">
      <Link to={link}>
        <div className="project-container">
          {/* No logo/image */}
          <div className="project-title">{title}</div>
          <div className="project-description">{description}</div>
          <div className="project-link">
            <div className="project-link-icon">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <div className="project-link-text">{linkText}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Project;
