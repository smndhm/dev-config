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

Logical properties and values, for left-to-right and right-to-left languages alike: `margin-inline-start` rather than `margin-left`, `text-align: start` rather than `left` (`stylelint-use-logical`).

Spacing (margins, paddings, `gap`, `inset`), font sizes, radii and border widths come from custom properties, `var(--ds-b-size-16)` rather than `1rem`, `var(--ds-b-size-border-1) solid` rather than `1px solid`, so the scale stays in one place (`stylelint-declaration-strict-value`); `0`, `auto`, `inherit`, `none`, `em`, which follows the text, and a border's style stay allowed. Sizes in `rem`, the custom properties' included, are on the base 4, multiples of `0.25rem` (4px): `0.25rem`, `0.5rem`, `1.75rem`, not `0.3rem` nor `0.9375rem`.

Custom properties are in kebab case, and a design token (`--ds-`) follows @dume/ds's taxonomy: `--ds-b-{category}-{role}-{variant}` for a base one, `--ds-c-{component}-{category}-…` for a component's, `--ds-l-{layout}-{category}-…` for a layout's, the category `color`, `font`, `size` or `outline` (`--ds-b-color-text-muted`, `--ds-c-button-size-min-height`; not `--ds-b-focus-outline`).

## Pre-commit hook

On each commit, the linters' fixes and Prettier on the staged files: oxlint, then ESLint and Stylelint when the repository has their configuration, then Prettier. The commit stops on what they cannot fix.

In `package.json`:

```json
{
  "scripts": {
    "prepare": "dev-config hooks"
  }
}
```

`dev-config hooks` makes git run the hooks of `.husky/` (with husky, not in CI), and `dev-config sync` copies the hook, `.husky/pre-commit`, which runs `dev-config pre-commit` (lint-staged with [`lint-staged.config.mjs`](lint-staged.config.mjs)). husky and lint-staged come with the package.
