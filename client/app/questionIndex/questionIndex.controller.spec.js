'use strict';

describe('Component: QuestionIndexComponent', function () {

  // load the controller's module
  beforeEach(module('masterkodeApp'));

  var QuestionIndexComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    QuestionIndexComponent = $componentController('questionIndex', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
