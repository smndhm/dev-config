# Renovate

The Renovate configuration of my repositories, in [`default.json`](default.json): `config:best-practices`, minor and patch updates, digests and lock file maintenance merged on their own once the Renovate branch checks pass, and no minimum release age for my own `@dume/*` packages.

They are merged without a pull request (`automergeType: "branch"`), so without its notifications: Renovate opens one only when the checks fail, and for major updates, which wait for me. Merging into `main` without a pull request needs a `main` branch that does not require one, and the Renovate branch workflow below, which runs the checks on every Renovate branch.

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

1. copies `@dume/dev-config`'s files into the repository (`dev-config sync`: the [AI assistant](../ia) settings and the [pre-commit hook](../lint#pre-commit-hook)), when the repository has the package;
2. with `changesets: true`, adds the changesets of the updated dependencies (the repository needs `@scaleway/changesets-renovate`);
3. commits them as Renovate, so that Renovate keeps rebasing the branch;
4. runs the repository's checks on the branch's last commit, as the CI, run on pull requests, does not run on a branch merged without one, nor on a commit pushed by a workflow, and reports them as the "Renovate branch checks" status, pending until they end, which Renovate waits for before merging.

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
