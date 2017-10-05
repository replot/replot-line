import React from "react"
import PropTypes from "prop-types"
import {MotionPoint, MotionLine} from "./MotionComp.jsx"
import {Axis, Resize, Tooltip} from "replot-core"


class LineSeries extends React.Component {

  render() {
    let lines = []
    let data = this.props.points.map(point => point.raw)
    if (this.props.initialAnimation){
      for (let i=0; i < this.props.numpoints-1; i++) {
        lines.push(
          <MotionLine key={"line"+i}
            x1={this.props.points[i].x} y1={this.props.points[i].y}
            x2={this.props.points[i+1].x} y2={this.props.points[i+1].y}
            xStart={this.props.points[0].x} yStart={this.props.points[0].y}
            stroke={this.props.color} strokeWidth={this.props.lineWidth}/>
        )
        lines.push(
          <MotionPoint key={"point"+i}
            xStart={this.props.points[0].x} yStart={this.props.points[0].y}
            x={this.props.points[i].x} y={this.props.points[i].y}
            radius={this.props.pointWidth} fill={this.props.color}
            pointData={this.props.points[i].raw} lineData={data}
            activateTooltip={this.props.activateTooltip}
            deactivateTooltip={this.props.deactivateTooltip}/>
        )
      }
      lines.push(
        <MotionPoint key={"point" + (this.props.numpoints-1)}
          xStart={this.props.points[0].x} yStart={this.props.points[0].y}
          x={this.props.points[this.props.numpoints-1].x}
          y={this.props.points[this.props.numpoints-1].y}
          radius={this.props.pointWidth} fill={this.props.color}
          pointData={this.props.points[this.props.numpoints-1].raw} lineData={data}
          activateTooltip={this.props.activateTooltip}
          deactivateTooltip={this.props.deactivateTooltip}/>
      )
    } else {
      for (let i=0; i < this.props.numpoints-1; i++) {
        lines.push(
          <line key={"line"+i}
            x1={this.props.points[i].x} y1={this.props.points[i].y}
            x2={this.props.points[i+1].x} y2={this.props.points[i+1].y}
            stroke={this.props.color} strokeWidth={this.props.lineWidth}/>
        )
        lines.push(
          <circle key={"point"+i}
            cx={this.props.points[i].x} cy={this.props.points[i].y}
            r={this.props.pointWidth} fill={this.props.color}
            onMouseOver={this.props.activateTooltip.bind(this, this.props.points[i].raw, data)}
            onMouseOut={this.props.deactivateTooltip}/>
        )
      }
      lines.push(
        <circle key={"point" + (this.props.numpoints-1)}
          cx={this.props.points[this.props.numpoints-1].x}
          cy={this.props.points[this.props.numpoints-1].y}
          r={this.props.pointWidth} fill={this.props.color}
          onMouseOver={this.props.activateTooltip.bind(this, this.props.points[this.props.numpoints-1].raw, data)}
          onMouseOut={this.props.deactivateTooltip}/>
      )
    }

    if (this.props.shadeArea) {
      let pointsString = "0," + String(this.props.height) + " "
      for (let i=0; i < this.props.numpoints; i++) {
        pointsString = pointsString.concat(
          String(this.props.points[i].x), ",",
          String(this.props.points[i].y), " ")
      }
      pointsString = pointsString.concat(
        String(this.props.width), ",",
        String(this.props.height))
      lines.push(
        <polygon
          points={pointsString}
          style={{
            fill: this.props.color,
            opacity: 0.2,
            stroke: this.props.color,
            zIndex: -1
          }}
        />
      )
    }

    return(
      <g>{lines}</g>
    )
  }

}

class SeriesContainer extends React.Component {

