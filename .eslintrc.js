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
    "no-console": "off",
    "no-debugger": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-model-argument": "off",
  },
};
