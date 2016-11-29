'use strict';

function fromNowFilter() {
  return function (input) {
   return moment(input).locale(window.navigator.language).fromNow();
  };
}


angular.module('masterkodeApp')
  .filter('fromNow', fromNowFilter);
