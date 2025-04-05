import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSWGC = () => {

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
				<title>{`Client Site: West Georgia Contractors | ${INFO.main.title}`}</title>
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
							Client Site: West Georgia Contractors
						</div>

						<div className="subtitle cs-subtitle">
                        	Clicking the logo in the top left corner returns you to the home page.
						</div>

						<div className="subtitle cs-subtitle">
							A conversion-driven website designed for a Georgia-based construction team, this site showcases recent projects, provides an easy-to-use online estimate request form, 
							and utilizes local SEO strategies to enhance visibility and attract potential clients.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The site was developed with a focus on showcasing the quality and range of work provided by West Georgia Contractors.
								</div>

								<div className="subtitle cs-subtitle-desc">
									The homepage features a gallery of recent projects, allowing visitors to see examples of completed construction jobs, from residential builds to commercial renovations. 
									A key feature is the online estimate request form, which allows users to easily submit project details and receive a custom estimate. 
									This feature streamlines the lead generation process and helps convert site visitors into clients.
								</div>

								<div className="subtitle cs-subtitle-desc">
									Additionally, the site includes sections for client testimonials and the company background, contributing to a comprehensive and user-friendly experience.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="wgc1.png"
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
											src="wgc2.png"
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
									To ensure West Georgia Contractors stands out in the local market, I implemented a strong SEO strategy focused on location-based keywords and industry-specific terms like 
									"construction services in West Georgia" and "residential contractors in Georgia." I optimized the site’s content, metadata, and images to improve its visibility in local search results.
								</div>

								<div className="subtitle cs-subtitle-rev">
									Performance optimizations, such as image compression and faster load times, were also implemented to improve both desktop and mobile user experiences. 
									These SEO and technical enhancements contribute to higher search engine rankings, increased organic traffic, and more inquiries, ultimately helping the company attract more clients.
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

export default CSWGC;