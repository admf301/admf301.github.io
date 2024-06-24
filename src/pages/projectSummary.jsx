import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";

import INFO from "../data/user";

import "./styles/projectSummary.css"

const ProjectSummary = () => {

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
				<title>{`Project: Portfolio Site | ${INFO.main.title}`}</title>
			</Helmet>

			<div className="page-content">
				<div className="content-wrapper">
					<div className="projectSummary-logo-container">
						<div className="projectSummary-logo" style={logoStyle}>
							<Logo width={logoSize} />
						</div>
					</div>

					<div className="projectSummary-container">
						<div className="title">
							Project: Portfolio Webpage Build
						</div>

						<div className="subtitle projectSummary-subtitle">
                        	Clicking the logo in the top left corner returns you to the home page.
						</div>

						<div className="subtitle projectSummary-subtitle">
							Welcome to my React.js webpage portfolio overview. As an aspiring software engineer, I utilize React.js to develop dynamic and
                            responsive web applications. I created this webpage to showcase the projects I have completed during college and 
                            in my personal time, as well as to demonstrate my proficiency in React.js and creating intuitive user experiences. Through 
                            continuous learning and collaboration, I aim to refine my skills and stay informed about emerging trends in web 
                            development. This overview offers structured insight into my work process and the functionality of this site.
						</div>

                        <div className="projectSummary-social">
							<a href={INFO.source.projectSummary} target="_blank" rel="noreferrer">
								<div className="social-icon">
									<FontAwesomeIcon
										icon={faGithub}
										className="social-icon"
									/>
								</div>
								<div className="social-text">Source on Github</div>
							</a>
						</div>

                        <div className="projectSummary-main">

							<div className="projectSummary-right-side">
								<div className="title projectSummary-title">
									How it works
								</div>

								<div className="subtitle projectSummary-subtitle-desc">
									This React web application uzilizes the 'react-router-dom' library for handling routing between pages. This setup
									enables navigation within the application by dynamically rendering components based on the URL path. Each page 
									adheres to a standardized design paradigm wherein they define their unique JSX structures, handling state and effects
									as needed. The 'Helmet' component is used to manage document metadata, ensuring dynamic updates to page titles.
									Additionally, common elements such as navigation bars, logos, social media links, and footers are incorporated to 
									maintain a consistent structure and cohesive user experience throughout the application.
								</div>

								<div className="subtitle projectSummary-subtitle-desc">
									Futhermore, this application was designed with easy data management in mind through an intuitive configuration file
									structure. Centralizing essential information such as page titles, descriptions, project details, contact information,
									and social media links fosters streamlined development and maintenance processes. This systematic approach promotes
									scalability and flexibility, allowing for seamless integration of new features without compromising code readability.
								</div>
							</div>

							<div className="projectSummary-left-side">
								<div className="projectSummary-image-container">
									<div className="projectSummary-image-wrapper">
										<img
											src="summaryOne.png"
											alt="projectSummary"
											className="projectSummary-image"
										/>
									</div>
								</div>
							</div>

						</div>

                        <div className="projectSummary-main projectSummary-main-rev">

							<div className="projectSummary-left-side">
                                <div className="projectSummary-image-container">
									<div className="projectSummary-image-wrapper">
										<img
											src="summaryTwo.png"
											alt="projectSummary"
											className="projectSummary-image"
										/>
									</div>
								</div>
							</div>

							<div className="projectSummary-right-side projectSummary-rev">
                                <div className="title projectSummary-title projectSummary-title-rev">
									Breaking it down further
								</div>

								<div className="subtitle projectSummary-subtitle-rev">
									Each page and component has their own individually made CSS styling. By adopting a modularized design styling
									approach, distinct design elements are curated to enhance the unique content and functionality of each page.
									This strategic integration of customized styling not only enhances aesthetic appeal but also improves usability
									and readability.
								</div>

								<div className="subtitle projectSummary-subtitle-rev">
									You can access the full source code for this webpage and my other work on my Github page by using the 'Source on Github'
									link near the top of the screen. Thank you for checking out my React.js Portfolio webpage overview.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProjectSummary;