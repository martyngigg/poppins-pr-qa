var _ = require('lodash');
var Q = require('q');
var fs = require('fs');

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
  if (prQA.comment.indexOf('file://') == 0) {
    return Q(readFromFile(prQA.comment.slice(7)));
  } else {
    return Q(prQA.comment);
  }
}

// Read contents and trim any leanding & trailing whitespace
function readFromFile (filename) {
  return fs.readFileSync(filename).toString().trim();
}
