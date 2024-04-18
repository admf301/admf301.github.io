import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";

import INFO from "../data/user";

import "./styles/projectApp.css"

const ProjectApp = () => {

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
				<title>{`Project: Mile Redeemer | ${INFO.main.title}`}</title>
			</Helmet>

			<div className="page-content">
				<div className="content-wrapper">
					<div className="projectApp-logo-container">
						<div className="projectApp-logo" style={logoStyle}>
							<Logo width={logoSize} />
						</div>
					</div>

					<div className="projectApp-container">
						<div className="title">
							Project: Flight Mile Rewards App
						</div>

						<div className="subtitle projectApp-subtitle">
                        	Clicking the logo in the top left corner returns you to the home page.
						</div>

						<div className="subtitle projectApp-subtitle">
                            Welcome to the summary of my Java Flight Mile Rewards App project. This JavaFX project represents a comprehensive 
							implementation of a flight mile redemption system, developed as part of a class during my senior year of
							college. The project consisted of six key components, each fulfilling a unique roll in the system's archetecture and 
							functionality. Through a blend of algorithmic design, object-oriented design principles, and GUI development, this project
							serves as an intuitive system capable of managing flight miles and facilitating travel plans.
						</div>

                        <div className="projectApp-social">
							<a href={INFO.source.ProjectApp} target="_blank" rel="noreferrer">
								<div className="social-icon">
									<FontAwesomeIcon
										icon={faGithub}
										className="social-icon"
									/>
								</div>
								<div className="social-text">Source on Github</div>
							</a>
						</div>

                        <div className="projectApp-main">

							<div className="projectApp-right-side">
								<div className="title projectApp-title">
									How it Works
								</div>

								<div className="subtitle projectApp-subtitle-desc">
									The 'Destination.java' class serves as the foundational entity within the system, responsible for encapsulating destination data
									and behaviors. By defining attributes such as place name base mileage cost, establishing 
									essential structure for subsequent processing. 
								</div>

                                <div className="subtitle projectApp-subtitle-desc">
                                    At the core of the system's functionality is the 'MileRedeemer.java' class, which handles input file parsing and 
									flight planning algorithms through methods such as 'readDestinations()' and 'redeemMiles()'. Complementing the 
									MileRedeemer class is a custom comparator for sorting of destination objects by base mileage, enabling effecient
									organization and retrieval of destinations.
								</div>

                                <div className="subtitle projectApp-subtitle-desc">
                                    Driving the user interface aspects of the system is the 'MileRedeemerApp.java' class, which initializes the JavaFX 
									application and integrates the UI layout defined in the accompanying FXML file. Acting as the intermediary between UI 
									components and backend logic is the 'MileRedeemerAppController.java' class which implements event handlers and
									callback functions to facilitate user interaction and system response.
								</div>
							</div>

							<div className="projectApp-left-side">
								<div className="projectApp-image-container">
									<div className="projectApp-image-wrapper">
										<img
											src="appOne.png"
											alt="projectApp"
											className="projectApp-image"
										/>
									</div>
								</div>
							</div>

						</div>

                        <div className="projectApp-main projectApp-main-rev">

							<div className="projectApp-left-side">
                                <div className="projectApp-image-container">
									<div className="projectApp-image-wrapper">
										<img
											src="appTwo.png"
											alt="projectApp"
											className="projectApp-image"
										/>
									</div>
								</div>
							</div>

							<div className="projectApp-right-side projectApp-rev">
                                <div className="title projectApp-title projectApp-title-rev">
									Some Extra Info
								</div>

								<div className="subtitle projectApp-subtitle-rev">
                                    The 'MileRedeemerAppUI.fxml' file defines the layout of the UI components, specifying attributes such as position,
									dimensions, and behavior. This FXML file serves a structured blueprint for the graphical interface, facilitating 
									consistent rendering and user interaction across multiple different platforms and environments.
								</div>

                                <div className="subtitle projectApp-subtitle-rev">
									You can access the full source code for this project and my other work on my Github page by using the 'Source on Github'
									link near the top of the screen. Thank you for checking out my Java Flight Mile Rewards App summary. 
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProjectApp;