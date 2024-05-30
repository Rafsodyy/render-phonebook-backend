import globals from "globals";
import pluginJs from "@eslint/js";

// eslint.config.js
import stylisticJs from '@stylistic/eslint-plugin-js'


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node}},
  pluginJs.configs.recommended,
  {ignores: [".env/*", "dist", "node_modules/**", "**/.vscode", "mongo.js", "models/**", "eslint.config.mjs"],},
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': ['error', "tab"],
      '@stylistic/js/linebreak-style': ["error", "windows"],
      '@stylistic/js/jsx-quotes': ["error", "prefer-single"],
      '@stylistic/js/semi': ["error", "never"]      
    },
  }
];