'use strict';

angular.module('masterkodeApp')
  .directive('vote', function () {
    return {
      templateUrl: 'app/directives/vote/vote.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      scope.entity.upValue = scope.entity.downValue = 0;

      if(scope.entity.user_actions.voted) {
        switch(scope.entity.user_actions.voted) {
          case 'upvoted':
            scope.entity.upValue = 1;
            break;
          case 'downvoted':
            scope.entity.downValue = 1;
            break;
        }
      }

      scope.upVote = function() {
        if(scope.entity.downValue === 1) {
          scope.entity.downValue = 0;
          scope.entity.downvotes--;
        }

        if(scope.entity.upValue === 1) {
          scope.entity.upvotes++;
        } else {
          scope.entity.upvotes--;
        }
      };

      scope.downVote = function() {
        if(scope.entity.upValue === 1) {
          scope.entity.upValue = 0;
          scope.entity.upvotes--;
        }

        if(scope.entity.downValue === 1) {
          scope.entity.downvotes++;
        } else {
          scope.entity.downvotes--;
        }
      };
    }
    };
  });
