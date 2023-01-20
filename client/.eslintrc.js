// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  extends: ['../.eslintrc', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'prettier'],
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
    'no-restricted-globals': 'off',
    'no-undef': 'off',
    //react
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
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
