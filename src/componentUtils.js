import {
  splitFromComponent,
  splitKeyValuePairs,
  splitMethodCalls,
  splitMultipleValues,
  splitPropsPassedIn,
  splitList
} from "./utils";

import { eventOptions } from "./enums";

export function createStateObjects() {
  const self = this;

  const nodes = scopeElements.call(
    this,
    `[data-${this.$app.$datasets.bind}^="state${this.$app.$syntax.KEY_VALUE}"]`
  );
  if (nodes.length > 0) {
    const $s = {};
    nodes.forEach(el => {
      const newStateObject = {};
      /* START.DEV */
      try {
        /* END.DEV */
        var states = splitMultipleValues.call(
          self,
          el.getAttribute(`data-${this.$app.$datasets.bind}`)
        );
        /* START.DEV */
      } catch (err) {
        console.error(`🤓 -- "There's a problem creating the state.
        You have a syntax error splitting multiple values on element: 
        ${el} with error: ${err}"`);
      }
      /* END.DEV */
      states.forEach(state => {
        /* START.DEV */
        try {
          /* END.DEV */
          var parts = splitKeyValuePairs.call(self, state);
          /* START.DEV */
        } catch (err) {
          console.error(`🤓 -- "There's a problem creating the state.
          You have a syntax error splitting key/value pairs on element: 
          ${el} with error: ${err}"`);
        }
        /* END.DEV */
        /* START.DEV */
        try {
          /* END.DEV */
          var stateKey = splitFromComponent.call(self, parts[1])[1];
          /* START.DEV */
        } catch (err) {
          console.error(`🤓 -- "There's a problem creating the state.
          You have a syntax error splitting fields from components on element: 
          ${el} with error: ${err}"`);
        }
        /* END.DEV */
        newStateObject.el = el;
        if (!$s[stateKey]) {
          $s[stateKey] = [];
        }
        $s[stateKey].push(newStateObject);
      });
    }, this);
    return $s;
  }
  /* START.DEV */
  if (nodes.length === 0) {
    console.warn(
      `🤓 -- "You are creating state but not binding state values to any DOM elements.  Is this intended? 
    If not, check your binding syntax from within this root element `,
      this.$root
    );
  }
  /* END.DEV */
  return null;
}

export function initState() {
  const stateAttr = this.$root.getAttribute(
    `data-${this.$app.$datasets.state}`
  );
  if (stateAttr) {
    this.state = JSON.parse(stateAttr);
  } else {
    this.state = {};
  }
}

export function bindListeners() {
  const self = this;
  this.$b = [];
  let arr = this.$root.getAttribute(`data-${this.$app.$datasets.action}`)
    ? [this.$root]
    : [];
  arr
    .concat(scopeElements.call(this, `[data-${this.$app.$datasets.action}]`))
    .forEach(el => {
      const actions = splitMultipleValues.call(
        self,
        el.getAttribute(`data-${this.$app.$datasets.action}`)
      );
      const binding = {
        el: el,
        actions: []
      };
      actions.forEach(action => {
        const parts = splitMethodCalls.call(self, action);
        const event = parts[0];
        const cbFunc = splitFromComponent.call(self, parts[1]);
        if (cbFunc[0] === this.$name) {
          let options = {};
          if (cbFunc[2]) {
            const arr = splitList.call(self, cbFunc[2]);
            for (let key in eventOptions) {
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
      this.$b.push(binding);
    }, this);
}

export function unbindListeners() {
  /* START.DEV */
  const me = this;
  try {
    /* END.DEV */
    this.$b.forEach(binding => {
      binding.actions.forEach(action => {
        binding.el.removeEventListener(
          action.event,
          action.handler,
          action.options
        );
      }, this);
    }, this);
    /* START.DEV */
  } catch (err) {
    console.error(`🤓 -- "You had this issue:
  ${err}
  removing eventListeners while deleting this component:  
  ${me}
  ... You'll still listen to me though? Right?? I love our chats.`);
  }
  /* END.DEV */
}

export function updateDependents(updatedProps) {
  /* START.DEV */
  const me = this;
  try {
    /* END.DEV */
    this.$d.forEach(key => {
      updateProps.call(this.$app.registeredComponents[key], updatedProps);
    });
    /* START.DEV */
  } catch (err) {
    console.error(`🤓 -- "You had this issue:
    ${err} 
    updating the dependents of this component: 
    ${me}...
    Can I DEPEND on your for a ride to the airport?... Friend??"`);
  }
  /* END.DEV */
}

export function updateProps(updatedProps) {
  this.propsWillUpdate();
  const oldProps = Object.assign({}, this.props);
  for (let key in this.$p) {
    const obj = this.$p[key];
    if (updatedProps.includes(this.$p[key].parentComponentKey)) {
      this.props[key] = obj.parentComponent.state[obj.parentComponentKey];
      if (this.$p[key].els) {
        this.$p[key].els.forEach(el => {
          updateDOM(el, this.props[key]);
        });
      }
    }
  }
  this.propsDidUpdate(oldProps);
}

export function createPropObjects() {
  const self = this;
  const attr = this.$root.getAttribute(`data-${this.$app.$datasets.props}`);
  if (attr) {
    const $p = {};
    const props = splitMultipleValues.call(self, attr);
    props.forEach(prop => {
      const propStringValues = splitPropsPassedIn.call(self, prop);
      const parentComponentValues = splitKeyValuePairs.call(
        self,
        propStringValues[1]
      );
      const propName = propStringValues[0];
      const parentComponent = this.$app.registeredComponents[
        parentComponentValues[0]
      ];
      const parentComponentKey = parentComponentValues[1];
      parentComponent.$d.add(this.$key);

      const els = [
        ...scopeElements.call(
          this,
          `[${this.$app.$datasets.bind}^="props${this.$app.$syntax.KEY_VALUE}${propName}"]`
        )
      ];
      this.props[propName] = parentComponent.state[parentComponentKey];
      $p[propName] = {
        parentComponent,
        parentComponentKey,
        els: els.length > 0 ? els : null
      };
    }, this);
    return $p;
  } else {
    return null;
  }
}

export function createRefs() {
  const self = this;

  scopeElements
    .call(
      this,
      `[data-${this.$app.$datasets.ref}*='${this.$name}${this.$app.$syntax.FROM_COMPONENT}']`
    )
    .forEach(element => {
      this[
        splitFromComponent.call(
          self,
          element.getAttribute(`data-${this.$app.$datasets.ref}`)
        )[1]
      ] = element;
    });
}

export function createRefArrays() {
  let prevKey = null;
  const self = this;

  scopeElements
    .call(
      this,
      `[data-${this.$app.$datasets.ref_array}*='${this.$name}${this.$app.$syntax.FROM_COMPONENT}']`
    )
    .forEach(element => {
      const key = splitFromComponent.call(
        self,
        element.getAttribute(`data-${this.$app.$datasets.ref_array}`)
      )[1];
      if (key === prevKey) {
        this[key].push(element);
      } else {
        prevKey = key;
        this[key] = [];
        this[key].push(element);
      }
    });
}

export function scopeElements(selector) {
  return [...this.$root.querySelectorAll(selector)].filter(el => {
    return (
      el.closest(
        `[data-${this.$app.$datasets.component}="${this.$root.getAttribute(
          "data-" + this.$app.$datasets.component
        )}"]`
      ) === this.$root
    );
  });
}
