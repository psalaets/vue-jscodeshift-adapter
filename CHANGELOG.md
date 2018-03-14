# Change Log

## [1.1.1] - 2018-03-13
### Fixed

- No longer changing spacing inside `<template>` when `transform()` doesn't touch it ([#3](https://github.com/psalaets/vue-jscodeshift-adapter/issues/3))

## [1.1.0] - 2018-03-03
### Added

- Transform can change `<script>` content through `fileInfo.script.content`
- Transform can change `<template>` content through `fileInfo.template.content`
- Transform can change `<style>` content through `fileInfo.style.content`

## [1.0.0] - 2018-25-02
### Added

- Initial impl