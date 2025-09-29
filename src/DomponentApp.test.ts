import { describe, test, expect, beforeEach, vi, afterEach } from "vitest";
import { DomponentApp, Component, Exponent } from "./index";

describe("DomponentApp", () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = "";
    container = document.createElement("div");
    container.id = "test-container";
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Initialization", () => {
    test("creates app with default configuration", () => {
      const app = new DomponentApp({
        components: {},
        selector: container
      });

      expect(app).toBeDefined();
      expect(app.components).toEqual({});
      expect(app.registeredComponents).toBeInstanceOf(WeakMap);
    });

    test("creates app with custom data attributes", () => {
      const customDataAttributes = {
        component: "my-component",
        action: "my-action",
        bind: "my-bind",
        state: "my-state",
        props: "my-props",
        key: "my-key",
        ref: "my-ref",
        refArray: "my-ref-array"
      };

      const app = new DomponentApp({
        components: {},
        selector: container,
        dataAttributes: customDataAttributes
      });

      expect(app.$datasets.component).toBe("my-component");
      expect(app.$datasets.action).toBe("my-action");
    });

    test("creates app with custom syntax", () => {
      const customSyntax = {
        METHOD_CALL: "#",
        FROM_COMPONENT: "~",
        INHERITS_FROM: "<=",
        KEY_VALUE: "=",
        MULTIPLE_VALUES: "&",
        LIST: ";"
      };

      const app = new DomponentApp({
        components: {},
        selector: container,
        customSyntax
      });

      expect(app.$syntax.METHOD_CALL).toBe("#");
      expect(app.$syntax.FROM_COMPONENT).toBe("~");
    });

    test("initializes with string selector", () => {
      const app = new DomponentApp({
        components: {},
        selector: "#test-container"
      });

      expect(app).toBeDefined();
    });

    test("creates components on initialization", () => {
      class TestComponent extends Component {
        constructor(config: any) {
          super(config);
        }
      }

      container.innerHTML = `
        <div data-component="TestComponent" id="comp1"></div>
        <div data-component="TestComponent" id="comp2"></div>
      `;

      const app = new DomponentApp({
        components: { TestComponent },
        selector: container
      });

      const comp1 = document.getElementById("comp1");
      const comp2 = document.getElementById("comp2");

      expect(app.registeredComponents.get(comp1 as HTMLElement)).toBeDefined();
      expect(app.registeredComponents.get(comp2 as HTMLElement)).toBeDefined();
    });
  });

  describe("Component creation", () => {
    let TestComponent: any;
    let app: DomponentApp;

    beforeEach(() => {
      TestComponent = class TestComponent extends Component {
        constructor(config: any) {
          super(config);
        }

        testMethod() {
          return "test";
        }
      };

      app = new DomponentApp({
        components: { TestComponent },
        selector: container
      });
    });

    test("createComponent creates and registers component", () => {
      const element = document.createElement("div");
      element.setAttribute("data-component", "TestComponent");
      container.appendChild(element);

      app.createComponent(element);

      const component = app.registeredComponents.get(element);
      expect(component).toBeDefined();
      expect(component.$name).toBe("TestComponent");
    });

    test("createComponent with callback executes callback", () => {
      const callback = vi.fn();
      const element = document.createElement("div");
      element.setAttribute("data-component", "TestComponent");
      container.appendChild(element);

      app.createComponent(element, callback);

      expect(callback).toHaveBeenCalled();
    });

    test("createComponent uses custom key when provided", () => {
      const element = document.createElement("div");
      element.setAttribute("data-component", "TestComponent");
      element.setAttribute("data-key", "custom-key");
      container.appendChild(element);

      app.createComponent(element);

      const component = app.registeredComponents.get(element);
      expect(component.$key).toBe("custom-key");
    });

    test("createComponent generates key when not provided", () => {
      const element = document.createElement("div");
      element.setAttribute("data-component", "TestComponent");
      container.appendChild(element);

      app.createComponent(element);

      const component = app.registeredComponents.get(element);
      expect(component.$key).toBeDefined();
      expect(typeof component.$key).toBe("string");
    });
  });

  describe("DOM observation", () => {
    let TestComponent: any;
    let app: DomponentApp;

    beforeEach(() => {
      TestComponent = class TestComponent extends Component {
        constructor(config: any) {
          super(config);
        }
      };

      app = new DomponentApp({
        components: { TestComponent },
        selector: container,
        watch: true
      });
    });

    test("automatically creates components when elements are added", async () => {
      const newElement = document.createElement("div");
      newElement.setAttribute("data-component", "TestComponent");
      newElement.id = "new-component";

      container.appendChild(newElement);

      // Wait for MutationObserver to trigger
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const component = app.registeredComponents.get(newElement);
      expect(component).toBeDefined();
    });

    test("starts and stops observing", () => {
      expect(app.observer).not.toBeNull();
      
      app.stopObserving();
      expect(app.observer).toBeNull();
      
      app.startObserving(container);
      expect(app.observer).not.toBeNull();
    });

    test("can be initialized without watching", () => {
      const appNoWatch = new DomponentApp({
        components: { TestComponent },
        selector: container,
        watch: false
      });

      expect(appNoWatch.observer).toBeNull();
    });

    test("observes with string selector", () => {
      app.stopObserving();
      app.startObserving("#test-container");
      expect(app.observer).not.toBeNull();
    });
  });

  describe("Component registration", () => {
    test("registers multiple component types", () => {
      class ComponentA extends Component {
        constructor(config: any) {
          super(config);
        }
      }

      class ComponentB extends Exponent {
        constructor(config: any) {
          super(config);
        }
      }

      container.innerHTML = `
        <div data-component="ComponentA"></div>
        <div data-component="ComponentB"></div>
      `;

      const app = new DomponentApp({
        components: { ComponentA, ComponentB },
        selector: container
      });

      const elementA = container.querySelector('[data-component="ComponentA"]') as HTMLElement;
      const elementB = container.querySelector('[data-component="ComponentB"]') as HTMLElement;

      expect(app.registeredComponents.get(elementA)).toBeDefined();
      expect(app.registeredComponents.get(elementB)).toBeDefined();
    });

    test("handles missing component gracefully", () => {
      container.innerHTML = `<div data-component="NonExistentComponent"></div>`;

      expect(() => {
        new DomponentApp({
          components: {},
          selector: container
        });
      }).toThrow();
    });
  });

  describe("Configuration merging", () => {
    test("merges default data attributes with custom ones", () => {
      const app = new DomponentApp({
        components: {},
        selector: container,
        dataAttributes: {
          component: "custom-component"
        } as any
      });

      expect(app.$datasets.component).toBe("custom-component");
      expect(app.$datasets.action).toBe("action"); // default value
      expect(app.$datasets.bind).toBe("bind"); // default value
    });

    test("merges default syntax with custom syntax", () => {
      const app = new DomponentApp({
        components: {},
        selector: container,
        customSyntax: {
          METHOD_CALL: "#"
        } as any
      });

      expect(app.$syntax.METHOD_CALL).toBe("#");
      expect(app.$syntax.FROM_COMPONENT).toBe("."); // default value
      expect(app.$syntax.KEY_VALUE).toBe(":"); // default value
    });
  });

  describe("Error handling", () => {
    test("handles invalid selector gracefully", () => {
      expect(() => {
        new DomponentApp({
          components: {},
          selector: "#non-existent-element"
        });
      }).toThrow();
    });

    test("handles null element in createComponent", () => {
      const app = new DomponentApp({
        components: {},
        selector: container
      });

      expect(() => {
        app.createComponent(null as any);
      }).toThrow();
    });
  });

  describe("WeakMap component storage", () => {
    test("components are properly stored in WeakMap", () => {
      class TestComponent extends Component {
        constructor(config: any) {
          super(config);
        }
      }

      const element = document.createElement("div");
      element.setAttribute("data-component", "TestComponent");
      container.appendChild(element);

      const app = new DomponentApp({
        components: { TestComponent },
        selector: container
      });

      const component = app.registeredComponents.get(element);
      expect(component).toBeDefined();
      expect(component).toBeInstanceOf(TestComponent);
    });

    test("WeakMap allows garbage collection when element is removed", () => {
      class TestComponent extends Component {
        constructor(config: any) {
          super(config);
        }
      }

      let element: HTMLElement | null = document.createElement("div");
      element.setAttribute("data-component", "TestComponent");
      container.appendChild(element);

      const app = new DomponentApp({
        components: { TestComponent },
        selector: container
      });

      // Component should exist
      expect(app.registeredComponents.get(element)).toBeDefined();

      // Remove element from DOM
      element.remove();
      
      // Reference should still exist in WeakMap until element is garbage collected
      expect(app.registeredComponents.get(element)).toBeDefined();
      
      // Simulate garbage collection by removing our reference
      element = null;
      
      // At this point, the WeakMap entry would be eligible for garbage collection
      // We can't directly test garbage collection, but we've verified the WeakMap behavior
    });
  });
});
