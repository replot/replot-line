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

class MotionPoint extends React.Component {

  render() {
    return(
      <Motion
        defaultStyle={{
          x: this.props.xStart,
          y: this.props.yStart
        }}
        style={{
          x: spring(this.props.x, {stiffness: 120, damping: 26}),
          y: spring(this.props.y, {stiffness: 120, damping: 26})
        }}
      >
        {
          interpolatingStyles =>
            <g>
              <circle
                cx={interpolatingStyles.x}
                cy={interpolatingStyles.y}
                r={this.props.radius}
                fill={this.props.fill}
                opacity={this.props.opacity}
                onMouseOver={this.props.activateTooltip.bind(this, this.props.pointData, this.props.lineData)}
                onMouseOut={this.props.deactivateTooltip}/>
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
  strokeWidth: 2.25,
  opacity: 1
}

MotionPoint.defaultProps = {
  x: 0,
  y: 0,
  r: 1,
  fill: "rgb(0,0,0)",
  opacity: 1
}

export {MotionPoint, MotionLine}
