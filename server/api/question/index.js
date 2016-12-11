'use strict';

var express = require('express');
var controller = require('./question.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.post('/:id/answers', auth.isAuthenticated(), controller.createAnswer);
router.put('/:id/answers/:answerId', auth.isAuthenticated(), controller.updateAnswer);
router.delete('/:id/answers/:answerId', auth.isAuthenticated(), controller.destroyAnswer);

router.post('/:id/comments', auth.isAuthenticated(), controller.createComment);
router.put('/:id/comments/:commentId', auth.isAuthenticated(), controller.updateComment);
router.delete('/:id/comments/:commentId', auth.isAuthenticated(), controller.destroyComment);

router.post('/:id/answers/:answerId/comments', auth.isAuthenticated(), controller.createAnswerComment);
router.put('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.updateAnswerComment);
router.delete('/:id/answers/:answerId/comments/:commentId', auth.isAuthenticated(), controller.destroyAnswerComment);

router.put('/:id/upvote', auth.isAuthenticated(), controller.upvote);
router.put('/:id/downvote', auth.isAuthenticated(), controller.downvote);
router.put('/:id/unvote', auth.isAuthenticated(), controller.unvote);
router.put('/:id/answers/:answerId/upvote', auth.isAuthenticated(), controller.upvote);
router.put('/:id/answers/:answerId/downvote', auth.isAuthenticated(), controller.downvote);
router.put('/:id/answers/:answerId/unvote', auth.isAuthenticated(), controller.unvote);
router.put('/:id/comments/:commentId/upvote', auth.isAuthenticated(), controller.upvote);
router.put('/:id/comments/:commentId/downvote', auth.isAuthenticated(), controller.downvote);
router.put('/:id/comments/:commentId/unvote', auth.isAuthenticated(), controller.unvote);
router.put('/:id/answers/:answerId/comments/:commentId/upvote', auth.isAuthenticated(), controller.upvote);
router.put('/:id/answers/:answerId/comments/:commentId/downvote', auth.isAuthenticated(), controller.downvote);
router.put('/:id/answers/:answerId/comments/:commentId/unvote', auth.isAuthenticated(), controller.unvote);

module.exports = router;
