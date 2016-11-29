'use strict';

angular.module('masterkodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionCreate', {
        url: '/questions/create',
        template: '<question-create></question-create>'
      });
  });
