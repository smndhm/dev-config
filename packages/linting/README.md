# @dume/linting

Shared linting configurations for my projects.

## Installation

```bash
pnpm add -D @dume/linting
```

## Usage

### ESLint

Create an `eslint.config.mjs` file in your project root:

```js
import eslintConfig from '@dume/linting/eslint';
export default eslintConfig;
```

### Prettier

Create a `prettier.config.mjs` file in your project root:

```js
import prettierConfig from '@dume/linting/prettier';
export default prettierConfig;
```

### oxlint

Create an `.oxlintrc.json` file in your project root (oxlint resolves `extends` as a file path):

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@dume/linting/src/oxlint.json"]
}
```

Add your project's `ignorePatterns` or rules next to `extends`.

### Prettier from package.json

Instead of a `prettier.config.mjs` file:

```json
{
  "prettier": "@dume/linting/prettier"
}
```

### Stylelint

Create a `stylelint.config.mjs` file in your project root:

```js
export default {
  extends: '@dume/linting/stylelint',
};
```
