'use strict';

(function(){

class QuestionShowComponent {
  constructor($http, $stateParams, $location, Auth, $scope) {
    this.Auth = Auth;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.loadQuestion();
    this.newAnswer = {};
    this.$location = $location;
    this.newComment = {};
    this.$scope = $scope;

  }

  isHavePointSet(obj){
    return Auth.isLoggedIn() && obj && obj.points && obj.points.indexOf(Auth.getCurrentUser()._id)!==-1;
  }

  setVoteRight(obj){
    obj.canUpvote =  this.canUpvote(obj);
    obj.canDownvote = this.canDownvote(obj);
    console.log(obj);
  }

  canUpvote(obj){
    if (obj && obj.points && this.Auth.isLoggedIn()){
      var index = obj.points.findIndex(x => x._id==this.Auth.getCurrentUser()._id && x.value==1)
      return index==-1
    }
    return true;
  }

  canDownvote(obj){
    if (obj && obj.points && this.Auth.isLoggedIn()){
      var index = obj.points.findIndex(x => x._id==this.Auth.getCurrentUser()._id && x.value==-1)
      return index==-1
    }
    return true;
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

  submitComment() {
      var self = this;
      self.$http.post('/api/questions/' + self.$stateParams.id + '/comments', self.newComment).then(function(){
        self.loadQuestion();
        self.newComment = {};
        self.editNewComment = false;
      });
  }

  submitAnswerComment(answer) {
      var self = this;
      self.$http.post('/api/questions/' + self.$stateParams.id + '/answers/' + answer._id + '/comments', answer.newAnswerComment).then(function(){
      self.loadQuestion();
      });
  };

  deleteComment(comment) {
      var self = this;
      self.$http.delete('/api/questions/' + self.$stateParams.id + '/comments/' + comment._id).then(function(){
        self.loadQuestion();
      });
  };

  deleteAnswerComment(answer, answerComment) {
      var self = this;
      self.$http.delete('/api/questions/' + self.$stateParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id).then(function(){
        self.loadQuestion();
      });
  };

  updateComment(comment) {
      var self = this;
      self.$http.put('/api/questions/' + self.$stateParams.id + '/comments/' + comment._id, comment).then(function(){
        self.loadQuestion();
      });
  };

  updateAnswerComment(answer, answerComment) {
      var self = this;
      self.$http.put('/api/questions/' + self.$stateParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id, answerComment).then(function(){
        self.loadQuestion();
      });
  };

  loadQuestion(){
    var self =this;
    this.$http.get('/api/questions/' + this.$stateParams.id).then(function(question) {
      self.question = question;
      self.setVoteRight(self.question);
    });
  }

  submitAnswer(){
    var self = this;
      self.$http.post('/api/questions/' + self.$stateParams.id + '/answers', self.newAnswer).then(function(){
        self.loadQuestion();
        self.newAnswer = {};
      });
  }

  deleteQuestion(){
    var self = this;
    self.$http.delete('/api/questions/' + self.$stateParams.id).then(function(){
       self.$location.path('/');
     });
  }

  deleteAnswer(answer){
    var self = this;
        self.$http.delete('/api/questions/' + self.$stateParams.id + '/answers/' + answer._id).then(function(){
       self.loadQuestion();
                 console.log("succc");
     });
  }

  updateQuestion(){
    var self = this;
    self.$http.put('/api/questions/' + self.$stateParams.id, self.question).then(function(){
    self.loadQuestion();
    });
  }

  updateAnswer(answer){
    var self = this;
    self.$http.put('/api/questions/' + self.$stateParams.id + '/answers/' + answer._id, answer).then(function(){
        self.loadQuestion();

      });
  }

  upvote(){
    if(!this.question.canUpvote) return;
    var self = this;
    self.$http.put('/api/questions/' + self.$stateParams.id + '/upvote', self.question).then(function(){
    self.loadQuestion();
    });
  }

  downvote(){
    if(!this.question.canDownvote) return;
    var self = this;
    self.$http.put('/api/questions/' + self.$stateParams.id + '/downvote').then(function(){
    self.loadQuestion();
    });
  }

  isOwner(obj){
    if (!obj) return false;
     return this.Auth.isLoggedIn() && obj && obj.user && obj.user._id === this.Auth.getCurrentUser()._id;
  }


}

angular.module('masterkodeApp')
  .component('questionShow', {
    templateUrl: 'app/questionShow/questionShow.html',
    controller: QuestionShowComponent
  });

})();
