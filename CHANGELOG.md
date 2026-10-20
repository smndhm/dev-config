# @dume/dev-config

## 1.1.0

### Minor Changes

- 09df7e7: Claude Code settings (no attribution in commits and pull requests), copied into each repository by the new `dev-config sync` command; `dev-config sync --check` fails when they differ.

## 1.0.0

### Major Changes

- 8fcf713: First version, replacing `@dume/linting`: the Prettier, oxlint, ESLint (Markdown and JSON only, JavaScript and TypeScript go through oxlint) and Stylelint configurations under `@dume/dev-config/lint/*`, and the accessibility checks under `@dume/dev-config/a11y` (`audit` with axe-core: WCAG 2.2 A and AA, best practices, RGAA 4 and EN 301 549; `contrastRatio`, `parseRgb`, `tabOrder`).
