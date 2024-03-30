import React from "react";
const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand " href="/" >Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                    <div className="d-flex">
                        <a href="/graph" type="button" className="btn btn-primary me-md-2">Graph</a>
                        <a href="/table" type="button" className="btn btn-outline-secondary me-md-2">Table</a>
                        <a href="/notes" type="button" className="btn btn-dark me-md-2">Notes</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;