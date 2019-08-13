import {
  splitFromComponent,
  splitKeyValuePairs,
  splitMethodCalls,
  splitMultipleValues,
  splitPropsPassedIn
} from './utils';

export function scopeElements(selector) {
  return [...this.$root.querySelectorAll(selector)].filter(el => {
    return el.closest(`[data-${this.$app.$datasets.component}]`) === this.$root;
  });
}

export function createStateObjects() {
  const nodes = scopeElements.call(this, '[data-bind^="state:"]');
  if (nodes.length > 0) {
    const stateObjects = {};
    nodes.forEach(el => {
      const newStateObject = {};
      const states = splitMultipleValues(el.getAttribute("data-bind"));
      states.forEach(state => {
        const parts = splitKeyValuePairs(state);
        const stateKey = splitFromComponent(parts[1])[1];
        newStateObject.el = el;
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

export function initState() {
  const stateAttr = this.$root.getAttribute("data-state");
  if (stateAttr) {
    const fields = splitMultipleValues(stateAttr);
    const state = {};
    fields.forEach(field => {
      const splitField = splitKeyValuePairs(field);
      state[splitField[0]] = splitField[1];
    });
    this.setState(state);
  }
}

export function bindListeners() {
  this.$bindings = [];
  scopeElements.call(this,`[data-${this.$app.$datasets.action}]`).forEach(el => {
    const actions = splitMultipleValues(
      el.getAttribute(`data-${this.$app.$datasets.action}`)
    );
    const binding = {
      el: el,
      actions: [],
    };
    actions.forEach(action => {
      const parts = splitMethodCalls(action);
      const event = parts[0];
      const cbFunc = splitFromComponent(parts[1]);
      if (cbFunc[0] === this.$name) {
        let options = {};
        if(parts[2]){
          options = JSON.parse(parts[2]);
        }
        const handler = this[cbFunc[1]].bind(this);
        el.addEventListener(event, handler, options);  
        binding.actions.push({
          event,
          handler,
          options
        });
      }
    }, this);
    this.$bindings.push(binding);
  }, this);
}

export function unbindListeners() {
  this.$bindings.forEach(binding => {
    binding.actions.forEach(action => {
      binding.el.removeEventListener(action.event, action.handler, action.options);
    }, this);
  }, this);
}

export function updateDependents(updatedProps) {
  this.dependents.forEach(key => {
    updateProps.call(this.$app.registeredComponents[key], updatedProps);
  });
}

export function updateProps(updatedProps) {
  this.propsWillUpdate();
  const oldProps = Object.assign({}, this.props);
  for (let key in this.propObjects) {
    const obj = this.propObjects[key];
    if (updatedProps.includes(this.propObjects[key].parentComponentKey)) {
      this.props[key] = obj.parentComponent.state[obj.parentComponentKey];
      if (this.propObjects[key].els) {
        this.propObjects[key].els.forEach(el => {
          updateDOM(el, this.props[key]);
        });
      }
    }
  }
  this.propsDidUpdate(oldProps);
}

export function createPropObjects() {
    const attr = this.$root.getAttribute(`data-${this.$app.$datasets.props}`);
    if (attr) {
      const propObjects = {};
      const props = splitMultipleValues(attr);
      props.forEach(prop => {
        const propStringValues = splitPropsPassedIn(prop);
        const parentComponentValues = splitKeyValuePairs(propStringValues[1]);
        const propName = propStringValues[0];
        const parentComponent = this.$app.registeredComponents[
          parentComponentValues[0]
        ];
        const parentComponentKey = parentComponentValues[1];
        parentComponent.dependents.add(this.$key);
  
        const els = [
          ...scopeElements.call(this, 
            `[${this.$app.$datasets.bind}^="props:${propName}"]`
          )
        ];
        this.props[propName] = parentComponent.state[parentComponentKey];
        propObjects[propName] = {
          parentComponent,
          parentComponentKey,
          els: els.length > 0 ? els : null
        };
      }, this);
      return propObjects;
    } else {
      return null;
    }
  }