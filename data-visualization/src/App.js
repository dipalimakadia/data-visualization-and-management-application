import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Graph from "./components/Graph/Graph";
import Table from "./components/Table/Table";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100" >
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/graph" Component={Graph} />
          <Route exact path="/table" Component={Table} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
