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
      locale: 'id',
      fallbackLocale: 'id',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
