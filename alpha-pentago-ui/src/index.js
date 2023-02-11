import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Circle(props) {
  let relativeIdx = props.i;
  if (props.startIdx !== 0) {
    relativeIdx -= props.startIdx;
  }

  const coordLookup = {
    0: [50, 250],
    1: [150, 250],
    2: [250, 250],
    6: [50, 150],
    7: [150, 150],
    8: [250, 150],
    12: [50, 50],
    13: [150, 50],
    14: [250, 50],
  };
  const [cx, cy] = coordLookup[relativeIdx];

  return (
    <circle
      fill={props.color}
      cx={cx}
      cy={cy}
      r="30"
      onClick={props.onClick}
    ></circle>
  );
}

class Quad extends React.Component {
  renderCircle(i, startIdx) {
    return (
      <Circle
        color={this.props.circles[i]}
        i={i}
        startIdx={startIdx}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const startIdxLookup = {
      1: 0,
      2: 3,
      3: 18,
      4: 21,
    };
    const startIdx = startIdxLookup[this.props.idx];

    const coordLookup = {
      1: [50, 351],
      2: [351, 351],
      3: [50, 50],
      4: [351, 50],
    };
    const [x, y] = coordLookup[this.props.idx];

    const circleIndicies = [
      startIdx,
      startIdx + 1,
      startIdx + 2,
      startIdx + 6,
      startIdx + 7,
      startIdx + 8,
      startIdx + 12,
      startIdx + 13,
      startIdx + 14,
    ];

    return (
      <svg className="quad" x={x} y={y} width="300" height="300">
        <rect rx="20" ry="20" width="300" height="300" fill="darkred"></rect>
        {this.renderCircle(circleIndicies[0], startIdx)}
        {this.renderCircle(circleIndicies[1], startIdx)}
        {this.renderCircle(circleIndicies[2], startIdx)}
        {this.renderCircle(circleIndicies[3], startIdx)}
        {this.renderCircle(circleIndicies[4], startIdx)}
        {this.renderCircle(circleIndicies[5], startIdx)}
        {this.renderCircle(circleIndicies[6], startIdx)}
        {this.renderCircle(circleIndicies[7], startIdx)}
        {this.renderCircle(circleIndicies[8], startIdx)}
      </svg>
    );
  }
}

/**
 * 30 31 32 33 34 35
 * 24 25 26 27 28 29
 * 18 19 20 21 22 23
 * 12 13 14 15 16 17
 * 06 07 08 09 10 11
 * 00 01 02 03 04 05
 *
 * 3 4
 * 1 2
 */

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: Array(36).fill("crimson"),
      blackToMove: false,
    };
  }

  handleClick(i) {
    if (this.state.circles[i] !== "crimson") {
      return;
    }

    const circles = this.state.circles.slice();
    circles[i] = this.state.blackToMove ? "black" : "white";

    this.setState({
      circles: circles,
      blackToMove: !this.state.blackToMove,
    });
  }

  renderQuad(idx) {
    return (
      <Quad
        idx={idx}
        circles={this.state.circles}
        onClick={(i) => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <svg className="board" width="700" height="700">
        {this.renderQuad(1)}
        {this.renderQuad(2)}
        {this.renderQuad(3)}
        {this.renderQuad(4)}
      </svg>
    );
  }
}
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
