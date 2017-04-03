import Color from "./Color.js"

class ColorPalette {

  constructor(color1, color2, numcolors) {
    let dred = color2.red - color1.red
    let dgreen = color2.green - color1.green
    let dblue = color2.blue - color1.blue

    let palette = []
    for (var i=0; i < numcolors; i++) {
      let r = color1.red + i*dred/numcolors
      let g = color1.green + i*dgreen/numcolors
      let b = color1.blue + i*dblue/numcolors
      let c = new Color(r,g,b)
      palette.push(c)
    }
    this.palette = palette
  }

}

export default ColorPalette
