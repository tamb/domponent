import { VNodeFlags } from 'inferno-vnode-flags';
import { VNode } from '../../core/types';
/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
export declare function processElement(flags: VNodeFlags, vNode: VNode, dom: Element, nextPropsOrEmpty: any, mounting: boolean, isControlled: boolean): void;
export declare function addFormElementEventHandlers(flags: VNodeFlags, dom: Element, nextPropsOrEmpty: any): void;
export declare function isControlledFormElement(nextPropsOrEmpty: any): boolean;
