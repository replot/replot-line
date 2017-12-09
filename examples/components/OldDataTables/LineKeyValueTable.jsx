import React from "react"


class LineKeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      location: this.props.location,
      year: this.props.year,
      population: e.target.value || "0",
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

class LineKeyValueTable extends React.Component {

  render() {
    const style = {
      container: {
        width: "30%",
        display:"inline-block",
        verticalAlign: "top",
        padding: "20px 40px",
        color: "white"
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
        <td style={style.cell}> Location </td>
        <td style={style.cell}> Year </td>
        <td style={style.cell}> Population </td>
      </tr>
    )
    for (let dataPoint of this.props.data) {
      rows.push(
        <LineKeyValueRow key={dataPoint.location.concat(dataPoint.year)}
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

export default LineKeyValueTable
