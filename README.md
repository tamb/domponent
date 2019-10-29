# 🔌\<DOMponent />

**Build UI Components with the HTML You Already Have.**
<br/>
**2kb gzipped and 5kb minified! 👌**

[![](https://data.jsdelivr.com/v1/package/npm/domponent/badge)](https://www.jsdelivr.com/package/npm/domponent)
[![](https://img.shields.io/npm/dw/domponent)](https://www.npmjs.com/package/domponent)
[![](https://img.shields.io/bundlephobia/minzip/domponent?color=green)](https://www.npmjs.com/package/domponent)
[![](https://img.shields.io/github/license/tamb/domponent?color=informational)](https://www.github.com/tamb/domponent)
[![](https://img.shields.io/npm/v/domponent)](https://www.npmjs.com/package/domponent)

## How To:

1. Drop a few `data` attributes into your existing HTML 💻

```html
<div data-component="Counter">
  <p data-bind="state:Counter.count">0</p>
  <button data-action="click->Counter.decrement">
    -1
  </button>
  <button data-action="click->Counter.increment">
    +1
  </button>
</div>
```

2. Write a JavaScript `class` component 🔌

```js
import { Component } from "domponent";

export default class Counter extends Component {
  constructor(el) {
    super(el);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}
```

3. Initialize the App ⚡

```js
import { Init } from "domponent";
import Counter from "./Counter.js";

const config = {
  selector: document.getElementById("root"),
  components: {
    Counter
  },
  appCreated: callbackFunction
};

new Init(config);
```

**And you're good to go!!**

---

## Docs 📖

- [Purpose](#purpose-️)
- [Demo](#demo-)
- [Install](#install-)
- [Data API](#data-API-)
  - [data-component](#data-component)
  - [data-bind](#data-bind)
  - [data-action](#data-action)
  - [data-state](#data-state)
  - [data-ref](#data-ref)
  - [data-ref-array](#data-ref-array)
  - [data-key](#data-key)
  - [data-props](#data-props)
- [Extending the Component class](#extending-the-component-class-)
- [Managing Component State](#managing-component-state-%EF%B8%8F)
- [Lifecycle Methods](#lifecycle-methods-)
- [Stateless Components](#stateless-components-)
- [Component Fields](#component-fields-)
- [Init Function](#init-function-)
- [Adding and Removing Components](#adding-and-removing-components-)
- [Namespacing Data Attributes](#namespacing-data-attributes-)
- [Development Mode](#development-mode-)
- [Syntax Examples](#syntax-examples-)
- [Component Lifecycle](#component-lifecycle-%EF%B8%8F%EF%B8%8F)
- [Who Uses Domponent](#who-uses-domponent-%EF%B8%8F)

### Purpose ✔️

#### What does this do?

This library sets up a clean and modern way to turn prerendered HTML into UI components. You can easily implement some data-binding, handle scope, pass data around, and create components by using some of the conventions in this script. It's meant to be a very _very_ lightweight alternative to StimulusJS with a bit of a React flavor (lifecycle methods, props and component state).

#### What does this library _not_ do?

DOMponent does not handle client-side rendering out of the box, does not create virtual DOM, does not diff DOM (though it does diff state and props).
It's not meant to handle routing or entire application state. It's meant to take HTML fragments (Thymeleaf, Rails, Pug, whatever template engine you use) and create reusable functionality in the form of Components.

#### Differences to KnockoutJS

DOMponent is similar to Knockout in some ways.  
* it is template language-agnostic
* the syntax looks similar
* ... that's kinda about it.

Unlike KnockoutJS, DOMponent is 
* component-driven
* has customizable syntax 
* is only 5kb (that's a 51kb savings)
* is highly declarative
* allows for highly specific DOM references
* has lifecycle methods
* performs as fast as InfernoJS

_Knockout_

HTML
```html
<p>First name: <input data-bind="value: firstName" /></p>
<p>Last name: <input data-bind="value: lastName" /></p>
<h2>Hello, <span data-bind="text: fullName"> </span>!</h2>
```
JS
```js
// Here's my data model
var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
 
    this.fullName = ko.pureComputed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);
};
 
ko.applyBindings(new ViewModel("Planet", "Earth")); /
```

_DOMponent_

HTML
```html
<div data-component="Hello">
  <p>First name: <input data-action="input->Hello.setFirstName" /></p>
  <p>Last name: <input data-action="input->Hello.setLastName"/></p>
  <h2>Hello, <span data-bind="state:Hello.fullName"> </span>!</h2>
</div>
```
JS
```js
import { Component } from "domponent";

export default class Hello extends Component {
  constructor(conf) {
    super(conf);      
  }
    
  setFirstName(event) {
    this.setState({ firstName: event.target.value }, ()=> {
       this.setFullName();
    });
  }
   setLastName(event) {
    this.setState({ lastName: event.target.value }, ()=> {
       this.setFullName();
    });
  }

  setFullName(){
    this.setState({fullName: `${this.state.firstName} ${this.state.lastName}`})
  }
}
```
<hr/>
 
### Demo 🤖

[https://tamb.github.io/domponent/](https://tamb.github.io/domponent/)

Todo List: https://codesandbox.io/embed/domponent-todo-with-undo-redo-sp3s2?fontsize=14

**Local Demo** 😉

1. `git clone` this repo
2. `npm install`
3. `npm run build:html-dev` or `npm run build:html-prod`

<hr/>

### Install 📥

#### npm

```js
npm install --save domponent
```

**You can use an ES5 version by importing this file** `domponent/dist/domponent.es5.production.min.js`

If you're not using a transpiler, it's recommended to use the ES5 UMD. So here's the JSDelvr link:

```js
// production
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/domponent@VERSION/dist/domponent.es5.production.min.js" defer></script>

// development
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/domponent@VERSION/dist/domponent.es5.development.min.js" defer></script>
```

<hr/>

### data API 💽

#### `data-component`

We use this bad boy to match the component name to its corresponding `class` in the `Init` configuration object

example: if your HTML is `data-component="Counter"` | you must have a component in your config called `Counter`

#### `data-bind`

Binds `state` or `props` to the `textContent` of an element
First you specify if you want to bind `state` or `props` `data-bind="state:Counter.count"` or `data-bind="props:Counter.count"`
The left half of the `:` tells the component what object to bind to (state or props), the right half tells the component what key within the state or props to read from

#### `data-action`

Binds a DOM event with a component method.
Consider the following:

```html
<button data-action="click->Counter.increment">
  +1
</button>
```

The left half of the `:` represents the literal string for the DOM event to listen for. The right half corresponds to the component method

Note: You can add multiple listeners with a pipe `|`
example:

```html
<button data-action="click->Counter.increment|mouseover->Counter.anotherMethod">
  +1
</button>
```

You can pass `eventListener` options in as well. Options must be after a `.` after the class method. The options must be separated by a comma `,`.

```html
<button
  data-action="click->Counter.increment.passive,capture|mouseover->Counter.anotherMethod.once,passive"
>
  +1
</button>
```

#### `data-state`

If you want to instantiate your component with a particular state **in memory** you must attach a `data-state` attribute to the **root element** of the component
example:

```
<div data-component="Counter" data-state='{"count":24, "isEven": true}'>
  ...
</div>
```

That's right. `data-state` takes any valid JSON object.

#### `data-ref`

If you need to reference DOM elements, you can use `data-ref` like so:

```html
<div data-ref="Counter.myElement"></div>
```

You need to preface which component the element is on.

You can then access the element in `Counter` using `this.myElement` within the Component instance.

#### `data-ref-array`

You can create an array of elements in your component this way:

```html
<div data-ref-array="Counter.elements"></div>
<div data-ref-array="Counter.elements"></div>
```

You can access the array of elements in your component with `this.elements`.

#### `data-key`

This is totally optional. It's a _unique_ string for _each_ component instance.  
This is used internally to bind props. Therefore you must know the `$key` of the component you are receiving props from.

```html
<div data-component="Counter" data-key="aUniqueKey">
  ...
</div>
```

Let's say you're looping over this in your templating language. You should ensure your keys are unique.

```html
# for (let i=0; i<10; i++){
<div data-component="Counter" key="`aUniqueKey${i}`">...</div>
}
```

If you don't use this attribute, a unique key will be assigned to each component instance automatically. It can be accessed via `this.$key`

#### `data-props`

You can share state from a parent component as `props` in a child component.
The markup would look like this

```html
<div data-component="Counter" key="parentCounter">
  <div
    data-props="myAwesomeProp<-parentCounter:ofFive"
    data-component="DisplayAnything"
  ></div>
</div>
```

The left side of the arrow `<-` is the name of the prop in the `DisplayAnything` component.
The Right side of the arrow is `$key` of the parent component, a colon `:` and the name of the piece of `state` to inherit.

You can then use the lifecycle methods `propsWillUpdate` and `propsDidUpdate` to make changes within your child component.

<hr/>

### Extending the `Component` class 📏

Let's continue with Counter. The minimum js needed to create a component is below:

```js
class Counter extends Component {
  constructor(conf) {
    super(conf);
  }
}
```

`super` adds the base methods and properties your component needs.

<hr/>

### Managing Component State 🕹️

Don't mutate the state directly. Call `this.setState`

```js
setState(stateObject, callbackFunction);
```

This is similar in concept to React's setState - although it's implemented differently.

<hr/>

### LifeCycle Methods 🌳

The following are methods you can use to access components at various points in their lifecycle

| Lifecycle Method | Context            | Description                                                                                              |
| ---------------- | ------------------ | -------------------------------------------------------------------------------------------------------- |
| connecting       | Component/Exponent | Before the library wires up any of your Component/Exponent and you have access to other methods          |
| connected        | Component/Exponent | After your Component/Exponent is wired up and all eventListeners are in place                            |
| disconnecting    | Component/Exponent | Before removing eventListeners and deleting Component/Exponent from memory                               |
| propsWillUpdate  | Component/Exponent | Before the props are updated within your component, no DOM mutations have happened                       |
| propsDidUpdate   | Component/Exponent | After the props have updated and the DOM has changed                                                     |
| stateWillUpdate  | Component          | Before the state of the current component or any of its dependents' props have changed                   |
| stateDidUpdate   | Component          | Child components with inherited props have done their DOM manipulations and state and props have changed |

<hr/>

### Stateless Components 😐

Extend the `Exponent` class to create a component with _only_ `props`
This is slightly lighterweight than a `Component`.  Quicker to wire up and takes up less memory.

```
import { Exponent } from 'domponent'

class StatelessThing extends Exponent{
  constructor(conf){
    super(conf);
  }
}
```

You will then only have access to:

- `propsWillUpdate`
- `propsDidUpdate`

**Why `Exponent`??**  
<br/>
Because it simply interprets or _expounds_ the data that it is given... and it sounds like Component.

<hr/>

### Component Fields 🌵

Components or Exponents will be given the following fields.

| Field Name | Type    | Access  | Context            | Description                                         |
| ---------- | ------- | ------- | ------------------ | --------------------------------------------------- |
| \$app      | object  | public  | Component/Exponent | The entire Domponent application                    |
| \$b        | array   | private | Component/Exponent | eventListener bindings for internal use             |
| \$d        | object  | private | Component          | The parent components references to its children    |
| \$key      | string  | public  | Component/Exponent | Unique identifier for the component instance        |
| \$name     | string  | public  | Component/Exponent | The name of the component type                      |
| \$p        | object  | private | Component/Exponent | Internal collection of props and its DOM references |
| props      | object  | public  | Component/Exponent | Key/Value pairs of data passed                      |
| \$root     | element | public  | Component/Exponent | The root DOM Node of the component                  |
| \$s        | object  | private | Component          | Internal collection of state and its DOM references |
| state      | object  | public  | Component          | Key/Value pairs of data which can be updated        |

<hr/>

### `Init` function 🏇

This function creates the app and registers all the components. This takes a `config` object as required argument:

```js
const config = {
  selector: document.getElementById("root"),
  components: { Counter },
  appCreated: callbackFunction
};

const App = new Init(config);
```

It then exposes the following methods:

- createComponent
- deleteComponent
- register
- unregister
  <hr/>

### Adding and removing components 🤼

#### Adding components

##### `createComponent`

@params:

- {Element} a DOM element to create the component instance
- {Function} optional callback function

```js
App.createComponent(document.getElementById("added-html"), callback);
```

##### `register`

@params

- {Component} a component definition
- {Function} optional callback function

```js
App.register(NewComponent, callback);
```

#### Deleting components

##### `deleteComponent`

@params:

- {String} - key of the component _instance_ you want to delete, can be assigned via `data-key` or accessed inside component via `this.$key`
- {Function} optional callback function

```js
App.deleteComponent("my-component-instance-key", callback);
```

##### `unregister`

@params:

- {String} - The name of the key you used to register your component on app Init.
- {Function} optional callback function

```js
App.unregister("NewComponent", callback);
```

  <hr/>

### Namespacing data attributes 📇

To avoid `data-` attributes clashing with other selectors, libraries, etc. you can override the default attribute names in the app config object:

```js
Init({
  selector: getElementById('root),
  components: { Counter },
  dataAttributes: {
    component: 'mynamespace-component',
    state: 'cool-state',
  }
});
```

This means that your HTML will look like this:

```html
<div data-mynamespace-component="Counter" data-cool-state='{"count":12}'>
  ...
</div>
```

<hr/>

### Development Mode 🤓

When developing with Domponent, using the development build adds helpful errors and logs
to your console from Development Dom (this guy->) 🤓

The easiest way to use this is with Webpack Aliases:

```js
resolve: argv.mode === 'development'? {
      alias: {
        domponent: 'domponent/dist/domponent.development.js'
      }
    }: {},

```

This way your development build of webpack will swap out the production version of Domponent for the version sprinkled with help from Dom.

<hr/>

### Syntax Examples 🔤

You can write your component HTML for various templating engines and _include_ them as partials/fragments/whatever your engine refers to as "chunks of HTML".

Here are some examples of how you might use Domponent.

**Note:** Despite these syntax differences in the markup, remember that the component is simply a JS class ✌️

**Pug Syntax Example** 🐶

```js
// counter.pug
mixin counter(count)
 div(data-component="Counter" data-state=`
    {
      "count": count,
      "isEven": count % 2 === 0
    }
  `)
   p(data-bind="state:Counter.count") #{count}
   button(data-action="click->Counter.increment") +1
   button(data-action="click->Counter.decrement") -1

// usage
+counter(101119)
+counter(61316)
```

**Thymeleaf Syntax Example** 🍃

```html
// counter.html
<div
  data-component="Counter"
  th:fragment="Counter"
  th:data-state='|{"count":${count}, "isEven": ${count % 2 == 0}}|'
>
  <p data-bind="state:Counter.count" th:text="${count}"></p>
  <button data-action="click->Counter.increment">
    +1
  </button>
  <button data-action="click->Counter.decrement">
    -1
  </button>
</div>

// usage
<th:block th:replace="./counter.html  :: Counter(count: 1289)" />
<th:block th:replace="./counter.html  :: Counter(count: 491)" />
```

<!--
**Razor Syntax Example** ⚔️

```html
// counter.html
<div data-component="Counter">
  <p
    data-bind="state:Counter.count"
    data-state='{"count":@(count), "isEven": @(count % 2 == 0)}'
  >
    @count
  </p>
  <button data-action="click->Counter.increment">
    +1
  </button>
  <button data-action="click->Counter.decrement">
    -1
  </button>
</div>
```
-->
<!--
__Ruby on Rails Syntax Example__ 💎
coming soon...

__Mustache Syntax Example__ 👺
coming soon...


coming soon... -->

<hr/>

### Component Lifecycle 🕵️‍♂️

![updating component](https://raw.githubusercontent.com/tamb/domponent/master/domponent-lifecycle.jpg)

<hr/>

### Who Uses Domponent 🛠️

Submit an Issue with the `Uses` Label and include a logo to add.
