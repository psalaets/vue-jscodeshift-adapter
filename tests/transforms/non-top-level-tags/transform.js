import adapt from '../../../src/index.js';

export default adapt((fileInfo, api, options) => {
  return `
// this is new` + fileInfo.source;
});
