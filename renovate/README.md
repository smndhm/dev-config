# Renovate

The Renovate configuration of my repositories, in [`default.json`](default.json): `config:best-practices`, minor and patch updates, digests and lock file maintenance merged on their own once CI passes, and no minimum release age for my own `@dume/*` packages.

In a repository, `renovate.json`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["local>smndhm/dev-config//renovate/default"]
}
```

Package rules of a single repository go next to `extends`.

pnpm has its own minimum release age: each repository excludes my packages from it in `pnpm-workspace.yaml`, so that a new version installs as soon as it is published:

```yaml
minimumReleaseAgeExclude:
  - '@dume/*'
```

## Renovate branches

[`.github/workflows/renovate-branch.yml`](../.github/workflows/renovate-branch.yml) is a reusable workflow (GitHub only runs them from `.github/workflows`) for each Renovate branch:

1. copies `@dume/dev-config`'s files into the repository (`dev-config sync`: the [Claude](../claude) settings and the [pre-commit hook](../lint#pre-commit-hook)), when the repository has the package;
2. with `changesets: true`, adds the changesets of the updated dependencies (the repository needs `@scaleway/changesets-renovate`);
3. commits them as Renovate, so that Renovate keeps rebasing the branch;
4. runs the repository's checks on that commit, since a commit pushed by a workflow does not trigger the CI, and reports them as the "Renovate branch checks" status, which Renovate waits for before merging.

```yaml
name: Renovate branch

on:
  push:
    branches: ['renovate/**']

jobs:
  renovate-branch:
    uses: smndhm/dev-config/.github/workflows/renovate-branch.yml@<commit SHA> # main
    permissions:
      contents: write
      statuses: write
    with:
      changesets: true
      checks: |
        pnpm lint
        pnpm test
```
