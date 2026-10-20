# Claude

The Claude Code settings of my repositories, in [`settings.json`](settings.json):

- `attribution`: no co-author in commits, no "Generated with Claude Code" in pull requests, no link to the session.

Claude keeps its own git identity on its working branches: its commits are signed, so GitHub shows them as verified.

In a cloud session, Claude Code reads only the settings committed in the repository, before anything is installed: they cannot come from the package when Claude starts. So `@dume/dev-config` copies them into the repository:

```sh
pnpm exec dev-config sync           # writes .claude/settings.json
pnpm exec dev-config sync --check   # fails when it differs, for the lint
```

On each Renovate branch, the [Renovate branch workflow](../renovate#renovate-branches) runs `dev-config sync`: when `@dume/dev-config` changes these settings, the update brings them to the repository. Change them here, never in a repository.
