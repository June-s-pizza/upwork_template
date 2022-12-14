/* eslint-disable */
export default {
  displayName: "components",
  preset: "../../../jest.preset.js",
  moduleNameMapper: {
    "\\.(css|less).*$": "identity-obj-proxy",
  },
  transform: {
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nrwl/react/plugins/jest",
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        isolatedModules: true,
      },
    ],
  },
  setupFiles: ["jest-canvas-mock"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../../coverage/libs/dashboard/components",
  coverageReporters: ["lcov", "text-summary"],
  coverageThreshold: {
    global: {
      statements: 73,
      branches: 49,
      functions: 56,
      lines: 72,
    },
  },
};
