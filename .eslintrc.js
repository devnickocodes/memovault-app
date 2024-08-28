module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
    'jsx-a11y',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    "import/prefer-default-export": "off",
    "react/no-unescaped-entities": "off",
    "react/no-array-index-key": "off",
    "no-nested-ternary": "off",
    "camelcase": "off"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};