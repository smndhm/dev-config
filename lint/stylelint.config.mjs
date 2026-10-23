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
    // Kebab case, as stylelint-config-standard asks; a design token (`--sd-`) after @dume/ds's taxonomy:
    // --sd-b-{category}-{role}-{variant} for a base one, --sd-c-{component}-{category}-… for a component's,
    // --sd-l-{layout}-{category}-… for a layout's, the category from a closed list (`--sd-b-color-text-muted`,
    // `--sd-c-button-size-min-height`)
    'custom-property-pattern': [
      '^(?!sd-)[a-z][a-z0-9]*(-[a-z0-9]+)*$|^sd-(b|[cl]-[a-z0-9]+)-(color|font|size|outline)(-[a-z0-9]+)+$',
      {
        message: name =>
          name.startsWith('--sd-')
            ? `Expected design token "${name}" to be --sd-b-{category}-…, --sd-c-{component}-{category}-… or --sd-l-{layout}-{category}-…, the category color, font, size or outline.`
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
    // A misspelled or renamed token (`var(--sd-b-color-primay)`) is an error, rather than a value the browser ignores
    ...(tokens && { 'csstools/value-no-unknown-custom-properties': [true, { importFrom: [tokens] }] }),
  },
};
