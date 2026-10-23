import useLogical from 'stylelint-use-logical';

export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-idiomatic-order', 'stylelint-prettier/recommended'],
  plugins: [useLogical],
  rules: {
    // Kebab case, as stylelint-config-standard asks; a design token (`--ds-`) after @dume/ds's taxonomy:
    // --ds-b-{category}-{role}-{variant} for a base one, --ds-c-{component}-{category}-… for a component's,
    // --ds-l-{layout}-{category}-… for a layout's, the category from a closed list (`--ds-b-color-text-muted`,
    // `--ds-c-button-size-min-height`)
    'custom-property-pattern': [
      '^(?!ds-)[a-z][a-z0-9]*(-[a-z0-9]+)*$|^ds-(b|[cl]-[a-z0-9]+)-(color|font|size|outline)(-[a-z0-9]+)+$',
      {
        message: name =>
          name.startsWith('--ds-')
            ? `Expected design token "${name}" to be --ds-b-{category}-…, --ds-c-{component}-{category}-… or --ds-l-{layout}-{category}-…, the category color, font, size or outline.`
            : `Expected custom property name "${name}" to be kebab-case.`,
      },
    ],
    // Sizes in rem on the base 4, multiples of 0.25rem (4px): `0.25rem`, `0.5rem`, `1.75rem`, not `0.3rem`
    'declaration-property-value-disallowed-list': [
      { '/.*/': ['/(?<![\\w.])\\d*\\.(?!(?:0*|25|5|50|75)0*rem\\b)\\d+rem\\b/'] },
      { message: (property, value) => `Expected "${value}" (${property}) in rem on the base 4: multiples of 0.25rem.` },
    ],
    // Logical properties and values (`margin-inline-start`, `text-align: start`): the same CSS for left-to-right and
    // right-to-left languages
    'csstools/use-logical': 'always',
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$', // https://gist.github.com/Potherca/f2a65491e63338659c3a0d2b07eee382
      {
        message: selector => `Expected class selector "${selector}" to follow BEM convention.`,
        resolveNestedSelectors: true,
      },
    ],
  },
};
