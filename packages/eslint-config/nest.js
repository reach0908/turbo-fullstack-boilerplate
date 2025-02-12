import js from '@eslint/js';

import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import globals from 'globals';
import tseslint from 'typescript-eslint';

import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for NestJS projects.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nestJsConfig = [
	...baseConfig,
	// NestJS-specific lint configurations
	eslintPluginPrettierRecommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			globals: { ...globals.node, ...globals.jest },
			ecmaVersion: 2020,
			sourceType: 'module',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
		},
	},
];
