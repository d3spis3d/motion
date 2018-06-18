import React, { Component } from 'react';
import './App.css';
import MotionBall from './MotionBall';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0
    };
  }

  toggle() {
    let next = this.state.type + 1;
    if (next > 2) {
      next = 0;
    }
    this.setState({
      type: next
    });
  }

  render() {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    return (
      <div className="App">
        <div>
          <button className="App__Toggle" onClick={() => this.toggle()}>Toggle Shape</button>
        </div>
        <MotionBall dx={width} dy={height} type={this.state.type} />
      </div>
    );
  }
}

export default App;
