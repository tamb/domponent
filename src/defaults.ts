import { ICustomSyntax, IDataAttributes } from "./interfaces";

export const defaultDataAttributes: IDataAttributes = {
  component: "data-component",
  action: "data-action",
  bind: "data-bind",
  initialState: "data-state",
  initialProps: "data-props",
  key: "data-key",
  ref: "data-ref",
  refArray: "data-ref-array",
};

export const defaultRelationalStrings : ICustomSyntax = {
  INHERITS_FROM: "<-",
  FROM_COMPONENT: ".",
  KEY_VALUE: ":",
  MULTIPLE_VALUES: "|",
  METHOD_CALL: "->",
  LIST: ",",
};
