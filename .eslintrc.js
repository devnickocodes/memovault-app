module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
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
    "camelcase": "off",
    "no-shadow": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-children-prop": "off",
    "react/jsx-no-useless-fragment": "off",
    "import/no-extraneous-dependencies": "warn",
    "max-len": "warn",
    "react/jsx-no-constructed-context-values": "warn"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};