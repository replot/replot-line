import React from "react"


class TwoColumnRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      country: this.props.country,
      population: e.target.value || "0"
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
        color: "white",
        fontSize: "0.8rem"
      }
    }

    return(
      <tr key={this.props.title}>
        <td style={style.cell}> {this.props.country} </td>
        <td style={style.cell}>
          <input type="text" value={parseInt(this.props.population)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }
}


class TwoColumnTable extends React.Component {

  render() {
    const style = {
      container: {
        width:"30%",
        display:"inline-block",
        verticalAlign:"top",
        padding:"20px 40px",
        color:"white"
      },
      cell: {
        minWidth: "100px",
        color: "white",
        fontSize: "1.2rem",
        borderBottom: "thin solid #ffffff"
      }
    }
    let rows = []
    rows.push(
      <tr key="labels">
        <td style={style.cell}> Country </td>
        <td style={style.cell}> Population </td>
      </tr>
    )
    for (let dataPoint of this.props.data) {
      rows.push(
        <TwoColumnRow key={dataPoint.title}
          country={dataPoint.country} population={dataPoint.population}
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

export default TwoColumnTable
