import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSAPD = () => {

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
				<title>{`Client Site: A's Progressive Dental | ${INFO.main.title}`}</title>
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
							Client Site: A's Progressive Dental
						</div>
						
						<div className="subtitle cs-subtitle">
							Built for a forward-thinking dental practice focused on innovation and efficiency, this custom website streamlines new patient intake, simplifies appointment scheduling, and includes local SEO enhancements to improve search 
							visibility and attract new patients in the surrounding area.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									This website was developed to support a modern dental office that prioritizes convenience, clarity, and professional presentation. At the core of the site is a digital intake form system 
									that enables new patients to securely complete required paperwork before visiting the office—reducing front desk workload and shortening appointment prep time.
								</div>

								<div className="subtitle cs-subtitle-desc">
									The online appointment request tool makes it simple for visitors to select preferred time slots, submit contact information, and initiate scheduling without needing to call the office directly. 
									A clean, calming visual design helps build trust and supports the practice's progressive branding.
								</div>

								<div className="subtitle cs-subtitle-desc">
									Built with responsive design principles, the site functions smoothly on all screen sizes, making it easy for patients to access and interact with from any device.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="apd1.png"
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
											src="apd2.png"
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
									To support the practice’s growth goals, I implemented targeted local SEO strategies aimed at improving search visibility in the competitive dental space. This included crafting keyword-rich headings and body content, 
									adding structured metadata for location-based searches, and optimizing site performance to meet modern speed and mobile usability standards.
								</div>

								<div className="subtitle cs-subtitle-rev">
									Page speed enhancements—such as minimized scripts and image compression—were paired with accessibility best practices to ensure a smooth user experience across all devices and browsers.
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

export default CSAPD;