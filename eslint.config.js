import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, 'eslint-config-prettier'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintPluginImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // https://www.npmjs.com/package/eslint-plugin-import
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          named: true,
          groups: [
            ['builtin'],
            ['external', 'internal'],
            ['parent', 'sibling', 'index'],
            ['object', 'type'],
          ],
          'newlines-between': 'always',
          pathGroups: [
            { group: 'builtin', pattern: '@react*', position: 'before' },
            { group: 'external', pattern: '?!src*/**', position: 'before' },
            { group: 'external', pattern: 'src*/**', position: 'after' },
          ],
        },
      ],
    },
  },
);
