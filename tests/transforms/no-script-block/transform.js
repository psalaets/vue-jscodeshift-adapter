import adapt from '../../../src/index.js';

export default adapt((fileInfo, api, options) => {
  throw new Error('This transform should not have been invoked');
});
