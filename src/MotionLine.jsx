import React from "react"
import {spring, Motion} from "react-motion"

class MotionLine extends React.Component {

  render() {
    return(
      <Motion
        defaultStyle={{
          x1: this.props.xStart,
          y1: this.props.yStart,
          x2: this.props.xStart,
          y2: this.props.yStart,
        }}
        style={{
          x1: spring(this.props.x1, {stiffness: 120, damping: 26}),
          y1: spring(this.props.y1, {stiffness: 120, damping: 26}),
          x2: spring(this.props.x2, {stiffness: 120, damping: 26}),
          y2: spring(this.props.y2, {stiffness: 120, damping: 26}),
        }}
      >
        {
          interpolatingStyles =>
            <g>
              <line
                x1={interpolatingStyles.x1}
                y1={interpolatingStyles.y1}
                x2={interpolatingStyles.x2}
                y2={interpolatingStyles.y2}
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                opacity={this.props.opacity} />
            </g>
        }
      </Motion>
    )
  }

}

MotionLine.defaultProps = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  stroke: "rgb(0,0,0)",
  strokeWidth: 2,
  opacity: 1
}

export default MotionLine
