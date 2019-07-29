import Exponent from '../Exponent';

export class Component extends Exponent{
    constructor(el) {
      super(el);
      this._createComponent();
      this._initState();
    }
    // internal methods
    _createComponent() {
      this.dependents = new Set();
      this.props = {};
      this.state = {};
      this.propObjects = this._createPropObjects();
      this.stateObjects = this._createStateObjects();
      this._bindListeners();
      this.componentMade();
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
    // _updateDOM(el, value) {
    //   el.textContent = value;
    // }
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