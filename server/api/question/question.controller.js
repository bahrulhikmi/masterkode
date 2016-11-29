/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/questions              ->  index
 * POST    /api/questions              ->  create
 * GET     /api/questions/:id          ->  show
 * PUT     /api/questions/:id          ->  update
 * DELETE  /api/questions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Question from './question.model';

/* add/remove question points */
export function upvote(req, res) {
  console.log("Upvote woiii");
  req.body.user = req.user.id;
  req.body.value = 1;
  vote(req, res);
}

export function downvote(req, res) {
  req.body.user = req.user.id;
  req.body.value = -1;
  vote(req, res);
}

var vote = function (req, res) {
  console.log(req.body);
  Question.update({_id: req.params.id}, {$push: {points: {'_id': req.user.id, 'value': req.body.value}}}, function(err, num){
    if(err) {  console.log(err); return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

export function unvote(req, res) {
  Question.update({_id: req.params.id}, {$pull: {points: {'user': req.user.id}}}, function(err, num){
    if(err) { return handleError(res, err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

export function upvoteAnswer(req, res) {
  req.body.user = req.user.id;
  req.body.value = 1;
  voteAnswer(req, res);
}

export function downvoteAnswer(req, res) {
  req.body.user = req.user.id;
  req.body.value = -1;
  voteAnswer(req, res);
}

var voteAnswer = function (req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$push: {'answers.$.points': req.body}}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

export function unvote(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$pull: {'answers.$.points' : {'user': req.user.id}}}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

export function upvoteAnswer(req, res) {
  req.body.user = req.user.id;
  req.body.value = 1;
  voteComment(req, res);
}

export function downvoteAnswer(req, res) {
  req.body.user = req.user.id;
  req.body.value = -1;
  voteComment(req, res);
}

export function voteComment(req, res) {
  Question.update({_id: req.params.id, 'comments._id': req.params.commentId}, {$push: {'comments.$.points': req.body}}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}
export function removePointComment(req, res) {
  Question.update({_id: req.params.id, 'comments._id': req.params.commentId}, {$pull: {'comments.$.points': {'user': req.user.id}}}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

/* set or remove point for question answer comment */
var setOrRemovePointAnswerComment = function(op, req, res) {
  Question.find({_id: req.params.id}).exec(function(err, questions){
    if(err) { return handleError(res)(err); }
    if(questions.length === 0) { return res.send(404).end(); }
    var question = questions[0];
    var found = false;
    for(var i=0; i < question.answers.length; i++){
      if(question.answers[i]._id.toString() === req.params.answerId){
        found = true;
        var conditions = {};
        conditions._id = req.params.id;
        conditions['answers.' + i + '.comments._id'] = req.params.commentId;
        var doc = {};
        doc[op] = {};
        doc[op]['answers.' + i + '.comments.$.points'] = req.user.id;
        // Question.update({_id: req.params.id, 'answers.' + i + '.comments._id': req.params.commentId}, {op: {('answers.' + i + '.comments.$.points'): req.user.id}}, function(err, num){
        /*jshint -W083 */
        Question.update(conditions, doc, function(err, num){
          if(err) { return handleError(res)(err); }
          if(num === 0) { return res.send(404).end(); }
          exports.show(req, res);
          return;
        });
      }
    }
    if(!found){
      return res.send(404).end();
    }
  });
};
export function setPointAnswerComment(req, res) {
  setOrRemovePointAnswerComment('$push', req, res);
}
export function removePointAnswerComment(req, res) {
  setOrRemovePointAnswerComment('$pull', req, res);
}

/* comments APIs */
export function createComment(req, res) {
  req.body.user = req.user.id;
  Question.update({_id: req.params.id}, {$push: {comments: req.body}}, function(err, num){
    if(err) {return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  })
}
export function destroyComment(req, res) {
  Question.update({_id: req.params.id}, {$pull: {comments: {_id: req.params.commentId , 'user': req.user._id}}}, function(err, num) {
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}
export function updateComment(req, res) {
  Question.update({_id: req.params.id, 'comments._id': req.params.commentId}, {'comments.$.content': req.body.content, 'comments.$.user': req.user.id}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

/* answersComments APIs */
export function createAnswerComment(req, res) {
  req.body.user = req.user.id;
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$push: {'answers.$.comments': req.body}}, function(err, num){
    if(err) {return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  })
}
export function destroyAnswerComment(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {$pull: {'answers.$.comments': {_id: req.params.commentId , 'user': req.user._id}}}, function(err, num) {
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}
export function updateAnswerComment(req, res) {
  Question.find({_id: req.params.id}).exec(function(err, questions){
    if(err) { return handleError(res)(err); }
    if(questions.length === 0) { return res.send(404).end(); }
    var question = questions[0];
    var found = false;
    for(var i=0; i < question.answers.length; i++){
      if(question.answers[i]._id.toString() === req.params.answerId){
        found = true;
        var conditions = {};
        conditions._id = req.params.id;
        conditions['answers.' + i + '.comments._id'] = req.params.commentId;
        conditions['answers.' + i + '.comments.user'] = req.user._id;
        var doc = {};
        doc['answers.' + i + '.comments.$.content'] = req.body.content;
        /*jshint -W083 */
        Question.update(conditions, doc, function(err, num){
          if(err) { return handleError(res)(err); }
          if(num === 0) { return res.send(404).end(); }
          exports.show(req, res);
          return;
        });
      }
    }
    if(!found){
      return res.send(404).end();
    }
  });
}

export function createAnswer(req, res){
  req.body.user = req.user.id;
  Question.update({_id: req.params.id}, {$push: {answers: req.body}}, function (err, num){
    if(err){return handleError(res)(err);}
    if(num==0){return res.send(404).end();}
    exports.show(req,res);
  });
}

export function destroyAnswer(req, res) {
    console.log(req.user);
  Question.update({_id: req.params.id}, {$pull: {answers: {_id: req.params.answerId, 'user': req.user._id }}}, function(err, num) {
    if(err) { console.log("Error na " + err); return handleError(res)(err); }
    if(num === 0) { console.log( "404") ; return res.send(404).end();}
    console.log( "num "+num);
    exports.show(req, res);
  });
}

export function updateAnswer(req, res) {
  Question.update({_id: req.params.id, 'answers._id': req.params.answerId}, {'answers.$.content': req.body.content, 'answers.$.user': req.user._id}, function(err, num){
    if(err) { return handleError(res)(err); }
    if(num === 0) { return res.send(404).end(); }
    exports.show(req, res);
  });
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function handleUnauthorized(req, res){
  return function(entity){
    if (!entity) {return null;}
    if(entity.user._id.toString() !== req.user._id.toString()){
      res.send(403).end();
      return null;
    }
    return entity;
  }
}

// Gets a list of Questions
export function index(req, res) {
  return Question.find().sort({createdAt: -1}).limit(20).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Question from the DB
export function show(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Creates a new Question in the DB
export function create(req, res) {
  req.body.user = req.user;
  return Question.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Question in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Question from the DB
export function destroy(req, res) {
  return Question.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(handleUnauthorized(req, res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
