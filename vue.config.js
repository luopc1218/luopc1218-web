const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        // local
        target: "http://localhost:8080", 
        // dev
        // target: "http://myserver.com:8080",
        // prod
        // target: "http://localhost:8080",
        ws: true, //代理websockets
        // changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        pathRewrite: {
          // '^/api'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api' 转接为 http://localhost:8081/
          "^/api": "",
        },
      },
    },
  },

  runtimeCompiler: true,
  assetsDir: 'public',
  css: {
    sourceMap: true
  }
});
