const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const devServer = require('webpack-dev-server');

module.exports = {
   mode: 'development',
   entry: './src/index.js',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
   },

   module: {
      rules: [
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            },
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
         }
      ],
   },

   plugins: [
      new ESLintPlugin({
         extensions: ['js', 'jsx'],
         context: 'src',
         fix: true,
      }),
   ],

   devServer: {
      static: {
         directory: path.join(__dirname, 'dist'),
      },
      open: true,
      hot: true,
   },

   resolve: {
      extensions: ['.js', '.jsx'],
   },
};
