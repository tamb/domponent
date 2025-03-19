export interface IComponents {
  [key: string]: () => any;
}

export interface IComponentInstances {
  [key: string]: any;
}

export interface IDataAttributes {
  action: string;
  bind: string;
  component: string;
  initialState: string;
  initialProps: string;
  key: string;
  ref: string;
  refArray: string;
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
