var fsets = require("../fsets.js");
var chai = require("chai");
var expect = chai.expect;

// immutable globals for test set-up
var contains = fsets.contains;
var singleton = fsets.singleton;
var union = fsets.union;
var intersect = fsets.intersect;
var arr = [4,5,6];
var setOfEvenNums = function(x) { return x % 2 === 0; }
var setOfBigNums = function(x) { return (x > 100); }

describe('Contains', function() {

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

describe('Singleton Set', function() {
  var three = singleton(3);
  var nine = singleton(9);

  it('Should return a function', function() {
    expect( (typeof three === 'function') ).true;
  });

  it('Generated singleton predicate should return true for argument passed in', function() {
    expect( contains(three, 3) ).true;
    expect( contains(nine, 9) ).true;
  });

  it('Singleton predicate should return false for other values', function() {
    expect( contains(three, 0) ).false;
    expect( contains(three, 1) ).false;
    expect( contains(three, 2) ).false;
    expect( contains(three, 4) ).false;
    expect( contains(three, 5) ).false;
    expect( contains(three, 6) ).false;
    expect( contains(three, 7) ).false;
    expect( contains(three, 8) ).false;
    expect( contains(nine, 3) ).false;
  });
});

describe('Union', function() {
  var threeAndFour = union( singleton(3), singleton(4));
  var setOfBigOrEvenNums = union(setOfBigNums, setOfEvenNums);

  it('Should return a function', function() {
    expect( (typeof threeAndFour === 'function') ).true;
  });

  it('Should contain all members of either set that generated it', function() {
    expect( contains(threeAndFour, 4) ).true;
    expect( contains(threeAndFour, 3) ).true;
    expect( contains(setOfBigOrEvenNums, 0) ).true;
    expect( contains(setOfBigOrEvenNums, 10) ).true;
    expect( contains(setOfBigOrEvenNums, 1041) ).true;
  });

  it('Should not contain numbers not in both sets that generated it', function() {
    expect( contains(threeAndFour, 7) ).false;
    expect( contains(threeAndFour, 2) ).false;
    expect( contains(setOfBigOrEvenNums, 1) ).false;
    expect( contains(setOfBigOrEvenNums, 9) ).false;
    expect( contains(setOfBigOrEvenNums, 31) ).false;
  });
});

describe('Intersection', function() {
  var oneAndFive = union( singleton(1), singleton(5) );
  var threeAndFour = union( singleton(3), singleton(4));
  var fiveAndSix = union( singleton(5), singleton(6));
  var threeToSix = union( singleton(3), singleton(4));
  var setOfBigEvens = intersect(setOfBigNums, setOfEvenNums);
  var five = intersect( oneAndFive, fiveAndSix );
  var threeAndFourIntersectThreeToSix = intersect( threeAndFour, threeToSix );

  it('Should return a function', function() {
    expect( (typeof setOfBigEvens === 'function') ).true;
  });

  it('Should contain all members belonging to both sets that generated it', function() {
    expect( contains(five, 5) ).true;
    expect( contains(threeAndFourIntersectThreeToSix, 3) ).true;
    expect( contains(threeAndFourIntersectThreeToSix, 4) ).true;
  });

  it('Should not contain numbers not in a set that generated it', function() {
    expect( contains(threeAndFourIntersectThreeToSix, 5) ).false;
    expect( contains(threeAndFourIntersectThreeToSix, 6) ).false;
    expect( contains(setOfBigEvens, 0) ).false;
    expect( contains(setOfBigEvens, 1) ).false;
    expect( contains(setOfBigEvens, 8) ).false;
    expect( contains(setOfBigEvens, 3341) ).false;
  });
});
