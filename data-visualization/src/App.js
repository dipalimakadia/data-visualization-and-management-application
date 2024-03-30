import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Notes from "./components/Notes/Notes"
const Graph = React.lazy(() => import("./components/Graph/Graph"));
const Table = React.lazy(() => import("./components/Table/Table"));


function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/graph" Component={Graph} />
            <Route exact path="/table" Component={Table} />
            <Route exact path="/notes" Component={Notes} />
          </Routes>
        </Suspense>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
