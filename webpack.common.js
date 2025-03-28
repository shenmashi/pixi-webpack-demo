const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log("版本==>", process.env.NODE_ENV)
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['./js/main.js'],
  // mode: 'none', // none development production
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV == 'production' ? 'game.min.[hash:8].js' : 'game.js',
  },
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'images/',to:'images/'}
    ], {
      ignore: [],
      debug:'debug',
      copyUnmodified: true
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: process.env.NODE_ENV !== 'production',

      // optipng: {
      //   optimizationLevel: 4
      // },

      //seems better on mac this way
      pngquant: {
        verbose:true,
        quality: '80-90',
      }
    }),  
    new HtmlPlugin({
      file:path.join(__dirname,'dist','index.html'),
      template:'./index.html'
    })
  ]
}