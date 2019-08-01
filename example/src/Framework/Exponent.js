import Scope from "./Scope";

import {
  splitPropsPassedIn,
  splitKeyValuePairs,
  splitMultipleValues,
  splitMethodCalls
} from "./utils";

function bindListeners() {
  this.scopeElements(`[data-${this.$app.$datasets.action}]`).forEach(el => {
    const actions = splitMultipleValues(
      el.getAttribute(`data-${this.$app.$datasets.action}`)
    );
    actions.forEach(action => {
      const parts = splitMethodCalls(action);
      const event = parts[0];
      const cbFunc = splitFromComponent(parts[1]);
      if (cbFunc[0] === this.$name) {
        el.addEventListener(event, e => this[cbFunc[1]](e));
      }
    }, this);
  }, this);
}

function createPropObjects() {
  const attr = this.$root.getAttribute(`data-${this.$app.$datasets.props}`);
  if (attr) {
    const propObjects = {};
    const props = splitPipe(attr);
    props.forEach(prop => {
      const propStringValues = splitPropsPassedIn(prop);
      const parentComponentValues = splitKeyValuePairs(propStringValues[1]);
      const propName = propStringValues[0];
      const parentComponent = this.__app.registeredComponents[
        parentComponentValues[0]
      ];
      const parentComponentKey = parentComponentValues[1];
      parentComponent.dependents.add(this.key);

      const els = [
        ...this.$root.querySelectorAll(
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

export default class Exponent extends Scope {
  constructor(config) {
    super(config);
    console.log('in exponent')

    this.props = {};
    this.propObjects = createPropObjects.call(this);
    bindListeners.call(this);
    this.constructor.name == 'Exponent'? this.created(): null;
    this.dependents = new Set();
  }

  created() {}

  _updateDependents(updatedProps) {
    this.dependents.forEach(key => {
      this.__app.registeredComponents[key]._updateProps(updatedProps);
    });
  }

  updateProps(updatedProps) {
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

  propsWillUpdate() {}

  propsDidUpdate() {}
}
