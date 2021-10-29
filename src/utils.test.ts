/// <reference types="jest" />
/**
 * @jest-environment jsdom
 */

const {
  createKey,
  hasCallback,
  splitFromComponent,
  splitKeyValuePairs,
  splitList,
  splitMethodCalls,
  splitMultipleValues,
  splitPropsPassedIn,
  updateDOM
} = require("./utils");

const { relationalStringEnum } = require("./enums");

const app = {
  $app: {
    $syntax: relationalStringEnum
  }
};

test("No keys match in a set of 100k", () => {
  const keys = new Set();
  for (let i = 0; i < 100000; i++) {
    keys.add(createKey());
  }
  expect(keys.size).toBe(100000);
});

test("String with pipe to trim and split", () => {
  const string = " Nelson| Mandela ";
  const arr = splitMultipleValues.call(app, string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with forward arrow to trim and split", () => {
  const string = " Nelson-> Mandela ";
  const arr = splitMethodCalls.call(app, string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with dot to trim and split", () => {
  const string = " Nelson .  Mandela ";
  const arr = splitFromComponent.call(app, string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with colon to trim and split", () => {
  const string = " Nelson :  Mandela ";
  const arr = splitKeyValuePairs.call(app, string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with comma to trim and split", () => {
  const string = " Nelson ,  Mandela ";
  const arr = splitList.call(app, string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with back arrow to trim and split", () => {
  const string = " Nelson <- Mandela ";
  const arr = splitPropsPassedIn.call(app, string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("Callback function to fire", () => {
  const callback = jest.fn();
  hasCallback(callback);
  expect(callback.mock.calls.length).toBe(1);
});

test("UpdateDOM will update textContent", () => {
  const newContent = "<strong>Super Nelson Mandela!</strong>";

  document.body.innerHTML = `
        <div id="test">
            Nelson Mandela
        </div>
    `;
  const element = document.getElementById("test");
  updateDOM(element, newContent);
  expect(element.textContent).toBe(newContent);
});

test("UpdateDOM will update value", () => {
  const newContent = "Super Nelson Mandela!";

  document.body.innerHTML = `
        <input id="test">
    `;
  const element = document.getElementById("test") as HTMLInputElement;
  updateDOM(element, newContent);
  if (element.tagName === "INPUT") {
    expect(element.value).toBe(newContent);
  }
});
