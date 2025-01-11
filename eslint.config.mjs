import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
   pluginJs.configs.recommended,
   {
      languageOptions: {
         globals: globals.node,
      },
      rules: {
         "no-unused-vars": "off",
      },
   },
];
