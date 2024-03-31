import "./App.css";
import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Notes from "./components/Notes/Notes";

const Graph = React.lazy(() => import("./components/Graph/Graph"));
const Table = React.lazy(() => import("./components/Table/Table"));

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`/API_DATA.json`)
      .then((result) => setData(Object.values(result.data)));
  }, []);

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route
              exact
              path="/graph"
              Component={() => <Graph data={data} />}
            />
            <Route
              exact
              path="/table"
              Component={() => <Table data={data} />}
            />
            <Route exact path="/notes" Component={Notes} />
          </Routes>
        </Suspense>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
