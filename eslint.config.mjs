import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  js.configs.recommended,
  stylistic.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],

  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...react.configs.flat.recommended,

    rules: {
      '@stylistic/semi': ['error', 'always'],
      'react/prop-types': 'off',
    },

    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,

      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

  },
];
