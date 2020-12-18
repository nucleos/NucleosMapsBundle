module.exports = {
  "parser": "@babel/eslint-parser",
  "extends": [
    "eslint:recommended",
    "plugin:import/warnings",
    "prettier"
  ],
  "env": {
    "browser": true,
    "es6": true
  },
  "plugins": [
    "import",
  ],
  "overrides": [
    {
      "files": [
        "test/*.js"
      ],
      "extends": [
        "plugin:jest/recommended"
      ]
    }
  ]
};
