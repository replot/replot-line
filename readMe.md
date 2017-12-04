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
keys for the titles and values:

```javascript
render() {
	let populations = [
		{location: "Global", year: 2010, population: 6916183482},
		{location: "Global", year: 2011, population: 6997998760},
		{location: "Global", year: 2012, population: 7080072417},
		{location: "Global", year: 2013, population: 7162119434},
		{location: "Global", year: 2014, population: 7243784121},
		{location: "Global", year: 2015, population: 7324782225},
		{location: "Global", year: 2016, population: 7404976783},
		{location: "US", year: 2010, population: 310559000},
		{location: "US", year: 2011, population: 312917100},
		{location: "US", year: 2012, population: 315219700},
		{location: "US", year: 2013, population: 317474000},
		{location: "US", year: 2014, population: 319849000},
		{location: "US", year: 2015, population: 322060100},
		{location: "US", year: 2016, population: 324304400},
		{location: "India", year: 2010, population: 1186000000},
		{location: "India", year: 2011, population: 1210570000},
		{location: "India", year: 2012, population: 1213370000},
		{location: "India", year: 2013, population: 1223000000},
		{location: "India", year: 2014, population: 1267000000},
		{location: "India", year: 2015, population: 1283000000},
		{location: "India", year: 2016, population: 1299000000},
	]

	return(
		<LineChart data={populations}
		groupKey="location"
		xKey="year"
		yKey="population" />
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

The LineChart will not function with a width that is less than 60 pixels, or with
a height that is less than 100 pixels.

Width dimensions may also be specified with a string, as a percentage. The width
will then be calculated as a proportion of the parent container.

```javascript
render() {

	return(
		<LineChart data={populations} width="50%" height="200px" />
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
    <LineChart data={populations} color={colors} />
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
		<LineChart data={populations} color={this.colorMe} />
	)
}
```

### Tooltip
Tooltips can display more specific information about a data series.

```javascript
render() {
  return(
    <LineChart data={populations} tooltip="true" tooltipColor="light" />
  )
}
```

- `tooltip` defaults to `true`, `false` turns the tooltip off
- `tooltipColor` defaults to `light`, it can be set to `light` or `dark`

#### User-provided Tooltip Function
Users can customize what is displayed inside the tooltip with a function. Expected arguments to the function are the data for the specific point hovered over and an array of data for the line hovered over. The function should return JSX.

```javascript
fillTooltip(pointData, lineData){

  return (
			<div>
				<span>The data for this point looks like {pointData.toString()}</span>
			</div>
  )
}

render() {
  return(
    <LineChart data={populations} tooltipContents={this.fillTooltip} />
  )
}
```

- `tooltipContents` defaults to data about points in the line and the group (if applicable)

### Graph Style
Users can customize graph elements by passing a javascript object to the `graphStyle` argument. Keys can include:

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
    <LineChart data={populations} graphStyle={style} />
  )
}
```

### Axis Customization
Users can customize graph axes in several different ways.

#### Titles
Title props accept strings to display in the appropriate location on the graph. To compensate for the inclusion of a title, graph content will be condensed, but the overall size of the component will stay constant.

- `graphTitle`: string displayed above the graph
- `xTitle`: string displayed left of the x-axis
- `yTitle`: string displayed under the y-axis

```javascript
render() {
  return(
    <LineChart data={populations} graphTitle="Global Populations"
			xTitle="Population" yTitle="Year" />
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

- `yScale`: defaults to "lin" for linear scale, can be "log" for logarithmic scale
- `ySteps`: defaults to a calculated number, accepts a number given by the user

#### Axis Style
Users can customize axis style by passing a javascript object to the `axisStyle` argument. Keys can include:

* axisColor
  * modifies the color of the axis line
  * defaults to `#000000`
  * accepts any color string
* labelColor
  * modifies the color of both axis labels
  * defaults to `#000000`
  * accepts any color string
* titleColor
  * modifies the color of all graph titles
  * defaults to `#000000`
  * accepts any color string
* labelColor
  * modifies the color of axis gridlines
  * defaults to `#DDDDDD`
  * accepts any color string
* lineWidth
  * modifies the thickness of axis lines
  * defaults to `2`
  * accepts any number
* lineOpacity
  * modifies the opacity of axis lines
  * defaults to `1`
  * accepts any number

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
    <LineChart data={populations} axisStyle={style} />
  )
}
```

### Legend Customization
Users can customize the graph legend in several ways.

- `showLegend`: defaults to `true`, controls display of the legend

#### Legend Style
Users can customize legend style by passing a javascript object to the `legendStyle` argument. Keys can include:

* fontColor
	* Modifies the color of the font used in the legend
	* Defaults to `"#000000"`
	* Accepts any color string
* backgroundColor
	* Modifies the background color of the legend
	* Defaults to `"none"`
	* Accepts any color string
* showBorder
 	* Determines whether a border will be drawn around the legend
	* Defaults to `true`
	* Accepts `true` or `false`
* borderColor
	* Modifies the color of the border of the legend
	* Defaults to `"#000000"`
	* Accepts any color string

### Animation Customization
Users can control the initial animation of the graph, lines growing out from the y-axis line.

- `initialAnimation`: defaults to `true`, controls the animation

### Area Customization
Users can control the display of shaded areas under the lines of the graph.

- `shadeArea`: defaults to `false`, controls display of the shaded areas
