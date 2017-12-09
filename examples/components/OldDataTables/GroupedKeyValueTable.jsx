import React from "react"


class GroupedKeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      year: this.props.year,
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
      <tr key={this.props.year+this.props.country}>
        <td style={style.cell}>{this.props.year} </td>
        <td style={style.cell}>{this.props.country} </td>
        <td style={style.cell}>
          <input type="text" value={parseInt(this.props.population)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }
}

class GroupedKeyValueTable extends React.Component {

  render() {
    const style = {
      container: {
        width:"30%",
        display:"inline-block",
        verticalAlign: "top",
        padding: "20px",
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
        <td style={style.cell}> Year </td>
        <td style={style.cell}> Country </td>
        <td style={style.cell}> Population </td>
      </tr>
    )
    for (let dataPoint of this.props.data) {
      rows.push(
        <GroupedKeyValueRow key={dataPoint.year+dataPoint.country}
          year={dataPoint.year} population={dataPoint.population}
          country={dataPoint.country}
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

export default GroupedKeyValueTable
