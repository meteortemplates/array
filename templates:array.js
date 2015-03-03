ReactiveArray = function(value) {
  check(value, Match.Optional(Array));

  this._array = value || [];

  this._arrayDep = new Tracker.Dependency;

  this._methods = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift', 'splice'];

  for(var i=0;i<=this._methods.length;i++){
    this._addWrappedPrototypeMethod(this._methods[i]);
  }
}

ReactiveArray.prototype._addWrappedPrototypeMethod = function(method) {
  var self = this;
  this[method] = function() {
    self._arrayDep.changed();
    return Array.prototype[method].apply(self._array, arguments);
  };
}

ReactiveArray.prototype.get = function() {
  if (Tracker.active) {
    this._arrayDep.depend();
  }
  return this._array;
}

ReactiveArray.prototype.set = function(array) {
  check(array, Array);
  if (!_.isEqual(array, this._array)) {
    this._array = array;
    this._arrayDep.changed();
  }
}

ReactiveArray.prototype.pushArray = function(array) {
  check(array, Array);
  if (!!array.length) {
    this._array = this._array.concat(array);
    this._arrayDep.changed();
  }
}

ReactiveArray.prototype.getNonReactive = function() {
  return this._array;
}

ReactiveArray.prototype.constructor = ReactiveArray;

