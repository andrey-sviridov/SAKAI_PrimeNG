import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: parser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
        },
        rules: {
            'no-console': 'warn',
            'prefer-const': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        ignores: ['**/dist/**', '**/node_modules/**'],
    },
];
