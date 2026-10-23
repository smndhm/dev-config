import { createRequire } from 'node:module';
import { join } from 'node:path';
import process from 'node:process';
import valueNoUnknownCustomProperties from 'stylelint-value-no-unknown-custom-properties';

/** The design tokens of @dume/design, when the project uses them: `var()` may only name these or the project's own */
function designTokens() {
  try {
    return createRequire(join(process.cwd(), 'package.json')).resolve('@dume/design/tokens.css');
  } catch {
    return undefined;
  }
}

const tokens = designTokens();

export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-idiomatic-order', 'stylelint-prettier/recommended'],
  plugins: tokens ? [valueNoUnknownCustomProperties] : [],
  rules: {
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
