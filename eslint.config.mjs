import prettierPlugin from "eslint-plugin-prettier";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      prettier: prettierPlugin,
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...prettierRecommended.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["warn"], // ✅ Now it works
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: ["node_modules/**", "dist/**"],
  },
];
