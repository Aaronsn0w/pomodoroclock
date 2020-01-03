import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      timeBreak: 5,
      timeSession: 25,
      play: false,
      minutes: 25,
      seconds: "00",
      text: "session",
      intval: null
    };
    this.timer = this.timer.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
  }

  timer() {
    const { play, intval } = this.state;
    this.setState({
      play: !play
    });

    if (play) {
      clearInterval(intval);
    } else {
      this.countDown();
    }
  }

  countDown = () => {
    let time = setInterval(() => {
      if (this.state.minutes == 0 && this.state.seconds == 0) {
        this.BeepPlay();
        if (this.state.text === "session") {
          this.setState({ text: "break" });
          setTimeout(
            this.setState(state => {
              if (this.state.timeBreak < 10) {
                return { minutes: "0" + state.timeBreak };
              } else {
                return { minutes: state.timeBreak };
              }
            }),
            1000
          );
        } else {
          this.setState({ text: "session" });
          setTimeout(
            this.setState(state => {
              if (state.timeSession < 10) {
                return { minutes: "0" + state.timeSession };
              } else {
                return { minutes: state.timeSession };
              }
            }),
            1000
          );
        }
      } else if (this.state.minutes != 0 && this.state.seconds == 0) {
        this.setState(state => {
          let min = state.minutes - 1;
          if (min < 10) {
            return {
              minutes: "0" + min,
              seconds: 59
            };
          } else {
            return {
              minutes: min,
              seconds: 59
            };
          }
        });
      } else if (this.state.minutes <= 10 && this.state.minutes != 0) {
        let min = this.state.minutes;
        min--;
        this.setState(state => ({ minutes: "0" + min }));
      } else if (this.state.seconds <= 10) {
        this.setState(state => ({ seconds: "0" + (state.seconds - 1) }));
      } else {
        this.setState(state => ({ seconds: state.seconds - 1 }));
      }
    }, 1000);
    this.setState({ intval: time });
  };

  BeepPlay(hr = false) {
    const BP = document.getElementById("beep");
    if (hr) {
      BP.pause();
      BP.currentTime = 0;
    } else {
      if (BP.currentTime === 0) {
        BP.currentTime = 0;
        BP.play();
      } else {
        BP.pause();
        BP.currentTime = 0;
      }
    }
  }

  handleReset() {
    this.setState({
      timeBreak: 5,
      timeSession: 25,
      minutes: 25,
      seconds: "00",
      play: false,
      pause: false,
      text: "session"
    });
    this.BeepPlay(true);
    clearInterval(this.state.intval);
  }

  incrementBreak() {
    if (this.state.timeBreak < 60) {
      var breakUp = this.state.timeBreak + 1;
      if (breakUp < 10) {
        if (this.state.text === "break") {
          this.setState({ timeBreak: breakUp, minutes: breakUp, seconds: "00" });
        } else {
          this.setState({ timeBreak: breakUp });
        }
      } else {
        if (this.state.text === "break") {
          this.setState({ timeBreak: breakUp, minutes: breakUp, seconds: "00" });
        } else {
          this.setState({ timeBreak: breakUp });
        }
      }
    }
  }

  decrementBreak() {
    if (this.state.timeBreak != "01") {
      var breakDown = this.state.timeBreak - 1;
      if (breakDown < 10) {
        if (this.state.text === "break") {
          this.setState({ timeBreak: breakDown, minutes: breakDown, seconds: "00" });
        } else {
          this.setState({ timeBreak: breakDown });
        }
      } else {
        if (this.state.text === "break") {
          this.setState({ timeBreak: breakDown, minutes: breakDown, seconds: "00" });
        } else {
          this.setState({ timeBreak: breakDown });
        }
      }
    }
  }

  incrementSession() {
    if (this.state.timeSession < 60) {
      var sessionUp = this.state.timeSession + 1;
      if (sessionUp < 10) {
        if (this.state.text === "session") {
          this.setState({
            timeSession: sessionUp,
            minutes: "0" + sessionUp,
            seconds: "00"
          });
        } else {
          this.setState({
            timeSession: sessionUp
          });
        }
      } else {
        if (this.state.text === "session") {
          this.setState({
            timeSession: sessionUp,
            minutes: sessionUp,
            seconds: "00"
          });
        } else {
          this.setState({
            timeSession: sessionUp
          });
        }
      }
    }
  }

  decrementSession() {
    if (this.state.timeSession != "01") {
      var sessionDown = this.state.timeSession - 1;
      if (sessionDown < 10) {
        if (this.state.text === "session") {
          this.setState({
            timeSession: sessionDown,
            minutes: "0" + sessionDown,
            seconds: "00"
          });
        } else {
          this.setState({
            timeSession: sessionDown
          });
        }
      } else {
        if (this.state.text === "session") {
          this.setState({
            timeSession: sessionDown,
            minutes: sessionDown,
            seconds: "00"
          });
        } else {
          this.setState({
            timeSession: sessionDown
          });
        }
      }
    }
  }

  render() {
    const { timeBreak, timeSession, minutes, seconds, play, text } = this.state;
    let styles = {};
    if (minutes > 0) {
      styles = { color: "white" };
    } else {
      styles = { color: "red" };
    }
    return (
      <div className="App">
        <div className="App-header">
          <h1>Pomodoro Clock</h1>
          <div className="area">
            {!play && (
              <div className="block bl-izq">
                <h4 id="break-label">Break Length</h4>
                <div className="d-f">
                  <div onClick={this.incrementBreak} id="break-increment" className="btn der">
                    +
                  </div>

                  <div id="break-length" className="btn">
                    {timeBreak}
                  </div>

                  <div onClick={this.decrementBreak} id="break-decrement" className="btn izq">
                    -
                  </div>
                </div>
              </div>
            )}

            {!play && (
              <div className="block bl-der">
                <h4 id="session-label">Session Length</h4>
                <div className="d-f">
                  <div onClick={this.incrementSession} id="session-increment" className="btn der">
                    +
                  </div>
                  <div id="session-length" className="btn">
                    {timeSession}
                  </div>
                  <div onClick={this.decrementSession} id="session-decrement" className="btn izq">
                    -
                  </div>
                </div>
              </div>
            )}
            <div className="timer-session" style={styles}>
              <div id="timer-label">{text}</div>
              <div id="time-left">{minutes + ":" + seconds}</div>
            </div>
            <audio src="https://goo.gl/65cBl1" id="beep" preload="auto" />
            <div className="button-panel">
              <div onClick={this.timer} id="start_stop">
                {play ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
              </div>
              <div style={{ margin: 10 }} />
              <div id="reset" onClick={this.handleReset}>
                <i className="fas fa-history"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
