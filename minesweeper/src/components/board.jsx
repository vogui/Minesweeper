import Cell from "./cell";
import { useCallback, useEffect, useState } from "react";
import { useMinerGame } from "../context/minerGameContext";
import { revealed } from "../helpers/revealed";
import GameOverModal from "./gameOverModal";
import createBoard from "../helpers/createBoard";
import { strings } from "../utils/constants";
import WinOverModal from "./winGameModal";
import "./styles/board.scss";

const Board = () => {
  const {
    matchStatus,
    gameOver,
    handleMatchStatus,
    handleHistory,
    handleGame,
    handleFlag,
    handleStartGame,
    startGame,
    countFlag,
    rows,
    cols,
    bombs,
  } = useMinerGame();
  const [grid, setGrid] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [board, setBoard] = useState([]);

  const freshBoard = useCallback(() => {
    let newBoard;
    if (!sessionStorage.board) {
      newBoard = createBoard(rows, cols, bombs);
      setBoard(newBoard);
    } else {
      newBoard = JSON.parse(sessionStorage.board);
    }
    setNonMineCount(rows * cols - bombs);
    setMineLocations(newBoard.mineLocation);
    setGrid(newBoard.board);
  }, [rows, cols, bombs]);

  useEffect(() => {
    if (startGame) {
      board.board = grid;
      board.mineLocation = mineLocations;
      sessionStorage.setItem("board", JSON.stringify(board));
      sessionStorage.setItem("startGame", startGame);
    }
    if (gameOver) {
      sessionStorage.removeItem("board");
      sessionStorage.removeItem("startGame", startGame);
    }
  }, [gameOver, startGame, board, grid, mineLocations]);

  useEffect(() => {
    freshBoard();
  }, [freshBoard]);

  const flagHandle = (e, r, c) => {
    if (startGame) {
      e.preventDefault();
      let newGrid = JSON.parse(JSON.stringify(grid));
      newGrid[r][c].flagged = !newGrid[r][c].flagged;
      newGrid[r][c].flagged
        ? handleFlag(countFlag - 1)
        : handleFlag(countFlag + 1);
      setGrid(newGrid);
    }
  };

  const restartGame = (reset = false) => {
    if (reset) {
      sessionStorage.removeItem("board");
    }
    freshBoard();
    handleGame(false);
    handleHistory();
    handleStartGame(false);
    sessionStorage.removeItem("startGame");
    grid.newNonMinesCount === 0
      ? handleMatchStatus(strings.win)
      : handleMatchStatus(strings.lose);
  };

  const cellHandle = (r, c) => {
    if (
      grid[r][c].revealed ||
      gameOver ||
      (!startGame && !sessionStorage.getItem("startGame"))
    ) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[r][c].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
      handleGame(true);
    } else {
      let newRevealedBoard = revealed(newGrid, r, c, nonMineCount);
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        handleGame(true);
        handleMatchStatus(strings.win);
      }
    }
  };

  return (
    <>
      {gameOver && <GameOverModal restartGame={restartGame} />}
      {matchStatus === strings.win && (
        <WinOverModal restartGame={restartGame} />
      )}
      {grid.map((rows, ix) => {
        return (
          <>
            <div key={ix} className="container-board">
              {rows.map((block, i) => (
                <Cell
                  key={i}
                  info={block}
                  flagHandle={flagHandle}
                  cellHandle={cellHandle}
                />
              ))}
            </div>
          </>
        );
      })}
      <div className="container-btn">
        <button
          disabled={
            JSON.parse(sessionStorage.getItem("startGame")) || startGame
          }
          className="btn"
          onClick={() => handleStartGame(true)}
        >
          {strings.startGame}
        </button>
        {sessionStorage.getItem("startGame") || startGame ? (
          <button className="btn" onClick={() => restartGame(true)}>
            {strings.finishGame}
          </button>
        ) : null}
      </div>
    </>
  );
};
export default Board;
