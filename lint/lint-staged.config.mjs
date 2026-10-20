import { existsSync } from 'node:fs';

const SCRIPTS = /\.[cm]?[jt]sx?$/;
const ESLINT = /\.(json|md)$/;
const STYLES = /\.s?css$/;

// The tools a repository has a configuration for: ESLint and Stylelint are optional
const configured = tool => ['js', 'mjs', 'cjs'].some(extension => existsSync(`${tool}.config.${extension}`));
const eslint = configured('eslint');
const stylelint = configured('stylelint');

const quote = files => files.map(file => `"${file}"`).join(' ');

/**
 * On the staged files, the fixes of the linters, then Prettier, one after the other: lint-staged runs the tasks of
 * different globs at the same time, which would write the same files at once.
 */
export default {
  '*': files => {
    const commands = [];
    const scripts = files.filter(file => SCRIPTS.test(file));
    if (scripts.length) commands.push(`oxlint --fix ${quote(scripts)}`);
    const eslintFiles = files.filter(file => ESLINT.test(file));
    if (eslint && eslintFiles.length) commands.push(`eslint --fix --no-warn-ignored ${quote(eslintFiles)}`);
    const styles = files.filter(file => STYLES.test(file));
    if (stylelint && styles.length) commands.push(`stylelint --fix --allow-empty-input ${quote(styles)}`);
    commands.push(`prettier --write --ignore-unknown ${quote(files)}`);
    return commands;
  },
};
