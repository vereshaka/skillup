const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      path.resolve(__dirname, './cypress'),
      path.resolve(__dirname, './node_modules'),
    ],
  },
  node: { fs: 'empty', child_process: 'empty', readline: 'empty' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env',
                '@babel/flow'],
            },
          },
        ],
      },
      {
        test: /\.feature$/,
        use: [
          {
            loader: 'cypress-cucumber-preprocessor/loader',
          },
        ],
      },
    ],
  },
};
