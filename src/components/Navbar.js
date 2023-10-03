import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleFirstClick = () => {
    navigate("/");
  };

  const handleSecondClick = () => {
    navigate("/agent-productivity-report");
  };

  const handleThirdClick = () => {
    navigate("/add-user-data");
  };

  return (
    <div className="navbar-container">
      <div className="main-nav">
        <div className="sub-nav">
          <div className="first" onClick={handleFirstClick}>
            DDR Invoice E-mail
          </div>
          <div className="second" onClick={handleSecondClick}>
            Agent Productivity Report
          </div>
          <div className="third" onClick={handleThirdClick}>
            User Data
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
