# Line charts for react
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
replot-line is designed to easily create LineCharts.
The only *required* input is proper JSON formatted data.

### Basic Usage
In the simplest case, just supply data (as a Javascript array) and specify the
keys associated with the values -:

```javascript
render() {
	let populations = {
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
	}

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
will then be calculated as a proportion of the parent container

```javascript
render() {

	return(
		<LineChart data={populations} width="50%" />
	)
}
```

### Colors
Colors may be specified through 2 different mechanisms, both through a `color` prop.
If none of the mechanisms are specified, LineChart defaults to a built in
color palette.

#### User-provided Color Palette
The user can specify their own desired colored palette for the lines to use.
This is done by passing in an array of color strings to the component with the
`color` prop. The displayed lines will cycle through the provided colors.

#### User-provided Color function
The user can specify the color for various lines by providing a function
as well. One can expect to receive the index of the line (first group in the
inputted data will have index 0, next group will have index 1, and so on),
as well as the group associated with the line, if there is one. In the
example below, color is decided based on the group:

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

### Graph Style
The LineChart offers some customization with regards to the actual graph elements.
These can be controlled with a `graphStyle` prop that is passed in as a javascript
object. Keys to include can be the following:

* lineWidth
	* Determines the thickness of the lines drawn on the LineChart
	* Defaults to `2.5`
	* Accepts any number value

### Axis Customization
Replot LineCharts allow for incredible customization of the graph axis. A complete
explanation of axis customization can be found below -:

#### Titles
By default, the LineChart does not display any axis titles. If the user wishes to
include titles, they can pass in some or all of the `xTitle`, `yTitle`, and
`graphTitle` props. These props accept a string value, displayed at the appropriate
location on the graph. To compensate for the inclusion of a title, the graph content
will be pushed further in, but overall the size of the component will remain what
was specified by the user.

#### Showing/Hiding Axis Elements
By default, the LineChart shows the entirety of the axes, including lines, labels,
and gridlines. These can each individually be disabled by passing in boolean
values of false to the following props:
- showXAxisLine
- showYAxisLine
- showXLabels
- showYLabels
- showGrid
- showLegend

#### Styling the axis
In addition to enabling/disabling titles and axis components, the actual style of
the components can be altered as well, with the use of one `axisStyle` prop that
takes the form of a JavaScript object.

Explanations and defaults follow:

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

Example of using the axisStyle prop:

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
  ...

  return(
    <LineChart data={populations} axisStyle={style}/>
  )
}
```

#### Styling the legend
The LineChart will include a legend by default. If not disabled, the legend can
be customized through a single legendStyle prop that takes the form of a
JavaScript object.

Explanations and defaults follow:
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

### Initial Animation
Initial animation is enabled by default, resulting in the lines growing out
from the y-axis line. This can be disabled using the
`initialAnimation` prop, passing in a value of false.
