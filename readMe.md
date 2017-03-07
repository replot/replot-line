# Line charts for react
Intelligent and customizable line chart components for react.

## API

### Basic Usage
Specicfy an array of tuples to create one line chart.

```javascript
render() {
	let populations = [
		[2010, 6916183482],
		[2011, 6997998760],
		[2012, 7080072417],
		[2013, 7162119434],
		[2014, 7243784121],
		[2015, 7324782225],
		[2016, 7404976783]
	]

	return(
		<LineChart data={populations} 
		titleLabel="Global Population Per Year"
		xLabel="Year"
		yLabel="Global Population" />
	)
}
```

Or specify a dictionary of dataset titles mapped to the corresponding array of dataset values.
CODE

- `data` is the only required prop
- `titleLabel` (string) defaults to `"title"`
- `xLabel` (string) defaults to `"x-axis"`
- `yLabel` (string) defaults to `"y-axis"`

### Axis Customization
- `xSteps` (integer) defaults to number calculated by program based off of x-axis data
	- specify number of steps on the x-axis
- `ySteps` (integer) defaults to number calculated by program based off of y-axis data
	- specify number of steps on the y-axis
- `xScale` defaults to `lin`
	- `lin`: linear scale
	- `log`: logarithmic scale (base 10)
	- `per`: percentage scale (0 to 100%)
- `yScale` defaults to `lin`, same possible values as `xScale`
- `xLines` defaults to `none`
	- `none`: no vertical backing lines for x-axis values
	- `dash`: dashed vertical backing lines
	- `solid`: solid vertical backing lines
- `yLines` defaults to `none`
	- `none`: no horizontal backing lines for y-axis values
	- `dash`: dashed horizontal backing lines
	- `solid`: solid horizontal backing lines
- `transpose`: defaults to `no`
	- `no`: first value of tuple on x-axis, second value of tuple on y-axis
	- `yes`: first value of tuple on y-axis, second value of tuple on x-axis

### Line Customization
- `color`: defaults to preset palette
	- specify an array of color hex codes, e.g. `["#FF0000, "#00FF00", "#0000FF"]`
	- if length of color array is less than the number of datasets, will reiterate through array to set colors from the beginning
- `shape`: defaults to `none`
	- `none`: line is continuous without any shape marking the data points
	- `disc`: data points are marked by a filled circle
	- `circle`: data points are marked by an unfilled circle
	- `square`: data points are marked by a square
	- `triangle`: data points are marked by a triangle

### Key Customization
- `keyPosition`: defaults to `right`
	- `none`: no key display
	- `right`: key displayed to the right of the chart
	- `left`: key displayed to the left of the chart
	- `top`: key displayed on top of the chart (under the title)
	- `bottom`: key displayed below the chart
