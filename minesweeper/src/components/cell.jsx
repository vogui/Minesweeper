import "./styles/cell.scss";
import Mines from "./mines";
import { useMinerGame } from "../context/minerGameContext";
import { useEffect } from "react";

const Cell = ({ info, flagHandle, cellHandle }) => {
  const { mode, startGame } = useMinerGame();
  useEffect(() => {}, [startGame]);
  return (
    <div
      onClick={() => {
        if (!info.flagged) {
          cellHandle(info.x, info.y);
        }
      }}
      onContextMenu={(e) => flagHandle(e, info.x, info.y)}
      className={info.revealed ? `cell-0 ${mode}` : `cell-1 ${mode}`}
    >
      {!info.revealed && info.flagged && startGame ? (
        "🚩"
      ) : info.revealed && info.value !== 0 ? (
        info.value === "X" ? (
          <Mines mode={mode} />
        ) : (
          info.value
        )
      ) : (
        ""
      )}
    </div>
  );
};
export default Cell;
