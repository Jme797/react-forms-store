import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
    {
        ignores: ['.yarn'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                project: './tsconfig.json',
                project: [
                    './packages/*/tsconfig.json',
                    './packages/*/tsconfig.*.json',
                ],
            },
        },
        plugins: {
            js,
            '@typescript-eslint': typescript,
            jest,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...typescript.configs.recommended.rules,
            ...typescript.configs['recommended-requiring-type-checking'].rules,
            ...jest.configs.recommended.rules,
        },
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        plugins: {
            js,
            jest,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...jest.configs.recommended.rules,
            // Add any custom rules here
        },
    },
    {
        files: ['packages/*/scripts/**', 'scripts/**', 'jest.config.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: [
            '**/*.test.js',
            '**/*.test.ts',
            '**/*.test.jsx',
            '**/*.test.tsx',
        ],
        plugins: {
            jest,
        },
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
        rules: {
            ...jest.configs.recommended.rules,
            // Add any custom rules here
        },
    },
];
