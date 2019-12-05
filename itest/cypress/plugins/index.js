const webpack = require('@cypress/webpack-preprocessor');

const fs = require('fs-extra');
const path = require('path');

const webpackOptions = require('../../webpack.config.js');
const db = require('../../cypress/support/database/dao');

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
  on('task', {
    'deleteById:db': async ({ id, dbParams }) => {
      await db.deleteById(id, dbParams);
      return 0;
    },
    'deleteAllForUser:db': async ({ username, dbParams }) => {
      await db.deleteAllForUser(username, dbParams);
      return 0;
    },
    'insertTransactionWithItems:db': async ({
      username, id, status, businessTransactionItems, dbParams,
    }) => {
      await db.insertTransactionWithItems(username, id, status, businessTransactionItems, dbParams);
      return 0;
    },
  });
  const file = config.env.configFile || 'local';
  return getConfigurationByFile(file);
};
