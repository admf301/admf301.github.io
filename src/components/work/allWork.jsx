import React from "react";

import Work from "./work";

import INFO from "../../data/user";

import "./styles/allWork.css";

const AllWork = () => {
	return (
		<div className="all-work-container">
			{INFO.works.map((work, index) => (
				<div className="all-work-project" key={index}>
					<Work
						logo={work.logo}
						title={work.title}
						description={work.description}
						linkText={work.linkText}
						link={work.link}
					/>
				</div>
			))}
		</div>
	);
};

export default AllWork;
