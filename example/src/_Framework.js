// utils
function createKey() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
function splitColon(string) {
  return string.trim().split(":");
}
function splitPipe(string) {
  return string.trim().split("|");
}
function splitArrow(string) {
  return string.trim().split("<-");
}
function splitComma(string) {
  return string.trim().split(",");
}

export class Component {
  constructor(conf) {
    this.root = conf.rootEl;
    this.key = conf.key;
    this.__app = conf.app;
    this._createComponent();
    this._initState();
  }
  // internal methods
  _bindListeners() {
    this.root.querySelectorAll("[data-action]").forEach(el => {
      const actions = splitPipe(el.getAttribute("data-action"));
      actions.forEach(action => {
        const parts = splitColon(action);
        const event = parts[0];
        const cbFunc = parts[1];
        el.addEventListener(event, e => this[cbFunc](e));
      }, this);
    }, this);
  }
  _createComponent() {
    this.dependents = new Set();
    this.props = {};
    this.state = {};
    this.propObjects = this._createPropObjects();
    this.stateObjects = this._createStateObjects();
    this._bindListeners();
    this.componentMade();
  }
  _createPropObjects() {
    const attr = this.root.getAttribute("data-props");
    if (attr) {
      const propObjects = {};
      const props = splitPipe(attr);
      props.forEach(prop => {
        const propStringValues = splitArrow(prop);
        const parentComponentValues = splitColon(propStringValues[1]);
        const propName = propStringValues[0];
        const parentComponent = this.__app.registeredComponents[
          parentComponentValues[0]
        ];
        const parentComponentKey = parentComponentValues[1];
        parentComponent.dependents.add(this.key);

        const els = [...this.root.querySelectorAll(`[data-bind^="props:${propName}"]`)];
        this.props[propName] = parentComponent.state[parentComponentKey];
        propObjects[propName] = {
          parentComponent,
          parentComponentKey,
          els: els.length > 0? els : null
        };
      }, this);
      return propObjects;
    } else {
      return null;
    }
  }
  _createStateObjects() {
    const nodes = this.root.querySelectorAll('[data-bind^="state:"]');
    if (nodes.length > 0) {
      const stateObjects = {};
      nodes.forEach(el => {
        const newStateObject = {};
        const states = splitPipe(el.getAttribute("data-bind"));
        states.forEach(state => {
          const parts = splitColon(state);
          const stateKey = parts[1];
          let attrs = parts[2];
          if (attrs) {
            attrs = splitComma(attrs);
          }
          newStateObject.el = el;
          newStateObject.attrs = attrs;

          if (!stateObjects[stateKey]) {
            stateObjects[stateKey] = [];
          }
          stateObjects[stateKey].push(newStateObject);
        });
      }, this);
      return stateObjects;
    }
    return null;
  }
  _initState() {
    const stateAttr = this.root.getAttribute("data-state");
    if (stateAttr) {
      const fields = splitPipe(stateAttr);
      const state = {};
      fields.forEach(field => {
        const splitField = splitColon(field);
        state[splitField[0]] = splitField[1];
      });
      this.setState(state);
    }
  }
  _updateDependents(updatedProps) {
    this.dependents.forEach(key => {
      this.__app.registeredComponents[key]._updateProps(updatedProps);
    });
  }
  _updateDOM(el, value, attrs) {
    if (attrs) {
      splitComma(attrs).forEach(attr => {
        this.updateAttr(el, attr, value);
      });
      return;
    }
    el.textContent = value;
  }
  _updateProps(updatedProps) {
    this.propsWillUpdate();
    const oldProps = Object.assign({}, this.props);
    for (let key in this.propObjects) {
      const obj = this.propObjects[key];
      if (updatedProps.includes(this.propObjects[key].parentComponentKey)) {
        this.props[key] = obj.parentComponent.state[obj.parentComponentKey];
        if(this.propObjects[key].els){
          this.propObjects[key].els.forEach(el=>{
            this._updateDOM(el, this.props[key]);
          });
        }
      }
    }
    this.propsDidUpdate(oldProps);
  }

  // lifecycle methods
  componentMade() {}
  propsWillUpdate() {}
  propsDidUpdate() {}
  stateWillUpdate() {}
  stateDidUpdate() {}

  // public setters
  setState(newState = this.state, fn) {
    this.stateWillUpdate();
    const propsToUpdate = [];
    for (let stateKey in newState) {
      if (newState[stateKey] !== this.state[stateKey]) {
        propsToUpdate.push(stateKey);
        this.state[stateKey] = newState[stateKey];
        const els = [
          ...this.root.querySelectorAll(`[data-bind="state:${stateKey}"]`)
        ];

        if (els.length > 0) {
          els.forEach(el => {
            this._updateDOM(el, newState[stateKey]);
          });
        }
      }
    }
    if (this.dependents.size > 0) {
      this._updateDependents(propsToUpdate);
    }
    fn ? fn() : null;
    this.stateDidUpdate();
  }
}

// generates the App
function InitApp(config) {
  // components and their instances
  this.components = config.components;
  this.registeredComponents = {};

  // methods to expose
  // create component
  this._cc = (el, cb) => {
    const key = el.getAttribute("data-key") || createKey();
    this.registeredComponents[key] = new config.components[
      (el.getAttribute("data-component"))
    ]({ rootEl: el, key, app: this });
    cb ? cb() : null;
  };
  // delete component
  this._dc = (key, cb) => {
    delete this.registeredComponents[key];
    cb ? cb() : null;
  };
  // register component
  this._rc = (name, C, cb) => {
    this.components[name] = C;
    cb ? cb() : null;
  };
  // unregister component
  this._urc = (name, cb) => {
    delete this.component[name];
    cb ? cb() : null;
  };

  // creating the components initially
  [...config.selector.querySelectorAll("[data-component]")].forEach(
    componentEl => {
      this._cc(componentEl);
    },
    this
  );
  config.appCreated ? config.appCreated() : null;

  // exposing methods
  return {
    createComponent: (el, cb) => this._cc(el, cb),
    deleteComponent: (el, cb) => this._dc(el, cb),
    register: (name, C, cb) => this._rc(name, C, cb),
    unregister: (name, cb) => this._urc(name, cb)
  };
}
// generates the app
export default InitApp;
