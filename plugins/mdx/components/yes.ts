import type { AstroIntegration } from 'astro';
import type * as mdast from 'mdast';
import remarkDirective from 'remark-directive';
import type * as unified from 'unified';
import { visit } from 'unist-util-visit';

import { createComponentNode } from './create-component';

const YesTagName = 'AutoImportedYes';

export const yesAutoImport: Record<string, [string, string][]> = {
  './src/docs/components/yes.astro': [['default', YesTagName]],
};

/**
 * Remark plugin that converts blocks delimited with `:::yes` into instances of the `<Yes>`
 * component.
 */
function createPlugin(): unified.Plugin<[], mdast.Root> {
  const transformer: unified.Transformer<mdast.Root> = (tree) => {
    visit(tree, (node: any, index, parent) => {
      if (!parent || index === null || node.type !== 'containerDirective') return;

      const type = node.name;
      if (type !== 'yes') return;

      parent.children[index!] = createComponentNode(YesTagName, {}, ...node.children);
    });
  };

  return function attacher() {
    return transformer;
  };
}

export function mdxYes(): AstroIntegration {
  return {
    name: '@vidstack/yes',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkDirective, createPlugin()],
          },
        });
      },
    },
  };
}
