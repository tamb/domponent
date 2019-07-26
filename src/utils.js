export function createKey() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export function splitColon(string) {
  return string.trim().split(":");
}
export function splitPipe(string) {
  return string.trim().split("|");
}
export function splitArrow(string) {
  return string.trim().split("<-");
}
export function splitComma(string) {
  return string.trim().split(",");
}
export function splitHash(string) {
  return string.trim().split("#");
}
export function updateDOM(el, value) {
  el.textContent = value;
}
