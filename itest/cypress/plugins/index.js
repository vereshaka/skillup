const webpack = require('@cypress/webpack-preprocessor');

const fs = require('fs-extra');
const path = require('path');

const webpackOptions = require('../../webpack.config.js');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve(__dirname, '../config', `${file}.json`);
  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
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
  const file = config.env.configFile || 'local';
  return getConfigurationByFile(file);
};
