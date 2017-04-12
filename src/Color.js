class Color {

  constructor(red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  // string rgb constructor
  // string hex val constructor
  rgb() {
    return "rgb("+String(Math.round(this.red))+","+String(Math.round(this.green))+","+String(Math.round(this.blue))+")"
  }

  endpoint(slopeRed, slopeGreen, slopeBlue) {
    let tredNeg = this.red / slopeRed
    let tredPos = (255 - this.red) / slopeRed
    if (slopeRed == 0) {
      tredNeg = -1
      tredPos = -1
    }

    let tgreenNeg = this.green / slopeGreen
    let tgreenPos = (255 - this.green) / slopeGreen
    if (slopeGreen == 0) {
      tgreenNeg = -1
      tgreenPos = -1
    }

    let tblueNeg = this.blue / slopeBlue
    let tbluePos = (255 - this.blue) / slopeBlue
    if (slopeBlue == 0) {
      tblueNeg = -1
      tbluePos = -1
    }

    let t = [tredNeg, tredPos, tgreenNeg, tgreenPos, tblueNeg, tbluePos]

    let keys = []
    for (var k=0; k < 6; k++) {
      if (t[k] >= 0) {
        keys.push(k)
      }
    }

    if (keys.length == 0) {
      return this
    }

    let tmin = t[keys[0]]
    let tind = keys[0]
    for (var ki=0; ki < keys.length; ki++) {
      if (t[keys[ki]] < tmin) {
        tind = keys[ki]
        tmin = t[tind]
      }
    }

    let sign = 1
    if (tind % 2 == 0) {
      sign = -1
    }
    let red = this.red + tmin * sign * slopeRed
    let green = this.green + tmin * sign * slopeGreen
    let blue = this.blue + tmin * sign * slopeBlue
    let end = new Color(red, green, blue)
    return end
  }

}

export default Color
