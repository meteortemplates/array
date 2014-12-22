Install
-------

`meteor add templates:array`

This package works on the client-side only.

Examples
--------

#### Basic use

Create a new reactive array.

```javascript
var array = new ReactiveArray();
```

#### Template use

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

##### ReactiveArray.get()

> Get the current value of the array and establish a reactive dependency.

##### ReactiveArray.set()

> Set the value of the array, replacing any existing value.

##### ReactiveArray.pushArray()

> Push an array onto the existing array.

Equivalent to `array = array.concat([/* ... */])`, but reactive.

##### ReactiveArray.getNonReactive()

> Get the current value of the array without establishing a reactive dependency.

Contributors
------------

* [Jon James](http://github.com/jonjamz)

My goal with this package is to keep it simple, similar to core packages like [ReactiveVar](http://docs.meteor.com/#/full/reactivevar).

As such, it may already have everything it needs.

**Please create issues to discuss feature contributions before creating a pull request.**
