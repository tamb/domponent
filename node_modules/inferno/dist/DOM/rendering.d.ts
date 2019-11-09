import { InfernoNode, VNode } from '../core/types';
export declare function __render(input: VNode | null | InfernoNode | undefined, parentDOM: Element | SVGAElement | ShadowRoot | DocumentFragment | HTMLElement | Node | null, callback: Function | null, context: any): void;
export declare function render(input: VNode | null | InfernoNode | undefined, parentDOM: Element | SVGAElement | ShadowRoot | DocumentFragment | HTMLElement | Node | null, callback?: Function | null, context?: any): void;
export declare function createRenderer(parentDOM?: any): (lastInput: any, nextInput: any, callback: any, context: any) => void;
