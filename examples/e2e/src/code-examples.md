```html
<!-- Counter -->
<!-- css classes have been removed-->

<div data-component="Counter">
  <p data-bind="state:Counter.count">0</p>
  <button data-action="click->Counter.increment">
    +1
  </button>
  <button data-action="click->Counter.decrement">
    -1
  </button>
</div>
```

```html
<!-- Navigation -->
<!-- css classes have been removed-->

<div data-component="Navigation" data-state='{"opened": false}'>
  <button data-action="click->Navigation.toggle">
    <span data-ref="open">
      <i data-feather="menu"></i>
    </span>
    <span data-ref="close" style="display:none;">
      <i data-feather="x"></i>
    </span>
  </button>
  <div>
    <div data-ref="menu">
      <figure>
        <img
          src="https://media.giphy.com/media/HSSr7JbPxLJfO/giphy.gif"
          alt="rock out!"
        />
        <figcaption class="text-center text-bold">
          Domponent rocks!
        </figcaption>
      </figure>
    </div>
  </div>
</div>
```

```html
<!-- Timer -->
<!-- css classes have been removed-->

<div data-component="Timer" data-key="Time">
  <strong>Current Time:</strong>
  <span data-bind="state:Timer.hours">n/a</span>:
  <span data-bind="state:Timer.minutes">n/a</span>:
  <span data-bind="state:Timer.seconds">n/a</span>
</div>
```

```html
<!-- DisplayAnthing -->
<!-- css classes have been removed -->

<div
  data-props="theSecond<-Time:seconds|theMinute<-Time:minutes|theHour<-Time:hours"
  data-component="DisplayAnything"
>
  <p>
    Inherits props from Timer, but isn't nested??!
  </p>
  <p>WHOOOOOOOOOOOA!</p>
  <p>props:</p>
  <code>
    <pre data-ref="propObjects"></pre>
  </code>
</div>
```

```html
<div data-component="FavoriteShow" data-state='{"show":"Regular Show"}'>
  <strong class="card-title">What's Your Favorite Show?</strong>
  <label for="controlled">
    controlled from below
  </label>
  <textarea data-ref="FavoriteShow.secondInput"></textarea>
  <code data-bind="state:FavoriteShow.show"></code>
  <label for="show">
    Controls the text and input above
  </label>
  <textarea data-action="input->FavoriteShow.handleInput">
Regular Show</textarea
  >
</div>
```
