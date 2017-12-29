import React, { Component } from 'react';
import './App.css';
import MotionBall from './MotionBall';

class App extends Component {
  render() {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    return (
      <div className="App">
        <MotionBall dx={width} dy={height} />
      </div>
    );
  }
}

export default App;
