import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import INFO from "../data/user";

import "./styles/cs-page.css"

const CSKCC = () => {

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
				<title>{`Client Site: Kidz Care Connect | ${INFO.main.title}`}</title>
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
							Client Site: Kidz Care Connect
						</div>

						<div className="subtitle cs-subtitle">
							A warm and professional website designed for a nanny service, this project highlights caregiver credentials, streamlines the appointment booking process, and leverages local SEO to connect families with trusted childcare professionals.
						</div>

                        <div className="cs-main">

							<div className="cs-right-side">
								<div className="title cs-title">
									Website Features
								</div>

								<div className="subtitle cs-subtitle-desc">
									The website is built to showcase Kidz Care Connect’s commitment to providing reliable, high-quality nanny services. 
								</div>

								<div className="subtitle cs-subtitle-desc">
									A central feature of the site is the caregiver profiles section, where potential clients can review detailed credentials, experience, and background checks for each nanny. 
									To make the process of hiring easy, an integrated booking system allows families to request interviews or schedule services directly from the website.
								</div>

								<div className="subtitle cs-subtitle-desc">
									Additional features include a blog offering parenting tips and articles on childcare, as well as a FAQ section to address common questions and concerns. 
									The design is clean, user-friendly, and responsive, ensuring that families can easily navigate the site and book services from any device, whether at home or on the go.
								</div>
							</div>

							<div className="cs-left-side">
								<div className="cs-image-container">
									<div className="cs-image-wrapper">
										<img
											src="kcc1.png"
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
											src="kcc2.png"
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
									To help Kidz Care Connect reach more families in their local area, I implemented a robust local SEO strategy. This included keyword optimization for nanny and childcare services, 
									as well as city-specific terms to improve the site’s visibility in local search results. I also focused on optimizing the site’s content and metadata to ensure it ranks for relevant queries like 
									"trusted nanny service" and "experienced childcare providers."
								</div>

								<div className="subtitle cs-subtitle-rev">
									On the technical side, I enhanced the site’s performance by compressing images and optimizing load times, ensuring the site runs smoothly and efficiently on all devices. 
									These SEO strategies and technical improvements help increase organic traffic, build local awareness, and connect families with the right caregivers.
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

export default CSKCC;