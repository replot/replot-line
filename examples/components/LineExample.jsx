import React from "react"
import LineChart from "../../src/LineChart.jsx"
import ComponentContainer from "./CompContainer/ComponentContainer.jsx"
import colors from "../colors.js"


class LineExample extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      optionList: [
        {optionName: "data", optionType: "data", keyList:["location", "year"], weightKey:"population", initialValue: [
          {location: "Global", year: 2013, population: 10000000},
          {location: "Global", year: 2014, population: 1000000},
          {location: "Global", year: 2015, population: 100000},
          {location: "Global", year: 2016, population: 10000},
          {location: "US", year: 2013, population: 0.1},
          {location: "US", year: 2014, population: 1},
          {location: "US", year: 2015, population: 1},
          {location: "US", year: 2016, population: 0.1},
          {location: "India", year: 2013, population: 0.0001},
          {location: "India", year: 2014, population: 10},
          {location: "India", year: 2015, population: 100},
          {location: "India", year: 2016, population: 10000},
          {location: "China", year: 2013, population: 1000000},
          {location: "China", year: 2014, population: 10000},
          {location: "China", year: 2015, population: 100000},
          {location: "China", year: 2016, population: 1000},
          {location: "Russia", year: 2013, population: 100},
          {location: "Russia", year: 2014, population: 1000},
          {location: "Russia", year: 2015, population: 10000},
          {location: "Russia", year: 2016, population: 100000},
          {location: "Antarctica", year: 2013, population: 0.0001},
          {location: "Antarctica", year: 2014, population: 0.01},
          {location: "Antarctica", year: 2015, population: 0.001},
          {location: "Antarctica", year: 2016, population: 0.0001},
        ]},
        {optionName: "width", name: "Width", optionType: "field", input: "string", initialValue: "100%"},
        {optionName: "height", name: "Height", optionType: "field", input: "string", initialValue: 500},
        {optionName: "yScale", name: "Scale", optionType: "state", states: ["lin", "log"], initialValue: "log"},
        {optionName: "groupKey", name: "Group By", optionType: "hidden", initialValue: "location"},
        {optionName: "xKey", name: "X Axis", optionType: "hidden", initialValue: "year"},
        {optionName: "yKey", name: "Y Axis", optionType: "hidden", initialValue: "population"},
      ],
      lineScale: "log",
    }
  }

  render() {
    debugger
    let axisColorOptions = [
      {optionName: "axisColor", name: "Axis Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
      {optionName: "labelColor", name: "Label Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
      {optionName: "gridColor", name: "Grid Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
      {optionName: "lineWidth", name: "Axis Line Width", optionType: "field", input: "number", initialValue: 1.5},
    ]
    let legendColorOptions = [
      {optionName: "fontColor", name: "Legend Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
      {optionName: "showBorder", name: "Show Legend Border", optionType: "bool", initialValue: false},
      {optionName: "borderColor", name: "Legend Border Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
    ]
    let style = {
      title: {
        fontSize: "45px",
        color: colors[this.props.palette].body.text,
        padding: 15,
      },
      container: {
        padding: "80px 0px",
      },
    }
    return(
      <div className="container" style={style.container}>
        <h1 style={style.title}> Line Chart </h1>
        <ComponentContainer optionList={this.state.optionList}
          optionsData={style.optionsData}
          palette={this.props.palette}
          axisColorOptions={axisColorOptions}
          legendColorOptions={legendColorOptions}>
          <LineChart data={this.state.optionList[0].initialValue}
            color={colors[this.props.palette].linePalette}/>
        </ComponentContainer>
      </div>
    )
  }

}


export default LineExample
