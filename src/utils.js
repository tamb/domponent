import { relationalStringEnum } from "./enums";

export function createKey() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function updateDOM(el, value) {
  el.textContent = value;
}

export function hasCallback(cb) {
  cb ? cb() : null;
}

// string parsing
export function splitKeyValuePairs(string) {
  return string
    .trim()
    .split(relationalStringEnum.KEY_VALUE)
    .map(item => item.trim());
}
export function splitMultipleValues(string) {
  return string
    .trim()
    .split(relationalStringEnum.MULTIPLE_VALUES)
    .map(item => item.trim());
}
export function splitPropsPassedIn(string) {
  /* START.DEV */
  if (!string.includes("<-")) {
    console.error(`🤓 -- "You have bad syntax on this data- value: ${string}.  
        You are not inheriting props correctly.  It should look like this 'myProp<-MyComponent.myStateField'`);
  }
  /* END.DEV */
  return string
    .trim()
    .split(relationalStringEnum.INHERITS_FROM)
    .map(item => item.trim());
}
export function splitMethodCalls(string) {
  /* START.DEV */
  if (!string.includes("->")) {
    console.error(`🤓 -- "You have bad syntax on this data- value: ${string}.  
      You are missing an arrow in your method call.  It should look like this 'DOMEvent->MyComponent.myMethod'`);
  }
  /* END.DEV */
  return string
    .trim()
    .split(relationalStringEnum.METHOD_CALL)
    .map(item => item.trim());
}
export function splitFromComponent(string) {
  /* START.DEV */
  if (!string.includes(".")) {
    console.error(`🤓 -- "You have bad syntax on this data- value: ${string}.  
    You need to have a period (.) like 'MyComponent.myField'`);
  }
  /* END.DEV */
  return string
    .trim()
    .split(relationalStringEnum.FROM_COMPONENT)
    .map(item => item.trim());
}
export function splitList(string) {
  return string
    .trim()
    .split(relationalStringEnum.LIST)
    .map(item => item.trim());
}
