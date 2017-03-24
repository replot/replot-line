import React from "react"
//import isLight from "./isLight.js"
import {spring, Motion} from "react-motion"

const palette = [
  "#4cab92",
  "#ca0004",
  "#003953",
  "#eccc00",
  "#9dbd5f",
  "#0097bf",
  "#005c7a",
  "#fc6000"
]


class Line extends React.Component {

  render() {
    return(
      <Motion
        defaultStyle={{
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
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
                stroke={this.props.stroke} />
            </g>
        }
      </Motion>
    )
  }

}

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
    let width = this.props.width
    let height = this.props.height
    let buffer = 75
    let data = JSON.parse(JSON.stringify(this.props.data))
    let titleKey = this.props.titleKey
    let xKey = this.props.xKey
    let yKey = this.props.yKey
    let xvals = data.map(function(d) {return parseFloat(d[xKey])})
    let yvals = data.map(function(d) {return parseFloat(d[yKey])})
    let maxX = Math.max.apply(Math, xvals)
    let minX = Math.min.apply(Math, xvals)
    let maxY = Math.max.apply(Math, yvals)
    let minY = Math.min.apply(Math, yvals)

    let chartWidth = width - 2*buffer
    let chartHeight = height - 2*buffer
    let chartX = buffer
    let chartY = buffer

    let sets = []
    let setTitles = []
    for (let member of data) {
      let key = setTitles.indexOf(member[titleKey])

      if (key != -1) {
        sets[key].push([parseFloat(member[xKey]), parseFloat(member[yKey])])
      } else {
        setTitles.push(member[titleKey])
        sets.push([[parseFloat(member[xKey]), parseFloat(member[yKey])]])
      }
    }

    let series = []
    let numsets = setTitles.length
    for (var i=0; i < numsets; i++) {
      sets[i].sort(function(a, b) {
        return a[0] - b[0]
      })

      // extend lines on left
      if (sets[i][0][0] > minX) {
        let slope = (sets[i][1][1] - sets[i][0][1])/(sets[i][1][0] - sets[i][0][0])
        let newY = sets[i][0][1] - slope * (sets[i][0][0] - minX)
        sets[i].splice(0,0,[minX, newY])
        if (newY > maxY) {
          maxY = newY
        } else if (newY < minY) {
          minY = newY
        }
      }

      // extend lines on right
      let last = sets[i].length - 1
      if (sets[i][last][0] < maxX) {
        let slope = (sets[i][last][1] - sets[i][last-1][1])/(sets[i][last][0] - sets[i][last-1][0])
        let newY = sets[i][last][1] + slope * (maxX - sets[i][last][0])
        sets[i].push([maxX, newY])
        if (newY > maxY) {
          maxY = newY
        } else if (newY < minY) {
          minY = newY
        }
      }

      for (let member of sets[i]) {
        member[0] = (parseFloat(member[0])-minX) * (chartWidth) / (maxX-minX) + chartX
        member[1] = (chartHeight) - (parseFloat(member[1])-minY) * (chartHeight) / (maxY-minY) + chartY
      }

      series.push(
        <LineSeries points={sets[i]} numpoints={sets[i].length} color={palette[i%palette.length]} />
      )
    }

    // x-axis
    series.push(
      <Line x1={chartX} y1={chartY+chartHeight}
        x2={chartX+chartWidth} y2={chartY+chartHeight}
        stroke={"rgb(0,0,0)"} />

    )
    let xTicks = Math.round((width-buffer)/50) + 1
    if (xTicks < 5) {
      xTicks = 5
    }
    let xSpace = (chartWidth) / (xTicks-1)
    for (var j=0; j < xTicks; j++) {
      series.push(
        <Line x1={chartX+j*xSpace} y1={chartY+chartHeight}
          x2={chartX+j*xSpace} y2={chartY+chartHeight+buffer*0.2}
          stroke={"rgb(0,0,0)"} />
      )
      series.push(
        <text x={chartX+j*xSpace} y={chartY+chartHeight+buffer*0.2} fontSize={10} style={{"writing-mode": "tb"}}>
        {(minX + j*xSpace*(maxX-minX)/(chartWidth)).toFixed(2)}
      </text>
      )
    }
    series.push(
      <text x={width/2} y={height-10} fontSize={10} style={{"text-align": "center"}}>
        {xKey}
      </text>
    )

    // y-axis
    series.push(
      <Line x1={chartX} y1={chartY+chartHeight}
        x2={chartX} y2={chartY}
        stroke={"rgb(0,0,0)"} />
    )
    let yTicks = Math.round((chartHeight)/50) + 1
    if (yTicks < 5) {
      yTicks = 5
    }
    let ySpace = (chartHeight) / (yTicks-1)
    for (var k=0; k < yTicks; k++) {
      series.push(
        <Line x1={chartX} y1={chartHeight+chartY-k*ySpace}
          x2={chartX-buffer*0.2} y2={chartHeight+chartY-k*ySpace}
          stroke={"rgb(0,0,0)"} />
      )
      series.push(
        <text x={20} y={chartHeight+chartY-k*ySpace+5} fontSize={10}>
        {(minY + k*ySpace*(maxY-minY)/(chartHeight)).toFixed(2)}
       </text>
     )
    }
    series.push(
      <text x={10} y={height/2} fontSize={10} style={{"writing-mode": "tb"}}>
        {yKey}
      </text>
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
}

export default LineChart
