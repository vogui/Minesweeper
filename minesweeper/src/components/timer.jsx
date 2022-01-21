import React, { useState, useEffect, useCallback } from "react";
import { useMinerGame } from "../context/minerGameContext";
import './styles/time.scss'

const Timer = ()=> {
  const [time, setTime] = useState(sessionStorage.getItem('time')?parseInt(sessionStorage.getItem('time')):0);
  const { startGame, gameOver  } = useMinerGame();
  
  const incrementTime = useCallback(() => {
    setTimeout(() => {
      let newTime = time + 1;
      setTime(newTime);
      sessionStorage.setItem('time',time)
    }, 1000);
  },[time])

  useEffect(() => {
    if((startGame|| JSON.parse(sessionStorage.getItem('startGame')))  && !gameOver ){
      incrementTime();
    }
    if(gameOver){
      clearTimeout(incrementTime)
      setTime(0)
    }
  }, [startGame, incrementTime, gameOver]);


  return (
    <div className="container-time" >
      <span className="reloj" role="img" aria-label="clock" >
        ⏰
      </span>
      <p className="timer">{time}</p>
    </div>
  );
}

export default Timer