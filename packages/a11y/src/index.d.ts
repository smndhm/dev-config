import type { Page } from 'playwright';

type Rgb = [number, number, number];

/** WCAG 2.2 A and AA, axe's best practices, RGAA 4 and EN 301 549 */
export declare const TAGS: string[];

/** Runs axe on the page and describes each violation; an empty array means none. `disable` turns off rules by id */
export declare function audit(page: Page, options?: { tags?: string[]; disable?: string[] }): Promise<string[]>;

/** The red, green and blue of a computed `rgb()` or `rgba()` color */
export declare function parseRgb(color: string): Rgb;

/** The WCAG contrast ratio of two colors, from 1 to 21 */
export declare function contrastRatio(a: string | Rgb, b: string | Rgb): number;

/** Presses Tab once per expected selector, from the top of the page, and tells what each press focuses */
export declare function tabOrder(page: Page, expected: string[]): Promise<{ ok: boolean; order: string[] }>;
