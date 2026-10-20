# @dume/dev-config

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
