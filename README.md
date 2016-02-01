# poppins-pr-qa

Mary Poppins plugin for helping the Mantid QA process


## Install

`npm install poppins-pr-qa`


## Configure

To use this plugin, you need to load it in your config file with `couldYouPlease`:

```javascript
// config.js
module.exports = function (poppins) {

  poppins.config = { /*...*/ };

  poppins.couldYouPlease('pr-qa');

  // pr - added when the pull request is opened
  poppins.plugins.prQA.firstReviewComment = 'Thanks for the changes! The following points are to aid the reviewers.\n' +
	'...'
  // added when the keyword defined for shipping is used in a comment
  poppins.plugins.prQA.secondReviewComment = ''
};
```
