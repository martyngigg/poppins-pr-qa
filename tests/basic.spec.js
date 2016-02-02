var Q       = require('q');
var plugin  = require('../plugin');
var mock    = require('poppins-mock');

describe('poppins-pr-qa', function () {
  var poppins, pr;

  beforeEach(function () {
    poppins = mock.poppins();
    plugin(poppins);
    pr = mock.pr();
  });

  it('should have default comment for new pull requests', function (done) {

    poppins.simulatePrCreated(pr);
    poppins.on('plugin:pr:done', function () {
      expect(poppins.createComment.args[0]).toEqual([pr.number, 'Thanks for the PR!']);
      done();
    });
  });

  it('should use defined comment for new pull requests', function (done) {
    var comment = 'Thank you.'
    poppins.plugins.prQA.comment = comment;

    poppins.simulatePrCreated(pr);
    poppins.on('plugin:pr:done', function () {
      expect(poppins.createComment.args[0]).toEqual([pr.number, comment]);
      done();
    });
  });

});
