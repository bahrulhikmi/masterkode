'use strict';

angular.module('masterkodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('test', {
      url: '/test',
      template: '<main></main>'
    });
  });
