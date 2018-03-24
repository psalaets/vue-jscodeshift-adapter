const adapt = require('../../../src/index');

module.exports = adapt((fileInfo, api, options) => {
  fileInfo.script.content = `
export default {};
`;
});
