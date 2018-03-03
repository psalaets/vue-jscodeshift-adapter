# vue-jscodeshift-adapter

Run [jscodeshift](https://github.com/facebook/jscodeshift) on Vue single file components

## Install

```
npm install vue-jscodeshift-adapter -D
```

## Usage

The instructions below assume you're familiar with [jscodeshift](https://github.com/facebook/jscodeshift).

### 1. Create a warpped transform function

This module wraps the `transform()` function, enabling it to run on Vue single file components (sfc).

The two main use cases are:

a. Modify one or more parts of an sfc
b. Run a codemod on just the `<script>` part of an sfc

#### a. Modify a sfc's script, template or style

`my-transform.js`:

```js
const adapt = require('vue-jscodeshift-adapter');

function myTransform(fileInfo, api, options) {
  const script   = fileInfo.script.content;
  const template = fileInfo.template.content;
  const style    = fileInfo.style.content;

  // (transform source somehow)

  fileInfo.script.content   = newScript;
  fileInfo.template.content = newTemplate;
  fileInfo.style.content    = newStyle;
}

module.exports = adapt(myTransform);
```

#### b. Run an existing codemod on sfc

After wrapping, you can run [jscodeshift-compatible codemods](https://www.npmjs.com/search?q=codemod%20jscodeshift&page=1&ranking=optimal) on your sfc because

1. `fileInfo.source` will be the content of the sfc's `<script>`
2.  If `transform()` returns a string, that string becomes the content of `<script>`

`my-transform.js`:

```js
const adapt = require('vue-jscodeshift-adapter');
const someCodemod = require('some-codemod');

module.exports = adapt(someCodemod);
```

### 2. Run jscodeshift

```
$ jscodeshift <path> -t my-transform.js --extensions vue
```

See [jscodeshift readme](https://github.com/facebook/jscodeshift#usage-cli) for more info.

## License

MIT