#!/usr/bin/env node
/**
 * sync: copies the files @dume/dev-config keeps for every repository into the current one, or checks they are up to
 * date. Claude Code reads its settings, and git its hooks, from the repository, before anything is installed: they
 * cannot come from a package at run time, so they are copied, and Renovate's branches copy them again when the package
 * is updated.
 * hooks: makes git run the hooks of .husky/, with husky (the "prepare" script, run by pnpm install). Not in CI: the
 * commits of the workflows (Renovate branches, Version Packages) are not checked by hooks.
 * pre-commit: the pre-commit hook, the linters' fixes and Prettier on the staged files, with lint-staged.
 *
 * Usage: dev-config sync           writes the files
 *        dev-config sync --check   exits with 1 when a file differs
 *        dev-config hooks
 *        dev-config pre-commit
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import process from 'node:process';
import husky from 'husky';
import lintStaged from 'lint-staged';
import lintStagedConfig from '../lint/lint-staged.config.mjs';

const PACKAGE_DIR = join(import.meta.dirname, '..');

// Files of the package, copied at the same place in the repository: in smndhm/dev-config, they are its own
const FILES = ['.claude/settings.json', '.husky/pre-commit'];

const readOrNothing = file => readFile(file, 'utf8').catch(() => undefined);

const [command, ...options] = process.argv.slice(2);
if (command === 'hooks') {
  const message = process.env.CI ? 'CI: no git hooks' : husky();
  if (message) console.log(message);
  process.exit(0);
}
if (command === 'pre-commit') {
  process.exit((await lintStaged({ config: lintStagedConfig })) ? 0 : 1);
}
if (command !== 'sync') {
  console.error('Usage: dev-config sync [--check] | hooks | pre-commit');
  process.exit(2);
}
const check = options.includes('--check');

let outdated = 0;
for (const to of FILES) {
  const expected = await readFile(join(PACKAGE_DIR, to), 'utf8');
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
