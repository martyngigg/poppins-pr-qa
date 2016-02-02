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

  it('should use comment as defined without file prefix', function (done) {
    var comment = 'Thank you.'
    poppins.plugins.prQA.comment = comment;

    poppins.simulatePrCreated(pr);
    poppins.on('plugin:pr:done', function () {
      expect(poppins.createComment.args[0]).toEqual([pr.number, comment]);
      done();
    });
  });

  it('should use text from file is comment prefixed with file://', function (done) {
    poppins.plugins.prQA.comment = 'file://' + __dirname + '/test-response.md';

    poppins.simulatePrCreated(pr);
    poppins.on('plugin:pr:done', function () {
      expect(poppins.createComment.args[0]).toEqual([pr.number, 'Text from a file']);
      done();
    });
  });

});
