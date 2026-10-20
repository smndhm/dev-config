#!/usr/bin/env node
/**
 * Copies the files @dume/dev-config keeps for every repository into the current one, or checks they are up to date.
 * Claude Code reads its settings from the repository, before anything is installed: they cannot come from a package
 * at run time, so they are copied, and Renovate's branches copy them again when the package is updated.
 *
 * Usage: dev-config sync           writes the files
 *        dev-config sync --check   exits with 1 when a file differs
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import process from 'node:process';

const PACKAGE_DIR = join(import.meta.dirname, '..');

// Package file → repository file
const FILES = [['claude/settings.json', '.claude/settings.json']];

const readOrNothing = file => readFile(file, 'utf8').catch(() => undefined);

const [command, ...options] = process.argv.slice(2);
if (command !== 'sync') {
  console.error('Usage: dev-config sync [--check]');
  process.exit(2);
}
const check = options.includes('--check');

let outdated = 0;
for (const [from, to] of FILES) {
  const expected = await readFile(join(PACKAGE_DIR, from), 'utf8');
  if ((await readOrNothing(to)) === expected) continue;
  if (check) {
    outdated++;
    console.error(`${to} differs from @dume/dev-config's: run "dev-config sync"`);
  } else {
    await mkdir(dirname(to), { recursive: true });
    await writeFile(to, expected);
    console.log(`${to} updated from @dume/dev-config`);
  }
}
if (outdated) process.exit(1);
