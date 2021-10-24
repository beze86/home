module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
  },
  ignorePatterns: ['/*.js'],
  rules: {
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'error',
  },
};
