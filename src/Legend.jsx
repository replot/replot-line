import React from "react"
import Line from "./Line.jsx"

class Legend extends React.Component {

  render() {
    let x = this.props.x
    let y = this.props.y
    let width = this.props.width
    let titles = this.props.titles
    let color = this.props.color
    let palette = color.palette

    let segment = width / titles.length

    let legend = []
    for (var i=0; i < titles.length; i++) {
      legend.push(
        <Line x1={x+i*segment} y1={y} x2={x+i*segment+50} y2={y}
          stroke={palette[i%palette.length].rgb()} />
      )
      legend.push(
        <text x={x+i*segment+55} y={y+5} fontSize={10}>{titles[i]}</text>
      )
    }

    return(
      <g>{legend}</g>
    )
  }

}

export default Legend
