module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    requireConfigFile: false,
  },
  env: {
    node: true,
  },
  rules: {
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: false,
      },
    ],
  },
};
