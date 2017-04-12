import React from "react"
import Humanize from "humanize-plus"
import Line from "./Line.jsx"

class XTickLabel extends React.Component {

  render() {
    console.log("rendering label")
    let x = this.props.x
    let y = this.props.y
    let value = this.props.value
    let size = this.props.size
    let tilt = this.props.tilt

    let rotation = "rotate("+String(tilt)+","+String(x)+","+String(y+size)+")"

    return(
      <g>
        <text x={x} y={y+2*size} fontSize={size} transform={rotation}>
          {value.toFixed(2)}
        </text>
      </g>
    )
  }

}

class XTick extends React.Component {

  render() {
    console.log("rendering tick")
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

    let xa = []
    xa.push(
      <Line x1={x} y1={y+height} x2={x+width} y2={y+height} />
    )
    xa.push(
      <text x={x+width/2} y={y+height+60} fontSize={10}>{xLabel}</text>
    )

    let xSpace = width / (xTicks - 1)
    for (var i=0; i < xTicks; i++) {
      let xVal = minX + i*xSpace*(maxX-minX)/width
      xa.push(
        <XTick x={x+i*xSpace} y={y+height} value={xVal} length={10} />
      )
    }

    return(
      <g>{xa}</g>
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
    let xLabel = this.props.xLabel
    let yLabel = this.props.yLabel
    let xTicks = this.props.xTicks
    let yTicks = this.props.yTicks
    let maxX = this.props.maxX
    let minX = this.props.minX
    let maxY = this.props.maxY
    let minY = this.props.minY

    let axis = []

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
      let xVal = minX + i*xSpace*(maxX-minX)/width
      let rotation = "rotate(45,"+String(x+i*xSpace)+","+String(y+height+10)+")"
      // let rotation = "rotate(-65)"
      xAxis.push(
        <text x={x+i*xSpace} y={y+height+20} fontSize={10} transform={rotation}>
          {xVal.toFixed(2)}
        </text>
      )
    }
    axis.push(xAxis)

    // axis.push(
    //   <XAxis />
    // )

    let yAxis = []
    yAxis.push(
      <Line x1={x} y1={y} x2={x} y2={y+height} />
    )
    let rot = "rotate(-90,10,"+String(y+height/2)+")"
    yAxis.push(
      <text x={10} y={y+height/2} fontSize={10} transform={rot}>{yLabel}</text>
    )
    let ySpace = height / (yTicks - 1)
    for (var j=0; j < yTicks; j++) {
      let tickPos = height+y-j*ySpace
      // tick
      yAxis.push(
        <Line x1={x} y1={tickPos} x2={x-10} y2={tickPos} />
      )
      // label
      let yVal = 0
      if (scale == "log") {
        yVal = Math.log10(minY) + j*ySpace*(Math.log10(maxY)-Math.log10(minY))/height
        yAxis.push(
          <text x={20} y={tickPos+5} fontSize={10}>
            {/* {"10^".concat(yVal.toFixed(2))} */}
            {"10^".concat(Humanize.compactInteger(yVal,3))}
          </text>
        )
      } else {
        yVal = minY + j*ySpace*(maxY-minY)/height
        yAxis.push(
          <text x={20} y={tickPos+5} fontSize={10} color={"rgb(0,0,0)"}>
            {/* {yVal} */}
            {Humanize.compactInteger(yVal,2)}
          </text>
        )
      }
      // gridline
      if (j != 0) {
        yAxis.push(
          <Line x1={x} y1={tickPos} x2={x+width} y2={tickPos} stroke={"rgb(225,225,225)"} />
        )
      }

    }
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
  scale: "default",
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
