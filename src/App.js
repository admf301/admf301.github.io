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
				<Route path="/" element={<Homepage />} />
				<Route path="/about" element={<About />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/contact" element={<Contact />} />

				<Route path="/project-2048" element={<Project2048 />} />
				<Route path="/project-summary" element={<ProjectSummary />} />
				<Route path="/project-hash-table" element={<ProjectStructure />} />
				<Route path="/project-mile-redeemer-app" element={<ProjectApp />} />

				<Route path="*" element={<Notfound />} />
			</Routes>
		</div>
	);
}

export default App;
