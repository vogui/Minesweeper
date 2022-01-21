import React from "react";
import { strings } from "../utils/constants";
import "./styles/gameOver.scss";

const GameOverModal = ({ restartGame }) => {
  return (
    <div className="container-modal">
      <h2>{strings.loseGame}</h2>
      <button className="btn-reset" onClick={() => restartGame()}>
        {strings.tryAgain}
      </button>
    </div>
  );
};

export default GameOverModal;
