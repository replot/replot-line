import React from "react"
import Humanize from "humanize-plus"
import Line from "./Line.jsx"

const gridColor = "rgb(225,225,225)"

class XTickLabel extends React.Component {

  render() {
    let x = this.props.x
    let y = this.props.y
    let value = this.props.value
    let size = this.props.size
    let tilt = this.props.tilt

    let rotation = "rotate("+String(tilt)+","+String(x)+","+String(y+size)+")"

    let printVal = value
    if (value >= 10000) {
      printVal = Humanize.compactInteger(value,2)
    } else {
      printVal = value.toFixed(2)
    }

    return(
      <g>
        <text x={x} y={y+2*size} fontSize={size} transform={rotation}>
          {printVal}
        </text>
      </g>
    )
  }

}

class XTick extends React.Component {

  render() {
    let x = this.props.x
    let y = this.props.y
    let value = this.props.value
    let length = this.props.length

    return(
      <g>
        <Line x1={x} y1={y} x2={x} y2={y+length} />
        <XTickLabel x={x} y={y} value={value} size={10} tilt={45} />
      </g>
    )
  }

}

class XAxis extends React.Component {

  render() {
    let x = this.props.x
    let y = this.props.y
    let width = this.props.width
    let height = this.props.height
    let xLabel = this.props.xLabel
    let xTicks = this.props.xTicks
    let maxX = this.props.maxX
    let minX = this.props.minX

    let xAxis = []
    xAxis.push(
      <Line x1={x} y1={y+height} x2={x+width} y2={y+height} />
    )
    xAxis.push(
      <text x={x+width/2} y={y+height+60} fontSize={10}>{xLabel}</text>
    )

    let xSpace = width / (xTicks - 1)
    for (var i=0; i < xTicks; i++) {
      let valueRatio = (maxX - minX) / (xTicks - 1)
      let xVal = minX + i * valueRatio
      xAxis.push(
        <XTick x={x+i*xSpace} y={y+height} value={xVal} length={10} />
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
      printVal = value.toFixed(2)
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
    let x = this.props.x
    let y = this.props.y
    let value = this.props.value
    let length = this.props.length

    return(
      <g>
        <Line x1={x} y1={y} x2={x-length} y2={y} />
        <YTickLabel x={x-50} y={y} value={value} size={10} />
      </g>
    )
  }

}

class YAxis extends React.Component {

  render() {
    let x = this.props.x
    let y = this.props.y
    let width = this.props.width
    let height = this.props.height
    let yLabel = this.props.yLabel
    let yTicks = this.props.yTicks
    let maxY = this.props.maxY
    let minY = this.props.minY
    let scale = this.props.scale
    let grid = this.props.grid

    let yAxis = []
    yAxis.push(
      <Line x1={x} y1={y} x2={x} y2={y+height} />
    )
    let rotation = "rotate(-90,10,"+String(y+height/2)+")"
    yAxis.push(
      <text x={10} y={y+height/2} fontSize={10} transform={rotation}>
        {yLabel}
      </text>
    )

    let ySpace = height / (yTicks - 1)
    for (var i=0; i < yTicks; i++) {
      let tickPos = height+y-i*ySpace

      let yVal = 0
      if (scale == "log") {
        let valueRatio = (Math.log10(maxY) - Math.log10(minY)) / (yTicks - 1)
        let pow10 = Math.log10(minY) + i * valueRatio
        yVal = Math.pow(10, pow10)
      } else {
        yVal = minY + i*(maxY-minY)/(yTicks-1)
      }
      yAxis.push(
        <YTick x={x} y={tickPos} value={yVal} length={10} />
      )

      if (grid == "default") {
        if (i != 0) {
          yAxis.push(
            <Line x1={x} y1={tickPos} x2={x+width} y2={tickPos}
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
    let x = this.props.x
    let y = this.props.y
    let width = this.props.width
    let height = this.props.height
    let scale = this.props.scale
    let grid = this.props.grid
    let xLabel = this.props.xLabel
    let yLabel = this.props.yLabel
    let xTicks = this.props.xTicks
    let yTicks = this.props.yTicks
    let maxX = this.props.maxX
    let minX = this.props.minX
    let maxY = this.props.maxY
    let minY = this.props.minY

    let axis = []

    axis.push(
      <XAxis x={x} y={y} width={width} height={height}
        xLabel={xLabel} xTicks={xTicks}
        maxX={maxX} minX={minX} />
    )

    axis.push(
      <YAxis x={x} y={y} width={width} height={height}
        yLabel={yLabel} yTicks={yTicks}
        maxY={maxY} minY={minY}
        scale={scale} grid={grid}/>
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
