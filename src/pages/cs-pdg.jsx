import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSPDG = () => {

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
				<title>{`Client Site: Pico de Gallo | ${INFO.main.title}`}</title>
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
							Client Site: Pico de Gallo
						</div>
						
						<div className="subtitle cs-subtitle">
							A vibrant and engaging website created for a Mexican restaurant, this project includes a seamless online ordering system for both pickup and delivery, helping customers enjoy their favorite dishes with convenience and ease.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The website was designed to reflect the lively and colorful atmosphere of Pico de Gallo, with high-quality images of the restaurant’s dishes, a menu showcasing traditional Mexican cuisine, and easy navigation for users. 
								</div>

								<div className="subtitle cs-subtitle-desc">
									A key feature is the integrated online ordering system, allowing customers to place orders for pickup or delivery directly from the website. 
									The order process is streamlined with minimal steps, making it easy for users to customize their meals and securely pay online.
								</div>

								<div className="subtitle cs-subtitle-desc">
									Additionally, the site includes sections for special promotions, the restaurant’s story, and contact information, enhancing both customer engagement and trust. 
									Fully responsive, the site ensures a smooth browsing experience on any device, whether users are ordering from home or on the go.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="pdg1.png"
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
											src="pdg2.png"
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
									To help Pico de Gallo stand out in the local food scene, I implemented a focused SEO strategy to increase visibility in local search results. 
									This included location-specific keywords like "Mexican food near me" and "best Mexican restaurant in [city name]," as well as optimizing the site’s content, meta tags, and images for better search engine indexing.
								</div>

								<div className="subtitle cs-subtitle-rev">
									I also improved site performance through image compression and faster load times, ensuring that users can quickly browse the menu and place orders without delays. 
									These optimizations contribute to better search engine rankings, increased organic traffic, and more online orders, helping Pico de Gallo connect with both new and returning customers.
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

export default CSPDG;