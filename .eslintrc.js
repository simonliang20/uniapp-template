module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
};
