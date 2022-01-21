import React from "react";
import { Link } from "react-router-dom";
import { useMinerGame } from "../context/minerGameContext";
import { mines } from "../utils/assets";
import { routes, strings } from "../utils/constants";
import "./styles/navbar.scss";

const NavBar = () => {
  const { startGame } = useMinerGame();
  return (
    <nav className="container-nav">
      <div className="container-title">
        <img src={mines} alt="" className="img" />
        <h1 className="title">{strings.minesSweeper}</h1>
      </div>
      <ul
        className="list_options"
        onClick={() => (startGame ? alert("Finished the game first") : null)}
      >
        {routes.map((e) => (
          <Link key={e.lbl} to={startGame ? "/" : e.url} className="links">
            <li>{e.lbl}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
