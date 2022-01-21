export const routes = [
  { lbl: "Home", url: "/" },
  { lbl: "SetUp", url: "/setUp" },
  { lbl: "History", url: "/history" },
];
export const options = [
  { lbl: "Easy", rows: 5, cols: 10, bombs: 10 },
  { lbl: "Medium", rows: 10, cols: 15, bombs: 30 },
  { lbl: "Hard", rows: 20, cols: 25, bombs: 80 },
];
export const lblHistory = ["StartTime", "FinishTime", "Mode", "Status"];

export const strings = {
  lose:"Lose",
  win:"Win",
  minesSweeper: "MineSweeper",
  tryAgain: "Try Again",
  playAgain: "Play Again",
  startGame: "Start game",
  finishGame: "Finish Game",
  notHistorys: "Not history found",
  congratulations: "Congratulations you win",
  loseGame: "You lose the game"
};
