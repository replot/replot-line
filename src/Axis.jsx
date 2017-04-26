import React from "react"
import Humanize from "humanize-plus"
import Line from "./Line.jsx"

const gridColor = "rgb(225,225,225)"

class XTickLabel extends React.Component {

  render() {
    let rotation = `rotate(${this.props.tilt},${this.props.x},${this.props.y+this.props.size})`

    return(
      <g>
        <text x={this.props.x} y={this.props.y+2*this.props.size} fontSize={this.props.size} transform={rotation}>
          {this.props.value.toFixed(2)}
        </text>
      </g>
    )
  }

}

class XTick extends React.Component {

  render() {
    return(
      <g>
        <Line x1={this.props.x} y1={this.props.y} x2={this.props.x} y2={this.props.y+this.props.length} />
        <XTickLabel x={this.props.x} y={this.props.y} value={this.props.value} size={10} tilt={45} />
      </g>
    )
  }

}

class XAxis extends React.Component {

  render() {
    let xAxis = []
    xAxis.push(
      <Line x1={this.props.x} y1={this.props.y+this.props.height}
        x2={this.props.x+this.props.width} y2={this.props.y+this.props.height} />
    )
    xAxis.push(
      <text x={this.props.x+this.props.width/2} y={this.props.y+this.props.height+60} fontSize={10}>
        {this.props.xLabel}
      </text>
    )

    let xSpace = this.props.width / (this.props.xTicks - 1)
    for (var i=0; i < this.props.xTicks; i++) {
      let valueRatio = (this.props.maxX - this.props.minX) / (this.props.xTicks - 1)
      let xVal = this.props.minX + i * valueRatio
      xAxis.push(
        <XTick x={this.props.x+i*xSpace} y={this.props.y+this.props.height} value={xVal} length={10} />
      )
    }

    return(
      <g>{xAxis}</g>
    )
  }

}

class YTickLabel extends React.Component {

  render() {
    let x = this.props.x
    let y = this.props.y
    let value = this.props.value
    let size = this.props.size

    let printVal = value
    if (value >= 1) {
      printVal = Humanize.compactInteger(value,2)
    } else {
      printVal = value.toFixed(4)
    }

    return (
      <g>
        <text x={x} y={y+size/2} fontSize={size}>
          {printVal}
        </text>
      </g>
    )
  }

}

class YTick extends React.Component {

  render() {
    return(
      <g>
        <Line x1={this.props.x} y1={this.props.y}
          x2={this.props.x-this.props.length} y2={this.props.y} />
        <YTickLabel x={this.props.x-50} y={this.props.y} value={this.props.value} size={10} />
      </g>
    )
  }

}

class YAxis extends React.Component {

  render() {
    let yAxis = []
    yAxis.push(
      <Line x1={this.props.x} y1={this.props.y}
        x2={this.props.x} y2={this.props.y+this.props.height} />
    )
    let rotation = "rotate(-90,10,"+String(this.props.y+this.props.height/2)+")"
    yAxis.push(
      <text x={10} y={this.props.y+this.props.height/2} fontSize={10} transform={rotation}>
        {this.props.yLabel}
      </text>
    )

    let ySpace = this.props.height / (this.props.yTicks - 1)
    for (var i=0; i < this.props.yTicks; i++) {
      let tickPos = this.props.height+this.props.y-i*ySpace

      let yVal = 0
      if (this.props.scale == "log") {
        let valueRatio = (Math.log10(this.props.maxY) - Math.log10(this.props.minY)) / (this.props.yTicks - 1)
        let pow10 = Math.log10(this.props.minY) + i * valueRatio
        yVal = Math.pow(10, pow10)
      } else {
        yVal = this.props.minY + i*(this.props.maxY-this.props.minY)/(this.props.yTicks-1)
      }
      yAxis.push(
        <YTick x={this.props.x} y={tickPos} value={yVal} length={10} />
      )

      if (this.props.grid == "default") {
        if (i != 0) {
          yAxis.push(
            <Line x1={this.props.x} y1={tickPos}
              x2={this.props.x+this.props.width} y2={tickPos}
              stroke={gridColor} />
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
      <XAxis x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}
        xLabel={this.props.xLabel} xTicks={this.props.xTicks}
        maxX={this.props.maxX} minX={this.props.minX} />
    )

    axis.push(
      <YAxis x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height}
        yLabel={this.props.yLabel} yTicks={this.props.yTicks}
        maxY={this.props.maxY} minY={this.props.minY}
        scale={this.props.scale} grid={this.props.grid}/>
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
  scale: "default",
  grid: "default",
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
