import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSCCF = () => {

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
				<title>{`Client Site: Crocker Consulting | ${INFO.main.title}`}</title>
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
							Client Site: Crocker Consulting
						</div>

						<div className="subtitle cs-subtitle">
                        	Clicking the logo in the top left corner returns you to the home page.
						</div>

						<div className="subtitle cs-subtitle">
							A clean, professional digital presence built for a financial advisor, this website was designed to support client acquisition and retention through integrated booking tools, a credibility-focused design, 
							and search engine optimization tailored for city-specific visibility.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The primary goal of this site was to present a trustworthy and polished brand image while making it easy for potential clients to schedule financial consultations. 
								</div>

								<div className="subtitle cs-subtitle-desc">
									The layout emphasizes clarity and professionalism, using calm tones, concise messaging, and focused navigation to guide users through service offerings and advisor background details. 
									I implemented a booking feature that allows users to request appointments directly from the site, streamlining the intake process and reducing the need for phone or email coordination.
								</div>

								<div className="subtitle cs-subtitle-desc">
									The site also includes a dedicated FAQ section, service breakdowns, and a credentials area to help build confidence with first-time visitors. Built with responsiveness in mind, 
									the site adapts seamlessly across devices, maintaining accessibility for users on desktops, tablets, and smartphones.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="ccf1.png"
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
											src="ccf2.png"
											alt="example2"
											className="cs-image"
										/>
									</div>
								</div>
							</div>

							<div className="cs-right-side cs-rev">
                                <div className="title cs-title cs-title-rev">
									SEO & Optimization
								</div>

								<div className="subtitle cs-subtitle-rev">
									To ensure Crocker Consulting appears in searches relevant to its geographic target area, I optimized the site for city-specific queries and localized financial services keywords. 
									Structured metadata and location-tagged content help signal relevance to search engines, while performance tuning—such as lazy loading, compressed assets, and clean markup—enhances page speed and crawlability.
								</div>

								<div className="subtitle cs-subtitle-rev">
								These technical improvements work in tandem with the site’s content strategy to increase search visibility and generate qualified leads. 
								The result is a professional, conversion-focused site that supports ongoing client growth while reinforcing the trust and credibility.
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

export default CSCCF;