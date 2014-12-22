Install
-------

`meteor add templates:array`

This package works on the client-side only.

Examples
--------

Create a new reactive array.

```javascript
var array = new ReactiveArray();
```

Create a new reactive array scoped to a template.

```javascript
Template.myTemplate.created = function () {
  this.array = new ReactiveArray();
};
```

Add things to the array you created in your template.

```javascript
Template.myTemplate.events({
  'click .item': function (e, t) {
    t.push(e.target.value);
  }
});
```

Show what's been added to the array you created in your template.

```javascript
Template.myTemplate.helpers({
  clickedItems: function () {
    Template.instance().array.get();
  }
});
```

API
---

You have access to all the usual Array prototype methods--I've made them reactive.

`'pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift', 'splice'`

#### ReactiveArray.get()

This will get the current value of the array and establish a reactive dependency.

#### ReactiveArray.set()

This will set the value of the array, and replace whatever was there before. Dependent computations will rerun.

#### ReactiveArray.pushArray()

This is a special method that will push an entire array onto the existing array.

It's equivalent to `array = array.concat([/* ... */])` and is reactive.

#### ReactiveArray.getNonReactive()

This will get the current value of the array and _will not_ establish a reactive dependency.

Contributors
------------

* [Jon James](http://github.com/jonjamz)

My goal with this package is to keep it simple, similar to core packages like `ReactiveVar`.

It may already have everything it needs.

*Please create issues and discuss potential contributions before creating a pull request.*
