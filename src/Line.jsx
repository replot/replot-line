import React from "react"

class Line extends React.Component {

  render() {
    return(
      <g>
        <line
          x1={this.props.x1}
          y1={this.props.y1}
          x2={this.props.x2}
          y2={this.props.y2}
          stroke={this.props.stroke}
          strokeWidth={this.props.strokeWidth}
          opacity={this.props.opacity} />
      </g>
    )
  }

}

Line.defaultProps = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  stroke: "rgb(0,0,0)",
  strokeWidth: 2,
  opacity: 1
}

export default Line
