import { createRequire } from 'node:module';
import { join } from 'node:path';
import process from 'node:process';
import valueNoUnknownCustomProperties from 'stylelint-value-no-unknown-custom-properties';

/** The design tokens of @dume/ds, when the project uses them: `var()` may only name these or the project's own */
function designTokens() {
  try {
    return createRequire(join(process.cwd(), 'package.json')).resolve('@dume/ds/tokens.css');
  } catch {
    return undefined;
  }
}

const tokens = designTokens();

export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-idiomatic-order', 'stylelint-prettier/recommended'],
  plugins: tokens ? [valueNoUnknownCustomProperties] : [],
  rules: {
    // Kebab case, as stylelint-config-standard asks; a design token (`--ds-`) after @dume/ds's taxonomy:
    // --ds-b-{category}-{role}-{variant} for a base one, --ds-c-{component}-{category}-… for a component's,
    // --ds-l-{layout}-{category}-… for a layout's, the category from a closed list (`--ds-b-color-text-muted`,
    // `--ds-c-button-size-min-height`)
    'custom-property-pattern': [
      '^(?!ds-)[a-z][a-z0-9]*(-[a-z0-9]+)*$|^ds-(b|[cl]-[a-z0-9]+)-(color|font|size|outline)(-[a-z0-9]+)+$',
      {
        message: name =>
          name.startsWith('--ds-')
            ? `Expected design token "${name}" to be --ds-b-{category}-…, --ds-c-{component}-{category}-… or --ds-l-{layout}-{category}-…, the category color, font, size or outline.`
            : `Expected custom property name "${name}" to be kebab-case.`,
      },
    ],
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$', // https://gist.github.com/Potherca/f2a65491e63338659c3a0d2b07eee382
      {
        message: selector => `Expected class selector "${selector}" to follow BEM convention.`,
        resolveNestedSelectors: true,
      },
    ],
    // A misspelled or renamed token (`var(--ds-b-color-primay)`) is an error, rather than a value the browser ignores
    ...(tokens && { 'csstools/value-no-unknown-custom-properties': [true, { importFrom: [tokens] }] }),
  },
};
