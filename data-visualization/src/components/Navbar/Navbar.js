import React from "react";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-pureBlack font-color-greyLight">
      <div className="container-fluid">
        <a className="navbar-brand text-light pr-6 url_link" href="/">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="links d-flex">
            <a href="/graph" className=" url_link px-3 me-md-2">
              Graph
            </a>
            <a href="/table" className="url_link px-3 me-md-2">
              Table
            </a>
            <a href="/notes" className=" url_link  px-3 me-md-2">
              Notes
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
