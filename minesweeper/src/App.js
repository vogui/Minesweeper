import { Route, Switch } from "react-router-dom";
//import NavBar from "../navBar/NavBar";
import GameHistoryPage from "./pages/gamHistoryPage";
import GameHomePage from "./pages/gameHomePage";
import GameSetUpPage from "./pages/gameSetUpPage";
import NavBar from "./components/navBar";
import './App.scss'
import { useEffect } from "react";
import { useMinerGame } from "./context/minerGameContext";

function App() {
  const{ token }=useMinerGame()

  useEffect(()=>{ sessionStorage.setItem('token', token) },[token])

  return (
    <div className="container">
      <NavBar/>
      <Switch>
        <Route exact path="/" component={GameHomePage} />
        <Route path="/history" component={GameHistoryPage} />
        <Route path="/setUp" component={GameSetUpPage} />
      </Switch>
    </div>
  );
}

export default App;
