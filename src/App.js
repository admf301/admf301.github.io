import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage";
import About from "./pages/about";
import Work from "./pages/work";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import Notfound from "./pages/404";

import CSPDG from "./pages/cs-pdg"; //pico
import CSAFD from "./pages/cs-afd"; //a's family
import CSFLT from "./pages/cs-flt"; //front line towing
import CSWGC from "./pages/cs-wgc"; //west georgia
import CSSTH from "./pages/cs-sth"; //service tech
import CSFSM from "./pages/cs-fsm"; //4 season moves
import CSELC from "./pages/cs-elc"; //elegant cabinets
import CSBLF from "./pages/cs-blf"; //bloom furniture
import CSAPD from "./pages/cs-apd"; //a's progressive
import CSDSC from "./pages/cs-dsc"; //david & sons
import CSFTP from "./pages/cs-ftp"; //finishing touch painting
import CSHDC from "./pages/cs-hdc"; //handy care
import CSHHT from "./pages/cs-hht"; //mm (24 hour towing)
import CSALW from "./pages/cs-alw"; //alonzos welding
import CSGCG from "./pages/cs-gcg"; //guths campground
import CSATD from "./pages/cs-atd"; //air today
import CSKCC from "./pages/cs-kcc"; //kids care connect
import CSCCF from "./pages/cs-ccf"; //crocker
import CSCSR from "./pages/cs-csr"; //clucas
import CSAIM from "./pages/cs-aim"; //all in movers

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
				<Route path="/work" element={<Work />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/contact" element={<Contact />} />

				<Route path="/cs-pdg" element={<CSPDG />} />
				<Route path="/cs-afd" element={<CSAFD />} />
				<Route path="/cs-flt" element={<CSFLT />} />
				<Route path="/cs-wgc" element={<CSWGC />} />
				<Route path="/cs-sth" element={<CSSTH />} />
				<Route path="/cs-fsm" element={<CSFSM />} />
				<Route path="/cs-elc" element={<CSELC />} />
				<Route path="/cs-blf" element={<CSBLF />} />
				<Route path="/cs-apd" element={<CSAPD />} />
				<Route path="/cs-dsc" element={<CSDSC />} />
				<Route path="/cs-ftp" element={<CSFTP />} />
				<Route path="/cs-hdc" element={<CSHDC />} />
				<Route path="/cs-hht" element={<CSHHT />} />
				<Route path="/cs-alw" element={<CSALW />} />
				<Route path="/cs-gcg" element={<CSGCG />} />
				<Route path="/cs-atd" element={<CSATD />} />
				<Route path="/cs-kcc" element={<CSKCC />} />
				<Route path="/cs-ccf" element={<CSCCF />} />
				<Route path="/cs-csr" element={<CSCSR />} />
				<Route path="/cs-aim" element={<CSAIM />} />

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
