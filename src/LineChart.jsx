import React from "react"
import Line from "./Line.jsx"
import Axis from "./Axis.jsx"
import Color from "./Color.js"
import ColorPalette from "./ColorPalette.js"

// const defPalette = [
//   "#4cab92",
//   "#ca0004",
//   "#003953",
//   "#eccc00",
//   "#9dbd5f",
//   "#0097bf",
//   "#005c7a",
//   "#fc6000"
// ]
const defPalette = new ColorPalette(new Color(76,171,146), new Color(252,96,0), 8)

class LineSeries extends React.Component {

  render() {
    let lines = []
    for (var i=0; i < this.props.numpoints-1; i++) {
      lines.push(
        <Line x1={this.props.points[i][0]} y1={this.props.points[i][1]}
          x2={this.props.points[i+1][0]} y2={this.props.points[i+1][1]}
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
    let titleKey = this.props.titleKey
    let xKey = this.props.xKey
    let yKey = this.props.yKey
    let scale = this.props.scale

    let xvals = data.map(function(d) {return parseFloat(d[xKey])})
    let yvals = data.map(function(d) {return parseFloat(d[yKey])})
    let maxX = Math.max.apply(Math, xvals)
    let minX = Math.min.apply(Math, xvals)
    let maxY = Math.max.apply(Math, yvals)
    let minY = Math.min.apply(Math, yvals)

    let width = this.props.width
    let height = this.props.height
    let buffer = 75

    let chartWidth = width - 2*buffer
    let chartHeight = height - 2*buffer
    let chartX = buffer
    let chartY = buffer

    let color = this.props.color
    let palette = color.palette

    let sets = []
    let setTitles = []
    for (let member of data) {
      let key = setTitles.indexOf(member[titleKey])

      let modX = 0
      let modY = 0
      if (scale == "log") {
        modX = (parseFloat(member[xKey])-minX) * chartWidth / (maxX-minX) + chartX
        modY = chartHeight - (Math.log10(parseFloat(member[yKey]))-Math.log10(minY)) * (chartHeight) / (Math.log10(maxY)-Math.log10(minY)) + chartY
      } else {
        modX = (parseFloat(member[xKey])-minX) * chartWidth / (maxX-minX) + chartX
        modY = chartHeight - (parseFloat(member[yKey])-minY) * (chartHeight) / (maxY-minY) + chartY
      }

      if (key != -1) {
        sets[key].push([modX, modY])
      } else {
        setTitles.push(member[titleKey])
        sets.push([[modX, modY]])
      }
    }

    let series = []
    let numsets = setTitles.length
    for (var i=0; i < numsets; i++) {
      sets[i].sort(function(a, b) {
        return a[0] - b[0]
      })

      series.push(
        <LineSeries points={sets[i]} numpoints={sets[i].length} color={palette[i%palette.length].rgb()} />
      )
    }

    series.push(
      <Axis x={chartX} y={chartY} width={chartWidth} height={chartHeight}
        scale={scale} xLabel={xKey} yLabel={yKey}
        xTicks={7} yTicks={Math.round((chartHeight)/50)+1}
        maxX={maxX} minX={minX} maxY={maxY} minY={minY} />
    )

    return(
      <svg width={width} height={height}>
        {series}
      </svg>
    )
  }

}

LineChart.defaultProps = {
  width: 800,
  height: 600,
  scale: "default",
  color: defPalette
}

export default LineChart
