import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSBLF = () => {

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
				<title>{`Client Site: Bloom Furniture | ${INFO.main.title}`}</title>
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
							Client Site: Bloom Furniture
						</div>

						<div className="subtitle cs-subtitle">
                        	Clicking the logo in the top left corner returns you to the home page.
						</div>

						<div className="subtitle cs-subtitle">
							A responsive, image-forward website built for a boutique furniture store, this project was designed to showcase available pieces through a visual catalog, streamline design consultations for potential buyers, 
							and strengthen the store’s presence in local search results.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The site was built around a clean and modern aesthetic to reflect the elegance and quality of the store’s handmade and curated furniture collection.
								</div>

								<div className="subtitle cs-subtitle-desc">
									A central component is the visual catalog, which allows visitors to browse featured pieces by category, with detailed descriptions and high-resolution imagery that highlights craftsmanship and design. 
									I also implemented a simple consultation request form that makes it easy for customers to connect with the store for personalized recommendations or custom orders.
								</div>

								<div className="subtitle cs-subtitle-desc">
									Testimonials, store information, and a styled gallery were added to provide social proof and a clear sense of the brand’s identity. Fully responsive and optimized for both desktop and mobile devices, 
									the site offers a smooth browsing experience no matter how customers access it.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="blf1.png"
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
											src="blf2.png"
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
									To help Bloom Furniture stand out in the local boutique retail space, I implemented location-focused SEO strategies and product-driven optimizations. This included optimizing image metadata, 
									using targeted keywords relevant to furniture types and interior design styles, and building out pages with structured content to help search engines understand the site’s offerings.
								</div>

								<div className="subtitle cs-subtitle-rev">
									Performance was also a priority— images were compressed without sacrificing quality, and caching was configured to improve repeat load times. 
									These enhancements support faster browsing, better rankings for localized search terms, and higher engagement from visitors interested in home furnishings and decor.
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

export default CSBLF;