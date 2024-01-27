const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../src/main/resources/static', // Build Directory
  devServer: {
    proxy: {
      '/': {
        target: "http://localhost:8011",
        changeOrigin: true,
        ws:false,
        
      }
    }
  }
})