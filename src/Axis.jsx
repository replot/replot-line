import React from "react"
import Line from "./Line.jsx"

class Axis extends React.Component {

  render() {
    let x = this.props.x
    let y = this.props.y
    let width = this.props.width
    let height = this.props.height
    let xLabel = this.props.xLabel
    let yLabel = this.props.yLabel
    let xTicks = this.props.xTicks
    let yTicks = this.props.yTicks
    let maxX = this.props.maxX
    let minX = this.props.minX
    let maxY = this.props.maxY
    let minY = this.props.minY

    let xAxis = []
    xAxis.push(
      <Line x1={x} y1={y+height} x2={x+width} y2={y+height} />
    )
    xAxis.push(
      <text x={x+width/2} y={y+height+60} fontSize={10}>{xLabel}</text>
    )
    let xSpace = width / (xTicks - 1)
    for (var i=0; i < xTicks; i++) {
      xAxis.push(
        <Line x1={x+i*xSpace} y1={y+height} x2={x+i*xSpace} y2={y+height+10} />
      )
      xAxis.push(
        <text x={x+i*xSpace} y={y+height+10} fontSize={10} style={{"writing-mode": "tb"}}>
          {(minX + i*xSpace*(maxX-minX)/width).toFixed(2)}
        </text>
      )
    }

    let yAxis = []
    yAxis.push(
      <Line x1={x} y1={y} x2={x} y2={y+height} />
    )
    yAxis.push(
      <text x={10} y={y+height/2} fontSize={10} style={{"writing-mode": "tb"}}>{yLabel}</text>
    )
    let ySpace = height / (yTicks - 1)
    for (var j=0; j< yTicks; j++) {
      yAxis.push(
        <Line x1={x} y1={height+y-j*ySpace} x2={x-10} y2={height+y-j*ySpace} />
      )
      yAxis.push(
        <text x={20} y={height+y-j*ySpace+5} fontSize={10}>
          {(minY + j*ySpace*(maxY-minY)/height).toFixed(2)}
        </text>
      )
    }

    let axis = []
    axis.push(xAxis)
    axis.push(yAxis)

    return(
      <g>{axis}</g>
    )
  }

}

Axis.defaultProps = {
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  xLabel: "x-axis",
  yLabel: "y-axis",
  xTicks: 5,
  yTicks: 5,
  maxX: 100,
  minX: 0,
  maxY: 100,
  minY: 0
}

export default Axis
