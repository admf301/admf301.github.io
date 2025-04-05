import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faLinkedin
} from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import ShortWork from "../components/work/shortWork";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";

import "./styles/homepage.css";

const Homepage = () => {
	const [stayLogo, setStayLogo] = useState(false);
	const [logoSize, setLogoSize] = useState(80);
	const [oldLogoSize, setOldLogoSize] = useState(80);

	useEffect(() => {
		window.scrollTo(0, 0);
		const screenWidth = window.innerWidth;
		const initialLogoSize = screenWidth <= 768 ? 45 : 80;
		setLogoSize(initialLogoSize);
		setOldLogoSize(initialLogoSize);
		
		return () => {
			setLogoSize(80);
			setOldLogoSize(80);
		};
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			let scroll = Math.round(window.scrollY, 2);
			let screenWidth = window.innerWidth;
			let currentSize = screenWidth <= 768 ? 45 : 80;

			let newLogoSize = currentSize - (scroll * 4) / 10;

			if (newLogoSize < oldLogoSize) {
				if (newLogoSize > 45) {
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

		const handleResize = () => {
			let screenWidth = window.innerWidth;
			let newLogoSize = screenWidth <= 768 ? 45 : 80;
			setLogoSize(newLogoSize);
			setOldLogoSize(newLogoSize);
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [logoSize, oldLogoSize]);

	const logoStyle = {
		display: "flex",
		position: "fixed",
		top: "3vh",
		zIndex: 999,
		border: stayLogo ? "2px solid var(--tertiary-color)" : "none",
		borderRadius: stayLogo ? "50%" : "none",
		boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
			</Helmet>

			<div className="page-content">
				<NavBar active="home" />
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						<div className="homepage-logo" style={logoStyle}>
							<Logo width={logoSize} link={false} />
						</div>
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<div className="title homepage-title">
									{INFO.homepage.title}
								</div>

								<div className="subtitle homepage-subtitle">
									{INFO.homepage.description}
								</div>
							</div>

							<div className="homepage-first-area-right-side">
								<div className="homepage-image-container">
									<div className="homepage-image-wrapper">
										<img
											src="main-logo.png"
											alt="about"
											className="homepage-image"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="homepage-socials">
							<a
								href={INFO.socials.github}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faGithub}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.linkedin}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faLinkedin}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={`mailto:${INFO.main.email}`}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faMailBulk}
									className="homepage-social-icon"
								/>
							</a>
						</div>

						<div className="homepage-work-area">
								<div className="title work-title">
									{INFO.homepage.workTitle}
								</div>

								<div className="subtitle work-subtitle">
									{INFO.homepage.workDesc}
								</div>
						</div>

						<div className="homepage-works">
							<ShortWork />
						</div>

						<div className="homepage-projects-area">
								<div className="title project-title-p">
									{INFO.homepage.projectTitle}
								</div>

								<div className="subtitle project-desc">
									{INFO.homepage.projectDesc}
								</div>
						</div>

						<div className="homepage-projects">
							<AllProjects />
						</div>

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
