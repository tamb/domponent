# 🔌\<DOMponent />
__Make components with the HTML you already have.__
<br/>
__<1.3kb gzipped and <3.3kb minified! 👌__


## How To:
1. Drop a few `data` attributes into your existing HTML 💻
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
2. Write a JavaScript `class` component 🔌
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
3. Initialize the App ⚡
```js
import Init from 'domponent';
import Counter from './Counter.js';

const config = {
  selector: document.getElementById('root'),
  components: {
    Counter
  },
  appCreated: callbackFunction
};

new Init(config);

```
__And you're good to go!!__

------
## Docs 📖

### Install
```js
npm install --save domponent
```

### `data` API 💽

#### `data-component`
We use this bad boy to match the component name to its corresponding `class` in the `Init` configuration object

example: if your HTML is `data-component="Counter"` | you must have a component in your config called `Counter`

#### `data-bind`
Binds `state` or `props` to the `textContent` of an element
First you specify if you want to bind `state` or  `props` `data-bind="state:count"` or `data-bind="props:count"`
The left half of the `:` tells the component what object to bind to (state or props), the right half tells the component what key within the state or props to read from

#### `data-action`
Binds a DOM event with a component method.
Consider the following:
```html
<button data-action="click:increment">
+1
</button>
```
The left half of the `:` represents the literal string for the DOM event to listen for.  The right half corresponds to the component method

Note: You can add multiple listeners with a pipe `|`
example:
```html
<button data-action="click:increment|mouseover:anotherMethod">
+1
</button>
 ```
#### `data-state`
If you want to instantiate your component with a particular state __in memory__ you must attach a `data-state` attribute to the __root element__ of the component
example:
```
<div data-component="Counter" data-state="count:24">
  ...
</div>
```

For multiple keys within the state, use a pipe `|` like so: `count:24|isEven:true`

#### `data-key`
This is totally optional.  It's a _unique_ string for _each_ component instance.  
```html
<div data-component="Counter" data-key="aUniqueKey">
  ...
</div>
```
Let's say you're looping over this in your templating language.  You should ensure your keys are unique.
```html
  # for (let i=0; i<10; i++){
    <div data-component="Counter" key=`aUniqueKey${i}`>...</div>
  }
```
If you don't use this attribute, a unique key will be assigned to each component instance automatically.  It can be accessed via `this.key`

#### `data-props`
You can share state from a parent component as `props` in a child component.
The markup would look like this
```html
<div data-component="Counter" key="parentCounter">
   <div data-props="myAwesomeProp<-parentCounter:ofFive" data-component="DisplayAnything">
</div>
```
The left side of the arrow `->` is the name of the prop in the `DisplayAnything` component.
The Right side of the arrow is `key` of the parent component, a colon `:` and the name of the piece of `state` to inherit.

You can then use the lifecycle methods `propsWillUpdate` and `propsDidUpdate` to make changes within your child component.


### Extending the `Component` class 📏
Let's continue with Counter.  The minimum js needed to create a component is below:
```js
class Counter extends Component{
  constructor(el){
    super(el)
  }
}
```
`super` adds the base methods and properties your component needs.

### Managing Component State 🕹️
`setState(stateObject, callbackFunction)`
This follows React's setState = - although it's implemented differently. 

### LifeCycle Methods 🧬
The following are methods you can use to access components at various points in their lifecycle
* `componentMade`
* `stateWillUpdate`
* `stateDidUpdate`
* `propsWillUpdate`
* `propsDidUpdate`

### `Init` function
This function creates the app and registers all the components.  This takes a `config` object as required argument:
```js
const config = {
  selector: document.getElementById('root'),
  components: Counter,
  appCreated: callbackFunction
};

const App = new Init(config);
```
It then exposes the following methods:
* createComponent
* deleteComponent
* register
* unregister

### Dynamically adding and removing components 🤼

#### Adding components
##### `createComponent`
  @params:  
  * {Element} a DOM element to create the component instance
  * {Function} optional callback function
##### `register`
  @params 
  * {Component} a component definition
  * {Function} optional callback function

#### Deleting components
##### `deleteComponent`
@params: 
* {String} - key of the component _instance_ you want to delete, can be assigned via `data-key` or accessed inside component via `this.key`
* {Function} optional callback function

##### `unregister`
@params: 
* {String} - key of the component _defintion_ you want to delete, can be assigned via `data-key` or accessed inside component via `this.key`
* {Function} optional callback function

### Demo
https://codesandbox.io/embed/domponent-1oqdt?fontsize=14

### An overview of application lifecycle 🕵️‍♂️

![mounting a component](https://github.com/tamb/domponent/blob/master/domponent-mounting-lifecycle.jpg)
--------
![updating component](https://raw.githubusercontent.com/tamb/domponent/master/domponent-lifecycle.jpg)
