module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    google: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
  }
}
