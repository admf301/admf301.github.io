import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";

import INFO from "../data/user";

import "./styles/projectStructure.css"

const ProjectStructure = () => {

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
				<title>{`Project: Hash Table | ${INFO.main.title}`}</title>
			</Helmet>

			<div className="page-content">
				<div className="content-wrapper">
					<div className="projectStructure-logo-container">
						<div className="projectStructure-logo" style={logoStyle}>
							<Logo width={logoSize} />
						</div>
					</div>

					<div className="projectStructure-container">
						<div className="title">
							Project: Hash Table Inventory System
						</div>

						<div className="subtitle projectStructure-subtitle">
                        	Clicking the logo in the top left corner returns you to the home page.
						</div>

						<div className="subtitle projectStructure-subtitle">
							Welcome to the summary of my C++ Hash Table Inventory System project I completed during my junior year in college. This project was a 
							practical exploration of constructing, manipulating, and managing a hash table, specifically designed for an item inventory 
							system. The project consisted of implementing the create, search, print, and sorting operations within the hash table.
							Central to the implementation is the HT class, which encapsulates the functionality required to manage the hash 
							table and perform operations. By utilizing C++ classes and STL containers, the HT class provides a solid framework for 
							efficiently handling the item inventory system.
						</div>

                        <div className="projectStructure-social">
							<a href={INFO.source.ProjectStructure} target="_blank" rel="noreferrer">
								<div className="social-icon">
									<FontAwesomeIcon
										icon={faGithub}
										className="social-icon"
									/>
								</div>
								<div className="social-text">Source on Github</div>
							</a>
						</div>

                        <div className="projectStructure-main">

							<div className="projectStructure-right-side">
								<div className="title projectStructure-title">
									How it Works
								</div>

								<div className="subtitle projectStructure-subtitle-desc">
									The inventory itself is represented as a collection of items called entries, each characterized by a 
									unique identifier key, a description, and a quantity encapsulated within a C++ struct. 
								</div>

								<div className="subtitle projectStructure-subtitle-desc">
									To facilitate efficient storage and retrieval for this project, the inventory system utilized the concept of 
									separate chaining to handle potential collisions. Separate chaining helps manage collisions efficiently because
									it ensures that even if multiple elements hash to the same index, they can all be stored and retrieved correctly 
									without significant performance degradation.
								</div>

								<div className="subtitle projectStructure-subtitle-desc">
									Utilizing separate chaining provides a straightforward and efficient way to handle collisions in a hash table. It is
									also very low latency and efficient, since the time complexity for insertion, deletion, and lookup are O(1) time
									on average and O(n) at worst. Separate chaining can also easily accommodate a dynamic number of elements without a 
									significant performance impact.
								</div>
							</div>

							<div className="projectStructure-left-side">
								<div className="projectStructure-image-container">
									<div className="projectStructure-image-wrapper">
										<img
											src="structOne.png"
											alt="projectStructure"
											className="projectStructure-image"
										/>
									</div>
								</div>
							</div>

						</div>

                        <div className="projectStructure-main projectStructure-main-rev">

							<div className="projectStructure-left-side">
                                <div className="projectStructure-image-container">
									<div className="projectStructure-image-wrapper">
										<img
											src="structTwo.png"
											alt="projectStructure"
											className="projectStructure-image"
										/>
									</div>
								</div>
							</div>

							<div className="projectStructure-right-side projectStructure-rev">
                                <div className="title projectStructure-title projectStructure-title-rev">
									Some Extra Info
								</div>

								<div className="subtitle projectStructure-subtitle-rev">
									This inventory system's hash table utilizes an indirect sorting technique for its sorting algorithm. Indirect sorting creates a 
									map of items identifiers and their corresponding positions in the inventory. For instance, if you need to search for a specific
									item, you can quickly locate its position in the inventory using the map, rather than scanning the whole inventory.
								</div>

								<div className="subtitle projectStructure-subtitle-rev">
									You can access the complete source code for this project and my other work on my Github page by using the 'Source on Github'
									link near the top of the screen. Thank you for checking out my C++ Hash Table Inventory System summary.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProjectStructure;