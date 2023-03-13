const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

const dev_ip_record = "http://localhost:8007"
const dev_ip_user = "http://localhost:8013"
// const prop_ip = ""
// const env_ip = dev_ip

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/record": {
        target: dev_ip_record,
        changeOrigin: true, // 是否改变域名
        ws: true,
      },
      "/user": {
        target: dev_ip_user,
        changeOrigin: true, // 是否改变域名
        ws: true,
      },
    },
    port: 9009,
  },
  // vant的自动化导包
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
})
