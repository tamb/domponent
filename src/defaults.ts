import { ICustomSyntax, IDataAttributes } from "./interfaces";

export const defaultDataAttributes: IDataAttributes = {
  component: "component",
  action: "action",
  bind: "bind",
  state: "state",
  props: "props",
  key: "key",
  ref: "ref",
  ref_array: "ref-array",
};

export const defaultRelationalStrings : ICustomSyntax = {
  INHERITS_FROM: "<-",
  FROM_COMPONENT: ".",
  KEY_VALUE: ":",
  MULTIPLE_VALUES: "|",
  METHOD_CALL: "->",
  LIST: ",",
};
