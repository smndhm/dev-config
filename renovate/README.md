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

The [`default.json`](../default.json) at the root of this repository only points here: it stays until every repository extends `local>smndhm/dev-config//renovate/default`.
