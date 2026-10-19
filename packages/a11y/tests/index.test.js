import assert from 'node:assert/strict';
import { test } from 'node:test';
import { contrastRatio, parseRgb, TAGS } from '../src/index.js';

test('parses computed colors', () => {
  assert.deepEqual(parseRgb('rgb(75, 1, 149)'), [75, 1, 149]);
  assert.deepEqual(parseRgb('rgba(250, 250, 250, 0.5)'), [250, 250, 250]);
  assert.throws(() => parseRgb('purple'));
});

test('computes the WCAG contrast ratio, in any order', () => {
  assert.equal(contrastRatio('rgb(0, 0, 0)', 'rgb(255, 255, 255)'), 21);
  assert.equal(contrastRatio([255, 255, 255], [0, 0, 0]), 21);
  assert.equal(contrastRatio('rgb(34, 34, 34)', 'rgb(34, 34, 34)'), 1);
  // #767676 on white: the lightest grey that passes AA for normal text
  assert.ok(contrastRatio('rgb(118, 118, 118)', 'rgb(255, 255, 255)') >= 4.5);
  assert.ok(contrastRatio('rgb(119, 119, 119)', 'rgb(255, 255, 255)') < 4.5);
});

test('audits WCAG 2.2 AA, best practices, RGAA and EN 301 549', () => {
  assert.deepEqual(TAGS, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice', 'RGAAv4', 'EN-301-549']);
});
