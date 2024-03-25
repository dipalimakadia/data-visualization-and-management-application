import React from "react";
import heroImage from '../../heroImage.jpeg';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      id="home"
      className="flex-grow-1 container d-flex justify-content-center align-items-center col-xxl-8 px-4 py-5"
    >
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src={heroImage}
            className="d-block mx-lg-auto img-fluid"
            alt="Data Visualization"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Data Visualization & Management
          </h1>
          <p className="lead">
            The application allows you to visualize data in the form of graphs
            and tables, along with providing features for data manipulation and
            comparison.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Link
              to="/graph"
              type="button"
              className="btn btn-primary btn-visualize btn-lg px-4 me-md-2"
            >
              Visualize
            </Link>
            <Link
              to="/table"
              type="button"
              className="btn btn-outline-secondary btn-manage btn-lg px-4 me-md-2"
            >
              Table
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
