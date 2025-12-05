import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";

const Notfound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Adam Filice</title>
      </Helmet>

      <div className="page-container">
        <NavBar />

        <div className="content-wrapper">
          <main className="notfound-main">
            <h1>404</h1>
            <p>Couldn&apos;t find that page.</p>
            <Link to="/" className="notfound-link">
              Go back home
            </Link>
          </main>

          <div className="page-footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notfound;
