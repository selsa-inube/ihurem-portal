import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config({
  ignores: [".storybook/preview-head.html", "dist"],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: {
    react: { version: "18.3" },
  },
  plugins: {
    react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
      },
    ],
    eqeqeq: ["error", "always"],
    "no-implicit-coercion": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-duplicate-enum-values": "warn",
    "no-nested-ternary": "warn",
    "no-var": "warn",
    "prefer-const": "warn",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/only-throw-error": "warn",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-base-to-string": ["warn"],
  },
});
