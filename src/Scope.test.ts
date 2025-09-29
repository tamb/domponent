import { describe, test, expect, beforeEach } from "vitest";
import Scope from "./Scope";
import { defaultDataAttributes } from "./defaults";

describe("Scope class", () => {
  let element: HTMLElement;
  let app: any;
  let config: any;

  beforeEach(() => {
    document.body.innerHTML = "";
    
    element = document.createElement("div");
    element.setAttribute("data-component", "TestScope");
    element.id = "test-scope";
    document.body.appendChild(element);

    app = {
      $datasets: defaultDataAttributes,
      registeredComponents: new WeakMap()
    };

    config = {
      element,
      app,
      key: "test-key-123"
    };
  });

  describe("Constructor", () => {
    test("initializes with correct element", () => {
      const scope = new Scope(config);
      
      expect(scope.$root).toBe(element);
    });

    test("initializes with correct app reference", () => {
      const scope = new Scope(config);
      
      expect(scope.$app).toBe(app);
    });

    test("initializes with correct key", () => {
      const scope = new Scope(config);
      
      expect(scope.$key).toBe("test-key-123");
    });

    test("extracts component name from DOM element", () => {
      const scope = new Scope(config);
      
      expect(scope.$name).toBe("TestScope");
    });

    test("handles different component names", () => {
      element.setAttribute("data-component", "CustomComponentName");
      
      const scope = new Scope(config);
      
      expect(scope.$name).toBe("CustomComponentName");
    });

    test("handles element without data-component attribute", () => {
      element.removeAttribute("data-component");
      
      const scope = new Scope(config);
      
      expect(scope.$name).toBeNull();
    });
  });

  describe("Properties", () => {
    test("$root property is HTMLElement", () => {
      const scope = new Scope(config);
      
      expect(scope.$root).toBeInstanceOf(HTMLElement);
      expect(scope.$root.tagName).toBe("DIV");
    });

    test("$app property maintains reference", () => {
      const customApp = { custom: "property", $datasets: defaultDataAttributes };
      const customConfig = { ...config, app: customApp };
      
      const scope = new Scope(customConfig);
      
      expect(scope.$app).toBe(customApp);
      expect(scope.$app.custom).toBe("property");
    });

    test("$key property is string", () => {
      const scope = new Scope(config);
      
      expect(typeof scope.$key).toBe("string");
      expect(scope.$key.length).toBeGreaterThan(0);
    });

    test("$name property extracted correctly", () => {
      const scope = new Scope(config);
      
      expect(typeof scope.$name).toBe("string");
      expect(scope.$name).toBe("TestScope");
    });
  });

  describe("Different element types", () => {
    test("works with different HTML elements", () => {
      const spanElement = document.createElement("span");
      spanElement.setAttribute("data-component", "SpanComponent");
      
      const spanConfig = { ...config, element: spanElement };
      const scope = new Scope(spanConfig);
      
      expect(scope.$root).toBe(spanElement);
      expect(scope.$name).toBe("SpanComponent");
    });

    test("works with form elements", () => {
      const formElement = document.createElement("form");
      formElement.setAttribute("data-component", "FormComponent");
      
      const formConfig = { ...config, element: formElement };
      const scope = new Scope(formConfig);
      
      expect(scope.$root).toBe(formElement);
      expect(scope.$name).toBe("FormComponent");
    });

    test("works with custom elements", () => {
      const customElement = document.createElement("custom-element");
      customElement.setAttribute("data-component", "CustomElement");
      
      const customConfig = { ...config, element: customElement };
      const scope = new Scope(customConfig);
      
      expect(scope.$root).toBe(customElement);
      expect(scope.$name).toBe("CustomElement");
    });
  });

  describe("Data attributes configuration", () => {
    test("uses custom data attributes from app config", () => {
      const customApp = {
        $datasets: {
          ...defaultDataAttributes,
          component: "custom-component"
        },
        registeredComponents: new WeakMap()
      };

      element.removeAttribute("data-component");
      element.setAttribute("data-custom-component", "CustomNamedComponent");
      
      const customConfig = { ...config, app: customApp };
      const scope = new Scope(customConfig);
      
      expect(scope.$name).toBe("CustomNamedComponent");
    });

    test("handles missing component attribute gracefully", () => {
      element.removeAttribute("data-component");
      
      const scope = new Scope(config);
      
      expect(scope.$name).toBeNull();
      expect(scope.$root).toBe(element);
      expect(scope.$key).toBe("test-key-123");
    });

    test("handles empty component attribute", () => {
      element.setAttribute("data-component", "");
      
      const scope = new Scope(config);
      
      expect(scope.$name).toBe("");
    });

    test("handles whitespace in component attribute", () => {
      element.setAttribute("data-component", "  SpacedComponent  ");
      
      const scope = new Scope(config);
      
      expect(scope.$name).toBe("  SpacedComponent  ");
    });
  });

  describe("Error handling", () => {
    test("handles null element gracefully", () => {
      const nullConfig = { ...config, element: null };
      
      expect(() => {
        new Scope(nullConfig);
      }).toThrow();
    });

    test("handles undefined app gracefully", () => {
      const undefinedAppConfig = { ...config, app: undefined };
      
      expect(() => {
        new Scope(undefinedAppConfig);
      }).toThrow();
    });

    test("handles missing key", () => {
      const { key, ...configWithoutKey } = config;
      
      const scope = new Scope(configWithoutKey);
      
      expect(scope.$key).toBeUndefined();
    });

    test("handles undefined key", () => {
      const undefinedKeyConfig = { ...config, key: undefined };
      
      const scope = new Scope(undefinedKeyConfig);
      
      expect(scope.$key).toBeUndefined();
    });
  });

  describe("Multiple instances", () => {
    test("creates independent instances", () => {
      const element2 = document.createElement("div");
      element2.setAttribute("data-component", "SecondComponent");
      
      const config2 = {
        element: element2,
        app,
        key: "second-key"
      };

      const scope1 = new Scope(config);
      const scope2 = new Scope(config2);
      
      expect(scope1.$root).not.toBe(scope2.$root);
      expect(scope1.$key).not.toBe(scope2.$key);
      expect(scope1.$name).not.toBe(scope2.$name);
      expect(scope1.$app).toBe(scope2.$app); // Same app reference
    });

    test("each instance maintains its own state", () => {
      const configs = Array.from({ length: 5 }, (_, i) => {
        const el = document.createElement("div");
        el.setAttribute("data-component", `Component${i}`);
        return {
          element: el,
          app,
          key: `key-${i}`
        };
      });

      const scopes = configs.map(cfg => new Scope(cfg));
      
      scopes.forEach((scope, index) => {
        expect(scope.$name).toBe(`Component${index}`);
        expect(scope.$key).toBe(`key-${index}`);
        expect(scope.$root.getAttribute("data-component")).toBe(`Component${index}`);
      });
    });
  });

  describe("Property immutability", () => {
    test("properties reference correct objects after creation", () => {
      const scope = new Scope(config);
      
      const originalRoot = scope.$root;
      const originalApp = scope.$app;
      const originalKey = scope.$key;
      const originalName = scope.$name;
      
      // Properties should not change after creation
      expect(scope.$root).toBe(originalRoot);
      expect(scope.$app).toBe(originalApp);
      expect(scope.$key).toBe(originalKey);
      expect(scope.$name).toBe(originalName);
    });

    test("app reference is maintained", () => {
      const scope = new Scope(config);
      
      // Modifying app object should be reflected in scope
      app.newProperty = "test";
      expect(scope.$app.newProperty).toBe("test");
    });
  });
});