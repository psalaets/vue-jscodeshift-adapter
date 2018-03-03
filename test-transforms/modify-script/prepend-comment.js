const adapt = require('../../index');

module.exports = adapt((fileInfo, api, options) => {
  fileInfo.script.content = '\n// this is the comment' + fileInfo.script.content;
});
