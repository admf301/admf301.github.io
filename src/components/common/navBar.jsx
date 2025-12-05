import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const NavBar = (props) => {
  const { active } = props;

  useEffect(() => {
  const handleScroll = () => {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="nav-background">
          <ul className="nav-list">
            <li className={active === "home" ? "nav-item active" : "nav-item"}>
              <Link to="/">Home</Link>
            </li>
            <li className={active === "about" ? "nav-item active" : "nav-item"}>
              <Link to="/about">About</Link>
            </li>
            <li
              className={
                active === "projects" ? "nav-item active" : "nav-item"
              }
            >
              <Link to="/projects">Projects</Link>
            </li>
            <li
              className={active === "contact" ? "nav-item active" : "nav-item"}
            >
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
