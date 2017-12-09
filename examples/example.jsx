import React from "react"
import ReactDOM from "react-dom"
import Radium from "radium"
import SectionContainer from "./components/SectionContainer.jsx"
import LineExample from "./components/LineExample.jsx"

class ExamplesSection extends React.Component {
  render() {
    return(
      <SectionContainer>
        <LineExample palette={this.props.palette}/>
      </SectionContainer>
    )
  }
}

ReactDOM.render(
  <Radium.StyleRoot>
    <ExamplesSection palette={"dark"} />
  </Radium.StyleRoot>,
  document.getElementById("react-app")
)
