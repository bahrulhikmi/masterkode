'use strict';

describe('Directive: vote', function () {

  // load the directive's module and view
  beforeEach(module('masterkodeApp'));
  beforeEach(module('app/vote/vote.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vote></vote>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the vote directive');
  }));
});
