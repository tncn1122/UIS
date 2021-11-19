// Overriding CreateReactApp settings, ref: https://github.com/arackaf/customize-cra
// https://github.com/goblin-laboratory/cra-multi-page-template/blob/c76ff80a949413ed1f57136b25639d0e39dbd893/config-overrides.js

const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addWebpackAlias,
} = require('customize-cra')

const paths = require('react-scripts/config/paths');
// paths.appSrc = path.resolve(__dirname, 'new_src_path'); // default is 'src'
paths.appIndexJs = `${paths.appSrc}/App.js`;

module.exports = override(
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd', libraryDirectory: 'es', style: true
  }),
  addWebpackAlias({
    // we don't need add here because of jsconfig.json
    // just need in such case ./src/level_1/level_2
    // const path = require('path');
    // 'config': path.resolve(__dirname, './src/config'),
  })
)
