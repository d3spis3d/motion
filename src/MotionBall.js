import React from 'react';
import { Motion, spring } from 'react-motion';
import './MotionBall.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default class MotionBall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      open: false,
      color: this.genRandomColor()
    };
  }

  generateValues() {
    const max = 300;
    const min = -300;
    const dx = Math.random() * (max - min) + min;
    const dy = Math.random() * (max - min) + min;
    return { dx, dy };
  }

  click(e) {
    e.stopPropagation();
    if (this.state.open) {
      this.removeChildren();
    } else {
      this.createChildren();
    }
  }

  createChildren() {
    const children = [1, 2, 3, 4, 5].map(() => {
      return this.generateValues();
    });
    this.setState({
      children,
      open: true
    });
  }

  removeChildren() {
    this.setState({
      open: false
    });
  }

  rest(i) {
    if (!this.state.open) {
      this.setState({
        children: []
      });
    }
  }

  genRandomColor() {
    const ran = getRandomInt(0, 17);
    const colors = {
      0: 'green',
      1: 'red',
      2: 'blue',
      3: 'pink',
      4: 'purple',
      5: 'yellow',
      6: 'orange',
      7: 'skin',
      8: 'mustard',
      9: 'brown',
      10: 'black',
      11: 'light-green',
      12: 'aqua',
      13: 'orange-red',
      14: 'light-blue',
      15: 'magenta',
      16: 'dark-aqua',
      17: 'light-purple'
    }
    return colors[ran];
  }

  calcClassName(type) {
    const types = {
      0: 'Ball',
      1: 'Heart',
      2: 'Rainbow'
    }

    if (type === 2) {
      return `MotionRainbow MotionRainbow-${this.state.color}`;
    }

    return `Motion${types[type]}`;
  }

  render() {
    const { dx, dy, type } = this.props;
    return (
      <div style={{transform: `translate3d(${dx}px, ${dy}px, 0)`}} className={this.calcClassName(type)} onClick={(e) => this.click(e)}>
        { this.state.children.map((c, i) => (
          <Motion key={i}
            defaultStyle={{cdx: 0, cdy: 0}}
            style={{
              cdx: spring(this.state.open ? c.dx : 0, {stiffness: 60, damping: 5}),
              cdy: spring(this.state.open ? c.dy: 0, {stiffness: 60, damping: 5})
            }}
            onRest={() => this.rest(i)}>
            {({ cdx, cdy }) =>
              <MotionBall dx={cdx} dy={cdy} type={type} />
            }
          </Motion>
        ))}
      </div>
    );
  }
}
