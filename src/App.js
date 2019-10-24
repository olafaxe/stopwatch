import React, { Component } from "react";
import "./App.scss";
import Content from "./components/Content/Content";
import Time from "./components/Time/Time";
import Button from "./components/Button/Button";
import Split from "./components/Split/Split";
import SplitContainer from "./components/Split/SplitContainer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: true,
      running: false,
      reset: true,
      time: 0,
      ms: 0,
      ss: 0,
      mm: 0,
      splitAll: ["-:-:-", "-:-:-", "-:-:-"]
    };

    this.clickHandle = this.clickHandle.bind(this);
    this.resetHandle = this.resetHandle.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  clickHandle() {
    if (this.state.running) {
      clearInterval(this.timerID);
      this.timerID = false;
      this.setState({
        running: false,
        reset: true
      });
    } else {
      this.setState({
        timerStart: Date.now() - this.state.time
      });
      this.timerID = setInterval(
        () => {
          this.setState({
            time: Date.now() - this.state.timerStart,
            ms: Math.floor(this.state.time / 10) % 100,
            ss: Math.floor(this.state.time / 1000) % 60,
            mm: Math.floor(this.state.time / 60000) % 60
          });
        },

        10
      );
      this.setState({
        running: true,
        reset: false
      });
    }
    this.setState(state => ({
      text: !state.text
    }));
  }

  resetHandle() {
    !this.state.reset ? this.splitTime() : this.resetTime();
  }

  splitTime() {
    if (this.state.splitAll.length >= 3) {
      let newTemp = this.state.splitAll.splice(2, 3);
      this.setState({
        splitAll: [newTemp, ...this.state.splitAll]
      });
    }
    const tempTime = `${
      this.state.mm <= 9 ? "0" + this.state.mm : this.state.min4
    }:${this.state.ss <= 9 ? "0" + this.state.ss : this.state.ss}:${
      this.state.ms <= 9 ? "0" + this.state.ms : this.state.ms
    }`;
    this.setState({ splitAll: [tempTime, ...this.state.splitAll] });
  }

  resetTime() {
    this.setState({
      text: "Start",
      running: false,
      time: 0,
      ms: 0,
      ss: 0,
      mm: 0,
      splitAll: ["-:-:-", "-:-:-", "-:-:-"]
    });
  }

  render() {
    let splits = (
      <>
        {this.state.splitAll.map(split => {
          return (
            <>
              <Split key={split.toString()} split={split}></Split>
            </>
          );
        })}
      </>
    );
    return (
      <div className="App">
        <Content>
          <Time
            ms={
              this.state.ms >= 100
                ? "99"
                : this.state.ms <= 9
                ? "0" + this.state.ms
                : this.state.ms
            }
            ss={this.state.ss <= 9 ? "0" + this.state.ss : this.state.ss}
            mm={this.state.mm <= 9 ? "0" + this.state.mm : this.state.mm}
          ></Time>
          <Button
            click={this.clickHandle}
            text={this.state.text ? "Start" : "Stop"}
          ></Button>
          <Button
            click={this.resetHandle}
            text={this.state.reset ? "RESET" : "SPLIT"}
          ></Button>
          <SplitContainer>{splits}</SplitContainer>
        </Content>
      </div>
    );
  }
}

export default App;
