module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    requireConfigFile: false,
  },
  env: {
    node: true,
  },
  rules: {
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'error',
    //prettier
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'lf',
        semi: true,
        singleQuote: true,
        printWidth: 150,
        trailingComma: 'all',
        bracketSpacing: true,
      },
    ],
  },
};
