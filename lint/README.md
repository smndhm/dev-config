# Lint

Formatting with Prettier, JavaScript and TypeScript with oxlint, Markdown and JSON with ESLint, styles with Stylelint. Part of the `@dume/dev-config` npm package:

```bash
pnpm add -D @dume/dev-config prettier oxlint
```

Add `eslint` or `stylelint` only in a project that uses them: they are optional peer dependencies.

## Prettier

In `package.json`:

```json
{
  "prettier": "@dume/dev-config/lint/prettier"
}
```

## oxlint

`.oxlintrc.json` (oxlint resolves `extends` as a file path):

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@dume/dev-config/lint/oxlint.json"]
}
```

Add the project's `ignorePatterns` or rules next to `extends`.

## ESLint

For what oxlint cannot read: Markdown (alternative text, heading levels, link fragments…) and JSON. `eslint.config.mjs`:

```js
import eslintConfig from '@dume/dev-config/lint/eslint';
export default eslintConfig;
```

## Stylelint

SCSS, properties in idiomatic order, BEM class names. `stylelint.config.mjs`:

```js
export default {
  extends: '@dume/dev-config/lint/stylelint',
};
```
