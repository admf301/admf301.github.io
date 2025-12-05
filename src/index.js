import React from "react";
import ReactDOM from "react-dom/client";
import "./app.css"; // this pulls in global.css + components.css
import App from "./App";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);