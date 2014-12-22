@ReactiveArray = ReactiveArray = (value) ->

  # called without `new`
  unless this instanceof ReactiveArray
    return new ReactiveArray

  check(value, Match.Optional(Array))

  ifc = {}

  _addWrappedPrototypeMethod = (method) ->
    ifc[method] = ->
      _arrayDep.changed()
      return Array.prototype[method].apply(_array, arguments)

  _array = value || []
  _arrayDep = new Tracker.Dependency
  _methods = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift', 'splice']

  for method in _methods
    _addWrappedPrototypeMethod(method)

  ifc.get = ->
    if Tracker.active
      _arrayDep.depend()
    return _array

  ifc.set = (array) ->
    check(array, Array)

    # Avoid triggering reactivity if the value hasn't changed
    unless _.difference(_array, array).length
      _array = array
      _arrayDep.changed()
    return

  ifc.pushArray = (array) ->
    check(array, Array)
    unless !array.length
      _array = _array.concat(array)
      _arrayDep.changed()
    return

  ifc.getNonReactive = ->
    return _array

  return ifc