module.exports = {
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  // coverageDirectory: 'coverage',
  // testEnvironment: 'jsdom',
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest"
  // },
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "setupFilesAfterEnv": [
    "@testing-library/jest-dom/extend-expect"
  ]
}