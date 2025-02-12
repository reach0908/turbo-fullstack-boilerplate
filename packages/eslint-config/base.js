import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
	{
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
			},
		},
	},
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,
	{
		plugins: {
			turbo: turboPlugin,
		},
		rules: {
			'turbo/no-undeclared-env-vars': 'warn',
		},
	},
	{
		plugins: {
			onlyWarn,
		},
	},
	{
		ignores: ['dist/**'],
	},
];
