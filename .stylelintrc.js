module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order'
  ],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'value-keyword-case': null
  },
  ignoreFiles: ["node_modules/**", "src/assets/**", "**/*.json", "**/*.svg", "**/*.{and another unneeded types}",]
};
