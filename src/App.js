import React, { useState } from "react";
import "./App.css";

function App() {
  const [timeBreak, setTimeBreak] = useState(5);
  const [timeSession, setTimeSesion] = useState(25);

  function handleReset(){
    setTimeBreak(5)
    setTimeSesion(25)
  }
  function incrementBreak(){
    if(timeBreak <60)
    setTimeBreak(timeBreak +1)
  }
  
  function decrementBreak(){
    if(timeBreak != 1)
    setTimeBreak(timeBreak -1)
  }

  function incrementSession(){
    if(timeSession <60)
    setTimeSesion(timeSession + 1)
  }
  
  function decrementSession(){
    if(timeSession != 1)
    setTimeSesion(timeSession - 1)
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Pomodoro Clock</h1>
        <div className="area">  

        <div className="block bl-izq">
          <h3 id="break-label">Break Length</h3>
          <div className="d-f">
            <div onClick={incrementBreak} id="break-increment" className="btn der">
              +
            </div>
            <div id="break-length" className="btn">
              {timeBreak}
            </div>
            <div onClick={decrementBreak} id="break-decrement" className="btn izq">
              -
            </div>
          </div>
        </div>

        <div className="block bl-der">
          <h3 id="session-label">Session Length</h3>
          <div className="d-f">
            <div onClick={incrementSession} id="session-increment" className="btn der">
              +
            </div>
            <div id="session-length" className="btn">
              {timeSession}
            </div>
            <div onClick={decrementSession} id="session-decrement" className="btn izq">
              -
            </div>
          </div>
        </div>
          <div className="timer-session">

          <h3 id="timer-label">Session</h3>
          <div id="time-left">25 : 00</div>
          </div>

          <div className="button-panel">
          <div id="start_stop">
          <i className="fas fa-play"></i>
          <i className="fas fa-pause"></i>
          <hr/>
          <div id="reset" onClick={handleReset}>
          <i className="fas fa-history"></i>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
