const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer(),
    postcssImport(),
    postcssUrl(),
    postcssPresetEnv({
      stage: 1
    })
  ]
}
