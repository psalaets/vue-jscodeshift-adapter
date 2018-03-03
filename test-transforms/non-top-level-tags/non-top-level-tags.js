const adapt = require('../../index');

module.exports = adapt((fileInfo, api, options) => {
  fileInfo.template.content = `
  <span>
    <!-- this is new -->
    asdf
  </span>
`;

  fileInfo.script.content = `
// this is new
` + fileInfo.script.content;

  fileInfo.style.content = `
/* this is new too */
` + fileInfo.style.content;
});
