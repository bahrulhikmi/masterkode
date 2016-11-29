'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var questionCtrlStub = {
  index: 'questionCtrl.index',
  show: 'questionCtrl.show',
  create: 'questionCtrl.create',
  update: 'questionCtrl.update',
  destroy: 'questionCtrl.destroy',
  createAnswer: 'questionCtrl.createAnswer'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy(),
  createAnswer: sinon.spy()
};

// require the index with our stubbed out modules
var questionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './question.controller': questionCtrlStub
});

describe('Question API Router:', function() {

  it('should return an express router instance', function() {
    expect(questionIndex).to.equal(routerStub);
  });

  describe('GET /api/questions', function() {

    it('should route to question.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'questionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/questions/:id', function() {

    it('should route to question.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'questionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/questions', function() {

    it('should route to question.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'questionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/questions/:id', function() {

    it('should route to question.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'questionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/questions/:id', function() {

    it('should route to question.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'questionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/questions/:id', function() {

    it('should route to question.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'questionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
