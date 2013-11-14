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
    return function(x) {
      return x === element;
    }
  };

  root.union = function(setA, setB) {
    return function(x) {
      return setA(x) || setB(x);
    }
  };

  root.intersect = function(setA, setB) {
    return function(x) {
      return setA(x) && setB(x);
    }
  };

  root.forall = function(set, test, low, hi) { //only usable on ints within a range
    low = low || 0;
    hi = hi || 10000;
    var iter = function(i) {
      if (i > hi) return true;
      else if (set(i) && !test(i)) return false;
      else return iter(i + 1);
    }
    return iter(low);
  };

  root.exists = function(set, test, low, hi) {
    return !root.forall(set, function(x) {
      return !test(x);
    }, low, hi);
  };

  root.toString = function(set, low, hi) {
    low = low || 0;
    hi = hi || 10000;
    var iter = function(i, str) {
      if (i > hi) return str;
      else if (root.contains(set, i)) {
        return iter(i + 1, (str ? str + ", " : str) + i.toString());
      } else return iter(i + 1, str);
    }
    return iter(low, "");
  };

  //TODO find a performant way of doing purely functional operations over bounded ranges
  root.map = function(set, f, low, hi) {
    return function(x) {
      return root.exists(set, function(y) {
        return f(y) === x;
      }, low, hi)
    };
  };

})
  .call(this);

exports = fsets;