var path = require('path')
var webpack = require('webpack')
var jquery = require('jquery')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: {
      app: [
          './main.js',
          './assets/scss/main.scss'
      ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  plugins: [
      new VueLoaderPlugin(),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
      })
  ],
  module: {
    rules: [
        {
            test: /\.vue$/,
            use: ['vue-loader'],
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: { presets: ['es2015'] }
            }]
        },{
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                loader: "file-loader",
                options: { name: '[name].[ext]?[hash]' }
            }]
        },{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },{
            test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            use: 'url-loader?limit=10000',
        }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
