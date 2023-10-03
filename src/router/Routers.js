import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import FirstXls from "../components/FirstXls";
import SecondXls from "../components/SecondXls";
import ThirdPage from "../components/ThirdPage";

const Routers = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div className="App-main">
          <Routes>
            <Route path="/" element={<FirstXls />} />
            <Route path="/agent-productivity-report" element={<SecondXls />} />
            <Route path="/add-user-data" element={<ThirdPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default Routers;
