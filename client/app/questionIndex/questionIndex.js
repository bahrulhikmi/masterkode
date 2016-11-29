'use strict';

angular.module('masterkodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: '<question-index></question-index>'
      });
  });
