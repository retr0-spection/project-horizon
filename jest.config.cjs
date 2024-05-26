module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
    "coverageReporters": [
      "json",
      "lcov",
      "text",
      "clover"
    ],
    testTimeout: 20000
};
