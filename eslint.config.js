// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import jestPlugin from "eslint-plugin-jest";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import jestDomPlugin from "eslint-plugin-jest-dom";

export default tseslint.config([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist"],
    plugins: {
      jest: jestPlugin, // ✅ registra o plugin no formato Flat
      "testing-library": testingLibraryPlugin,
      "jest-dom": jestDomPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules, // ✅ copia apenas as regras
      ...jestPlugin.configs.style.rules, // ✅ idem
      ...testingLibraryPlugin.configs.react.rules,
      ...jestDomPlugin.configs.recommended.rules,
    },
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
]);
