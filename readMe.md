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

### Axis Customization
- `axisColor`: specify color of axis, defaults to #000000
- `scale`: specify scale of y-axis
	- `"lin"`: linear scale (default)
	- `"log"`: log scale
- `grid`: specify whether to have gridlines on or not
	- `"default"`: gridlines on (default)
	- `"none"`: gridlines off
- `gridColor`: specify color of gridlines, defaults to #DDDDDD
- `xLabel`: defaults to `xKey`
- `yLabel`: defaults to `yKey`
- `xSteps`: number of steps on the x-axis
- `ySteps`: number of steps on the y-axis
- `xTicks` specify whether to have ticks on x-axis
	- `"off"`: no ticks (default)
	- `"on"`: ticks displayed
- `yTicks` specify whether to have ticks on y-axis
	- `"off"`: no ticks (default)
	- `"on"`: ticks displayed
- `xAxisLine` specify whether to have the x-axis line
	- `"off"`: no line
	- `"on"`: line displayed (default)
- `yAxisLine` specify whether to have the x-axis line
	- `"off"`: no line
	- `"on"`: line displayed (default)
