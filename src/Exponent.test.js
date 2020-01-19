import Exponent from "./Exponent";
import { relationalStringEnum } from "./enums";

describe("Tests Exponent class", () => {
  const componentName = "HelloWorld";
  const id = "mything";
  const key = "myKey";

  document.body.innerHTML = `
        <div id="${id}" data-component="${componentName}">
            <h1>Hello from component</h1>
        </div>
    `;

  const app = {
    $datasets: {
      component: "component"
    },
    $syntax: relationalStringEnum
  };

  const config = {
    app,
    key,
    element: document.querySelector(`#${id}`)
  };

  const MyExponent = new Exponent(config);

  test("Exponent is created with proper $root element", () => {
    expect(MyExponent.$root).toBe(config.element);
  });

  test("Exponent is created with proper $app object", () => {
    expect(MyExponent.$app).toBe(app);
  });

  test("Exponent is created with proper $key", () => {
    expect(MyExponent.$key).toBe(key);
  });

  test("Exponent is created with proper $name from DOM", () => {
    expect(MyExponent.$name).toBe(componentName);
  });
});
