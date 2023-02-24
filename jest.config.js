module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "src"],
    transform: {
      ".+\\.ts$": "ts-jest",
    },
    moduleNameMapper: {
      "^src/(.*)$": "<rootDir>/src/$1",
    },
    testMatch: ["<rootDir>/tests/*.(test|spec).ts"],
  };

  global.teardown = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };
  