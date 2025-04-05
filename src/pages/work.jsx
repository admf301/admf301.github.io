import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import AllWork from "../components/work/allWork";

import INFO from "../data/user";

import "./styles/work.css";

const Work = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`My Work | ${INFO.main.title}`}</title>
			</Helmet>

			<div className="page-content">
				<NavBar active="work" />
				<div className="content-wrapper">
					<div className="work-logo-container">
						<div className="work-logo">
							<Logo width={45} />
						</div>
					</div>
					<div className="work-container">
						<div className="title work-title">
							My Professional Work & Experience
						</div>

						<div className="subtitle work-subtitle">
							A curated collection of websites and projects I've built for clients, agencies, and teams. From fully custom builds to collaborative engineering efforts, these examples showcase my technical skills, problem-solving, and attention to detail.
						</div>

						<div className="work-list">
							<AllWork />
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

export default Work;
