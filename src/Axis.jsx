import React from "react"
import Humanize from "humanize-plus"
import Line from "./Line.jsx"

class XTickLabel extends React.Component {

  render() {
    let rotation = `rotate(${this.props.tilt},${this.props.x},${this.props.y+this.props.size})`

    let printVal = String(this.props.value)
    if (printVal.length > 4) {
      printVal = Humanize.compactInteger(this.props.value,2)
    }

    return(
      <g>
        <text x={this.props.x} y={this.props.y+2*this.props.size} fontSize={this.props.size} transform={rotation} fill={this.props.color} textAnchor={"middle"}>
          {printVal}
        </text>
      </g>
    )
  }

}

class XStep extends React.Component {

  render() {
    let step = []

    if (this.props.xTicks == "on") {
      step.push(
        <Line key={"label"+this.props.x}
          x1={this.props.x} y1={this.props.y}
          x2={this.props.x} y2={this.props.y+this.props.length}
          stroke={this.props.color} />
      )
    }

    step.push(
      <XTickLabel key={"label"+this.props.x}
        x={this.props.x} y={this.props.y}
        value={this.props.value} size={15} tilt={0} color={this.props.color} />
    )

    return(
      <g>{step}</g>
    )
  }
}

class XAxis extends React.Component {

  render() {
    let xAxis = []

    if (this.props.xAxisLine) {
      xAxis.push(
        <Line key={"xline"} x1={this.props.x} y1={this.props.y+this.props.height}
          x2={this.props.x+this.props.width} y2={this.props.y+this.props.height}
          stroke={this.props.color} />
      )
    }

    if (this.props.xLabel != "off") {
      xAxis.push(
        <text key={"xlabel"}
          x={this.props.x+this.props.width/2} y={this.props.y+this.props.height+50}
          fontSize={18} fill={this.props.color}>
          {this.props.xLabel}
        </text>
      )
    }

    let xSpace = this.props.width / (this.props.xSteps - 1)
    for (var i=0; i < this.props.xSteps; i++) {
      let valueRatio = (this.props.maxX - this.props.minX) / (this.props.xSteps - 1)
      let xVal = this.props.minX + i * valueRatio
      xAxis.push(
        <XStep key={"xstep"+i} x={this.props.x+i*xSpace} y={this.props.y+this.props.height}
          value={xVal} length={10} xTicks={this.props.xTicks} color={this.props.color} />
      )
    }

    return(
      <g>{xAxis}</g>
    )
  }

}

class YTickLabel extends React.Component {

  render() {
    let printVal = this.props.value
    if (this.props.value >= 1) {
      printVal = Humanize.compactInteger(this.props.value,2)
    } else {
      printVal = this.props.value.toFixed(4)
    }

    return (
      <g>
        <text x={this.props.x} y={this.props.y+this.props.size/2} fontSize={this.props.size} fill={this.props.color} textAnchor={"end"}>
          {printVal}
        </text>
      </g>
    )
  }

}

class YStep extends React.Component {

  render() {
    let step = []

    if (this.props.yTicks == "on") {
      step.push(
        <Line key={"tick"+this.props.y}
          x1={this.props.x} y1={this.props.y}
          x2={this.props.x-this.props.length} y2={this.props.y}
          stroke={this.props.color} />
      )
    }

    step.push(
      <YTickLabel key={"label"+this.props.y} x={this.props.x-10} y={this.props.y} value={this.props.value} size={15} color={this.props.color} />
    )
    return(
      <g>{step}</g>
    )
  }

}

class YAxis extends React.Component {

  render() {
    let yAxis = []

    if (this.props.yAxisLine == "on") {
      yAxis.push(
        <Line key={"yline"} x1={this.props.x} y1={this.props.y}
          x2={this.props.x} y2={this.props.y+this.props.height}
          stroke={this.props.color} />
      )
    }

    if (this.props.yLabel != "off") {
      let rotation = "rotate(-90,10,"+String(this.props.y+this.props.height/2)+")"
      yAxis.push(
        <text key={"ylabel"}
          x={0} y={this.props.y+this.props.height/2+10}
          fontSize={18} transform={rotation} fill={this.props.color}>
          {this.props.yLabel}
        </text>
      )
    }

    let ySpace = this.props.height / (this.props.ySteps - 1)

    for (var i=0; i < this.props.ySteps; i++) {
      let tickPos = this.props.height+this.props.y-i*ySpace

      let yVal = 0
      if (this.props.scale == "log") {
        let valueRatio = (Math.log10(this.props.maxY) - Math.log10(this.props.minY)) / (this.props.ySteps - 1)
        let pow10 = Math.log10(this.props.minY) + i * valueRatio
        yVal = Math.pow(10, pow10)
      } else {
        yVal = this.props.minY + i*(this.props.maxY-this.props.minY)/(this.props.ySteps-1)
      }
      yAxis.push(
        <YStep key={"ystep"+i} x={this.props.x} y={tickPos}
          value={yVal} length={10} color={this.props.color} yTicks={this.props.yTicks} />
      )

      if (this.props.grid == "default") {
        if (i != 0) {
          yAxis.push(
            <Line key={"grid"+i} x1={this.props.x} y1={tickPos}
              x2={this.props.x+this.props.width} y2={tickPos}
              stroke={this.props.gridColor} strokeWidth={1} opacity={0.5} />
          )
        }
      }
    }

    return(
      <g>{yAxis}</g>
    )
  }

}

class Axis extends React.Component {

  render() {
    let axis = []

    axis.push(
      <XAxis key={"xaxis"} x={this.props.x} y={this.props.y}
        width={this.props.width} height={this.props.height}
        xLabel={this.props.xLabel} xTicks={this.props.xTicks} xSteps={this.props.xSteps}
        maxX={this.props.maxX} minX={this.props.minX} color={this.props.color}
        xAxisLine={this.props.xAxisLine} />
    )

    axis.push(
      <YAxis key={"yaxis"} x={this.props.x} y={this.props.y}
        width={this.props.width} height={this.props.height}
        yLabel={this.props.yLabel} ySteps={this.props.ySteps} yTicks={this.props.yTicks}
        maxY={this.props.maxY} minY={this.props.minY}
        scale={this.props.scale} grid={this.props.grid} gridColor={this.props.gridColor}
        color={this.props.color} yAxisLine={this.props.yAxisLine} />
    )

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
  color: "#000000",
  scale: "lin",
  grid: "default",
  gridColor: "#DDDDDD",
  xLabel: "off",
  yLabel: "off",
  xSteps: 5,
  xTicks: "off",
  xAxisLine: "on",
  ySteps: 5,
  yTicks: "off",
  yAxisLine: "off",
  maxX: 100,
  minX: 0,
  maxY: 100,
  minY: 0
}

export default Axis
