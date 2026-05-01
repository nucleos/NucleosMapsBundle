const {
    defineConfig,
} = require("eslint/config");

const babelParser = require("@babel/eslint-parser");

const {
    fixupConfigRules,
    fixupPluginRules,
} = require("@eslint/compat");

const globals = require("globals");
const _import = require("eslint-plugin-import");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([
    {
        languageOptions: {
            parser: babelParser,

            globals: {
                ...globals.browser,
            },
        },

        extends: fixupConfigRules(compat.extends('eslint:recommended', 'plugin:import/warnings', 'prettier')),

        plugins: {
            import: fixupPluginRules(_import),
        },
    },
    {
        files: ['test/*.js'],
        extends: compat.extends('plugin:jest/recommended'),
    },
]);
