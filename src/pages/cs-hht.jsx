import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSHHT = () => {

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
				<title>{`Client Site: 24 Hour Help Towing | ${INFO.main.title}`}</title>
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
							Client Site: 24 Hour Help Towing
						</div>

						<div className="subtitle cs-subtitle">
							A fast-access website built for a towing company that provides 24/7 emergency services. The site is designed to ensure quick and easy contact for drivers in distress, featuring emergency contact options, 
							booking capabilities, and optimized local SEO to drive service requests in urgent situations.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The primary focus of this site is accessibility and urgency, reflecting the critical nature of towing services. 
								</div>

								<div className="subtitle cs-subtitle-desc">
									The homepage prominently features an emergency contact number and a clickable “Request Assistance” button, allowing users to quickly get in touch with the company when needed. 
									A streamlined booking form allows users to request specific services such as towing, roadside assistance, or vehicle recovery. The design is simple, with clear, bold navigation to ensure that visitors 
									can easily find the information they need without confusion.
								</div>

								<div className="subtitle cs-subtitle-desc">
									Additionally, the site includes an area to showcase the company’s fleet and available equipment, helping to build trust and highlight the business’s capability to handle various towing scenarios. 
									Built with mobile-first design, the site is fully responsive, ensuring a seamless experience whether customers are using a smartphone or a desktop.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="hht1.png"
											alt="exmaple1"
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
											src="hht2.png"
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
									To ensure that 24 Hour Help Towing is visible during critical moments, I optimized the website for local SEO. 
									This involved incorporating location-specific keywords related to towing and emergency roadside assistance services, as well as ensuring that the site ranks well for urgent search queries. 
									I also implemented schema markup for emergency services to increase the likelihood of appearing in relevant search engine snippets.
								</div>

								<div className="subtitle cs-subtitle-rev">
									On the technical side, I focused on optimizing page load times and improving mobile responsiveness. These performance enhancements ensure that visitors get quick access to services when time is of the essence, 
									which is essential for customers needing immediate assistance in emergency situations.
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

export default CSHHT;