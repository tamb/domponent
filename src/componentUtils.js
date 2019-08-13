import {
  splitFromComponent,
  splitKeyValuePairs,
  splitMethodCalls,
  splitMultipleValues,
  splitPropsPassedIn,
  splitList
} from './utils';

import { eventOptions } from './enums';

export function scopeElements(selector) {
  return [...this.$root.querySelectorAll(selector)].filter(el => {
    return el.closest(`[data-${this.$app.$datasets.component}]`) === this.$root;
  });
}

export function createStateObjects() {
  const nodes = scopeElements.call(this, '[data-bind^="state:"]');
  if (nodes.length > 0) {
    const $stateObjs = {};
    nodes.forEach(el => {
      const newStateObject = {};
      const states = splitMultipleValues(el.getAttribute("data-bind"));
      states.forEach(state => {
        const parts = splitKeyValuePairs(state);
        const stateKey = splitFromComponent(parts[1])[1];
        newStateObject.el = el;
        if (!$stateObjs[stateKey]) {
          $stateObjs[stateKey] = [];
        }
        $stateObjs[stateKey].push(newStateObject);
      });
    }, this);
    return $stateObjs;
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
        if(cbFunc[2]){
          const arr = splitList(cbFunc[2]);
          for(let key in eventOptions){
            options[eventOptions[key]] = arr.includes(eventOptions[key]);
          }
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
  console.log('REMOVING:', this);
  this.$bindings.forEach(binding => {
    console.log('binding', binding);
    binding.actions.forEach(action => {
      binding.el.removeEventListener(action.event, action.handler, action.options);
    }, this);
  }, this);
}

export function updateDependents(updatedProps) {
  this.$dependents.forEach(key => {
    updateProps.call(this.$app.registeredComponents[key], updatedProps);
  });
}

export function updateProps(updatedProps) {
  this.propsWillUpdate();
  const oldProps = Object.assign({}, this.props);
  for (let key in this.$propObjs) {
    const obj = this.$propObjs[key];
    if (updatedProps.includes(this.$propObjs[key].parentComponentKey)) {
      this.props[key] = obj.parentComponent.state[obj.parentComponentKey];
      if (this.$propObjs[key].els) {
        this.$propObjs[key].els.forEach(el => {
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
      const $propObjs = {};
      const props = splitMultipleValues(attr);
      props.forEach(prop => {
        const propStringValues = splitPropsPassedIn(prop);
        const parentComponentValues = splitKeyValuePairs(propStringValues[1]);
        const propName = propStringValues[0];
        const parentComponent = this.$app.registeredComponents[
          parentComponentValues[0]
        ];
        const parentComponentKey = parentComponentValues[1];
        parentComponent.$dependents.add(this.$key);
  
        const els = [
          ...scopeElements.call(this, 
            `[${this.$app.$datasets.bind}^="props:${propName}"]`
          )
        ];
        this.props[propName] = parentComponent.state[parentComponentKey];
        $propObjs[propName] = {
          parentComponent,
          parentComponentKey,
          els: els.length > 0 ? els : null
        };
      }, this);
      return $propObjs;
    } else {
      return null;
    }
  }