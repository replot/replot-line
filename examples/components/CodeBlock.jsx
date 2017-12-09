import React from "react"
import colors from "../colors"


class CodeBlock extends React.Component {

  render() {
    const style = {
      margin: "50px auto",
      maxWidth: "600px",
      width: "80%",
      padding: "10px",
      border: `1px solid ${colors[this.props.palette].codeBlockBorders}`,
      borderLeft: `2px solid ${colors[this.props.palette].codeBlockLeftBorder}`,
      whiteSpace: "pre",
      fontFamily: "monospace",
    }

    return(
      <div style={style}>
        {this.props.children}
      </div>
    )
  }

}


export default CodeBlock
