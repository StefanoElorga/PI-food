import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="landing">
      <div className="bienvenido">
        Bienvenido!
        <br />
        <Link to="home" className="link">
          <button className="button-home">
            <span>Entra :D</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
