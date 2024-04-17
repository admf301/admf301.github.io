import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage";
import About from "./pages/about";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import Notfound from "./pages/404";

import Project2048 from "./pages/project-2048";
import ProjectSummary from "./pages/projectSummary";
import ProjectStructure from "./pages/projectStructure";
import ProjectApp from "./pages/projectApp";

import "./app.css";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="https://admf301.github.io/" element={<Homepage />} />
				<Route path="https://admf301.github.io/about" element={<About />} />
				<Route path="https://admf301.github.io/projects" element={<Projects />} />
				<Route path="https://admf301.github.io/contact" element={<Contact />} />

				<Route path="https://admf301.github.io/project-2048" element={<Project2048 />} />
				<Route path="https://admf301.github.io/project-summary" element={<ProjectSummary />} />
				<Route path="https://admf301.github.io/project-hash-table" element={<ProjectStructure />} />
				<Route path="https://admf301.github.io/project-mile-redeemer-app" element={<ProjectApp />} />

				<Route path="*" element={<Notfound />} />
			</Routes>
		</div>
	);
}

export default App;
