const adapt = require('../../index');

module.exports = adapt((fileInfo, api, options) => {
  fileInfo.template.content = `
  <span>this is new</span>
`;
});
