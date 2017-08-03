import React from "react"
import PropTypes from "prop-types"
import MotionLine from "./MotionLine.jsx"
import Axis from "../../replot-core/src/Axis.jsx"
import Resize from "../../replot-core/src/Resize.jsx"


class LineSeries extends React.Component {

  render() {
    let lines = []
    if (this.props.initialAnimation){
      for (let i=0; i < this.props.numpoints-1; i++) {
        lines.push(
          <MotionLine key={"line"+i}
            x1={this.props.points[i][0]} y1={this.props.points[i][1]}
            x2={this.props.points[i+1][0]} y2={this.props.points[i+1][1]}
            xStart={this.props.points[0][0]} yStart={this.props.points[0][1]}
            stroke={this.props.color} strokeWidth={this.props.lineWidth}/>
        )
      }
    } else {
      for (let i=0; i < this.props.numpoints-1; i++) {
        lines.push(
          <line key={"line"+i}
            x1={this.props.points[i][0]} y1={this.props.points[i][1]}
            x2={this.props.points[i+1][0]} y2={this.props.points[i+1][1]}
            stroke={this.props.color} strokeWidth={this.props.lineWidth}/>
        )
      }
    }

    return(
      <g>{lines}</g>
    )
  }

}

class SeriesContainer extends React.Component {

  render() {
    let series = []
    let groups = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
    let unit
    if (this.props.yScale === "log") {
      unit = (this.props.height) / (Math.log10(this.props.max) - Math.log10(this.props.min))
    } else {
      unit = (this.props.height) / (this.props.max - this.props.min)
    }

    let xCoords = {}
    let x = 0
    for (let xVal of this.props.xVals){
      xCoords[xVal] = x
      x += this.props.width/(this.props.xVals.length-1)
    }


    for (let i = 0; i < groups.length; i++){
      let set = []
      let y

      for (let dataPoint of this.props.data){
        let coord = []
        if (dataPoint[this.props.groupKey] == groups[i]){
          if (this.props.yScale === "log"){
            if (dataPoint[this.props.yKey] === 0) {
              y = (Math.log10(this.props.max) - 0) * unit
            }
            else {
              y = (Math.log10(this.props.max)-Math.log10(dataPoint[this.props.yKey])) * unit
            }
          } else {
            y = (this.props.max-dataPoint[this.props.yKey]) * unit
          }
          coord.push(xCoords[dataPoint[this.props.xKey]])
          coord.push(y)
          set.push(coord)
        }
      }

      series.push(
        <LineSeries key={"series"+groups[i]} points={set}
          numpoints={set.length} color={this.props.color(i, groups[i])}
          lineWidth={this.props.style.lineWidth} initialAnimation={this.props.initialAnimation}/>
      )
    }

    return (
      <g>
        {series}
      </g>
    )
  }
}

class LineChart extends React.Component {

  getLegend(){
    let groups = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
    let legendValues = {}
    for (let i = 0; i < groups.length; i++) {
      legendValues[groups[i]] = this.colorLine(i, groups[i])
    }
    return legendValues
  }

  draw(xVals, min, max) {
    return (
      <Axis key="axis" width={this.props.width} height={this.props.height}
        graphTitle={this.props.graphTitle} xTitle={this.props.xTitle}
        yTitle={this.props.yTitle} showXAxisLine={this.props.showXAxisLine}
        showXLabels={this.props.showXLabels} showYAxisLine={this.props.showYAxisLine}
        showYLabels={this.props.showYLabels} showGrid={this.props.showGrid}
        axisStyle={this.props.axisStyle} minY={min} maxY={max}
        ySteps={this.props.ySteps} yScale={this.props.yScale}
        legendValues={this.getLegend()} legendStyle={this.props.legendStyle}
        legendMode={this.props.legendMode} showLegend={this.props.showLegend}
        labels={xVals} xAxisMode="discrete" xStart="origin">
        <SeriesContainer data={this.props.data} max={max} min={min} xVals={xVals}
          xKey={this.props.xKey} yKey={this.props.yKey} groupKey={this.props.groupKey}
          yScale={this.props.yScale} initialAnimation={this.props.initialAnimation}
          color={this.colorLine.bind(this)} style={this.props.graphStyle}/>
      </Axis>
    )
  }

  colorLine(i, group) {
    if (this.props.color instanceof Array) {
      return this.props.color[i%this.props.color.length]
    } else {
      return this.props.color(i, group)
    }
  }

  render() {
    let xVals = [...new Set(this.props.data.map(item => item[this.props.xKey]))]
    xVals = xVals.sort((a,b) => a-b)
    let yVals = this.props.data.map(item => item[this.props.yKey])

    let maxY = Math.max(...yVals)
    let minY
    if (this.props.yScale == "log"){
      minY = Math.min(...yVals.filter(Boolean))
    } else {
      minY = Math.min(...yVals)
    }

    let series = this.draw(xVals, minY, maxY)

    return(
      <svg width={this.props.width} height={this.props.height}>
        {series}
      </svg>
    )
  }

}

class LineChartResponsive extends React.Component {

  render() {
    return (
      <Resize width={this.props.width}>
        <LineChart {...this.props} />
      </Resize>
    )
  }
}

LineChart.defaultProps = {
  xKey: "x",
  yKey: "y",
  groupKey: "group",
  width: 800,
  height: 600,
  color: [
    "#fea9ac", "#fc858f", "#f46b72", "#de836e",
    "#caa56f", "#adcc6f", "#8ebc57", "#799b3f"
  ],
  showXAxisLine: true,
  showXLabels: true,
  showYAxisLine: true,
  showYLabels: true,
  showGrid: true,
  showLegend: true,
  yScale: "lin",
  graphStyle: {
    lineWidth: 2.5
  },
  axisStyle: {
    axisColor: "#000000",
    labelColor: "#000000",
    titleColor: "#000000",
    gridColor: "#DDDDDD",
    lineWidth: 2,
    lineOpacity: 1
  },
  legendStyle: {
    fontColor: "#000000",
    backgroundColor: "none",
    showBorder: false,
    borderColor: "#000000"
  },
  initialAnimation: true
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  xKey: PropTypes.string,
  yKey: PropTypes.string,
  groupKey: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  yScale: PropTypes.string,
  graphTitle: PropTypes.string,
  xTitle: PropTypes.string,
  yTitle: PropTypes.string,
  ySteps: PropTypes.number,
  showXAxisLine: PropTypes.bool,
  showXLabels: PropTypes.bool,
  showYAxisLine: PropTypes.bool,
  showYLabels: PropTypes.bool,
  showGrid: PropTypes.bool,
  showLegend: PropTypes.bool,
  graphStyle: PropTypes.object,
  axisStyle: PropTypes.object,
  legendStyle: PropTypes.object,
  initialAnimation: PropTypes.bool
}

LineChartResponsive.defaultProps = {
  width: 800
}

LineChartResponsive.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default LineChartResponsive
