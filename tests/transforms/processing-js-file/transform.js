import adapt from '../../../src/index.js';

export default adapt((fileInfo, api, options) => {
  return `
export function go() {
  console.log('going');
}
`;
});
