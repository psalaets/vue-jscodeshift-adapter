const runInlineTest = require('jscodeshift/dist/testUtils').runInlineTest;

function testTransform(transform, path, input, output, options = {}) {
  const fileInfo = {
    path,
    source: input
  };

  it('transforms correctly', () => {
    runInlineTest(transform, options, fileInfo, output);
  });
}

module.exports.testTransform = testTransform;