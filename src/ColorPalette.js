import Color from "./Color.js"

class ColorPalette {

  constructor(color1, color2, numcolors) {
    let dred = color2.red - color1.red
    let dgreen = color2.green - color1.green
    let dblue = color2.blue - color1.blue

    let slopeRed = Math.abs(dred / 255)
    let slopeGreen = Math.abs(dgreen / 255)
    let slopeBlue = Math.abs(dblue / 255)

    let end1 = color1.endpoint(slopeRed, slopeGreen, slopeBlue)
    let end2 = color2.endpoint(slopeRed, slopeGreen, slopeBlue)

    let palette = []
    for (var i=0; i < numcolors; i++) {
      let r = end1.red + i*(end2.red - end1.red)/numcolors
      let g = end1.green + i*(end2.green - end1.green)/numcolors
      let b = end1.blue + i*(end2.blue - end1.blue)/numcolors
      let c = new Color(r,g,b)
      palette.push(c)
    }
    this.palette = palette
  }

}

export default ColorPalette
