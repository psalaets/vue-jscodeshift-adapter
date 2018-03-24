const jscodeshiftMode = require('./jscodeshift-mode');
const vueOnlyMode = require('./vue-only-mode');

module.exports = adapt;

function adapt(transform, settings = {}) {
  const vueOnly = settings.vueOnly || false;

  if (!vueOnly) {
    return jscodeshiftMode(transform, settings);
  } else {
    return vueOnlyMode(transform, settings);
  }
}
