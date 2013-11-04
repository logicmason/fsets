var fsets = require("../fsets.js");
var chai = require("chai");
var expect = chai.expect;

describe('Contains', function() {
  console.log("fsets: ", fsets);
  console.log(fsets.contains);
  var contains = fsets.contains;
  var arr = [4,5,6];
  var setOfEvenNums = function(x) { return x % 2 === 0; }
  var x = 4;
  var y = 5;

  it('should throw an error unless the set is a function predicate', function() {
    var badInput = function() {
      return contains(arr, 4);
    };
    expect(badInput).to.throw("Set must be defined by a predicate function");
  });

});

