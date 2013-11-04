var fsets = require("../fsets.js");
var chai = require("chai");
var expect = chai.expect;

describe('Contains', function() {
  var contains = fsets.contains;
  var arr = [4,5,6];
  var setOfEvenNums = function(x) { return x % 2 === 0; }
  var setOfBigNums = function(x) { return (x > 100); }

  it('should throw an error unless the set is a function predicate', function() {
    var badInput = function() {
      return contains(arr, 4);
    };
    expect(badInput).to.throw("Set must be defined by a predicate function");
  });

  it('should throw an error if the contains test returns a non-boolean', function() {
    var badPredicate = function(x) { return 4; }
    var badInput = function() {
      return contains(badPredicate, 4);
    };
    expect(badInput).to.throw("Contains test returned non-boolean value for element");
  });

  it('should return true if the number passes the inclusion test', function() {
    expect( contains(setOfEvenNums, 4) ).true;
    expect( contains(setOfBigNums, 2000) ).true;
  });

  it('should return true if the number fails the inclusion test', function() {
    expect( contains(setOfEvenNums, 7) ).false;
    expect( contains(setOfBigNums, 10) ).false;
  });
});

