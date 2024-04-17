import { testTransform } from '../test-helper.js';
import transform from './transform.js';

const input = `
export function stop() {
  console.log('stopping');
}
`;

const output = `
export function go() {
  console.log('going');
}
`;

testTransform(transform, 'util.js', input, output);
