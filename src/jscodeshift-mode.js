import descriptorToString from 'vue-sfc-descriptor-to-string';
import { parse } from '@vue/compiler-sfc';

export function jscodeshiftMode(transform, settings) {
  return function newTransform(fileInfo, api, options) {
    if (!fileInfo.path.endsWith('.vue')) {
      return transform(fileInfo, api, options);
    }

    const { descriptor: sfcDescriptor } = parse(fileInfo.source);

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
        ? descriptorToString(sfcDescriptor)
        : undefined;
    } else {
      return undefined;
    }
  };
}
