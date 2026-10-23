---
'@dume/dev-config': minor
---

Stylelint: a custom property named `--ds-` follows @dume/ds's taxonomy (`--ds-b-{category}-…`, `--ds-c-{component}-{category}-…`, `--ds-l-{layout}-{category}-…`); in a project that installs @dume/ds, a `var()` naming none of its design tokens nor a custom property of the project is an error (stylelint-value-no-unknown-custom-properties).
