// Purely functional implementation of sets in JavaScript
// Membership in a set is defined based upon a function predicate, a truth test

var fsets = (function() {
  var root = this;
  root.contains = function(set, element) {
  	if (typeof set !== "function") throw "Set must be defined by a predicate function";
  	if (typeof set(element) !== "boolean") throw "Contains test returned non-boolean value for element";
  	return set(element);
  };
  // returns a predicate function that defines a set including the single item, elmeent
  root.singleton = function(element) {
    return function(x) { return x === element; }
  };

  root.union = function(setA, setB) {
    return function(x) { return setA(x) || setB(x); }
  };

  root.intersect = function(setA, setB) {
    return function(x) { return setA(x) && setB(x); }
  };
}).call(this);

exports = fsets;