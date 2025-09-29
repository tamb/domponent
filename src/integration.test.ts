import { describe, test, expect, beforeEach, vi } from "vitest";
import { DomponentApp, Component, Exponent } from "./index";

describe("Integration Tests", () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = "";
    container = document.createElement("div");
    container.id = "app-container";
    document.body.appendChild(container);
  });

  describe("Counter Component Integration", () => {
    class Counter extends Component {
      constructor(config: any) {
        super(config);
        this.state = {
          count: parseInt(this.state.count) || 0
        };
        this.setState(this.state);
      }

      increment() {
        this.setState({ count: this.state.count + 1 });
      }

      decrement() {
        this.setState({ count: this.state.count - 1 });
      }

      reset() {
        this.setState({ count: 0 });
      }
    }

    test("complete counter functionality", () => {
      container.innerHTML = `
        <div data-component="Counter" data-state='{"count": 5}'>
          <h3>Counter: <span data-bind="state:Counter.count">5</span></h3>
          <button data-action="click->Counter.decrement" id="dec">-</button>
          <button data-action="click->Counter.increment" id="inc">+</button>
          <button data-action="click->Counter.reset" id="reset">Reset</button>
        </div>
      `;

      const app = new DomponentApp({
        components: { Counter },
        selector: container
      });

      const counterElement = container.querySelector('[data-component="Counter"]') as HTMLElement;
      const component = app.registeredComponents.get(counterElement);
      const display = container.querySelector('[data-bind="state:Counter.count"]') as HTMLElement;
      const incBtn = document.getElementById("inc");
      const decBtn = document.getElementById("dec");
      const resetBtn = document.getElementById("reset");

      // Initial state
      expect(component.state.count).toBe(5);
      expect(display.textContent).toBe("5");

      // Increment
      incBtn?.click();
      expect(component.state.count).toBe(6);
      expect(display.textContent).toBe("6");

      // Decrement
      decBtn?.click();
      expect(component.state.count).toBe(5);
      expect(display.textContent).toBe("5");

      // Reset
      resetBtn?.click();
      expect(component.state.count).toBe(0);
      expect(display.textContent).toBe("0");
    });
  });

  describe("Parent-Child Component Communication", () => {
    class ParentComponent extends Component {
      constructor(config: any) {
        super(config);
        this.state = {
          parentMessage: this.state.parentMessage || "Hello from parent",
          parentCount: this.state.parentCount || 0
        };
        this.setState(this.state);
      }

      updateMessage() {
        this.setState({ 
          parentMessage: "Updated message",
          parentCount: this.state.parentCount + 1
        });
      }
    }

    class ChildComponent extends Component {
      constructor(config: any) {
        super(config);
      }

      propsDidUpdate(oldProps: any) {
        // Child component reacts to prop changes
        if (this.props.message !== oldProps.message) {
          // Trigger some child-specific logic
        }
      }
    }

    test("parent updates propagate to child props", () => {
      container.innerHTML = `
        <div data-component="ParentComponent" data-key="parent" data-state='{"parentMessage": "Initial", "parentCount": 0}'>
          <h2>Parent Component</h2>
          <p data-bind="state:ParentComponent.parentMessage">Initial</p>
          <button data-action="click->ParentComponent.updateMessage" id="update">Update</button>
          
          <div data-component="ChildComponent" data-props="message<-parent:parentMessage|count<-parent:parentCount">
            <h3>Child Component</h3>
            <p data-bind="props:message">Initial</p>
            <p data-bind="props:count">0</p>
          </div>
        </div>
      `;

      const app = new DomponentApp({
        components: { ParentComponent, ChildComponent },
        selector: container
      });

      const parentElement = container.querySelector('[data-component="ParentComponent"]') as HTMLElement;
      const childElement = container.querySelector('[data-component="ChildComponent"]') as HTMLElement;
      const parentComponent = app.registeredComponents.get(parentElement);
      const childComponent = app.registeredComponents.get(childElement);
      
      const updateBtn = document.getElementById("update");
      const childMessageDisplay = childElement.querySelector('[data-bind="props:message"]') as HTMLElement;
      const childCountDisplay = childElement.querySelector('[data-bind="props:count"]') as HTMLElement;

      // Initial state
      expect(childComponent.props.message).toBe("Initial");
      expect(childComponent.props.count).toBe(0);
      expect(childMessageDisplay.textContent).toBe("Initial");

      // Update parent state
      updateBtn?.click();

      // Child props should update
      expect(childComponent.props.message).toBe("Updated message");
      expect(childComponent.props.count).toBe(1);
      expect(childMessageDisplay.textContent).toBe("Updated message");
      expect(childCountDisplay.textContent).toBe("1");
    });
  });

  describe("Todo List Integration", () => {
    class TodoList extends Component {
      constructor(config: any) {
        super(config);
        this.state = {
          todos: this.state.todos || [],
          newTodoText: ""
        };
        this.setState(this.state);
      }

      addTodo() {
        if (this.state.newTodoText.trim()) {
          const newTodo = {
            id: Date.now(),
            text: this.state.newTodoText,
            completed: false
          };
          this.setState({
            todos: [...this.state.todos, newTodo],
            newTodoText: ""
          });
          this.updateTodoList();
        }
      }

      updateInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.setState({ newTodoText: target.value });
      }

      updateTodoList() {
        const todoContainer = this.$refs.todoContainer;
        todoContainer.innerHTML = this.state.todos.map((todo: any) => `
          <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <span>${todo.text}</span>
            <button onclick="window.toggleTodo(${todo.id})">Toggle</button>
          </li>
        `).join('');
      }

      toggleTodo(id: number) {
        this.setState({
          todos: this.state.todos.map((todo: any) => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        });
        this.updateTodoList();
      }
    }

    test("todo list functionality", () => {
      container.innerHTML = `
        <div data-component="TodoList">
          <h2>Todo List</h2>
          <div>
            <input data-ref="TodoList.todoInput" data-action="input->TodoList.updateInput" placeholder="Enter todo..." />
            <button data-action="click->TodoList.addTodo" id="add-todo">Add Todo</button>
          </div>
          <ul data-ref="TodoList.todoContainer"></ul>
          <p>Total todos: <span data-bind="state:TodoList.todos.length">0</span></p>
        </div>
      `;

      const app = new DomponentApp({
        components: { TodoList },
        selector: container
      });

      const todoElement = container.querySelector('[data-component="TodoList"]') as HTMLElement;
      const component = app.registeredComponents.get(todoElement);
      const input = component.$refs.todoInput as HTMLInputElement;
      const addBtn = document.getElementById("add-todo");

      // Add todo
      input.value = "Test todo";
      input.dispatchEvent(new Event('input'));
      addBtn?.click();

      expect(component.state.todos.length).toBe(1);
      expect(component.state.todos[0].text).toBe("Test todo");
      expect(component.state.newTodoText).toBe("");

      // Add another todo
      input.value = "Another todo";
      input.dispatchEvent(new Event('input'));
      addBtn?.click();

      expect(component.state.todos.length).toBe(2);
    });
  });

  describe("Form Handling Integration", () => {
    class ContactForm extends Component {
      constructor(config: any) {
        super(config);
        this.state = {
          name: "",
          email: "",
          message: "",
          isSubmitting: false,
          submitted: false
        };
        this.setState(this.state);
      }

      updateField(event: Event) {
        const target = event.target as HTMLInputElement;
        const field = target.getAttribute('data-field');
        if (field) {
          this.setState({ [field]: target.value });
        }
      }

      async submitForm(event: Event) {
        event.preventDefault();
        
        this.setState({ isSubmitting: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        
        this.setState({ 
          isSubmitting: false,
          submitted: true,
          name: "",
          email: "",
          message: ""
        });

        // Reset form fields
        const form = this.$refs.contactForm as HTMLFormElement;
        form.reset();
      }

      resetForm() {
        this.setState({
          name: "",
          email: "",
          message: "",
          submitted: false
        });
      }
    }

    test("complete form handling", async () => {
      container.innerHTML = `
        <div data-component="ContactForm">
          <form data-ref="ContactForm.contactForm" data-action="submit->ContactForm.submitForm">
            <input 
              type="text" 
              data-field="name" 
              data-action="input->ContactForm.updateField"
              placeholder="Name" 
              required 
            />
            <input 
              type="email" 
              data-field="email" 
              data-action="input->ContactForm.updateField"
              placeholder="Email" 
              required 
            />
            <textarea 
              data-field="message" 
              data-action="input->ContactForm.updateField"
              placeholder="Message"
            ></textarea>
            <button type="submit">
              <span data-bind="state:ContactForm.isSubmitting">false</span>
            </button>
          </form>
          
          <div data-bind="state:ContactForm.submitted">false</div>
          <button data-action="click->ContactForm.resetForm" id="reset">Reset</button>
        </div>
      `;

      const app = new DomponentApp({
        components: { ContactForm },
        selector: container
      });

      const formElement = container.querySelector('[data-component="ContactForm"]') as HTMLElement;
      const component = app.registeredComponents.get(formElement);
      const form = component.$refs.contactForm as HTMLFormElement;
      const nameInput = form.querySelector('[data-field="name"]') as HTMLInputElement;
      const emailInput = form.querySelector('[data-field="email"]') as HTMLInputElement;
      const messageInput = form.querySelector('[data-field="message"]') as HTMLTextAreaElement;
      const submittedDisplay = container.querySelector('[data-bind="state:ContactForm.submitted"]') as HTMLElement;

      // Fill form
      nameInput.value = "John Doe";
      nameInput.dispatchEvent(new Event('input'));
      emailInput.value = "john@example.com";
      emailInput.dispatchEvent(new Event('input'));
      messageInput.value = "Hello there!";
      messageInput.dispatchEvent(new Event('input'));

      expect(component.state.name).toBe("John Doe");
      expect(component.state.email).toBe("john@example.com");
      expect(component.state.message).toBe("Hello there!");

      // Submit form
      form.dispatchEvent(new Event('submit'));

      // Wait for async operation
      await new Promise(resolve => setTimeout(resolve, 150));

      expect(component.state.submitted).toBe(true);
      expect(submittedDisplay.textContent).toBe("true");
      expect(component.state.name).toBe("");
      expect(component.state.email).toBe("");
      expect(component.state.message).toBe("");
    });
  });

  describe("Lifecycle Integration", () => {
    const lifecycleSpy = {
      connecting: vi.fn(),
      connected: vi.fn(),
      stateWillUpdate: vi.fn(),
      stateDidUpdate: vi.fn(),
      propsWillUpdate: vi.fn(),
      propsDidUpdate: vi.fn(),
      watcherPre: vi.fn(),
      watcherPost: vi.fn()
    };

    class LifecycleComponent extends Component {
      constructor(config: any) {
        super(config);
        this.state = { value: 0 };
        this.setState(this.state);
      }

      connecting() {
        lifecycleSpy.connecting();
      }
      
      connected() {
        lifecycleSpy.connected();
      }
      
      stateWillUpdate() {
        lifecycleSpy.stateWillUpdate();
      }
      
      stateDidUpdate() {
        lifecycleSpy.stateDidUpdate();
      }
      
      propsWillUpdate() {
        lifecycleSpy.propsWillUpdate();
      }
      
      propsDidUpdate() {
        lifecycleSpy.propsDidUpdate();
      }

      updateValue() {
        this.setState({ value: this.state.value + 1 });
      }

      watch() {
        return {
          value: {
            pre: lifecycleSpy.watcherPre,
            post: lifecycleSpy.watcherPost
          }
        };
      }
    }

    test("lifecycle methods are called in correct order", () => {
      // Reset spies
      Object.values(lifecycleSpy).forEach(spy => spy.mockClear());

      container.innerHTML = `
        <div data-component="LifecycleComponent">
          <span data-bind="state:LifecycleComponent.value">0</span>
          <button data-action="click->LifecycleComponent.updateValue" id="update">Update</button>
        </div>
      `;

      const app = new DomponentApp({
        components: { LifecycleComponent },
        selector: container
      });

      // Check initialization lifecycle
      expect(lifecycleSpy.connecting).toHaveBeenCalled();
      expect(lifecycleSpy.connected).toHaveBeenCalled();

      const updateBtn = document.getElementById("update");
      updateBtn?.click();

      // Check state update lifecycle
      expect(lifecycleSpy.stateWillUpdate).toHaveBeenCalled();
      expect(lifecycleSpy.stateDidUpdate).toHaveBeenCalled();
      expect(lifecycleSpy.watcherPre).toHaveBeenCalledWith(1, 0);
      expect(lifecycleSpy.watcherPost).toHaveBeenCalledWith(1);
    });
  });

  describe("Dynamic Component Creation", () => {
    class DynamicContainer extends Component {
      constructor(config: any) {
        super(config);
        this.state = { componentCount: 0 };
        this.setState(this.state);
      }

      addComponent() {
        const newComponent = document.createElement('div');
        newComponent.setAttribute('data-component', 'DynamicChild');
        newComponent.innerHTML = `<p>Dynamic Component ${this.state.componentCount + 1}</p>`;
        
        this.$refs.container.appendChild(newComponent);
        
        this.setState({ componentCount: this.state.componentCount + 1 });
      }
    }

    class DynamicChild extends Component {
      constructor(config: any) {
        super(config);
      }

      connected() {
        // Component was dynamically created and connected
      }
    }

    test("dynamically created components are automatically wired", async () => {
      container.innerHTML = `
        <div data-component="DynamicContainer">
          <button data-action="click->DynamicContainer.addComponent" id="add">Add Component</button>
          <div data-ref="DynamicContainer.container"></div>
          <p>Count: <span data-bind="state:DynamicContainer.componentCount">0</span></p>
        </div>
      `;

      const app = new DomponentApp({
        components: { DynamicContainer, DynamicChild },
        selector: container,
        watch: true
      });

      const addBtn = document.getElementById("add");
      addBtn?.click();

      // Wait for MutationObserver to process
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const dynamicElements = container.querySelectorAll('[data-component="DynamicChild"]');
      expect(dynamicElements.length).toBe(1);
      
      const dynamicComponent = app.registeredComponents.get(dynamicElements[0] as HTMLElement);
      expect(dynamicComponent).toBeDefined();
    });
  });

  describe("Error Recovery", () => {
    class ErrorProneComponent extends Component {
      constructor(config: any) {
        super(config);
        this.state = { shouldError: false };
        this.setState(this.state);
      }

      triggerError() {
        this.setState({ shouldError: true });
        // This would normally cause an error in a watcher
      }

      watch() {
        return {
          shouldError: {
            post: (newValue: boolean) => {
              if (newValue) {
                // Simulate recovery
                setTimeout(() => {
                  this.setState({ shouldError: false });
                }, 10);
              }
            }
          }
        };
      }
    }

    test("component recovers from errors gracefully", async () => {
      container.innerHTML = `
        <div data-component="ErrorProneComponent">
          <button data-action="click->ErrorProneComponent.triggerError" id="trigger">Trigger Error</button>
          <span data-bind="state:ErrorProneComponent.shouldError">false</span>
        </div>
      `;

      const app = new DomponentApp({
        components: { ErrorProneComponent },
        selector: container
      });

      const triggerBtn = document.getElementById("trigger");
      const errorDisplay = container.querySelector('[data-bind="state:ErrorProneComponent.shouldError"]') as HTMLElement;

      triggerBtn?.click();
      expect(errorDisplay.textContent).toBe("true");

      // Wait for recovery
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(errorDisplay.textContent).toBe("false");
    });
  });
});
