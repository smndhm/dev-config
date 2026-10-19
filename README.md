# dev-config

The configuration shared by my repositories: formatting, linting, dependency updates and CI setup. Change it here, and Renovate takes it to every repository.

| What                                                  | Where                                                       | Used as                                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Prettier, oxlint, ESLint and Stylelint configurations | [`packages/linting`](packages/linting)                      | the [`@dume/linting`](https://www.npmjs.com/package/@dume/linting) npm package |
| Renovate configuration                                | [`default.json`](default.json)                              | a Renovate preset                                                              |
| Node.js and pnpm setup for GitHub Actions             | [`.github/actions/setup`](.github/actions/setup/action.yml) | a composite action                                                             |

## In a repository

`package.json`:

```json
{
  "prettier": "@dume/linting/prettier",
  "scripts": {
    "lint": "prettier . --check && oxlint",
    "lint:fix": "prettier . --write && oxlint --fix"
  },
  "devDependencies": {
    "@dume/linting": "1.1.0",
    "oxlint": "1.88.0",
    "prettier": "3.9.10"
  }
}
```

`.oxlintrc.json` (oxlint resolves `extends` as a file path):

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@dume/linting/src/oxlint.json"]
}
```

`renovate.json`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["local>smndhm/dev-config"]
}
```

A GitHub Actions job, with the repository's `.nvmrc` and `packageManager`:

```yaml
steps:
  - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7
  - uses: smndhm/dev-config/.github/actions/setup@<commit SHA>
```

My own `@dume/*` packages can be used as soon as they are published: the Renovate preset gives them no minimum release age, and each repository excludes them from pnpm's in `pnpm-workspace.yaml`:

```yaml
minimumReleaseAgeExclude:
  - '@dume/*'
```

Settings of a single repository go next to the shared ones: rules in its `.oxlintrc.json`, package rules in its `renovate.json`.

## Development

```sh
pnpm install
pnpm lint
```

`@dume/linting` is versioned with [Changesets](https://github.com/changesets/changesets): add one with `pnpm changeset`. Once on `main`, the [Release](.github/workflows/release.yml) workflow opens the "Version Packages" pull request, and publishes to npm when it is merged, with npm trusted publishing (no npm token).

## License

[BSD 2-Clause](LICENSE).
