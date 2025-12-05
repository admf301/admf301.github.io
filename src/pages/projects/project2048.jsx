import React from "react";
import { Helmet } from "react-helmet";

import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";
import Game from "../../data/game2048";

const Project2048 = () => {
  return (
    <>
      <Helmet>
        <title>2048 Speed Edition | Adam Filice</title>
        <meta
          name="description"
          content="A fast-paced version of the 2048 game built by Adam Filice."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="projects" />

        <div className="content-wrapper">
          <main className="projects-main">
            <h1>2048 Speed Edition</h1>
            <p className="projects-intro">
              A twist on the classic 2048 puzzle game that introduces time
              pressure and responsive controls. Built to practice game logic,
              state management, and handling user input.
            </p>

            <Game />
          </main>

          <div className="page-footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Project2048;
