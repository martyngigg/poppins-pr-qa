var _ = require('lodash');
var Q = require('q');

var poppins, prQA;

module.exports = function initPlugin (pop) {
  poppins = pop;
  prQA = poppins.plugins.prQA = _.defaults(poppins.plugins.prQA || {}, {
    responseBody: responseBody,

    comment: 'Thanks for the PR!',
  });

  poppins.on('pullRequestOpened', respondToNewPullRequest);
};

function respondToNewPullRequest (data) {
  var number = data.pull_request.number;

  return prQA.responseBody(data).
    then(function (body) {
      return poppins.createComment(number, body);
    }).
    done(function () {
      poppins.emit('plugin:pr:done');
    });
}

function responseBody (data) {
  return Q(prQA.comment);
}
