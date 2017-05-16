import React from "react"

class Legend extends React.Component {

  render() {
    let segment = this.props.width / this.props.titles.length

    let legend = []
    for (var i=0; i < this.props.titles.length; i++) {
      legend.push(
        <rect key={"color"+i} x={this.props.x+i*segment} y={this.props.y-8}
          width={15} height={15} fill={this.props.color[i%this.props.color.length]}/>
      )
      legend.push(
        <text key={"label"+i} x={this.props.x+i*segment+25} y={this.props.y+5}
           fontSize={15} fill={this.props.legendColor}>{this.props.titles[i]}</text>
      )
    }

    return(
      <g>{legend}</g>
    )
  }

}

export default Legend
