// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    '../.eslintrc',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['webpack.config.js'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/namespace': 'off',
    'import/no-duplicates': 'off',
    'import/no-unresolved': 'off',
    'no-restricted-globals': 'off',
    'no-undef': 'off',
    //react
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
    // typescript
    '@typescript-eslint/no-non-null-assertion': 'off',
    // import order
    'import/order': [
      'error',
      {
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            pattern: 'client/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@**/**',
            group: 'external',
            position: 'after',
          },
        ],
        groups: ['builtin', 'external', ['parent', 'sibling', 'internal'], 'unknown'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.config.js'),
      },
    },
  },
  env: {
    browser: true,
    node: true,
  },
};
