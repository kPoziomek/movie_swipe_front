import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {ignores:['docs/*', 'build/*', 'lib/*', 'dist/*', 'node_modules/*']},
  {rules: { 'no-console': 'warn',
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
     }},
];
