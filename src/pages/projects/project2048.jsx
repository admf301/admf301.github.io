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
          content="A modern, timed version of the 2048 game built in React with keyboard and mobile swipe controls."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="projects" />

        <div className="content-wrapper">
          <main className="page-main project-page-main">
            {/* Header / overview */}
            <header className="project-page-header">
              <p className="project-page-kicker">Personal Project</p>
              <h1>2048 Speed Edition</h1>
              <p className="project-page-intro">
                2048 Speed Edition is a modern implementation of the classic
                2048 puzzle game, rebuilt in React with a 30-second timer,
                score tracking, keyboard controls, and mobile swipe support.
                I use this project to practice game logic, state management,
                and handling real-time user input across devices.
              </p>

              <div className="project-page-meta">
                <div className="project-page-meta-item">
                  <span className="project-page-meta-label">Tech stack: </span>
                  <span>React, JavaScript (ES6), CSS</span>
                </div>
                <div className="project-page-meta-item">
                  <span className="project-page-meta-label">Core features: </span>
                  <span>Grid-based logic, timer, scores, keyboard &amp; touch input</span>
                </div>
                <div className="project-page-meta-item">
                  <span className="project-page-meta-label">Focus: </span>
                  <span>Interactive UI, state updates, input handling</span>
                </div>
              </div>
            </header>

            {/* Playable game */}
            <section className="project-section">
              <h2>Play the Game</h2>
              <p>
                Use <strong>W/A/S/D</strong> on desktop or swipe on mobile to
                move the tiles. Your goal is to combine matching numbers and
                push your score as high as possible before the timer runs out.
              </p>
              <Game />
              <br></br>
            </section>

            {/* Logic & behavior */}
            <section className="project-section">
              <h2>Game Logic &amp; State Management</h2>
              <p>
                The game runs on a 4×4 grid stored in React state. Each move
                triggers a coordinated series of updates:
              </p>
              <ul className="project-list">
                <li>
                  Tiles slide in the chosen direction and merge when values
                  match, following standard 2048 rules.
                </li>
                <li>
                  New tiles (2 or 4) are spawned into random empty cells after
                  each valid move.
                </li>
                <li>
                  Score is updated based on the value of merged tiles, and a
                  separate high score is tracked in state.
                </li>
                <li>
                  A game-over check runs periodically and after moves to detect
                  when no more moves are possible.
                </li>
              </ul>
              <p>
                All of this is implemented with functional React components and
                hooks like <code>useState</code> and <code>useEffect</code>, so
                the UI always reflects the current game state.
              </p>
            </section>

            {/* Controls */}
            <section className="project-section">
              <h2>Controls &amp; Input Handling</h2>
              <p>
                The project supports both keyboard and touch input so it’s
                playable on desktop and mobile:
              </p>
              <ul className="project-list">
                <li>
                  <strong>Keyboard:</strong> A <code>keydown</code> listener
                  responds to W, A, S, and D and triggers the corresponding
                  move functions.
                </li>
                <li>
                  <strong>Mobile swipes:</strong> Touch start and end positions
                  are compared to detect swipe direction and convert it into
                  up/down/left/right moves.
                </li>
                <li>
                  A small movement threshold prevents accidental micro-swipes
                  from triggering moves.
                </li>
                <li>
                  Input is ignored when the timer is not running or the game
                  is over, so state stays consistent.
                </li>
              </ul>
            </section>

            {/* Timer & feedback */}
            <section className="project-section">
              <h2>Timer &amp; Feedback</h2>
              <p>
                To make the game more challenging, I added a 30-second timer:
              </p>
              <ul className="project-list">
                <li>
                  A countdown is managed with <code>setInterval</code> inside a
                  <code>useEffect</code> hook.
                </li>
                <li>
                  When the timer reaches zero, the game stops accepting input
                  and a simple “Game Over” overlay is displayed.
                </li>
                <li>
                  A reset button clears the board, resets the timer and score,
                  and starts a new session.
                </li>
              </ul>
            </section>

            {/* What it shows about your skills */}
            <section className="project-section">
              <h2>What This Project Demonstrates</h2>
              <p>
                This project is a good example of how I approach interactive,
                stateful UI work. It shows that I can:
              </p>
              <ul className="project-list">
                <li>
                  Implement grid-based algorithms and merge logic without
                  relying on external libraries.
                </li>
                <li>
                  Manage real-time state updates cleanly using React hooks.
                </li>
                <li>
                  Handle multiple input methods (keyboard and touch) in a
                  predictable way.
                </li>
                <li>
                  Build small, focused components that are easy to reason about
                  and extend.
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

export default Project2048;
