# Accessibility

Accessibility checks for my projects, with [Playwright](https://playwright.dev): the parts their accessibility scripts share. What each one checks (pages, states, extensions) stays in the project. Part of the `@dume/dev-config` npm package.

```bash
pnpm add -D @dume/dev-config playwright
```

```js
import { audit, contrastRatio, tabOrder } from '@dume/dev-config/a11y';

// axe-core on the current state of the page: WCAG 2.2 A and AA, best practices, RGAA 4 and EN 301 549
const violations = await audit(page);

// What axe cannot measure, such as text over a gradient: the WCAG ratio of two computed colors
const ratio = contrastRatio('rgb(34, 34, 34)', 'rgb(250, 250, 250)');

// Tab from the top of the page: does each press focus the next selector?
const { ok, order } = await tabOrder(page, ['#search', 'nav a', 'main a']);
```

`audit` injects axe-core into the page through the DevTools protocol, so it also works on browser extension pages, whose Content Security Policy blocks injected scripts. `audit(page, { tags })` runs other axe tags than `TAGS`, and `audit(page, { disable: ['landmark-one-main'] })` turns off rules by id, for a page whose structure the project does not write: say why next to it.
