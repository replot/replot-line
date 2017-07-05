import React from "react"
import PropTypes from "prop-types"
import MotionLine from "./MotionLine.jsx"
import Axis from "./Axis.jsx"
import Legend from "./Legend.jsx"


const defPalette = ["#4cab92", "#ca0004", "#8e44ad", "#eccc00", "#9dbd5f", "#0097bf", "#005c7a", "#fc6000"]

class LineSeries extends React.Component {

  render() {
    let lines = []
    for (var i=0; i < this.props.numpoints-1; i++) {
      lines.push(
        <MotionLine key={"line"+i}
          x1={this.props.points[i][0]} y1={this.props.points[i][1]}
          x2={this.props.points[i+1][0]} y2={this.props.points[i+1][1]}
          xStart={this.props.points[0][0]} yStart={this.props.points[0][1]}
          stroke={this.props.color} />
      )
    }

    return(
      <g>{lines}</g>
    )
  }

}

class LineChart extends React.Component {

  render() {
    let data = JSON.parse(JSON.stringify(this.props.data))
    let xKey = this.props.xKey
    let yKey = this.props.yKey
    let xvals = data.map(function(d) {return parseFloat(d[xKey])})
    let yvals = data.map(function(d) {return parseFloat(d[yKey])})

    let maxX = Math.max.apply(Math, xvals)
    let minX = Math.min.apply(Math, xvals)
    let maxY = Math.max.apply(Math, yvals)
    let minY = Math.min.apply(Math, yvals)

    let buffer = 80

    let chartWidth = this.props.width - 2*buffer
    let chartHeight = this.props.height - 2*buffer - 30
    let chartX = buffer + 10
    let chartY = buffer

    let series = []

    let xl = this.props.xLabel
    if (xl != "off") {
      xl = this.props.xKey
    }
    let yl = this.props.yLabel
    if (yl != "off") {
      yl = this.props.yKey
    }
    series.push(
      <Axis key={"axis"} x={chartX} y={chartY} width={chartWidth} height={chartHeight}
        color={this.props.axisColor} scale={this.props.scale} grid={this.props.grid}
        xLabel={xl} yLabel={yl}
        xSteps={this.props.xSteps} xTicks={this.props.xTicks} xAxisLine={this.props.xAxisLine}
        yTicks={this.props.yTicks} ySteps={Math.round((chartHeight)/50)+1} yAxisLine={this.props.yAxisLine}
        maxX={maxX} minX={minX} maxY={maxY} minY={minY} />
    )

    let sets = []
    let setTitles = []
    for (let member of data) {
      let key = setTitles.indexOf(member[this.props.titleKey])

      let widthRatio = (parseFloat(member[this.props.xKey])-minX) / (maxX-minX)
      let modX = widthRatio*chartWidth + chartX

      let heightRatio = 0
      if (this.props.scale == "log") {
        let logDiff = (Math.log10(parseFloat(member[this.props.yKey]))-Math.log10(minY))
        heightRatio = logDiff / (Math.log10(maxY)-Math.log10(minY))
      } else {
        heightRatio = (parseFloat(member[this.props.yKey])-minY) / (maxY-minY)
      }
      let modY = chartHeight - heightRatio*chartHeight + chartY

      if (key != -1) {
        sets[key].push([modX, modY])
      } else {
        setTitles.push(member[this.props.titleKey])
        sets.push([[modX, modY]])
      }
    }

    let numsets = setTitles.length
    for (var i=0; i < numsets; i++) {
      sets[i].sort(function(a, b) {
        return a[0] - b[0]
      })
      series.push(
        <LineSeries key={"series"+i} points={sets[i]} numpoints={sets[i].length}
          color={this.props.color[i%this.props.color.length]} />
      )
    }

    if (this.props.legend == "default") {
      series.push(
        <Legend key={"legend"} x={chartX} y={chartY+chartHeight+buffer} width={chartWidth}
          titles={setTitles} color={this.props.color} legendColor={this.props.legendColor} />
      )
    }

    return(
      <svg width={this.props.width} height={this.props.height}>
        {series}
      </svg>
    )
  }

}

LineChart.defaultProps = {
  width: 800,
  height: 600,
  scale: "default",
  xSteps: 4,
  xTicks: "off",
  xAxisLine: "on",
  xLabel: "off",
  ySteps: 7,
  yTicks: "off",
  yAxisLine: "off",
  yLabel: "off",
  grid: "default",
  legend: "default",
  legendColor: "#000000",
  color: defPalette,
  axisColor: "#000000"
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  scale: PropTypes.string,
  xSteps: PropTypes.number,
  xTicks: PropTypes.string,
  xAxisLine: PropTypes.string,
  xLabel: PropTypes.string,
  ySteps: PropTypes.number,
  yTicks: PropTypes.string,
  yAxisLine: PropTypes.string,
  yLabel: PropTypes.string,
  grid: PropTypes.string,
  legend: PropTypes.string,
  legendColor: PropTypes.string,
  color: PropTypes.array,
  axisColor: PropTypes.string
}

export default LineChart
