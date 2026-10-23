# @dume/dev-config

## 1.4.0

### Minor Changes

- 3cf269b: Stylelint: a custom property named `--ds-` follows @dume/ds's taxonomy (`--ds-b-{category}-…`, `--ds-c-{component}-{category}-…`, `--ds-l-{layout}-{category}-…`). Logical properties and values are required (stylelint-use-logical). Spacing, font sizes, radii and border widths come from custom properties (stylelint-declaration-strict-value), and sizes in rem are on the base 4, multiples of 0.25rem.

### Patch Changes

- 19119a1: Updated dependency `oxlint` to `1.89.0`.
- 54649d0: Updated dependency `eslint` to `10.13.0`.

## 1.3.0

### Minor Changes

- 0a2fafe: Pre-commit hook: `dev-config hooks` (husky) and `dev-config pre-commit` (lint-staged with the shared configuration, also exported as `@dume/dev-config/lint/lint-staged`), and `dev-config sync` copies `.husky/pre-commit`

## 1.2.0

### Minor Changes

- 521c40c: `axeScript` runs the same accessibility audit in a browser driven by something else than Playwright, such as Selenium, and `describeViolations` describes its violations as `audit` does.

## 1.1.0

### Minor Changes

- 09df7e7: Claude Code settings (no attribution in commits and pull requests), copied into each repository by the new `dev-config sync` command; `dev-config sync --check` fails when they differ.

## 1.0.0

### Major Changes

- 8fcf713: First version, replacing `@dume/linting`: the Prettier, oxlint, ESLint (Markdown and JSON only, JavaScript and TypeScript go through oxlint) and Stylelint configurations under `@dume/dev-config/lint/*`, and the accessibility checks under `@dume/dev-config/a11y` (`audit` with axe-core: WCAG 2.2 A and AA, best practices, RGAA 4 and EN 301 549; `contrastRatio`, `parseRgb`, `tabOrder`).
