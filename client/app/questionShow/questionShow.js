'use strict';

angular.module('masterkodeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questionShow', {
        url: '/questions/show/:id',
        template: '<question-show></question-show>'
      });
  });
