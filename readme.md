Webpack loader that compress images via [kraken.io](kraken.io)  service.

#Install
```
npm i --save webpack-krakenio-loader
```

#Usage
Add `krakenio` section to your webpack config.
```
{
  krakenio:  {
    api_key: 'API_KEY',
    api_secret: 'API_SECRET'
  }
}
```
Add loader. Full list of options you can find in [https://kraken.io/docs/getting-started](documentation). 
```
{
  test: /\.(png|jpg|jpeg)$/,
  loaders: [
    'file?name=i/[hash].jpeg?[hash]',
    'webpack-krakenio?' + JSON.stringify({lossy:true,quality:90,convert:{format:"jpeg", background:"#ffffff"}})
  ]
}
```

#Full example config
```
{
  context: '/',

  entry: './client/index.js',

  output: {
    path: './public/',
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },

  module: {
    loaders: [
      {
        test: /\.(png|jpg|jpeg)$/,
        loaders: [
          'file?name=i/[hash].jpeg?[hash]',
          'webpack-krakenio?' + JSON.stringify({lossy:true,quality:90,convert:{format:"jpeg", background:"#ffffff"}})
        ]
      }
    ]
  },

  krakenio: {
    api_key: 'API_KEY',
    api_secret: 'API_SECRET'
  }
}
```