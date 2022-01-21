import React from "react";
import { strings } from "../utils/constants";
import "./styles/winGame.scss";

const WinOverModal = ({ restartGame }) => {
  return (
    <div className="container-win-modal">
      <h2>{strings.congratulations}</h2>
      <button className="btn-win-reset" onClick={() => restartGame()}>
        {strings.playAgain}
      </button>
    </div>
  );
};

export default WinOverModal;
