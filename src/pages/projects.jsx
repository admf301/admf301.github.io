import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";

import "./styles/projects.css";

const Projects = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
			</Helmet>

			<div className="page-content">
				<NavBar active="projects" />
				<div className="content-wrapper">
					<div className="projects-logo-container">
						<div className="projects-logo">
							<Logo width={45} />
						</div>
					</div>
					<div className="projects-container">
						<div className="title projects-title">
							A Few of My Favorite Projects
						</div>

						<div className="subtitle projects-subtitle">
							These projects represent a culmination of dedication, creativity, and passion. From advancing existing systems to refining
							processes, each project reflects a commitment to excellence and continuous improvement. The process of bringing these ideas
							to fruition has been both challenging and rewarding, fostering growth and development along the way. As I reflect on these 
							favorite projects, I am reminded of the passion and drive that propels me forward.
						</div>

						<div className="projects-list">
							<AllProjects />
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

export default Projects;
