import { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': ['<rootDir>/src/$1'],
    '\\.(css|less|scss|sss|styl)$': ['<rootDir>/node_modules/jest-css-modules'],
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  collectCoverageFrom: ['<rootDir>/src/**/*.[jt]s'],
}

export default config
