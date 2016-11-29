'use strict';

describe('Component: QuestionCreateComponent', function () {

  // load the controller's module
  beforeEach(module('masterkodeApp'));

  var QuestionCreateComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    QuestionCreateComponent = $componentController('questionCreate', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
