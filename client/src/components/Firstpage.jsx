import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

function Firstpage() {
  return (
    <div className="first-page">
      <h1>Welcome to Movies Buff.♡</h1>
      <div className="back">
        <Link to="/movies" className="button-3d-hover">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Firstpage;
