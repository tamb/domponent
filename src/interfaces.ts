export interface IComponents {
  [key: string]: () => any;
}

export type IComponentInstances = WeakMap<HTMLElement, any>;

export interface IDataAttributes {
  action: string;
  bind: string;
  component: string;
  state: string;
  props: string;
  key: string;
  ref: string;
  ref_array: string;
}

export interface ICustomSyntax {
  METHOD_CALL: string;
  FROM_COMPONENT: string;
  INHERITS_FROM: string;
  KEY_VALUE: string;
  MULTIPLE_VALUES: string;
  LIST: string;
}

export interface IDomponentConfig {
  components: IComponents;
  registeredComponents?: IComponentInstances;
  selector: HTMLElement | string;
  dataAttributes: IDataAttributes;
  customSyntax: ICustomSyntax;
  watch?: boolean;
}

export interface IComponent extends IExponent{
  state: any;
  $s: any;
  $watchers: any;
  connected: () => void;
  setState: (newState?: any, fn?: Function) => void;
  stateWillUpdate: () => void;
  stateDidUpdate: () => void;
}

export interface IExponent {
  config: IDomponentConfig;
  $app: any;
  $el: HTMLElement;
  $components: IComponents;
  $watchers: any;
  connected: () => void;
  disconnected: () => void;
  propsWillUpdate: () => void;
  propsDidUpdate: () => void;
  setProps: (newProps?: any, fn?: Function) => void;
}