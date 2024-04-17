import { jscodeshiftMode } from './jscodeshift-mode.js';

export default function adapt(transform) {
  return jscodeshiftMode(transform);
}
