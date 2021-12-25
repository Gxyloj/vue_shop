const path = require("path");
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/global.less")]
    }
  },
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({
      }),
      Components({
        resolvers:[ElementPlusResolver()],
      })
    ],

  },
};
