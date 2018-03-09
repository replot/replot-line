import React from "react"
import LineChart from "../../src/LineChart.jsx"
import ComponentContainer from "./CompContainer/ComponentContainer.jsx"
import colors from "../colors.js"


class LineExample extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      optionList: [
        {optionName: "data", optionType: "data", keyList:["index", "year"], weightKey:"value", initialValue: [
          {index: "Dow Jones", year: 2006, value: 12463.15},
          {index: "Dow Jones", year: 2007, value: 13264.82},
          {index: "Dow Jones", year: 2008, value: 8776.39},
          {index: "Dow Jones", year: 2009, value: 10428.05},
          {index: "Dow Jones", year: 2010, value: 11577.51},
          {index: "Dow Jones", year: 2011, value: 12217.56},
          {index: "Dow Jones", year: 2012, value: 13104.14},
          {index: "Dow Jones", year: 2013, value: 16576.66},
          {index: "Dow Jones", year: 2014, value: 17823.07},
          {index: "Dow Jones", year: 2015, value: 17425.03},
          {index: "Dow Jones", year: 2016, value: 19762.6},
          {index: "S&P 500", year: 2006, value: 1418.3},
          {index: "S&P 500", year: 2007, value: 1468.36},
          {index: "S&P 500", year: 2008, value: 903.25},
          {index: "S&P 500", year: 2009, value: 1115.1},
          {index: "S&P 500", year: 2010, value: 1257.64},
          {index: "S&P 500", year: 2011, value: 1257.6},
          {index: "S&P 500", year: 2012, value: 1426.19},
          {index: "S&P 500", year: 2013, value: 1848.36},
          {index: "S&P 500", year: 2014, value: 2058.9},
          {index: "S&P 500", year: 2015, value: 2043.94},
          {index: "S&P 500", year: 2016, value: 2238.83},
          {index: "NASDAQ 100", year: 2006, value: 1756.9},
          {index: "NASDAQ 100", year: 2007, value: 2084.93},
          {index: "NASDAQ 100", year: 2008, value: 1211.65},
          {index: "NASDAQ 100", year: 2009, value: 1860.31},
          {index: "NASDAQ 100", year: 2010, value: 2217.86},
          {index: "NASDAQ 100", year: 2011, value: 2277.83},
          {index: "NASDAQ 100", year: 2012, value: 2660.93},
          {index: "NASDAQ 100", year: 2013, value: 3592},
          {index: "NASDAQ 100", year: 2014, value: 4236.28},
          {index: "NASDAQ 100", year: 2015, value: 4593.27},
          {index: "NASDAQ 100", year: 2016, value: 4863.62},
        ]},
        {optionName: "width", name: "Width", optionType: "field", input: "string", initialValue: "100%"},
        {optionName: "height", name: "Height", optionType: "field", input: "string", initialValue: 500},
        {optionName: "yScale", name: "Scale", optionType: "state", states: ["lin", "log"], initialValue: "log"},
        {optionName: "groupKey", name: "Group By", optionType: "hidden", initialValue: "index"},
        {optionName: "xKey", name: "X Axis", optionType: "hidden", initialValue: "year"},
        {optionName: "yKey", name: "Y Axis", optionType: "hidden", initialValue: "value"},
        {optionName: "legendFontColor", name: "Legend Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "legendShowBorder", name: "Show Legend Border", optionType: "bool", initialValue: false},
        {optionName: "legendBorderColor", name: "Legend Border Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "axisColor", name: "Axis Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "labelColor", name: "Label Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "gridColor", name: "Grid Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "tickColor", name: "Tick Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "axisWidth", name: "Axis Line Width", optionType: "field", input: "number", initialValue: 1.5},
      ],
      lineScale: "log",
    }
  }

  render() {
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
          palette={this.props.palette}>
          <LineChart data={this.state.optionList[0].initialValue}
            color={colors[this.props.palette].linePalette}/>
        </ComponentContainer>
      </div>
    )
  }

}


export default LineExample
