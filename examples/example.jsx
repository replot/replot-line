import React from "react"
import ReactDOM from "react-dom"
import LineChart from "../src/index.jsx"
import Color from "../src/Color.js"
import ColorPalette from "../src/ColorPalette.js"

class KeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      location: this.props.location,
      year: this.props.year,
      population: e.target.value
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
      }
    }

    return(
      <tr key={this.props.location.concat(this.props.year)}>
        <td style={style.cell}>{this.props.location} </td>
        <td style={style.cell}>{this.props.year}</td>
        <td style={style.cell}>
          <input type="text" value={parseFloat(this.props.population)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }

}

class KeyValueTable extends React.Component {

  render() {
    const style = {
      container: {
        width: "30%",
        float: "left",
        padding: "20px",
      }
    }
    let rows = []
    for (let dataPoint of this.props.data) {
      rows.push(
        <KeyValueRow key={dataPoint.location.concat(dataPoint.year)}
          location={dataPoint.location} year={dataPoint.year} population={dataPoint.population}
          updateData={this.props.updateData.bind(this)} />
      )
    }

    return (
      <div className="container" style={style.container}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

}

class ScaleButton extends React.Component {

  clickHandler() {
    this.props.updateScale({
      scale: this.props.title
    })
  }

  render() {
    let style = {
      button: {
        width: "50%",
        float: "left",
        padding: "10px",
        textAlign: "center",
        color: "#FFFFFF",
        backgroundColor: this.props.color,
      }
    }

    return (
      <div className="button" style={style.button} onClick={this.clickHandler.bind(this)}>{this.props.title}</div>
    )
  }

}

class ScaleSwitch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scale: "log"
    }
  }

  render() {
    const style = {
      switch: {
        width: "300px",
        float: "left",
      }
    }

    let types = ["default", "log"]
    let buttons = []
    let color = ""
    for (var i=0; i < types.length; i++) {
      if (types[i] == this.props.scale) {
        color = "#00AA00"
      } else {
        color = "#444444"
      }
      buttons.push(<ScaleButton title={types[i]} updateScale={this.props.updateScale.bind(this)} color={color}/>)
    }

    return(
      <div className="switch" style={style.switch}>
        {buttons}
      </div>
    )
  }

}

class ExampleApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    //   data: [
    //     {location: "Global", year: 2010, population: 6916183482},
    //     {location: "Global", year: 2011, population: 6997998760},
    //     {location: "Global", year: 2012, population: 7080072417},
    //     {location: "Global", year: 2013, population: 7162119434},
    //     {location: "Global", year: 2014, population: 7243784121},
    //     {location: "Global", year: 2015, population: 7324782225},
    //     {location: "Global", year: 2016, population: 7404976783},
    //     {location: "US", year: 2010, population: 310559000},
    //     {location: "US", year: 2011, population: 312917100},
    //     {location: "US", year: 2012, population: 315219700},
    //     {location: "US", year: 2013, population: 317474000},
    //     {location: "US", year: 2014, population: 319849000},
    //     {location: "US", year: 2015, population: 322060100},
    //     {location: "US", year: 2016, population: 324304400},
    //     {location: "India", year: 2010, population: 1186000000},
    //     {location: "India", year: 2011, population: 1210570000},
    //     {location: "India", year: 2012, population: 1213370000},
    //     {location: "India", year: 2013, population: 1223000000},
    //     {location: "India", year: 2014, population: 1267000000},
    //     {location: "India", year: 2015, population: 1283000000},
    //     {location: "India", year: 2016, population: 1299000000},
    //   ]
      // data: [
      //   {location: "Global", year: 2013, population: 10},
      //   {location: "Global", year: 2014, population: 9},
      //   {location: "Global", year: 2015, population: 8},
      //   {location: "Global", year: 2016, population: 7},
      //   {location: "US", year: 2013, population: 3},
      //   {location: "US", year: 2014, population: 4},
      //   {location: "US", year: 2015, population: 4},
      //   {location: "US", year: 2016, population: 3},
      //   {location: "India", year: 2013, population: 0},
      //   {location: "India", year: 2014, population: 1},
      //   {location: "India", year: 2015, population: 5},
      //   {location: "India", year: 2016, population: 6},
      // ]
      data: [
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
      ],
      scale: "log",
      color: new ColorPalette(new Color(255,0,0), new Color(0,0,255), 3)
    }
  }

  updateData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.data))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].location === mutatedObject.location && mutatedData[index].year === mutatedObject.year) {
        chosenIndex = index
        break
      }
    }
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].population = parseFloat(mutatedObject.population)
      this.setState({data: mutatedData})
    }
  }

  updateScale(mutatedObject) {
    this.setState({scale: mutatedObject.scale})
  }

  render() {
    return(
      <div className="container">
        <h1 style={{textAlign: "center"}}> Ent: Linecharts for react </h1>
        <KeyValueTable data={this.state.data} updateData={this.updateData.bind(this)} />
        <ScaleSwitch scale={this.state.scale} updateScale={this.updateScale.bind(this)} />
        <div style={{width:"70%", float:"right"}}>
          <LineChart data={this.state.data} titleKey="location" xKey="year" yKey="population" scale={this.state.scale} color={this.state.color}/>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
