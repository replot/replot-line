import React from "react"


class CenteredBlock extends React.Component {

  constructor(props) {
    super(props)
    this.displayName = "CenteredBlock"
  }

  render() {
    const style = {
      container: {
        textAlign: "center",
      },
      pseudoBlock: {
        height: "100%",
        display: "inline-block",
        verticalAlign: "middle",
        textAlign: "center",
      },
      centeredTitle: {
        display: "inline-block",
        verticalAlign: "middle",
        textAlign: "center",
        width: this.props.width,
        minWidth: this.props.minWidth,
      },
    }

    return(
      <div style={style.container}>
        <span style={style.pseudoBlock}></span>
        <div style={style.centeredTitle}>
          {this.props.children}
        </div>
      </div>
    )
  }

}

CenteredBlock.defaultProps = {
  width: "40%",
  minWidth: "400px",
}

export default CenteredBlock
