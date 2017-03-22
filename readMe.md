# Line charts for react
Intelligent and customizable line chart components for react.

## API
Supply data and specify keys for the titles of each dataset in JSON format. 

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
		titleKey="location"
		xKey="year"
		yKey="population" />
	)
}
```

- `data` is the only required prop
- `titleKey` defaults to `"title"`
- `xKey` defaults to `"x"`
- `yKey` defaults to `"y"`

### Color Customization
- `color`: defaults to preset palette
	- specify an array of color hex codes, e.g. `["#FF0000", "#00FF00", "#0000FF"]`
	- specify a function 

Note: legend is automatically generated

## Future Implementation

- `titleLabel` (string) defaults to `"title"`
- `xLabel` (string) defaults to `"x-axis"`
- `yLabel` (string) defaults to `"y-axis"`

### Axis Customization
- `xSteps` (integer) defaults to number calculated by program based off of x-axis data
	- specify number of steps on the x-axis
- `ySteps` (integer) defaults to number calculated by program based off of y-axis data
	- specify number of steps on the y-axis
- `xScale` defaults to `"lin"`
	- `"lin"`: linear scale
	- `"log"`: logarithmic scale (base 10)
	- `"per"`: percentage scale (0 to 100%)
- `yScale` defaults to `"lin"`, same possible values as `xScale`
- `xLines` defaults to `"none"`
	- `"none"`: no vertical backing lines for x-axis values
	- `"dash"`: dashed vertical backing lines
	- `"solid"`: solid vertical backing lines
- `yLines` defaults to `"none"`
	- `"none"`: no horizontal backing lines for y-axis values
	- `"dash"`: dashed horizontal backing lines
	- `"solid"`: solid horizontal backing lines
- `transpose`: defaults to `"no"`
	- `"no"`: first value of tuple on x-axis, second value of tuple on y-axis
	- `"yes"`: first value of tuple on y-axis, second value of tuple on x-axis

### Line Customization
- `shape`: defaults to `"none"`
	- `"none"`: line is continuous without any shape marking the data points
	- `"disc"`: data points are marked by a filled circle
	- `"circle"`: data points are marked by an unfilled circle
	- `"square"`: data points are marked by a square
	- `"triangle"`: data points are marked by a triangle

### Legend Customization
- `legendPosition`: defaults to `"right"`
	- `"none"`: no legend display
	- `"right"`: legend displayed to the right of the chart
	- `"left"`: legend displayed to the left of the chart
	- `"top"`: legend displayed on top of the chart (under the title)
	- `"bottom"`: legend displayed below the chart
