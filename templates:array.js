ReactiveArray;

this.ReactiveArray = ReactiveArray = function(value) {
  var ifc, method, _addWrappedPrototypeMethod, _array, _arrayDep, _i, _len, _methods;
  if (!(this instanceof ReactiveArray)) {
    return new ReactiveArray;
  }
  check(value, Match.Optional(Array));
  ifc = {};
  _addWrappedPrototypeMethod = function(method) {
    return ifc[method] = function() {
      _arrayDep.changed();
      return Array.prototype[method].apply(_array, arguments);
    };
  };
  _array = value || [];
  _arrayDep = new Tracker.Dependency;
  _methods = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift', 'splice'];
  for (_i = 0, _len = _methods.length; _i < _len; _i++) {
    method = _methods[_i];
    _addWrappedPrototypeMethod(method);
  }
  ifc.get = function() {
    if (Tracker.active) {
      _arrayDep.depend();
    }
    return _array;
  };
  ifc.set = function(array) {
    check(array, Array);
    if (_.intersection(array, _array).length != array.length || !array.length ) {
      _array = array;
      _arrayDep.changed();
    }
  };
  ifc.pushArray = function(array) {
    check(array, Array);
    if (!!array.length) {
      _array = _array.concat(array);
      _arrayDep.changed();
    }
  };
  ifc.getNonReactive = function() {
    return _array;
  };
  return ifc;
};
