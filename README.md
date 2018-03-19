# vue-jscodeshift-adapter

[![Build Status](https://travis-ci.org/psalaets/vue-jscodeshift-adapter.svg?branch=master)](https://travis-ci.org/psalaets/vue-jscodeshift-adapter)

Run [jscodeshift](https://github.com/facebook/jscodeshift) on Vue single file components

## Install

```
npm install vue-jscodeshift-adapter -D
```

## Usage

The instructions below assume you're familiar with [jscodeshift](https://github.com/facebook/jscodeshift).

The two main use cases for `vue-jscodeshift-adapter` are:

1. Run a codemod on some `.js` and/or `.vue` files
2. Modify one or more parts of some `.vue` files

### Use case 1: Run a codemod on some `.js` and/or `.vue` files

|When transforming|`fileInfo.source` will be|
|-----------------|-------------------------|
|`.js` file       | the contents of the file|
|`.vue` file      | the contents of `<script>`|

The source file will be updated appropriately based on the return value of your `transform()`.

#### 1a. Create wrapped transform function

`my-transform.js`:

```js
const adapt = require('vue-jscodeshift-adapter');
const someCodemod = require('some-codemod');

module.exports = adapt(someCodemod);
```

#### 1b. Run jscodeshift

```
$ jscodeshift <path> -t my-transform.js --extensions vue,js
```

See [jscodeshift readme](https://github.com/facebook/jscodeshift#usage-cli) for more info.

### Use case 2: Modify one or more parts of some `.vue` files

Modify a sfc's script, template or style.

#### 2a. Create wrapped transform function

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

#### 2b. Run jscodeshift

```
$ jscodeshift <path> -t my-transform.js --extensions vue
```

See [jscodeshift readme](https://github.com/facebook/jscodeshift#usage-cli) for more info.

## License

MIT