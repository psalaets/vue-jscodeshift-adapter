const adapt = require('../../index');

module.exports = adapt((fileInfo, api, options) => {
  fileInfo.style.content = `
div {
  border: 1px solid black;
}
`;
});
