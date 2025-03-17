import Scope from "./Scope";

describe("Tests Scope class", () => {
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
    }
  };

  const config = {
    app,
    key,
    element: document.querySelector(`#${id}`)
  };

  const MyScope = new Scope(config);

  test("Scope is created with proper $root element", () => {
    expect(MyScope.$root).toBe(config.element);
  });

  test("Scope is created with proper $app object", () => {
    expect(MyScope.$app).toBe(app);
  });

  test("Scope is created with proper $key", () => {
    expect(MyScope.$key).toBe(key);
  });

  test("Scope is created with proper $name from DOM", () => {
    expect(MyScope.$name).toBe(componentName);
  });
});
