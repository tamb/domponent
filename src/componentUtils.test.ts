import {
  createStateObjects,
  initState,
  bindListeners,
  unbindListeners,
  updateDependents,
  updateProps,
  createPropObjects,
  createRefs,
  createRefArrays,
  scopeElements
} from "./componentUtils";

const that = {
  $app: {
    $datasets: {
      bind: "bind",
      state: "state",
      action: "action",
      props: "props",
      ref: "ref",
      ref_array: "ref-array",
      component: "component"
    },
    registeredComponents: {}
  }
};

describe("componentUtils", () => {
  test("empty test", () => {});
});
