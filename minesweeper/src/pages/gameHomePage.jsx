import React from "react";
import { useMinerGame } from "../context/minerGameContext";
import Board from "../components/board";
import "./styles/gameHome.scss";
import Timer from "../components/timer";


const GameHomePage = () => {
  const { countFlag, mode } = useMinerGame();
  
  return (
    <>
      <div className="header">
        <h2 className="textHome">{"🚩" + countFlag} </h2>
        <h2 className="textHome">{mode} </h2>
        <Timer/>
      </div>
      <div className="board">
        <Board/>
      </div>
    </>
  );
};

export default GameHomePage;
