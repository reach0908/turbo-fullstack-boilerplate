import { nestJsConfig } from '@workspace/eslint-config/nest-js';

/** @type {import("eslint").Linter.Config} */
export const sharedConfig = [
	...nestJsConfig,
	{
		languageOptions: {
			sourceType: 'module',
			parserOptions: {
				project: 'tsconfig.json',
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
];

export default sharedConfig;
