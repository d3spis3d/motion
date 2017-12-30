import React from 'react';
import { Motion, spring } from 'react-motion';
import './MotionBall.css';

export default class MotionBall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      open: false
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

  render() {
    const { dx, dy, type } = this.props;
    return (
      <div style={{transform: `translate3d(${dx}px, ${dy}px, 0)`}} className={`Motion${type}`} onClick={(e) => this.click(e)}>
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
