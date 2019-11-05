const webpack = require('@cypress/webpack-preprocessor');
const webpackOptions = require('../../webpack.config.js');

module.exports = (on) => {
  const options = {
    webpackOptions,
  };
  on('file:preprocessor', webpack(options));
};
