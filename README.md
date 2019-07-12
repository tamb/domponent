# DOMponent
__Make components with the HTML you already have__


## How To:
1. Take some server-side rendered HTML
   * Drop in a few `data` attributes
```html

<div data-component="Counter">
  <p data-bind="state:count">0</p>
  <button data-action="click:increment">
  +1
  </button>
  <button data-action="click:decrement">
  -1
  </button>
<div>


```
2. Write a JavaScript `class` component
```js
import { Component } from 'domponent';

export default class Counter extends Component{
  constructor(el){
    super(el);
  }
  
  increment(){
   this.setState({count: (this.state.count + 1)});  
  }
  
  decrement(){
   this.setState({count: (this.state.count - 1)});  
  }
}

```
3. Initialize the App
```js
import Init from 'domponent';
import Counter from './Counter.js';

const config = {
  selector: document.getElementById('root),
  components: {
    Counter
  }
};

new Init(config);

```
__And you're good to go!!__

## `data` API

### `data-component`
We use this bad boy to match the component name to its corresponding `class` in the `Init` configuration object

example: if `data-component="Counter"` | you must have a component in your config called `Counter`

### `data-bind`

### `data-action`

### `data-state`

### `data-props`

## Extending the `Component` class

## Managing Component State
## LifeCycle Methods
