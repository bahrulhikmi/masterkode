'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  answers: [{
    content: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    points: [{
      value: Number
   }],
    comments: [{
      content: String,
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      points: [{
        value: Number
     }],
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }],
  }],
  tags: [{
    text: String,
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  status: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    content: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  points: [{
     value: Number
   }],
  modifiedAt: {
    type: Date,
    default: Date.now
  },
});

QuestionSchema.pre('find', function(next){
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  this.populate('answers.user', 'name');
  this.populate('answers.comments.user', 'name');
  next();
});
QuestionSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  this.populate('comments.user', 'name');
  this.populate('answers.user', 'name');
  this.populate('answers.comments.user', 'name');
  next();
});

export default mongoose.model('Question', QuestionSchema);
