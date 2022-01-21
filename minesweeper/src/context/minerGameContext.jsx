import { createContext, useState, useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import formatDate from "../helpers/formatDate";
import useToken from "../hooks/useToken";
import { options } from "../utils/constants";
import { strings } from "../utils/constants";

export const MinerGameContext = createContext();

export const useMinerGame = () => useContext(MinerGameContext);

export const MinerGameProvider = ({ children }) => {
  const [rows, setRows] = useState(
    sessionStorage.getItem("rows")
      ? parseInt(sessionStorage.getItem("rows"))
      : options[0].rows
  );
  const [cols, setCols] = useState(
    sessionStorage.getItem("cols")
      ? parseInt(sessionStorage.getItem("cols"))
      : options[0].cols
  );
  const [bombs, setBombs] = useState(
    sessionStorage.getItem("bombs")
      ? parseInt(sessionStorage.getItem("bombs"))
      : options[0].bombs
  );
  const [countFlag, setCountFlag] = useState(bombs + 1);
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [matchStatus, setMatchStatus] = useState(strings.lose);
  const [mode, setMode] = useState(
    sessionStorage.getItem("mode")
      ? sessionStorage.getItem("mode")
      : options[0].lbl
  );
  const [board, setBoard] = useState([]);
  const [history, setHistory] = useState({
    startTime: "",
    finishTime: "",
    mode,
    matchStatus,
  });
  const [listHistory, setListHistory] = useState(
    sessionStorage.getItem("listHistory")
      ? JSON.parse(sessionStorage.getItem("listHistory"))
      : []
  );
  const token = useToken();

  useEffect(() => {
    sessionStorage.setItem("rows", rows);
    sessionStorage.setItem("cols", cols);
    sessionStorage.setItem("bombs", bombs);
    sessionStorage.setItem("mode", mode);
    sessionStorage.setItem("listHistory", JSON.stringify(listHistory));
  }, [rows, cols, bombs, mode, listHistory]);

  const handleRows = (value) => {
    setRows(value);
  };
  const handleCols = (value) => {
    setCols(value);
  };
  const handleBombs = (value) => {
    setBombs(value);
  };
  const handleGame = (value) => {
    setGameOver(value);
  };
  const handleStartGame = (value) => {
    setStartGame(value);
    let obj = { ...history };
    obj.startTime = formatDate();
    setHistory(obj);
  };
  const handleHistory = () => {
    let obj = { ...history };
    obj.finishTime = formatDate();
    obj.mode = mode;
    obj.matchStatus = matchStatus;
    setListHistory([...listHistory, obj]);
  };
  const handleFlag = (value) => {
    setCountFlag(value);
  };
  const handleBoard = (value) => {
    setBoard(value);
  };
  const handleMatchStatus = (value) => {
    setMatchStatus(value);
  };
  const handleDif = ({ rows, cols, bombs, lbl }) => {
    setRows(rows);
    setCols(cols);
    setBombs(bombs);
    setCountFlag(bombs + 1);
    setMode(lbl);
  };

  return (
    <MinerGameContext.Provider
      value={{
        rows,
        cols,
        bombs,
        gameOver,
        countFlag,
        startGame,
        mode,
        listHistory,
        token,
        board,
        matchStatus,
        handleFlag,
        handleRows,
        handleCols,
        handleBombs,
        handleGame,
        handleHistory,
        handleStartGame,
        handleMatchStatus,
        handleDif,
        handleBoard,
      }}
    >
      {children}
    </MinerGameContext.Provider>
  );
};
