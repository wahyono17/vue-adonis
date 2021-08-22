module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333',//bisa diganti di base url store
      },
    },
  },
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    i18n: {
      locale: 'ja',
      fallbackLocale: 'ja',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
