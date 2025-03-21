// import { this.$app.$syntax } from "./enums";

import { IComponent, IExponent } from "./interfaces";

/**
 *
 * @returns a random UUID string
 * @description Uses the built-in crypto API to generate a random UUID.
 * This is a more secure and modern way to generate UUIDs compared to the old method of using Math.random().
 */
export function createKey(): string {
  return window.crypto.randomUUID();
}

/**
 *
 * @param el - the DOM element to update
 * @param value - the value to set
 * @description Updates the text content or value of a DOM element based on its type.
 * If the element is an input, it sets the value property. Otherwise, it sets the textContent.
 */
export function updateDOM(
  el: HTMLElement | HTMLInputElement,
  value: string
): void {
  if (el.tagName.toUpperCase() === "INPUT") {
    (el as HTMLInputElement).value = value;
  } else {
    el.textContent = value;
  }
}

/**
 *
 * @param cb - a callback function
 * @description Executes the callback function if it is defined and not null.
 * This is a utility function to safely call callbacks without throwing errors.
 */
export function hasCallback(cb: Function | undefined | null): void {
  cb ? cb() : null;
}

export function splitKeyValuePairs(
  this: IComponent | IExponent,
  str: string
): string[] {
  return str
    .trim()
    .split(this.$app.$syntax.KEY_VALUE)
    .map((item) => item.trim());
}
export function splitMultipleValues(
  this: IComponent | IExponent,
  str: string
): string[] {
  return str
    .trim()
    .split(this.$app.$syntax.MULTIPLE_VALUES)
    .map((item) => item.trim());
}
export function splitPropsPassedIn(
  this: IComponent | IExponent,
  str: string
): string[] {
  return str
    .trim()
    .split(this.$app.$syntax.INHERITS_FROM)
    .map((item) => item.trim());
}
export function splitMethodCalls(
  this: IComponent | IExponent,
  str: string
): string[] {
  return str
    .trim()
    .split(this.$app.$syntax.METHOD_CALL)
    .map((item) => item.trim());
}
export function splitFromComponent(
  this: IComponent | IExponent,
  str: string
): string[] {
  return str
    .trim()
    .split(this.$app.$syntax.FROM_COMPONENT)
    .map((item) => item.trim());
}
export function splitList(this: IComponent | IExponent, str: string): string[] {
  return str
    .trim()
    .split(this.$app.$syntax.LIST)
    .map((item) => item.trim());
}
