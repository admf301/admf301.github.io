import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSFSM = () => {

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
				<title>{`Client Site: 4 Season Moves | ${INFO.main.title}`}</title>
			</Helmet>

			<div className="page-content">
				<NavBar active="work" />
				<div className="content-wrapper">
					<div className="cs-logo-container">
						<div className="cs-logo" style={logoStyle}>
							<Logo width={logoSize} />
						</div>
					</div>

					<div className="cs-container">
						<div className="title">
							Client Site: 4 Season Moves
						</div>

						<div className="subtitle cs-subtitle">
                        	Clicking the logo in the top left corner returns you to the home page.
						</div>

						<div className="subtitle cs-subtitle">
							A responsive, service-oriented website built for a moving company offering year-round relocation services. This project emphasizes seamless appointment scheduling, clean design, 
							and location-targeted SEO to help attract and convert local customers.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The primary goal for this site was to make the booking process as smooth and approachable as possible for clients preparing to move. 
								</div>

								<div className="subtitle cs-subtitle-desc">
									A custom-built scheduling form allows visitors to easily enter moving details, select preferred dates, and request quotes directly from the homepage. 
									The layout was designed to reflect clarity and professionalism, with service pages that clearly outline offerings such as local and long-distance moves, packing support, and commercial relocation.
								</div>

								<div className="subtitle cs-subtitle-desc">
									Testimonials and a short FAQ section were also added to reduce customer hesitation and provide key information up front. Built with responsive design principles, 
									the site performs reliably across all device types, ensuring usability for customers searching and booking on mobile.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="fsm1.png"
											alt="example1"
											className="cs-image"
										/>
									</div>
								</div>
							</div>

						</div>

                        <div className="cs-main cs-main-rev">

							<div className="cs-left-side">
                                <div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="fsm2.png"
											alt="example2"
											className="cs-image"
										/>
									</div>
								</div>
							</div>

							<div className="cs-right-side cs-rev">
                                <div className="title cs-title cs-title-rev">
									SEO and Optimization
								</div>

								<div className="subtitle cs-subtitle-rev">
									To help 4 Season Moves stand out in a competitive local industry, I implemented a tailored SEO strategy focused on location-based keywords and service-specific search terms. 
									Each page was optimized with targeted titles, meta descriptions, and schema data to support visibility in local search results.
								</div>

								<div className="subtitle cs-subtitle-rev">
									Performance improvements—such as image compression and lazy loading—helped increase site speed and mobile usability scores. 
									These technical enhancements, combined with thoughtful content strategy, help drive more organic traffic from nearby clients, ultimately boosting appointment volume and customer inquiries.
								</div>
							</div>
						</div>
					</div>
					<div className="page-footer">
							<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default CSFSM;