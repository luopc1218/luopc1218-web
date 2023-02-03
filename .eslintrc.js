module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "vue/multi-word-component-names": "warn",
    "vue/no-v-model-argument": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
  },
};
