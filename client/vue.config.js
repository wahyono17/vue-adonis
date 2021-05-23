module.exports = {
  //jika ini di hidupkan maka 3333 tidak bisa di buka akan selalu di arahkan ke client
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
      },
    },
  },
};
