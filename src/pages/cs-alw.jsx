import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSALW = () => {

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
				<title>{`Client Site: Alonzos Welding | ${INFO.main.title}`}</title>
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
							Client Site: Alonzos Welding
						</div>

						<div className="subtitle cs-subtitle">
							Created for a skilled independent welding contractor, this website features a dynamic project portfolio to showcase past work, built-in scheduling functionality for client convenience, and local SEO enhancements 
							to increase visibility among nearby residential and commercial clients.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The site was designed to reflect the craftsmanship and professionalism of a seasoned welder, while also providing potential clients with the tools they need to get in touch quickly. 
								</div>

								<div className="subtitle cs-subtitle-desc">
									A major component of the site is the interactive project portfolio, which allows visitors to browse completed welding jobs by category—ranging from custom metalwork to large-scale structural repairs. 
									Each project page includes high-quality visuals and short descriptions to highlight the contractor’s skills and versatility.
								</div>

								<div className="subtitle cs-subtitle-desc">
									Additionally, I implemented a scheduling feature that allows clients to request service quotes or book appointments directly through the website, reducing back-and-forth communication and making the process more efficient. 
									The website’s layout is mobile-responsive and optimized for quick loading, ensuring accessibility for users on all devices.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="alw1.png"
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
											src="alw2.png"
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
									To help Alonzo's Welding stand out in a competitive local market, I applied targeted on-page SEO focused on relevant welding service keywords and geographic phrases. This included custom title tags, meta descriptions, 
									and optimized heading structures to improve visibility in search engine results. The project portfolio also plays a role in SEO, with structured data and optimized image tags helping each page index properly.
								</div>

								<div className="subtitle cs-subtitle-rev">
									Performance improvements such as asset compression, browser caching, and clean code practices contributed to faster load times, which not only support SEO rankings but also reduce bounce rates. 
									Together, these enhancements ensure the site brings in qualified traffic and converts local visitors into clients.
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

export default CSALW;