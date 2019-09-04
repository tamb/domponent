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

test("No keys match in a set of 100k", () => {
  const keys = new Set();
  for (let i = 0; i < 100000; i++) {
    keys.add(createKey());
  }
  expect(keys.size).toBe(100000);
});

test("String with pipe to trim and split", () => {
  const string = " Nelson| Mandela ";
  const arr = splitMultipleValues(string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with forward arrow to trim and split", () => {
  const string = " Nelson-> Mandela ";
  const arr = splitMethodCalls(string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with dot to trim and split", () => {
  const string = " Nelson .  Mandela ";
  const arr = splitFromComponent(string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with colon to trim and split", () => {
  const string = " Nelson :  Mandela ";
  const arr = splitKeyValuePairs(string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with comma to trim and split", () => {
  const string = " Nelson ,  Mandela ";
  const arr = splitList(string);
  expect(arr.length).toBe(2);
  expect(arr[0]).toBe("Nelson");
  expect(arr[1]).toBe("Mandela");
});

test("String with back arrow to trim and split", () => {
  const string = " Nelson <- Mandela ";
  const arr = splitPropsPassedIn(string);
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
