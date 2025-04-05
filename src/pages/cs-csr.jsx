import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSCSR = () => {

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
				<title>{`Client Site: Clucas & Sons Remodeling | ${INFO.main.title}`}</title>
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
							Client Site: Clucas & Sons Remodeling
						</div>

						<div className="subtitle cs-subtitle">
							A polished, professional website built for a home remodeling company, this project was focused on showcasing past work, enabling easy appointment scheduling, 
							and implementing location-focused SEO strategies to help the business grow its local client base.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The website was designed to reflect the craftsmanship and reliability of a family-owned remodeling business. 
								</div>

								<div className="subtitle cs-subtitle-desc">
									A central feature is the visual project gallery, which highlights completed kitchen, bathroom, and home renovation projects with before-and-after images and detailed descriptions. 
									This section not only demonstrates expertise but also builds trust with potential clients exploring services. The site also includes an integrated appointment scheduling form that makes 
									it easy for users to request quotes or consultations with minimal friction.
								</div>

								<div className="subtitle cs-subtitle-desc">
									Clear navigation, well-structured service pages, and strong calls to action help guide visitors toward engaging with the business. 
									Fully responsive and tested across all major devices, the site provides a consistent and accessible experience whether users are browsing from a phone, tablet, or desktop.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="csr1.png"
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
											src="csr2.png"
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
									To help Clucas & Sons expand their reach within the local remodeling market, I implemented strategic local SEO optimizations. Service-area pages and geo-targeted keywords were included to ensure the 
									business appears in search results for remodeling services in surrounding cities and neighborhoods. Page titles, headings, and metadata were all optimized to improve rankings and click-through rates.
								</div>

								<div className="subtitle cs-subtitle-rev">
									On the performance side, I implemented image compression, caching, and minimized scripts to improve load times and enhance mobile usability. These improvements help increase organic traffic 
									and convert visitors into clients—all while reinforcing the company’s strong local reputation and commitment to quality craftsmanship.
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

export default CSCSR;