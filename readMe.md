# Ent: Treemaps for react
Intelligent and customizable treemap components for your wicked cool projects.

![Tree!](docs/img/tree-photo.jpg)

## Installation
Only works with React projects. React must be installed separately.
```bash
npm install react-ent
```

Then with a module bundler like webpack/browserify that supports CommonJS/ES2015 modules, use as you would anything else.

```javascript
import TreeMap from 'react-ent'
```

## API
Ent is designed to create beautiful treemaps right out of the box. The only *required* input is properly formatted data.

### Basic Usage
In the simplest case, just supply data and specify the keys for the titles and weights -:

```javascript
render() {
  let populations = {
    {country: "China", population: 1388232693},
    {country: "India", population: 1342512706},
    {country: "USA", population: 326474013},
  }

  return(
    <TreeMap data={populations} titleKey="country"
      weightKey="population" />
  )
}
```

- `data` is the only required prop
- `titleKey` defaults to `"title"`
- `weightKey` defaults to `"weight"`
