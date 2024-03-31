import React from "react";
import heroImage from "../../assest/heroImage.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      id="home"
      className="homePage flex-grow-1 container-fluid d-flex justify-content-center align-items-center px-4 py-5"
    >
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className=" col-sm-12 col-lg-6">
          <img
            src={heroImage}
            className="d-block mx-lg-auto img-fluid animate-ping"
            alt="Data Visualization"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
        <div className="col-sm-12 col-lg-6">
          <h1 className="font-500 mb-3">Data Visualization & Management</h1>
          <p className="font-color-greyish lead font-300">
            The application allows you to visualize data in the form of graphs
            and tables, along with providing features for data Manipulation and
            comparison.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Link
              to="/graph"
              type="button"
              className="url_link bg-greenish btn-lg px-4 "
            >
              Graph
            </Link>
            <Link
              to="/table"
              type="button"
              className="url_link bg-reddish btn-lg px-4 "
            >
              Table
            </Link>
            <Link
              to="/notes"
              type="button"
              className="url_link bg-purpleish btn-lg px-4 "
            >
              Notes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
