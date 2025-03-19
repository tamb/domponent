import Exponent from "./Exponent";
import { relationalStringEnum, datasetEnum } from "./enums";

import { toHaveAttribute } from "@testing-library/jest-dom/matchers";

expect.extend({ toHaveAttribute });

describe("Tests Exponent class", () => {
  const componentName = "HelloWorld";
  const id = "mything";
  const key = "myKey";

  const image = `<img data-ref="${componentName}.img"/>`;

  const html = `
        <div id="${id}" data-component="${componentName}">
            <h1>Hello from component</h1>
            ${image}

            <i data-ref-array="${componentName}.icons"></i>;
            <i data-ref-array="${componentName}.icons"></i>;
            <i data-ref-array="${componentName}.icons"></i>;
            <i data-ref-array="${componentName}.icons"></i>;

        </div>
    `;

  document.body.innerHTML = html;

  const app = {
    $datasets: datasetEnum,
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

  test("Exponent holds $refs object", () => {
    expect(typeof MyExponent.$refs).toBe("object");
  });

  test("Exponent $refs to have img", () => {
    expect(MyExponent.$refs.img).toBeDefined();
    expect(MyExponent.$refs).toHaveProperty("img");
    expect(MyExponent.$refs.img).toHaveAttribute(
      "data-ref",
      `${componentName}.img`
    );
  });

  test("Exponent $refs to have icons", () => {
    expect(MyExponent.$refs.icons).toBeDefined();
    expect(MyExponent.$refs).toHaveProperty("icons");
    expect(MyExponent.$refs.icons[0]).toHaveAttribute(
      "data-ref-array",
      `${componentName}.icons`
    );
  });
});
