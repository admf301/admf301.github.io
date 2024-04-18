import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";
import Game from "../data/game-2048";

import INFO from "../data/user";

import "./styles/project-2048.css"

const Project2048 = () => {

	const [stayLogo, setStayLogo] = useState(false);
	const [logoSize, setLogoSize] = useState(70);
	const [oldLogoSize, setOldLogoSize] = useState(70);

    useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			let scroll = Math.round(window.scrollY, 2);

			let newLogoSize = 70 - (scroll * 4) / 10;

			if (newLogoSize < oldLogoSize) {
				if (newLogoSize > 40) {
					setLogoSize(newLogoSize);
					setOldLogoSize(newLogoSize);
					setStayLogo(false);
				} else {
					setStayLogo(true);
				}
			} else {
				setLogoSize(newLogoSize);
				setStayLogo(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [logoSize, oldLogoSize]);

	const logoStyle = {
		display: "flex",
		position: stayLogo ? "fixed" : "relative",
		top: stayLogo ? "3vh" : "auto",
		zIndex: 999,
		border: "2px solid var(--tertiary-color)",
		borderRadius: stayLogo ? "50%" : "none",
		boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Project: 2048 | ${INFO.main.title}`}</title>
			</Helmet>

			<div className="page-content">
				<div className="content-wrapper">
					<div className="project2048-logo-container">
						<div className="project2048-logo" style={logoStyle}>
							<Logo width={logoSize} />
						</div>
					</div>

					<div className="project2048-container">
						<div className="title project2048-title">
							Project: 2048 'Speed Edition'
						</div>

						<div className="subtitle project2048-subtitle">
                        	Clicking the logo in the top left corner returns you to the home page.
						</div>

						<div className="subtitle project2048-subtitle">
							Welcome to the interactive 2048 'Speed Edition'! This was one of my first personal projects created using Javascript. 
							Initially conceived as a simple endeavor, it gradually morphed into something more complex as I kept adding more features.
							Eventually, I adapted it to React.js to offer a more engaging and interactive experience. Please feel free to try the working
							version of the game below! Directions are included, as well as a link to the source code available for viewing on my Github page.
							Unfortunately the game controls are only functional using a keyboard.
						</div>

						<div className="project2048-social">
							<a href={INFO.source.project2048} target="_blank" rel="noreferrer">
								<div className="social-icon">
									<FontAwesomeIcon
										icon={faGithub}
										className="social-icon"
									/>
								</div>
								<div className="social-text">Source on Github</div>
							</a>
						</div>

						<div className="subtitle project2048-subtitle">
							<ol>
        						<li><strong>Start the Game:</strong> To begin the game, press the 'Start' button.</li>
        						<li><strong>Game Controls:</strong>
            						<ul>
                						<li>Use "W" key to move tiles Up.</li>
                						<li>Use "A" key to move tiles Left.</li>
                						<li>Use "S" key to move tiles Down.</li>
                						<li>Use "D" key to move tiles Right.</li>
            						</ul>
        						</li>
        						<li><strong>Gameplay:</strong> Combine tiles with the same value by moving them towards each other. Each move will spawn a new tile of value 2 or 4 on an empty spot. When two tiles with the same value collide, they will merge into one tile with the sum of their values. The objective is to achieve the highest score within the given time frame.</li>
        						<li><strong>Scoring:</strong> Combining tiles with higher values will result in a higher score. Try to strategize your moves to maximize your score.</li>
        						<li><strong>Time Limit:</strong> You have a set time limit to achieve the highest score possible.</li>
        						<li><strong>Reset:</strong> If you want to start over or if the game ends, press the "Reset" button to reset the game board and your score.</li>
        						<li><strong>Have Fun:</strong> Enjoy the game and challenge yourself to beat your high score!</li>
    						</ol>
						</div>

						<div className="main-content-container">
							<Game />
						</div>

					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Project2048;