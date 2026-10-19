# Changesets for Renovate

In a repository versioned with [Changesets](https://github.com/changesets/changesets), a reusable workflow adds a changeset to each Renovate branch, then runs the repository's checks on that commit (a commit pushed by a workflow does not trigger the CI) and reports them as the "Renovate changeset checks" status, which Renovate waits for before merging.

The workflow is [`.github/workflows/changesets-renovate.yml`](../.github/workflows/changesets-renovate.yml): GitHub only runs reusable workflows from `.github/workflows`. The repository needs `@scaleway/changesets-renovate`:

```yaml
name: Renovate → Changesets

on:
  push:
    branches: ['renovate/**']

jobs:
  changesets:
    uses: smndhm/dev-config/.github/workflows/changesets-renovate.yml@<commit SHA> # main
    permissions:
      contents: write
      statuses: write
    with:
      checks: |
        pnpm lint
        pnpm test
```
