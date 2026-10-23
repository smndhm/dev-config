---
'@dume/dev-config': minor
---

Stylelint: a custom property named `--sd-` follows @dume/ds's taxonomy (`--sd-b-{category}-…`, `--sd-c-{component}-{category}-…`, `--sd-l-{layout}-{category}-…`); in a project that installs @dume/ds, a `var()` naming none of its design tokens nor a custom property of the project is an error (stylelint-value-no-unknown-custom-properties).
