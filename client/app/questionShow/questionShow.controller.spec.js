'use strict';

describe('Component: QuestionShowComponent', function () {

  // load the controller's module
  beforeEach(module('masterkodeApp'));

  var QuestionShowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    QuestionShowComponent = $componentController('questionShow', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
