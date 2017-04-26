import React from "react"
import Line from "./Line.jsx"

class Legend extends React.Component {

  render() {
    let palette = this.props.color.palette
    let segment = this.props.width / this.props.titles.length

    let legend = []
    for (var i=0; i < this.props.titles.length; i++) {
      legend.push(
        <Line x1={this.props.x+i*segment} y1={this.props.y}
          x2={this.props.x+i*segment+50} y2={this.props.y}
          stroke={palette[i%palette.length].rgb()} />
      )
      legend.push(
        <text x={this.props.x+i*segment+55} y={this.props.y+5} fontSize={10}>{this.props.titles[i]}</text>
      )
    }

    return(
      <g>{legend}</g>
    )
  }

}

export default Legend
