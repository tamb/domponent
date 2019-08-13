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
  return string.trim().split(relationalStringEnum.KEY_VALUE);
}
export function splitMultipleValues(string) {
  return string.trim().split(relationalStringEnum.MULTIPLE_VALUES);
}
export function splitPropsPassedIn(string) {
  return string.trim().split(relationalStringEnum.INHERITS_FROM);
}
export function splitMethodCalls(string) {
  return string.trim().split(relationalStringEnum.METHOD_CALL);
}
export function splitFromComponent(string) {
  return string.trim().split(relationalStringEnum.FROM_COMPONENT);
}
export function splitList(string){
  return string.trim().split(relationalStringEnum.LIST);
}
