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
	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			globals: { ...globals.node, ...globals.jest },
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
		},
	},
];
