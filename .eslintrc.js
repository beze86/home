module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:import/recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    requireConfigFile: false,
  },
  env: {
    node: true,
  },
  rules: {
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/no-unresolved': 'error',
    //prettier
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'lf',
        semi: true,
        singleQuote: true,
        printWidth: 200,
        trailingComma: 'all',
        bracketSpacing: true,
      },
    ],
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
            pattern: 'models/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'controllers/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'middlewares/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'routes/**',
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
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
};
