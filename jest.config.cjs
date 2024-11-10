// jest.config.cjs
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/support/setupTests.ts'],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};