  render() {
    let series = []
    let groups
    if (this.props.groupKey) {
      groups = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
    }
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

    let set = []
    let y
    let coord = {}

    if (this.props.groupKey) {
      for (let i = 0; i < groups.length; i++){
        set = []

        for (let dataPoint of this.props.data){
          coord = {}
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
            coord.x = xCoords[dataPoint[this.props.xKey]]
            coord.y = y
            coord.raw = dataPoint
            set.push(coord)
          }
        }

        series.push(
          <LineSeries key={"series"+groups[i]} points={set}
            shadeArea={this.props.shadeArea}
            width={this.props.width}
            height={this.props.height}
            numpoints={set.length} color={this.props.color(i, groups[i])}
            lineWidth={this.props.style.lineWidth}
            pointWidth={this.props.style.pointWidth}
            initialAnimation={this.props.initialAnimation}
            activateTooltip={this.props.activateTooltip}
            deactivateTooltip={this.props.deactivateTooltip}/>
        )
      }
    } else {
      for (let dataPoint of this.props.data) {
        coord = {}

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
        coord.x = xCoords[dataPoint[this.props.xKey]]
        coord.y = y
        coord.raw = dataPoint
        set.push(coord)
      }
      series.push(
        <LineSeries key={"seriesAll"} points={set}
          shadeArea={this.props.shadeArea}
          numpoints={set.length} color={this.props.color(0)}
          lineWidth={this.props.style.lineWidth}
          pointWidth={this.props.style.pointWidth}
          initialAnimation={this.props.initialAnimation}
          activateTooltip={this.props.activateTooltip}
          deactivateTooltip={this.props.deactivateTooltip}/>
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

  constructor(){
    super()
    this.state = {
      tooltipContents: null,
      mouseOver: false,
      mouseX: null,
      mouseY: null
    }
  }

  activateTooltip(pointData, lineData) {
    let newContents
    if (this.props.tooltipContents){
      newContents = this.props.tooltipContents(pointData, lineData)
    }
    else {
      newContents = (
        <div>
          <span>{this.props.xKey}: {pointData[this.props.xKey]}<br/></span>
          <span>{this.props.yKey}: {pointData[this.props.yKey]}<br/></span>
          {this.props.groupKey &&
          <span>{this.props.groupKey}: {pointData[this.props.groupKey]}<br/></span>
          }
        </div>
      )
    }
    this.setState({
      tooltipContents: newContents,
      mouseOver: true,
    })
  }

  deactivateTooltip() {
    this.setState({
      mouseOver: false
    })
  }

  updateMousePos(e) {
    this.setState({
      mouseX: e.pageX,
      mouseY: e.pageY - 10
    })
  }

  getLegend(){
    let groups = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
    let legendValues = {}
    for (let i = 0; i < groups.length; i++) {
      legendValues[groups[i]] = this.colorLine(i, groups[i])
    }
    return legendValues
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

    let graph

    graph = (
      <Axis key="axis" width={this.props.width} height={this.props.height}
        graphTitle={this.props.graphTitle} xTitle={this.props.xTitle}
        yTitle={this.props.yTitle} showXAxisLine={this.props.showXAxisLine}
        showXLabels={this.props.showXLabels} showYAxisLine={this.props.showYAxisLine}
        showYLabels={this.props.showYLabels} showGrid={this.props.showGrid}
        axisStyle={this.props.axisStyle} minY={minY} maxY={maxY}
        ySteps={this.props.ySteps} yScale={this.props.yScale}
        legendValues={this.props.groupKey ? this.getLegend() : null} legendStyle={this.props.legendStyle}
        legendMode={this.props.legendMode} showLegend={this.props.showLegend}
        labels={xVals} xAxisMode="discrete" xStart="origin">
        <SeriesContainer data={this.props.data} max={maxY} min={minY} xVals={xVals}
          xKey={this.props.xKey} yKey={this.props.yKey} groupKey={this.props.groupKey}
          yScale={this.props.yScale} initialAnimation={this.props.initialAnimation}
          color={this.colorLine.bind(this)} style={this.props.graphStyle}
          shadeArea={this.props.shadeArea}
          activateTooltip={this.activateTooltip.bind(this)}
          deactivateTooltip={this.deactivateTooltip.bind(this)}/>
      </Axis>
    )

    return(
      <div onMouseMove={this.props.tooltip ? this.updateMousePos.bind(this) : null}>
        {this.props.tooltip &&
          <Tooltip
            x={this.state.mouseX} y={this.state.mouseY}
            active={this.state.mouseOver}
            contents={this.state.tooltipContents}
            colorScheme={this.props.tooltipColor}
          />
        }
        <svg width={this.props.width} height={this.props.height}>
          {graph}
        </svg>
      </div>
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
  shadeArea: false,
  showGrid: true,
  showLegend: true,
  yScale: "lin",
  graphStyle: {
    lineWidth: 2.5,
    pointWidth: 5
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
  initialAnimation: true,
  tooltip: true
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
  shadeArea: PropTypes.bool,
  showGrid: PropTypes.bool,
  showLegend: PropTypes.bool,
  graphStyle: PropTypes.object,
  axisStyle: PropTypes.object,
  legendStyle: PropTypes.object,
  initialAnimation: PropTypes.bool,
  tooltip: PropTypes.bool,
  tooltipColor: PropTypes.string,
  tooltipContents: PropTypes.func
}

LineChartResponsive.defaultProps = {
  width: 800
}

LineChartResponsive.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default LineChartResponsive
