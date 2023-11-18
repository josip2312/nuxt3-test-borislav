module.exports = {
  env: {
    browser: true,
    node: true,
  },
  root: true,
  parser: "vue-eslint-parser",
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  plugins: ["prettier"],
};
