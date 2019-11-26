const webpack = require('@cypress/webpack-preprocessor');
const webpackOptions = require('../../webpack.config.js');
const db = require('../../cypress/support/database/dao');

module.exports = (on) => {
  const options = {
    webpackOptions,
  };
  on('file:preprocessor', webpack(options));

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--incognito');
      return args;
    }
  });

  on('task', {
    'defaults:db': () => db.selectAllForUser('admin'),
  });
};
