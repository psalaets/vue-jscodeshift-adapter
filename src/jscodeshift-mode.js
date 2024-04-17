import descriptorToString from 'vue-sfc-descriptor-to-string';

import { parseSfc } from './parse-sfc.js';
import fixWhitespace from './fix-whitespace.js';

export function jscodeshiftMode(transform, settings) {
  return function newTransform(fileInfo, api, options) {
    if (!fileInfo.path.endsWith('.vue')) {
      return transform(fileInfo, api, options);
    }

    const { sfcDescriptor, indents } = parseSfc(fileInfo.source);

    fixWhitespace(sfcDescriptor, indents);

    if (sfcDescriptor.script || sfcDescriptor.scriptSetup) {
      /**
       * @typedef {import('@vue/compiler-sfc').SFCScriptBlock} SFCScriptBlock
       *
       * @param {SFCScriptBlock?} scriptBlock
       * @returns {SFCScriptBlock?}
       */
      const transformScriptBlock = (scriptBlock) => {
        if (scriptBlock) {
          const newContent = transform({
            ...fileInfo,
            source: scriptBlock.content
          }, api, options);

          return newContent
            ? { ...scriptBlock, content: newContent }
            : scriptBlock;
        } else {
          return scriptBlock;
        }
      };

      let hasChanges = false;

      const newScript = transformScriptBlock(sfcDescriptor.script);
      if (newScript !== sfcDescriptor.script) {
        hasChanges = true;
        sfcDescriptor.script = newScript;
      }

      const newScriptSetup = transformScriptBlock(sfcDescriptor.scriptSetup);
      if (newScriptSetup !== sfcDescriptor.scriptSetup) {
        hasChanges = true;
        sfcDescriptor.scriptSetup = newScriptSetup;
      }

      return hasChanges
        ? descriptorToString(sfcDescriptor, { indents })
        : undefined;
    } else {
      return undefined;
    }
  };
}
