import stylistic from '@stylistic/eslint-plugin';
import js from '@eslint/js';
import globals from "globals";

export default [
  js.configs.recommended,
  stylistic.configs.recommended,
  {
    rules: {
      '@stylistic/semi': ['error', 'always'],
    },
    languageOptions: { globals: globals.browser }
  },
]
