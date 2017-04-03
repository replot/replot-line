class Color {

  constructor(red, green, blue) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  // string rgb constructor
  // string hex val constructor
  rgb() {
    return "rgb("+String(this.red)+","+String(this.green)+","+String(this.blue)+")"
  }

}

export default Color
