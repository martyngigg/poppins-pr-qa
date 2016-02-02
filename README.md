# poppins-pr-qa

Mary Poppins plugin for helping the Mantid QA process. It is a simpler version of
[poppins-pr-checklist](https://github.com/btford/poppins-pr-checklist) that simply attaches the comment text as is.

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
  poppins.plugins.prQA.comment = 'Thanks for the changes! Here\'s some things that will be checked.
	'...'
};
```
