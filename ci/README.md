# CI

[`setup`](setup/action.yml): a GitHub Actions composite action that sets up Node.js from the repository's `.nvmrc`, pnpm from its `packageManager`, then runs `pnpm install --frozen-lockfile`.

```yaml
steps:
  - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7
  - uses: smndhm/dev-config/ci/setup@<commit SHA> # main
```

Renovate keeps the commit up to date.
