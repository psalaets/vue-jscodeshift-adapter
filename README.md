# vue-jscodeshift-adapter

Run [jscodeshift](https://github.com/facebook/jscodeshift) on Vue single file components

## Install

```
npm install vue-jscodeshift-adapter -D
```

## Usage

These steps assume you're familiar with [jscodeshift](https://github.com/facebook/jscodeshift).

### 1. Wrap your transform function

This module wraps your transform function, enabling it to run on Vue single file components (sfc).

`my-transform.js`:

```js
const adapt = require('vue-jscodeshift-adapter');

function myTransform(fileInfo, api, options) {
  // fileInfo.source is the content of your sfc's <script>
  const source = fileInfo.source;

  return transformedSource;
}

module.exports = adapt(myTransform);
```

### 2. Run jscodeshift

```
$ jscodeshift <path> -t my-transform.js --extensions vue
```

See [jscodeshift readme](https://github.com/facebook/jscodeshift#usage-cli) for more info.

## License

MIT