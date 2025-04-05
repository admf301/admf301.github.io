import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSFTP = () => {

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
				<title>{`Client Site: Finishing Touch Painting | ${INFO.main.title}`}</title>
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
							Client Site: Finishing Touch Painting
						</div>

						<div className="subtitle cs-subtitle">
							A vibrant, portfolio-style website designed for a residential painting business, this project highlights the company’s past work, enables easy scheduling for consultations, 
							and improves local search visibility to connect with homeowners in need of quality painting services.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The site was developed with a focus on showcasing the company’s high-quality interior and exterior work.
								</div>

								<div className="subtitle cs-subtitle-desc">
									A key feature is the project portfolio, where visitors can view vibrant before-and-after photos of completed painting jobs for various rooms and exterior projects. 
									This visual display helps prospective clients see the range of services offered, from wall painting to complete home makeovers. 
									The site also includes an easy-to-use scheduling tool that allows homeowners to request estimates or book consultations directly from the website.
								</div>

								<div className="subtitle cs-subtitle-desc">
									The design is clean and minimal, with bright colors that complement the company’s brand identity. Fully responsive, the site ensures seamless navigation and booking functionality across mobile, tablet, and desktop devices.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="ftp1.png"
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
											src="ftp2.png"
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
									To help Finishing Touch Painting stand out in a competitive local market, I implemented focused local SEO strategies to attract homeowners within the business’s service area. 
									By integrating region-specific keywords, optimizing meta tags, and using location-based content, the site has improved its visibility in relevant search engine results.
								</div>

								<div className="subtitle cs-subtitle-rev">
									Additionally, I worked on optimizing the website’s performance with techniques such as image compression and script minification, ensuring quick load times for a smoother user experience. 
									These optimizations enhance the website’s search engine rankings and ensure that it performs well on both desktop and mobile.
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

export default CSFTP;