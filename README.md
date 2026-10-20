# dev-config

The configuration shared by my repositories. Change it here, and Renovate takes it to every repository.

| Theme                 | What                                                                                     | Used as                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [Lint](lint)          | Prettier, oxlint, ESLint (Markdown and JSON) and Stylelint configurations                | the [`@dume/dev-config`](https://www.npmjs.com/package/@dume/dev-config) npm package |
| [Accessibility](a11y) | axe-core audits, WCAG contrast ratio and keyboard order, with Playwright                 | the `@dume/dev-config` npm package                                                   |
| [Renovate](renovate)  | dependency updates, and a workflow for Renovate branches (changesets, `dev-config sync`) | a Renovate preset                                                                    |
| [CI](ci)              | Node.js and pnpm setup for GitHub Actions                                                | a composite action                                                                   |
| [Claude](claude)      | Claude Code settings: no attribution in commits and pull requests                        | copied by the `dev-config sync` command of the npm package                           |

## Development

```sh
pnpm install
pnpm lint
pnpm test
```

The repository uses its own tools: its Prettier, oxlint and ESLint configurations, its Renovate preset, its setup action, its Renovate branch workflow and its Claude settings.

`@dume/dev-config` is versioned with [Changesets](https://github.com/changesets/changesets): add one with `pnpm changeset`. Once on `main`, the [Release](.github/workflows/release.yml) workflow opens the "Version Packages" pull request, and publishes to npm when it is merged, with npm trusted publishing (no npm token).

It replaces `@dume/linting`, from this repository too.

## License

[BSD 2-Clause](LICENSE).
