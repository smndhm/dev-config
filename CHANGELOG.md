# @dume/dev-config

## 1.0.0

### Major Changes

- 8fcf713: First version, replacing `@dume/linting`: the Prettier, oxlint, ESLint (Markdown and JSON only, JavaScript and TypeScript go through oxlint) and Stylelint configurations under `@dume/dev-config/lint/*`, and the accessibility checks under `@dume/dev-config/a11y` (`audit` with axe-core: WCAG 2.2 A and AA, best practices, RGAA 4 and EN 301 549; `contrastRatio`, `parseRgb`, `tabOrder`).
