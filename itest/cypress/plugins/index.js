const webpack = require('@cypress/webpack-preprocessor');
const webpackOptions = require('../../webpack.config.js');

module.exports = (on) => {
  const options = {
    webpackOptions,
  };
  on('file:preprocessor', webpack(options));

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--incognito');
    }
    return args;
  });
};
