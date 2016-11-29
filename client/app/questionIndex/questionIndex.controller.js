'use strict';

(function(){

class QuestionIndexComponent {
  constructor($http) {
    var self = this;
    $http.get('/api/questions').success(function(questions) {
      self.questions = questions;
    });
  }

  getPointsCount(obj){
      if (obj && obj.points){
        var count = 0;
        for(var i=0; i<obj.points.length; i++)
          count+=obj.points[i].value;
        return count;
      }
      return 0;
  }
}

angular.module('masterkodeApp')
  .component('questionIndex', {
    templateUrl: 'app/questionIndex/questionIndex.html',
    controller: QuestionIndexComponent
  });

})();
