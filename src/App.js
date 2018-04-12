import React, { Component } from 'react';
import './App.css';
import MotionBall from './MotionBall';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Ball'
    };
  }

  toggle() {
    const other = this.state.type === 'Ball' ? 'Heart' : 'Ball';
    this.setState({
      type: other
    });
  }

  render() {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    return (
      <div className="App">
        <div className="App__Header">Motion <span>{`${window.innerWidth} x ${window.innerHeight}`}</span></div>
        <div>
          <span>Toggle shape</span>
          <div class="App__Toggle" onClick={() => this.toggle()}></div>
        </div>
        <MotionBall dx={width} dy={height} type={this.state.type} />
      </div>
    );
  }
}

export default App;
