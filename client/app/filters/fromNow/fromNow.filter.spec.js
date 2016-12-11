'use strict';

describe('Filter: fromNow', function () {

  // load the filter's module
  beforeEach(module('masterkodeApp'));

  // initialize a new instance of the filter before each test
  var fromNow;
  beforeEach(inject(function ($filter) {
    fromNow = $filter('fromNow');
  }));

  it('should return a value"', function () {
    expect(fromNow("12/12/2016")).not.be.empty;
  });

});
