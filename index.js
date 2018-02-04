const cheerio = require('cheerio');

module.exports = adapt;



function adapt(transform) {
  return function newTransform(fileInfo, api, options) {
    const fullSource = fileInfo.source;

    const $ = cheerio.load(fullSource);
    const script = $('script').html();

    fileInfo.source = script;

    return transform(fileInfo, api, options);
  };
}