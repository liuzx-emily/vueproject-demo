module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  /* 
  Since jest runs in node, we also don't have to transpile anything that uses modern ECMAScript features as Node >=8 already supports these features, so it's a sensible default. cli-plugin-jest also doesn't respect the transpileDependencies option in vue.config.js for the same reason.
    1. Usage of ES6 import/export statements, which have to be compiled to commonjs module.exports
    2. Single File Components (.vue files) which have to be run through vue-jest
    3. Typescript code
   */
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    // 我自己新加的
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
