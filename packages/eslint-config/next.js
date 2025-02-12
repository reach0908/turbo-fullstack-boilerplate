import pluginNext from '@next/eslint-plugin-next';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
	...baseConfig,
	{
		plugins: {
			'@next/next': pluginNext,
			'react-hooks': pluginReactHooks,
		},
		languageOptions: {
			globals: {
				...globals.serviceworker,
			},
		},
		settings: { react: { version: 'detect' } },
		rules: {
			...pluginNext.configs.recommended.rules,
			...pluginNext.configs['core-web-vitals'].rules,
			...pluginReactHooks.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
		},
	},
];
