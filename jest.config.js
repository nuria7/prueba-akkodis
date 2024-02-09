module.exports = {
    preset: 'jest-preset-angular',
    clearMocks: true,
    testRunner: 'jest-jasmine2',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    coverageDirectory: './jest',
    coverageReporters: ['lcov'],
    collectCoverageFrom: [
        '<rootDir>/src/app/*/.ts',
        '!<rootDir>/src/app/core/api/*/.ts',
        '!<rootDir>/src/app/+modules/dummy/*/.ts',
        '!<rootDir>/src/app/*/.module.ts',
        '!<rootDir>/src/app/**/index.ts'
    ],
    reporters: [
        'default', [
            'jest-sonar',
            {
                outputDirectory: 'jest',
                outputName: 'pinterest-project-report.xml'
            }
        ]
    ],
    moduleFileExtensions: ['ts', 'js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/builds/', '<rootDir>/cypress/', '<rootDir>/jest/'],
    transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
    globals: {
        'ts-jest': {
            'tsconfig': '<rootDir>/tsconfig.spec.json',
            'stringifyContentPathRegex': '\\.html$'
        }
    },
    roots: ['<rootDir>/src/'],
    testMatch: ['**/*.spec.ts'],
    collectCoverage: true,
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/app/$1',
        '@assets/(.*)': '<rootDir>/src/assets/$1',
        '@config/(.*)': '<rootDir>/src/config/$1',
        '@core/(.*)': '<rootDir>/src/app/core/$1',
        '@environments/(.*)': '<rootDir>/src/environments/$1',
        '@modules/(.*)': '<rootDir>/src/app/+modules/$1',
        '@shared/(.*)': '<rootDir>/src/app/shared/$1',
        '@shell/(.*)': '<rootDir>/src/app/shell/$1',
        '@environment': '<rootDir>/src/environments/environment'
    }
};

process.env.TZ = 'GMT';