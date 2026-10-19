import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';

// JavaScript and TypeScript go through oxlint (src/oxlint.json): ESLint lints what oxlint cannot read,
// Markdown (alternative text, heading levels, link fragments…) and JSON
export default defineConfig([
  { files: ['**/*.json'], ignores: ['**/package-lock.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
]);
