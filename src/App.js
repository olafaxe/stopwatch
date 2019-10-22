import React, { Component } from "react";
import "./App.scss";
import Content from "./components/Content/Content";
import Time from "./components/Time/Time";
import Button from "./components/Button/Button";
import Split from "./components/Split/Split";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: true,
      running: false,
      reset: true,
      centi: 0,
      deci: 0,
      min: 0,
      split1: false,
      split2: false,
      split3: false
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
        timerStart: Date.now() - this.state.centi
      });
      this.timerID = setInterval(
        () =>
          this.tick(
            this.state.running ? this.state.centi : this.state.timerStart
          ),
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

  tick(start) {
    console.log(Math.floor((Date.now() - start) / 1000) % 60);
    if (this.state.deci >= 59) {
      this.setState({
        min: this.state.min + 1,
        deci: 0,
        centi: 0
      });
    } else if (this.state.centi >= 99) {
      this.setState({
        deci: this.state.deci + 1,
        centi: 0
      });
    } else {
      this.setState({
        centi: Math.floor((Date.now() - start) / 10) % 100
      });
    }
  }

  splitTime() {
    if (!this.state.split1) {
      this.setState({
        split1: `${
          this.state.min <= 9 ? "0" + this.state.min : this.state.min4
        }:${this.state.deci <= 9 ? "0" + this.state.deci : this.state.deci}:${
          this.state.centi <= 9 ? "0" + this.state.centi : this.state.centi
        }`
      });
    } else if (!this.state.split2) {
      this.setState({
        split2: `${
          this.state.min <= 9 ? "0" + this.state.min : this.state.min4
        }:${this.state.deci <= 9 ? "0" + this.state.deci : this.state.deci}:${
          this.state.centi <= 9 ? "0" + this.state.centi : this.state.centi
        }`
      });
    } else if (!this.state.split3) {
      this.setState({
        split3: `${
          this.state.min <= 9 ? "0" + this.state.min : this.state.min4
        }:${this.state.deci <= 9 ? "0" + this.state.deci : this.state.deci}:${
          this.state.centi <= 9 ? "0" + this.state.centi : this.state.centi
        }`
      });
    }
  }

  resetTime() {
    this.setState({
      text: "Start",
      running: false,
      centi: 0,
      deci: 0,
      min: 0,
      split1: false,
      split2: false,
      split3: false
    });
  }

  render() {
    return (
      <div className="App">
        <Content>
          <Time
            centi={
              this.state.centi >= 100
                ? "99"
                : this.state.centi <= 9
                ? "0" + this.state.centi
                : this.state.centi
            }
            deci={
              this.state.deci <= 9 ? "0" + this.state.deci : this.state.deci
            }
            min={this.state.min <= 9 ? "0" + this.state.min : this.state.min}
          ></Time>
          <Button
            click={this.clickHandle}
            text={this.state.text ? "Start" : "Stop"}
          ></Button>
          <Button
            click={this.resetHandle}
            text={this.state.reset ? "RESET" : "SPLIT"}
          ></Button>
          <Split
            split={this.state.split1 ? this.state.split1 : " --:--:--"}
          ></Split>
          <Split
            split={this.state.split2 ? this.state.split2 : " --:--:--"}
          ></Split>
          <Split
            split={this.state.split3 ? this.state.split3 : " --:--:--"}
          ></Split>
        </Content>
      </div>
    );
  }
}

export default App;
