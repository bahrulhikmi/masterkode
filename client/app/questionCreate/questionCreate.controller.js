'use strict';

(function(){

class QuestionCreateComponent {
  constructor($http, $scope, $location) {
    this.$http = $http;
    this.$scope = $scope;
    this.$location = $location;
    this.message = 'Hello';
  }
  
  submit(){
    var self = this;
    self.$http.post('/api/questions', self.question).success(function(){
       self.$location.path('/');
     });
  }
}

angular.module('masterkodeApp')
  .component('questionCreate', {
    templateUrl: 'app/questionCreate/questionCreate.html',
    controller: QuestionCreateComponent	
  });

})();
