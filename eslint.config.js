import globals from 'globals';
import eslint from '@eslint/js';
import tslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
  tslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  // {
  //   rules: {
  //     '@typescript-eslint/no-explicit-any': 'on',
  //   },
  // },
);
