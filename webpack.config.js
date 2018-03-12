var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.ts',
    vendors: ['jquery', 'angular', 'angular-ui-router', 'angular-bootstrap-colorpicker'],
    custom: ["./src/models.ts", 
    "./src/types/astar.ts", 
    "./src/app.ts", 
    "./src/constants/css-style-properties.ts",
    "./src/constants/services-names.ts",
    "./src/constants/state-names.ts", 
    "./src/Languages/en-us.ts", 
    "./src/Languages/index.ts",
    "./src/components/maze/maze.component.ts",
    "./src/components/color-picker/color-picker.component.ts",
    "./src/components/success/success.component.ts",
    "./src/services/a-star-algo/a-star-algo.service.ts",
    "./src/services/color/color.service.ts",
    "./src/services/time-queue/time-queue.service.ts",
    "./src/services/success/success.service.ts"]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/assets/',
    filename: '[name].js'
  },
  resolve: {
      alias: {
      'astar': 'node_modules/javascript-astar/astar.js'
    },
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}