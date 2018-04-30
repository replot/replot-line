# replot-line: Line charts for react
Intelligent and customizable line chart components for react.

## Installation
Only works with React projects. React must be installed separately.
```bash
npm install replot-line
```

Then with a module bundler like webpack/browserify that supports CommonJS/ES2015
modules, use as you would anything else.

```javascript
import LineChart from 'replot-line'
```

## API
replot-line is designed to create beautiful line charts right out of the box.
The only *required* input is properly formatted data.

### Basic Usage
In the simplest case, just supply data (as a Javascript array) and specify the
keys associated with the values:

![example](https://github.com/replot/replot-line/blob/master/docs/img/line-chart-photo.png)

```javascript
render() {
	let markets = [
		{index: "Dow Jones", year: 2006, value: 12463.15},
		{index: "Dow Jones", year: 2007, value: 13264.82},
		{index: "Dow Jones", year: 2008, value: 8776.39},
		{index: "Dow Jones", year: 2009, value: 10428.05},
		{index: "Dow Jones", year: 2010, value: 11577.51},
		{index: "Dow Jones", year: 2011, value: 12217.56},
		{index: "Dow Jones", year: 2012, value: 13104.14},
		{index: "Dow Jones", year: 2013, value: 16576.66},
		{index: "Dow Jones", year: 2014, value: 17823.07},
		{index: "Dow Jones", year: 2015, value: 17425.03},
		{index: "Dow Jones", year: 2016, value: 19762.6},
		{index: "S&P 500", year: 2006, value: 1418.3},
		{index: "S&P 500", year: 2007, value: 1468.36},
		{index: "S&P 500", year: 2008, value: 903.25},
		{index: "S&P 500", year: 2009, value: 1115.1},
		{index: "S&P 500", year: 2010, value: 1257.64},
		{index: "S&P 500", year: 2011, value: 1257.6},
		{index: "S&P 500", year: 2012, value: 1426.19},
		{index: "S&P 500", year: 2013, value: 1848.36},
		{index: "S&P 500", year: 2014, value: 2058.9},
		{index: "S&P 500", year: 2015, value: 2043.94},
		{index: "S&P 500", year: 2016, value: 2238.83},
		{index: "NASDAQ 100", year: 2006, value: 1756.9},
		{index: "NASDAQ 100", year: 2007, value: 2084.93},
		{index: "NASDAQ 100", year: 2008, value: 1211.65},
		{index: "NASDAQ 100", year: 2009, value: 1860.31},
		{index: "NASDAQ 100", year: 2010, value: 2217.86},
		{index: "NASDAQ 100", year: 2011, value: 2277.83},
		{index: "NASDAQ 100", year: 2012, value: 2660.93},
		{index: "NASDAQ 100", year: 2013, value: 3592},
		{index: "NASDAQ 100", year: 2014, value: 4236.28},
		{index: "NASDAQ 100", year: 2015, value: 4593.27},
		{index: "NASDAQ 100", year: 2016, value: 4863.62},
	]

	return(
		<LineChart data={markets}
		groupKey="index"
		xKey="year"
		yKey="value" />
	)
}
```

- `data` is the only required prop
- `groupKey` defaults to `"group"`
- `xKey` defaults to `"x"`
- `yKey` defaults to `"y"`

Including a `groupKey` will draw multiple lines on your LineChart, one for each
group, however this prop is optional.

### Dimensions
Dimensions may be specified by passing in `width` and `height` props. The
unit is pixels, and the LineChart defaults to 800 by 600 pixels.

Width dimensions may also be specified with a string, as a percentage. The width
will then be calculated as a proportion of the parent container.

```javascript
render() {
  return(
    <LineChart data={markets} width="50%" height="200px" />
  )
}
```

### Colors
Colors may be specified through 2 different mechanisms, both through a `color` prop.
If none of the mechanisms are specified, LineChart defaults to a built in
color palette.

#### User-provided Color Palette
Users can specify a list of colors to use as a palette, passed to the `color` prop.

```javascript
render() {
  let colors = [
    "#fea9ac", "#fc858f", "#f46b72", "#de836e",
    "#caa56f", "#adcc6f", "#8ebc57", "#799b3f"
  ]

  return(
    <LineChart data={markets} color={colors} />
  )
}
```

#### User-provided Color Function
Users can also specify a function to assign colors to different data series. Expected arguments to the function are the index of the data series (from 0) and the title of the data series (if it exists).

```javascript
colorMe(i, group) {
  if (group === "USA"){
    return "blue"
  } else if (group === "Canada") {
    return "red"
  } else {
    return "green"
  }
}

render() {
	return(
		<LineChart data={markets} color={this.colorMe} />
	)
}
```

### Tooltip
Tooltips can display more specific information about a data series.

```javascript
render() {
  return(
    <LineChart data={markets} tooltipColor="light" />
  )
}
```

- `tooltip` defaults to `true`, `false` turns the tooltip off
- `tooltipColor` defaults to `dark`, it can be set to `light` or `dark`
- `tooltipContents` defaults to data about points in the line and the group (if applicable)

#### User-provided Tooltip Function
Users can customize what is displayed inside the tooltip with a function. Expected arguments to the function are the data for the specific point hovered over and an array of data for the line hovered over. The function should return JSX.

```javascript
fillTooltip(pointData, lineData){
  return(
    <div>
      <span>The data for this point looks like {pointData.toString()}</span>
    </div>
  )
}

render() {
  return(
    <LineChart data={markets}
      tooltipContents={this.fillTooltip}/>
  )
}
```

### Graph Style
Users can customize the style of graph elements by passing in the prop(s) below:

* lineWidth
	* Determines the thickness of the lines drawn on the LineChart
	* Defaults to `2.5`
	* Accepts any number value
* pointWidth
	* Determines the width of points on the line
	* Defaults to `5`
	* Accepts any number value

```javascript
let style = {
  lineWidth: 5,
  pointWidth: 2
}

render() {
  return(
    <LineChart data={markets} graphStyle={style} />
  )
}
```

### Axis Customization
Replot LineCharts allow for incredible customization of the graph axis. A complete
explanation of axis customization can be found below:

#### Titles
Title props accept strings to display in the appropriate location on the graph. To compensate for the inclusion of a title, graph content will be condensed, but the overall size of the component will stay constant.

- `graphTitle`: string displayed above the graph
- `xTitle`: string displayed left of the x-axis
- `yTitle`: string displayed under the y-axis

```javascript
render() {
  return(
    <LineChart data={markets}
      graphTitle="Annual Trends in Market Indices"
      xTitle="Year"
      yTitle="Index Value" />
  )
}
```

#### Displaying Axis Elements
Users can customize the display of the lines, labels, and gridlines of the axes.

- `showXAxisLine`: defaults to `true`, controls display of the x-axis line
- `showYAxisLine`: defaults to `true`, controls display of the y-axis line
- `showXLabels`: defaults to `true`, controls display of labels on the x-axis
- `showYLabels`: defaults to `true`, controls display of labels on the y-axis
- `showGrid`: defaults to `true`, controls display of gridlines

#### Axis Scale
Users can control the scale of the graph, linear or logarithmic. Users can also control the number of increments on the y-axis.

- `yScale`: defaults to `"lin"` for linear scale, can be `"log"` for logarithmic scale
- `ySteps`: defaults to 1 division per 100 pixels, accepts a number given by the user

#### Axis Style
Users can customize the axis style by passing in the prop(s) below:

* axisColor
  * modifies the color of axis lines
  * defaults to `"#AAA"`
  * accepts any color string
* tickColor
  * modifies the color of axis ticks
  * defaults to `"#AAA"`
  * accepts any color string
* gridColor
  * modifies the color of axis gridlines
  * defaults to `"#AAA"`
  * accepts any color string
* labelColor
  * modifies the color of both axis labels
  * defaults to `"#AAA"`
  * accepts any color string
* graphTitleColor
  * modifies the color of all graph titles
  * defaults to `"#AAA"`
  * accepts any color string
* axisWidth
  * modifies the thickness of axis lines
  * defaults to `1.5`
  * accepts any number
* tickWidth
  * modifies the thickness of axis ticks
  * defaults to `1.5`
  * accepts any number
* gridWidth
  * modifies the thickness of axis gridlines
  * defaults to `1`
  * accepts any number
* axisOpacity
  * modifies the opacity of axis lines
  * defaults to `1`
  * accepts any number
* tickOpacity
  * modifies the opacity of axis ticks
  * defaults to `1`
  * accepts any number
* gridOpacity
  * modifies the opacity of axis gridlines
  * defaults to `0.5`
  * accepts any number
* labelFontSize
  * sets the font size of both axis labels
  * automatically calculated when unspecified
  * accepts any number
* graphTitleFontSize
  * sets the font size of all graph titles
  * automatically calculated when unspecified
  * accepts any number
* labelFontType
  * sets the font family of both axis labels
  * inherits when unspecified
  * accepts any font family name string
* graphTitleFontType
  * sets the font family of all graph titles
  * inherits when unspecified
  * accepts any font family name string

```javascript
let style = {
    axisColor: "#f17e33",
    labelColor: "blue",
    titleColor: "#000000",
    gridColor: "#DDDDDD",
    lineWidth: 5,
    lineOpacity: .5
  }

render() {
  return(
    <LineChart data={markets} axisStyle={style}/>
  )
}
```

### Legend Customization
Users can customize the graph legend in several ways.

- `showLegend`: defaults to `true`, controls display of the legend

#### Legend Style
Users can customize the legend style by passing in the prop(s) below:

* legendFontColor
	* Modifies the color of the font used in the legend
	* Defaults to `"#AAA"`
	* Accepts any color string
* legendBackground
	* Modifies the background color of the legend
	* Defaults to `"none"`
	* Accepts any color string
* legendShowBorder
 	* Determines whether a border will be drawn around the legend
	* Defaults to `true`
	* Accepts `true` or `false`
* legendBorderColor
	* Modifies the color of the border of the legend
	* Defaults to `"#AAA"`
	* Accepts any color string

### Animation Customization
Users can control the initial animation of the graph, lines growing out from the y-axis line.

- `initialAnimation`: defaults to `true`, controls the animation

### Area Customization
Users can control the display of shaded areas under the lines of the graph.

- `shadeArea`: defaults to `false`, controls display of the shaded areas
