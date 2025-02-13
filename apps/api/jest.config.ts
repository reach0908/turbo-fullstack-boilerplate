import type { Config } from 'jest';

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.json',
			},
		],
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: './coverage',
	testEnvironment: 'node',
	moduleDirectories: ['node_modules'],
	roots: ['<rootDir>/src/'],
	modulePaths: ['<rootDir>'],
};

export default config;
