'use strict';

angular.module('masterkodeApp.auth', ['masterkodeApp.constants', 'masterkodeApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
