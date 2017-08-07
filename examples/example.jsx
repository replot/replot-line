import React from "react"
import ReactDOM from "react-dom"
import LineChart from "../src/index.jsx"

class KeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      location: this.props.location,
      year: this.props.year,
      population: e.target.value || "0"
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
      yScale: this.props.title
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
      <div className="button" style={style.button}
        onClick={this.clickHandler.bind(this)}>
        {this.props.title}
      </div>
    )
  }

}

class ScaleSwitch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      yScale: "log"
    }
  }

  render() {
    const style = {
      switch: {
        width: "300px",
        float: "left",
      }
    }

    let types = ["lin", "log"]
    let buttons = []
    let color = ""
    for (var i=0; i < types.length; i++) {
      if (types[i] == this.props.yScale) {
        color = "#00AA00"
      } else {
        color = "#444444"
      }
      buttons.push(
        <ScaleButton key={i} title={types[i]}
        updateScale={this.props.updateScale.bind(this)} color={color} />
      )
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
      data: [
        {location: "Global", year: 2013, population: 10000000},
        {location: "Global", year: 2014, population: 1000000},
        {location: "Global", year: 2015, population: 100000},
        {location: "Global", year: 2016, population: 10000},
        {location: "US", year: 2013, population: 0.1},
        {location: "US", year: 2014, population: 1},
        {location: "US", year: 2015, population: 0},
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
      ],
      yScale: "log"
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
    this.setState({yScale: mutatedObject.yScale})
  }

  colorMe(i, group){
    if (group === "Antarctica") {
      return "red"
    } else if (group === "China") {
      return "orange"
    } else if (group === "Global") {
      return "yellow"
    } else if (group === "India") {
      return "green"
    } else if (group === "Russia") {
      return "blue"
    } else if (group === "US") {
      return "purple"
    }
  }

  render() {
    return(
      <div className="container">
        <h1 style={{textAlign: "center"}}> Linecharts for react </h1>
        <div style={{width:"70%", float:"left", padding:"50px"}}>
          <h2>Standard LineChart Usage</h2>
          <LineChart width="60%" data={this.state.data} groupKey="location"
            xKey="year" yKey="population" yScale={this.state.yScale} />
          <h2>LineChart with Customization</h2>
          <LineChart data={this.state.data} groupKey="location"
            xKey="year" yKey="population" yScale={this.state.yScale}
            xTitle="Year" yTitle="Population" color={this.colorMe}/>
        </div>
        <ScaleSwitch yScale={this.state.yScale} updateScale={this.updateScale.bind(this)} />
        <KeyValueTable data={this.state.data} updateData={this.updateData.bind(this)} />
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
