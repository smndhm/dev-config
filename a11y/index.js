import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

/**
 * The rules every audit runs: WCAG 2.2 A and AA, axe's best practices, and the rules axe maps to RGAA 4 and
 * EN 301 549 (RGAA 5 is expected to be based on WCAG 2.2 and EN 301 549: these tags already cover it).
 */
export const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice', 'RGAAv4', 'EN-301-549'];

// Read once, injected into each page: an extension page's Content Security Policy blocks a script tag, not this
const AXE_SOURCE = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

/** axe's options for TAGS (or `tags`), without the rules of `disable` */
const runOptions = ({ tags = TAGS, disable = [] } = {}) => ({
  runOnly: { type: 'tag', values: tags },
  rules: Object.fromEntries(disable.map(id => [id, { enabled: false }])),
});

/**
 * Describes axe's violations: impact, rule, RGAA criteria, help and link, then the elements in cause.
 *
 * @param {{ id: string, impact: string, help: string, helpUrl: string, tags: string[], nodes: { target: string[] }[] }[]} violations
 * @returns {string[]}
 */
export function describeViolations(violations) {
  return violations.map(violation => {
    const rgaa = violation.tags.filter(tag => tag.startsWith('RGAA-')).map(tag => tag.replace('RGAA-', 'RGAA '));
    return [
      `[${violation.impact}] ${violation.id}${rgaa.length ? ` (${rgaa.join(', ')})` : ''}: ${violation.help}`,
      `  ${violation.helpUrl}`,
      ...violation.nodes.map(node => `  - ${node.target.join(' ')}`),
    ].join('\n');
  });
}

/**
 * Runs axe on the current state of a Playwright page and describes each violation (see describeViolations). An
 * empty array means no violation. `disable` turns off rules by id, for a page whose structure the project does not
 * write (say why next to it).
 *
 * @param {import('playwright').Page} page
 * @param {{ tags?: string[], disable?: string[] }} [options]
 * @returns {Promise<string[]>}
 */
export async function audit(page, options) {
  // evaluate() runs in the page through the DevTools protocol, so the page's CSP does not apply
  await page.evaluate(AXE_SOURCE);
  const { violations } = await page.evaluate(axeOptions => window.axe.run(document, axeOptions), runOptions(options));
  return describeViolations(violations);
}

/**
 * The same audit for a browser driven by something else than Playwright, such as Selenium: a script to run as an
 * asynchronous script (its last argument is the callback), which calls back with axe's violations, for
 * describeViolations, or with `{ error }`.
 *
 *     describeViolations(await driver.executeAsyncScript(axeScript()))
 *
 * @param {{ tags?: string[], disable?: string[] }} [options]
 * @returns {string}
 */
export function axeScript(options) {
  return `${AXE_SOURCE}
const done = arguments[arguments.length - 1];
axe.run(document, ${JSON.stringify(runOptions(options))}).then(result => done(result.violations), error => done({ error: String(error) }));`;
}

/**
 * The red, green and blue of a CSS color as the browser computes it (`rgb(…)` or `rgba(…)`).
 *
 * @param {string} color
 * @returns {[number, number, number]}
 */
export function parseRgb(color) {
  const channels = color
    .match(/[\d.]+/g)
    ?.slice(0, 3)
    .map(Number);
  if (channels?.length !== 3) throw new Error(`not an rgb() color: ${color}`);
  return /** @type {[number, number, number]} */ (channels);
}

/** @param {[number, number, number]} rgb */
const luminance = rgb => {
  const [r, g, b] = rgb.map(value => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * The WCAG contrast ratio of two colors, from 1 to 21, for what axe cannot measure: text over a gradient,
 * `::highlight()` styles… See https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
 *
 * @param {string | [number, number, number]} a computed CSS color, or its red, green and blue
 * @param {string | [number, number, number]} b
 * @returns {number}
 */
export function contrastRatio(a, b) {
  const [light, dark] = [a, b].map(color => luminance(typeof color === 'string' ? parseRgb(color) : color)).toSorted((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/**
 * Presses Tab once per expected element, from the top of the page, and tells what each press focuses: the
 * selector of `expected` the focused element matches, or the start of its HTML.
 *
 * @param {import('playwright').Page} page
 * @param {string[]} expected CSS selectors, in the expected order
 * @returns {Promise<{ ok: boolean, order: string[] }>}
 */
export async function tabOrder(page, expected) {
  // From the top of the page: after blur(), Chrome would resume from the last focused element
  await page.evaluate(() => {
    document.body.tabIndex = -1;
    document.body.focus();
    document.body.removeAttribute('tabindex');
  });
  const order = [];
  for (let i = 0; i < expected.length; i++) {
    await page.keyboard.press('Tab');
    order.push(
      await page.evaluate(selectors => {
        let element = document.activeElement;
        // Into shadow roots, where the focused element really is
        while (element?.shadowRoot?.activeElement) element = element.shadowRoot.activeElement;
        return selectors.find(selector => element?.matches(selector)) ?? element?.outerHTML.slice(0, 60) ?? 'nothing';
      }, expected),
    );
  }
  return { ok: order.join('\n') === expected.join('\n'), order };
}
