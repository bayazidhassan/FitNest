// import js from "@eslint/js";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";
// import globals from "globals";
// import tseslint from "typescript-eslint";

// export default defineConfig([
//   {
//     files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
//     plugins: { js },
//     extends: ["js/recommended"],
//     languageOptions: { globals: globals.browser },
//   },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
//   tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ]);

import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  //Base JS/TS rules
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },

  //TypeScript recommended rules
  tseslint.configs.recommended,

  //React recommended rules
  pluginReact.configs.flat.recommended,

  //TSX-specific overrides
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off", // Turn off for TSX files
    },
  },

  //Prettier formatting rules
  {
    files: ["**/*.{js,ts,jsx,tsx,json,css,scss,md}"],
    extends: ["prettier"],
  },

  //Enable eslint-plugin-prettier to show Prettier errors in ESLint
  eslintPluginPrettierRecommended,
]);
