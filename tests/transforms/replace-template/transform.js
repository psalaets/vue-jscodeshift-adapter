const adapt = require('../../../src/index');

module.exports = adapt((fileInfo, api, options) => {
  fileInfo.template.content = `
  <span>this is new</span>
`;
});
