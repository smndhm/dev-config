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

Custom properties are in kebab case, and a design token (`--sd-`) follows @dume/design's taxonomy: `--sd-b-{category}-{role}-{variant}` for a base one, `--sd-c-{component}-{category}-…` for a component's, `--sd-l-{layout}-{category}-…` for a layout's, the category `color`, `font`, `size` or `outline` (`--sd-b-color-text-muted`, `--sd-c-button-size-min-height`; not `--sd-b-focus-outline`).

In a project that installs `@dume/design` (resolved from the directory Stylelint runs in), a `var()` may only name its design tokens or a custom property the project declares: a misspelled or renamed token (`var(--sd-b-color-primay)`) is an error, rather than a value the browser ignores.

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
