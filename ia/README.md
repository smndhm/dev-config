# AI

The settings of the AI coding assistants of my repositories, whatever the provider: Claude Code for now.

## Claude Code

The Claude Code settings and instructions of my repositories, this repository's own:

- [`.claude/settings.json`](../.claude/settings.json), `attribution`: no co-author in commits, no "Generated with Claude Code" in pull requests, no link to the session.
- [`.claude/CLAUDE.md`](../.claude/CLAUDE.md): my preferences, whatever the repository. My stack, the design system and BEM for the interface, the base 4, flex rather than grid, standards rather than providers, accessibility, and delivery by pull request. Claude Code reads it with the repository's own `CLAUDE.md`, at its root, which says what is the repository's own.

Claude keeps its own git identity on its working branches: its commits are signed, so GitHub shows them as verified.

In a cloud session, Claude Code reads only the settings committed in the repository, before anything is installed: they cannot come from the package when Claude starts. So `@dume/dev-config` publishes these files and copies them into the repository:

```sh
pnpm exec dev-config sync           # writes .claude/settings.json and .claude/CLAUDE.md
pnpm exec dev-config sync --check   # fails when it differs, for the lint
```

On each Renovate branch, the [Renovate branch workflow](../renovate#renovate-branches) runs `dev-config sync`: when `@dume/dev-config` changes these settings or instructions, the update brings them to the repository. Change them here, never in a repository.
